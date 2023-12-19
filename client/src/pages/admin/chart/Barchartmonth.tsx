import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useTotalOrderamonthMutation } from "../../../store/Order/Ordersevice";
import { Bar } from "react-chartjs-2";
import { DatePicker, } from "antd";
import dayjs from "dayjs";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";


const Barchart1 = () =>
{
    const currentYearStart = `${ dayjs().year() }-01`; // Chuỗi đại diện cho tháng đầu tiên của năm hiện tại
    const currentYearEnd = `${ dayjs().year() }-12`; // Chuỗi đại diện cho tháng cuối cùng của năm hiện tại

    const [ startYear, setStartYear ] = useState( currentYearStart );
    const [ endYear, setEndYear ] = useState( currentYearEnd );

    const [ totalamountayear, settotalamountayear ] = useState<any>( [] );
    const [ chartTitle, setChartTitle ] = useState( "" );
    const [ total, setTotal ] = useState( 0 );

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
        if ( totalamountayear?.result?.length > 0 )
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
                    setTotal( totalAmountAllMonths )
                    setChartTitle( "Thống kê số lượng tiền tháng/năm" );

                } catch ( error )
                {
                    console.log( error );
                }
            };

            fetchData();
        }

    }, [ totalamountayear ] );

    useEffect( () =>
    {
        hanldeamountTotalyear()
    }, [ startYear, endYear ] )
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
            } )
        } catch ( error )
        {
            console.log( error );

        }

    }




    return (
        <div>
            <div>

                <div className="py-4" >
                    <h1>Thống kê tiền theo tháng và theo năm </h1>
                    <div className=" flex">
                        <DatePicker
                            value={ dayjs( startYear, "YYYY-MM" ) }
                            picker="month"
                            onChange={ ( date, dateString ) => setStartYear( dateString ) }
                        />
                        <DatePicker
                            value={ dayjs( endYear, "YYYY-MM" ) }
                            picker="month"
                            onChange={ ( date, dateString ) => setEndYear( dateString ) }
                        />

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

export default Barchart1