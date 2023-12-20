import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import LineChart from "../../admin/chart/LineChart";
import { defaults } from "chart.js/auto";
import { useGetAllOrderQuery, useGetOrdersByStatusMutation } from "../../../store/Auth/Auth.services";
import { Button, DatePicker, Select } from "antd";
import { StatusOrder } from "../../../store/Auth/Auth.interface";
import { toastError, toastSuccess } from "../../../hook/toastify";
import dayjs from 'dayjs';
import { useProductsoldadayQuery, useTotalProductadayMutation, useTotalproductamonthMutation } from "../../../store/Order/Ordersevice";
import { useLocation } from "react-router-dom";
import Barchart1 from "./Barchartmonth";
import Topbuyer from "./Topbuyer";
import TopProduct from "./TopProduct";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";


const { RangePicker } = DatePicker;

const { Option } = Select;

const ChartPage = () =>
{
  const currentMonthStart = dayjs().startOf( "month" ); // Ngày đầu tiên của tháng hiện tại
  const currentMonthEnd = dayjs().endOf( 'month' );
  const location = useLocation();
  const { data: OrderData } = useGetAllOrderQuery( null )
  const [ startDate, setStartDate ] = useState<any>( dayjs() );
  const [ endDate, setEndDate ] = useState<any>( dayjs() );

  const [ successOrder, setSuccessOrders ] = useState( 0 );
  const [ inOrder, setInOrders ] = useState( 0 );
  const [ cancelOrder, setCancelOrders ] = useState( 0 );
  const [ dangxlOrder, setdangxlOrder ] = useState( 0 );
  const [ status, setStatus ] = useState( "" );
  const [ startDates, setStartDates ] = useState<any>( currentMonthStart );
  const [ endDates, setEndDates ] = useState<any>( currentMonthEnd );
  const [ statusOrder ] = useGetOrdersByStatusMutation()
  const [ filteredOrders, setFilteredOrders ] = useState<any>( [] );
  const [ totalproductaday, settotalproductaday ] = useState<any>( [] )
  const { data: productsold } = useProductsoldadayQuery( null )
  console.log( productsold );

  const [ totalProduct ] = useTotalProductadayMutation()
  const [ totalmonthProduct ] = useTotalproductamonthMutation()
  useEffect( () =>
  {
    handleFilters();
  }, [ startDates, endDates ] );

  useEffect( () =>
  {
    if ( Array.isArray( filteredOrders?.orders ) && filteredOrders?.orders?.length > 0 )
    {
      const successfulOrdersCount = filteredOrders?.orders.filter(
        ( order: any ) => order.status === "Đã hoàn thành"
      ).length;

      const inOrdersCount = filteredOrders?.orders.filter(
        ( order: any ) => order.status === "Đang xử lý"
      ).length;

      const cancelOrderCount = filteredOrders?.orders.filter(
        ( order: any ) => order.status === "Đã hủy"
      ).length;

      const dangxlOrderCount = filteredOrders?.orders.filter(
        ( order: any ) => order.status === "đang chờ được xử lý"
      ).length;
      setSuccessOrders( successfulOrdersCount );
      setInOrders( inOrdersCount );
      setCancelOrders( cancelOrderCount );
      setdangxlOrder( dangxlOrderCount );
    } else if ( Array.isArray( OrderData?.Order ) )
    {
      // If filteredOrders is empty or null, fall back to using OrderData
      const successfulOrdersCount = OrderData.Order.filter(
        ( order: any ) => order.status === "Đã hoàn thành"
      ).length;

      const inOrdersCount = OrderData.Order.filter(
        ( order: any ) => order.status === "Đang xử lý"
      ).length;

      const cancelOrderCount = OrderData.Order.filter(
        ( order: any ) => order.status === "Đã hủy"
      ).length;

      const dangxlOrderCount = OrderData.Order.filter(
        ( order: any ) => order.status === "đang chờ được xử lý"
      ).length;

      // Update the states
      setSuccessOrders( successfulOrdersCount );
      setInOrders( inOrdersCount );
      setCancelOrders( cancelOrderCount );
      setdangxlOrder( dangxlOrderCount );
    }
  }, [ location, OrderData, filteredOrders ] );

  const handleFilters = () =>
  {
    let statusoder: any = {
      status,
    };

    // Thêm điều kiện lọc theo thời gian nếu có giá trị trong RangePicker
    if ( startDates && endDates )
    {
      statusoder = {
        ...statusoder,
        startDates: dayjs( startDates ).startOf( 'day' ).toISOString(),
        endDates: dayjs( endDates ).endOf( 'day' ).toISOString(),
      };
    }
    // Nếu không có bất kỳ điều kiện nào được áp dụng, hiển thị tất cả đơn hàng
    if ( !status && !startDates && !endDates )
    {
      toastError( "không có đơn nào trong khoảng thời gian này " )
      setFilteredOrders( OrderData.Order )
      return;
    }
    console.log( statusoder );

    // Nếu không có bất kỳ điều kiện nào được áp dụng, hiển thị tất cả đơn hàng


    // Xử lý lọc dữ liệu dựa trên điều kiện đã chọn
    statusOrder( statusoder )
      .unwrap()
      .then( ( res ) =>
      {
        if ( Array.isArray( res ) && res.length === 0 )
        {
          // Handle case when res is an empty array
          toastError( "Không có đơn nào trong khoảng thời gian này" );
          setFilteredOrders( OrderData?.Order || [] ); // Fallback to OrderData if res is empty
        } else
        {
          // Update filteredOrders with the response
          toastSuccess( "Lọc thành công" );
          setFilteredOrders( res );
        }
      } )
      .catch( ( error ) =>
      {
        // Handle any errors that occurred during the request
        console.error( "Error filtering orders:", error );
        // You might want to handle this error case by setting filteredOrders to an empty array or handling it differently based on your needs
        toastError( "Đã xảy ra lỗi khi lọc đơn hàng" );
        setFilteredOrders( [] );
      } );
  };
  const [ chartData, setChartData ] = useState( {
    labels: [],
    datasets: [
      {
        label: "Số lượng sản phẩm ",
        data: [],
        backgroundColor: [ "rgba(255, 0, 90, 1)" ],
        barPercentage: 0.3, // Điều chỉnh chiều rộng của cột
        categoryPercentage: 0.5, // Chiều rộng của các nhóm cột
        borderRadius: 5,
        borderWidth: 1,

      },
    ],
  } );

  useEffect( () =>
  {
    if ( totalproductaday?.productsSoldPerDay?.length > 0 )
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

          const response = await totalProduct( totals ).unwrap();
          console.log( response );

          // Lấy dữ liệu từ backend và cập nhật biểu đồ
          const { productsSoldPerDay } = response;

          const dates = productsSoldPerDay.map( ( item: any ) => item.aday );
          const amounts = productsSoldPerDay.map( ( item: any ) => item.totalproductslod );

          setChartData( {
            labels: dates,
            datasets: [
              {
                label: "Số lượng sản phẩm",
                data: amounts,
                backgroundColor: [ "rgba(255, 0, 90, 1)" ],
                borderRadius: 5,
                borderWidth: 1,
                barPercentage: 0.3 /* Phần trăm thanh */,
                categoryPercentage: 0.5
              },
            ],
          } );


        } catch ( error )
        {
          console.log( error );
        }
      };

      fetchData();
    } else if ( productsold )
    {
      setChartData( {
        labels: [ productsold.today ?? "" ],
        datasets: [
          {
            label: "số lượng sản phẩm",
            data: [ productsold.totalProductsSoldToday ?? 0 ],
            backgroundColor: [ "rgba(255, 0, 90, 1)" ],
            borderRadius: 5,
            borderWidth: 1,
            barPercentage: 0.3 /* Phần trăm thanh */,
            categoryPercentage: 0.5
          },
        ],
      } );
    }
  }, [ location, totalproductaday, productsold ] );
  const handleFilter = () =>
  {



    // Thêm điều kiện lọc theo thời gian nếu có giá trị trong RangePicker

    const totals = {
      startDate: dayjs( startDate ).startOf( 'day' ).toISOString(),
      endDate: dayjs( endDate ).endOf( 'day' ).toISOString(),
    };
    console.log( totals );
    // Nếu không có bất kỳ điều kiện nào được áp dụng, hiển thị tất cả đơn hàng

    try
    {
      totalProduct( totals ).unwrap().then( ( res ) =>
      {
        console.log( res );
        settotalproductaday( res )

      } )
    } catch ( error )
    {
      console.log( error );

    }

  }




  return (
    <div>
      <div className="py-2">
        <Select value={ status } onChange={ ( value ) => setStatus( value ) } className="w-48">
          <Option value="">Tất cả trạng thái</Option>
          {/* Thêm các Option cho các trạng thái từ mảng enumStatus */ }
          { StatusOrder.map( ( statusItem ) => (
            <Option key={ statusItem } value={ statusItem }>
              { statusItem }
            </Option>
          ) ) }
        </Select>

        <RangePicker
          value={ [ startDates, endDates ] }
          onChange={ ( dates: any ) =>
          {
            if ( dates && dates.length === 2 )
            {
              setStartDates( dates[ 0 ] );
              setEndDates( dates[ 1 ] );
            } else
            {
              setStartDates( null );
              setEndDates( null );
            }
          } }
          className="w-64"
        />

        <Button onClick={ handleFilters } className="bg-blue-500 text-white">
          Lọc
        </Button></div>
      <div className="flex space-x-6">

        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{ successOrder }</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đơn thành công </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{ inOrder }</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đang xử lý </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{ cancelOrder }</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đơn đã huỷ </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{ dangxlOrder }</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đơn chờ xử lý </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{ filteredOrders.totalOrders ? filteredOrders.totalOrders : OrderData?.Order?.length ? OrderData?.Order?.length : "" }</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Tất cả đơn</h1>
          </div>
        </div>
      </div>
      <div className="h-[400px] w-[1000px] mb-[150px]">
        <h1 className="text-[25px] text-[#23314B] font-semibold">Thống kê tổng tiền theo ngày và tháng   </h1>
        <LineChart />
      </div>
      <div className="h-[400px] w-[1000px] mt-[500px] mb-[150px]">
        <h1 className="text-[25px] text-[#23314B] font-semibold">Thống kê tổng tiền theo tháng và năm </h1>
        <Barchart1 />
      </div>

      <div className="mt-[500px]">
        <h1 className="text-[25px] text-[#23314B] font-semibold">Thống kê số lượng sản phẩm theo ngày tháng năm</h1>
        <div className="h-[500px] w-[1000px]  mb-[50px]">
          <div className="flex space-x-6">
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
            <div className="flex space-x-2">

              <button onClick={ handleFilter }><i className="fa-solid fa-filter text-[#a8a8a8] pt-[10px]  pr-[1px]"></i> Lọc</button>

            </div>
          </div>
          <Bar data={ chartData } />
        </div>

      </div>

      <div>
        <div className=" py-30">
          {/* Hiển thị biểu đồ Doughnut */ }
          <Topbuyer />
        </div>
      </div>
      <div>
        <div className=" py-30">
          {/* Hiển thị biểu đồ Doughnut */ }
          <TopProduct />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;