import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useGetProductsQuery } from "../../../store/products/product.services";
import LineChart from "../../admin/chart/LineChart";
import PieChart from "../../admin/chart/Doughnut";
import { defaults } from "chart.js/auto";
import { useGetAllOrderQuery } from "../../../store/Auth/Auth.services";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface MonthlySales {
  [key: string]: number;
}

const ChartPage = () => {
  const { data: productChart } = useGetProductsQuery({
    gte:0,
    lte:1000000
  }); 
  console.log(productChart);
  
  const { data: OrderData } = useGetAllOrderQuery(null)
  console.log(OrderData);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(productChart?.products);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [successOrder, setSuccessOrders] = useState(0);
  const [inOrder, setInOrders] = useState(0);
  const [cancelOrder, setCancelOrders] = useState(0);
  const [displayMonths, setDisplayMonths] = useState(12);
  
  
  

  useEffect(() => {
    // Kiểm tra xem có dữ liệu OrderData không và có phải là mảng không
    if (Array.isArray(OrderData?.Order)) {
      // Lọc và đếm số đơn hàng thành công
      const successfulOrdersCount = OrderData.Order.filter(
        (order: any) => order.status === "Đã hoàn thành"
      ).length;

      const inOrdersCount = OrderData.Order.filter(
        (order: any) => order.status === "Đang xử lý"
      ).length;

      const cancelOrderCount = OrderData.Order.filter(
        (order: any) => order.status === "Đã hủy"
      ).length;
      
      

      // Cập nhật state successfulOrders
      setSuccessOrders(successfulOrdersCount);
      setInOrders(inOrdersCount);
      setCancelOrders(cancelOrderCount);
    }
  }, [OrderData]);



  const handleFilter = () => {
    const filteredData = productChart?.products?.filter((data: any) => {
      const date = new Date(data?.createdAt);
      return date >= new Date(startDate) && date <= new Date(endDate) ;
    });

    

    setFilteredData(filteredData);
    setIsFilterApplied(true);

    // Cập nhật giới hạn thời gian hiển thị
    const uniqueMonths = Array.from(
      new Set(filteredData.map((product: any) => {
        const date = new Date(product?.createdAt);
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      }))
    );
    const maxDisplayMonths = Math.min(uniqueMonths.length, 12);
    setDisplayMonths(maxDisplayMonths);
  };

  const monthlySales: MonthlySales = {};
  filteredData?.forEach((product: any) => {
    const date = new Date(product?.createdAt);
    
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthYear = `${month < 10 ? '0' : ''}${month}-${year}`;

    if (!monthlySales[monthYear]) {
      monthlySales[monthYear] = 0;
    }

    monthlySales[monthYear] += product.sold;
  });

  const monthlySalesArray = Object.entries(monthlySales);

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(productChart?.products);
    setIsFilterApplied(false);
    setDisplayMonths(12);
  };

  return (
    <div>
      <div className="flex space-x-6">
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{successOrder}</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đơn thành công </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{inOrder}</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đang xử lý </h1>
          </div>
        </div>
        <div className="mb-[40px] w-[250px] text-left h-[120px] bg-gray-200 rounded-xl">
          <div className="pt-[30px] pl-[15px]">
            <p className="text-[25px] text-[#23314B] font-semibold">{cancelOrder}</p>
            <h1 className="text-[25px] text-[#23314B] font-semibold">Đơn đã huỷ </h1>
          </div>
        </div>
      </div>

      <div className="">
        <div className="h-[500px] w-[1000px] mb-[50px]">
          <div className="flex space-x-6">
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex space-x-2">
              <i className="fa-solid fa-filter text-[#a8a8a8] pt-1"></i>
              <button onClick={handleFilter}>Filter</button>
              <button onClick={handleReset}>Tất cả</button>
            </div>
          </div>
          <Bar
            data={{
              labels: monthlySalesArray.slice(0, displayMonths).map(([monthYear]) => monthYear),
              datasets: [
                {
                  label: "Số Lượng Đơn ",
                  data: monthlySalesArray.slice(0, displayMonths).map(([, total]) => total),
                  backgroundColor: ["rgba(255, 0, 90, 1)"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: isFilterApplied ? "(Đã Lọc)" : "Thống kê số lượng đơn/tháng",
                },
              },
            }}
          />
        </div>
        <div className="h-[400px] w-[1000px] mb-[150px]">
          {/* Hiển thị biểu đồ LineChart */}
          <LineChart />
        </div>
      </div>
      <div>
        <div className="w-[400px]">
          {/* Hiển thị biểu đồ Doughnut */}
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
