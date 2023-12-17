import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useTotalOrderadayMutation, useTotalOrderamonthMutation, useTotaladayQuery } from "../../../store/Order/Ordersevice";
import { Bar } from "react-chartjs-2";
import { Button, DatePicker, } from "antd";


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";
const { RangePicker } = DatePicker;


const ChartPage2 = () =>
{
    const [ startDate, setStartDate ] = useState( null );
    const { data: totaladay } = useTotaladayQuery( null )
    console.log( totaladay );
    const [ endDate, setEndDate ] = useState( null );
    const [ totalamountaday, settotalamountaday ] = useState<any>( [] )
    const [ totalamountayear, settotalamountayear ] = useState<any>( [] )
    const [ totalAmountaday ] = useTotalOrderadayMutation()
    const [ totalAmountInRange, setTotalAmountInRange ] = useState( 0 );
    const [ totalAmountAllMonths, settotalAmountAllMonths ] = useState( 0 )
    const [ chartTitle, setChartTitle ] = useState( "" );
    const [ total, setTotal ] = useState( 0 );
    console.log( totalAmountInRange );

    const [ startYear, setStartYear ] = useState( '' );
    const [ endYear, setEndYear ] = useState( '' );
    const [ totalAmountamonth ] = useTotalOrderamonthMutation()
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
                        endDate
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
                    setTotal( totalAmountInRange )
                    setChartTitle( "Thống kê số lượng tiền trong khoảng" );



                } catch ( error )
                {
                    console.log( error );
                }
            };

            fetchData();
        } else if ( totalamountayear?.result?.length > 0 )
        {
            // Gọi API để lấy dữ liệu từ backend
            const fetchData = async () =>
            {
                try
                {
                    const totals = {
                        startYear,
                        endYear
                    }

                    const response = await totalAmountamonth( totals ).unwrap();

                    const { result, totalAmountAllMonths } = response;
                    console.log( result );

                    const dates = result?.map( ( item: any ) => item.month );
                    const amounts = result?.map( ( item: any ) => item.totalAmount );

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
                    settotalAmountAllMonths( totalAmountAllMonths )
                    setTotal( totalAmountAllMonths )
                    setChartTitle( "Thống kê số lượng tiền tháng/năm" );

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
            setTotal( totaladay.totalAmount )
        }

    }, [ totalamountaday, totalamountayear, totaladay ] );


    const hanldeamountTotalyear = async () =>
    {
        const totals = {
            startYear,
            endYear
        }
        try
        {
            totalAmountamonth( totals ).unwrap().then( ( res ) =>
            {
                settotalamountayear( res )
                settotalamountaday( [] )
            } )
        } catch ( error )
        {
            console.log( error );

        }

    }
    const hanldeaday = () =>
    {
        settotalamountayear( [] )
        settotalamountaday( [] )
    }
    const handleFilter = () =>
    {
        const totals = {
            startDate,
            endDate
        }
        try
        {
            totalAmountaday( totals ).unwrap().then( ( res ) =>
            {
                console.log( res );
                settotalamountaday( res )
                settotalamountayear( [] )

            } )
        } catch ( error )
        {
            console.log( error );

        }

    };


    return (
        <div>
            <div>
                <div className=" space-x-6 py-3" >
                    <h1>Thống kê tiền theo khoảng thời gian hoặc ngày tháng cụ thể </h1>
                    <div className=" flex">
                        <RangePicker
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
                        <Button className="ml-3 bg-blue-500 text-white" type="primary" onClick={ hanldeaday }>Lấy ra ngày hiện tại</Button>
                    </div>
                </div>
                <div className="py-4" >
                    <h1>Thống kê tiền theo tháng theo năm </h1>
                    <div className=" flex">
                        <DatePicker
                            picker="month"
                            onChange={ ( date, dateString ) => setStartYear( dateString ) }
                        />
                        <DatePicker picker="month" onChange={ ( date, dateString ) => setEndYear( dateString ) } />
                        <div className="flex space-x-2 ml-5">
                            <i className="fa-solid fa-filter text-[#a8a8a8] pt-[10px]"></i>
                            <button onClick={ hanldeamountTotalyear }>Filter</button>
                        </div>
                    </div>

                </div>
                <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
                    <div className="pt-[30px] pl-[15px]">
                        <p className="text-[25px] text-[#23314B] font-semibold">{ total.toLocaleString() }</p>
                        <h1 className="text-[25px] text-[#23314B] font-semibold">Tổng tiền  </h1>
                    </div>
                </div>
                <Bar data={ chartData } options={ {
                    plugins: {
                        title: {
                            text: chartTitle,
                        },
                    },
                } } />
            </div>

        </div>
    )
}

export default ChartPage2