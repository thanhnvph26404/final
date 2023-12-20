import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useTotalOrderadayMutation, useTotaladayQuery } from "../../../store/Order/Ordersevice";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import dayjs from 'dayjs';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
const { RangePicker } = DatePicker;

const ChartPage2 = () =>
{
    const [ startDate, setStartDate ] = useState<any>( dayjs() ); // Initialize with current date
    const { data: totaladay } = useTotaladayQuery( null );
    console.log( totaladay );
    const [ endDate, setEndDate ] = useState<any>( dayjs() ); // Initialize with current date
    const [ totalamountaday, settotalamountaday ] = useState<any>( [] );
    const [ totalamountayear, settotalamountayear ] = useState<any>( [] );
    const [ totalAmountaday ] = useTotalOrderadayMutation();
    const [ totalAmountInRange, setTotalAmountInRange ] = useState( 0 );
    const [ chartTitle, setChartTitle ] = useState( "" );
    const [ total, setTotal ] = useState( 0 );
    console.log( totalAmountInRange );

    console.log( totalamountayear );

    const [ chartData, setChartData ] = useState( {
        labels: [],
        datasets: [
            {
                label: "Tổng số tiền",
                data: [],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    } );

    useEffect( () =>
    {
        if ( totalamountaday?.dailyTotals?.length > 0 )
        {
            // Gọi API để lấy dữ liệu từ backend
            const fetchData = async () =>
            {
                try
                {
                    const totals = {
                        startDate,
                        endDate,
                    };

                    const response = await totalAmountaday( totals ).unwrap();
                    console.log( response );

                    // Lấy dữ liệu từ backend và cập nhật biểu đồ
                    const { dailyTotals, totalAmountInRange } = response;

                    const dates = dailyTotals.map( ( item: any ) => item._id );
                    const amounts = dailyTotals.map( ( item: any ) => item.totalAmount );

                    setChartData( {
                        labels: dates,
                        datasets: [
                            {
                                label: "Tổng số tiền",
                                data: amounts,
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    } );
                    setTotalAmountInRange( totalAmountInRange ); // Cập nhật state với giá trị tổng tổng tiền
                    setTotal( totalAmountInRange );
                    setChartTitle( "Thống kê số lượng tiền trong khoảng" );
                } catch ( error )
                {
                    console.log( error );
                }
            };

            fetchData();
        } else if ( totaladay )
        {
            const total = totaladay.today ?? "";
            const totalss = totaladay.totalAmount;
            // Nếu không có totalamountaday hoặc totalamountayear,
            // và có dữ liệu từ totaladay, sử dụng dữ liệu từ totaladay
            setChartData( {
                labels: [ total ],
                datasets: [
                    {
                        label: "Tổng số tiền",
                        data: [ totalss ],
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            } );
            setTotal( totaladay.totalAmount );
        }
    }, [ totalamountaday, totaladay ] );



    const handleFilter = () =>
    {
        const totals = {
            startDate,
            endDate,
        };
        try
        {
            totalAmountaday( totals ).unwrap().then( ( res ) =>
            {
                console.log( res );
                settotalamountaday( res );
            } );
        } catch ( error )
        {
            console.log( error );
        }
    };

    return (
        <div>
            <div>
                <div className=" space-x-6 py-3">
                    <h1>Thống kê tiền theo khoảng thời gian hoặc ngày tháng cụ thể </h1>
                    <div className=" flex">
                        <RangePicker
                            value={ [ startDate, endDate ] }
                            onChange={ ( dates: any ) =>
                            {
                                if ( dates && dates.length === 2 )
                                {
                                    setStartDate( dates[ 0 ] );
                                    setEndDate( dates[ 1 ] );
                                } else
                                {
                                    setStartDate( null );
                                    setEndDate( null );
                                }
                            } }
                            className="w-64"
                        />
                        <div className="flex ml-4 space-x-2">
                            <i className="fa-solid fa-filter text-[#a8a8a8] pt-[10px]"></i>
                            <button onClick={ handleFilter }>Filter</button>
                        </div>

                    </div>
                </div>

                <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
                    <div className="pt-[30px] pl-[15px]">
                        <p className="text-[25px] text-[#23314B] font-semibold">
                            { total.toLocaleString() }
                        </p>
                        <h1 className="text-[25px] text-[#23314B] font-semibold">Tổng tiền </h1>
                    </div>
                </div>
                <Bar
                    data={ chartData }
                    options={ {
                        plugins: {
                            title: {
                                text: chartTitle,
                            },
                        },
                    } }
                />
            </div>
        </div>
    );
};

export default ChartPage2;
