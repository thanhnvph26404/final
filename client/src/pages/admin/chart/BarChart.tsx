import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useGetProductsQuery } from "../../../store/products/product.services";
import LineChart from "../../admin/chart/LineChart";
import Doughnut from "../../admin/chart/Doughnut";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface MonthlySales {
  [key: string]: number;
}

const ChartPage = () => {
  const { data: productChart } = useGetProductsQuery(null);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(productChart?.products);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleFilter = () => {
    const filteredData = productChart?.products?.filter((data: any) => {
      const date = new Date(data?.createdAt);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    setFilteredData(filteredData);
    setIsFilterApplied(true);
  };

  const monthlySales: MonthlySales = {};
  filteredData?.forEach((product: any) => {
    const date = new Date(product?.createdAt);
    const monthYear = `${date.getFullYear()}`;

    if (!monthlySales[monthYear]) {
      monthlySales[monthYear] = 0;
    }

    monthlySales[monthYear] += product.sold * product.price;
  });

  const monthlySalesArray = Object.entries(monthlySales);

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(productChart?.products);
    setIsFilterApplied(false);
  };

  return (
    <div>
      <div className="flex">
        <div className="h-[500px] w-[600px]">
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
              labels: monthlySalesArray.map(([monthYear]) => monthYear),
              datasets: [
                {
                  label: "Tổng số tiền ",
                  data: monthlySalesArray.map(([, total]) => total),
                  backgroundColor: ["rgba(255, 0, 90, 1)"],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: isFilterApplied ? "Thống kê doanh số/năm (Đã Lọc)" : "Thống kê doanh số/năm",
                },
              },
            }}
          />
        </div>
        <div className="h-[400px] w-[600px]">
          {/* Hiển thị biểu đồ LineChart */}
          <LineChart />
        </div>
      </div>
      <div>
        <div className="w-[400px]">
          {/* Hiển thị biểu đồ Doughnut */}
          <Doughnut />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
