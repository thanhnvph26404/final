// import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import { Line } from "react-chartjs-2/dist/typedCharts";
// import { Line } from "react-chartjs-2";
import sourceData from '../../../data/revenueData.json'
// import sourceData1 from "../../data/sourceData.json"
import { useGetProductsQuery } from "../../../store/products/product.services"
import { useGetAllOrderQuery, useGetOrderQuery } from "../../../store/Auth/Auth.services";
import { IOrder } from "../../../store/Auth/Auth.interface";
import { useEffect, useState } from "react";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.text = "20px"
defaults.plugins.title.color = "black";

const ChartPage3 = () => {


    const { data: productChart } = useGetProductsQuery(null)
    // console.log(productChart);


    // const { data: OrderData } = useGetAllOrderQuery(null)
    // console.log(OrderData);

    const [uniqueMonths, setUniqueMonths] = useState(new Set());
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredData3, setFilteredData3] = useState(productChart?.products);

    const updateUniqueMonths = () => {
        const uniqueMonthsSet = new Set(
            productChart?.products?.map((data: any) => {
                const date = new Date(data?.createdAt);
                return date.toLocaleString('vi-VN', { month: 'long' });
            })
        );

        setUniqueMonths(uniqueMonthsSet);
    };

    useEffect(() => {
        updateUniqueMonths()
    }, [])
    const filteredData = productChart?.products?.filter((data: any) => {
        const date = new Date(data?.createdAt);
        return uniqueMonths.has(date.toLocaleString('vi-VN', { month: 'long' }));
    });


    const remainingQuantities: Record<string, number> = {};

    filteredData?.forEach((product: any) => {
        product.ProductVariants.forEach((variant: any) => {
            const key = `${variant.color} size ${variant.size}`;
            if (remainingQuantities[key] === undefined) {
                remainingQuantities[key] = variant.quantity;
            } else {
                remainingQuantities[key] += variant.quantity;
            }
        });
    });




    return (
        <div>
            <div>
                {/* <div className="flex space-x-6">
                    <input
                        type="date"

                    />
                    <input
                        type="date"

                    />
                    <div className="flex space-x-2">
                        <i className="fa-solid fa-filter text-[#a8a8a8] pt-1"></i>
                        <button >Filter</button>
                    </div>
                </div> */}
                <Doughnut
                    data={{
                        labels: Object.keys(remainingQuantities),
                        datasets: [
                            {
                                label: "Số lượng màu",
                                data: Object.values(remainingQuantities),
                                backgroundColor: [
                                    "rgba(110, 100, 25, 0.8)",
                                    "rgba(130, 97, 169, 1)",
                                    "rgba(234, 187, 169, 1)",
                                    "rgba(90, 187, 169, 1)",
                                    "rgba(255, 255, 0, 1)",
                                    "rgba(255, 0, 0, 1)",
                                    "rgba(255, 123, 50, 1)",
                                    "rgba(200, 123, 150, 1)",
                                    "rgba(90, 123, 150, 1)",

                                    // Thêm màu khác nếu cần
                                ],
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Số lượng màu và size",
                            },
                        },
                    }}
                />
            </div>

        </div>
    )
}

export default ChartPage3