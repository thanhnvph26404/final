import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { useGetProductsQuery } from "../../../store/products/product.services"
import { useGetAllOrderQuery, useGetOrderQuery } from "../../../store/Auth/Auth.services";


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.text = "20px"
defaults.plugins.title.color = "black";

interface MonthlySales {
    [key: string]: number;
}

const ChartPage2 = () => {


    const { data: productChart } = useGetProductsQuery(null)
    // console.log(productChart);

   

    const [uniqueMonths, setUniqueMonths] = useState(new Set());
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
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

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
            <div>
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
                <Line className=" "
                    data={{
                        labels: monthlySalesArray.map(([monthYear]) => monthYear),
                        datasets: [
                            {
                                label: "Tổng số tiền ",
                                data: monthlySalesArray.map(([, total]) => total),
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",

                                ],
                                // borderRadius: 5,
                            },

                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: isFilterApplied ? "Thống kê doanh số/tháng (Đã Lọc)" : "Thống kê doanh số/tháng",

                            },
                        },
                    }}
                />
            </div>

        </div>
    )
}

export default ChartPage2