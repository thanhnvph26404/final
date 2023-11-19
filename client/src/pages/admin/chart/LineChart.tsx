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

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.text = "20px"
defaults.plugins.title.color = "black";

const ChartPage2 = () => {


    const { data: productChart } = useGetProductsQuery(null)
    // console.log(productChart);

    const { data: OrderData } = useGetAllOrderQuery(null)
    // console.log(OrderData);
   



    return (
        <div>
            <div>
                <Line className=" "
                    data={{
                        labels: OrderData?.Order?.map((data:any) => data?.updatedAt),
                        datasets: [
                            {
                                label: "Tổng số tiền bán được/tháng",
                                data: OrderData?.Order?.map((data: any) => data.paymentIntent?.amount),
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
                                text: "Bảng thống kê",

                            },
                        },
                    }}
                />
            </div>

        </div>
    )
}

export default ChartPage2