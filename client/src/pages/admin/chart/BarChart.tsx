// import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import { Line } from "react-chartjs-2/dist/typedCharts";
// import { Line } from "react-chartjs-2";
import sourceData from '../../../data/revenueData.json'
// import sourceData1 from "../../data/sourceData.json"
import { useGetProductsQuery } from "../../../store/products/product.services"
import { useGetAllOrderQuery, useGetOrderQuery } from "../../../store/Auth/Auth.services";
// import { IOrder } from "../../../store/Auth/Auth.interface";
import LineChart from '../../admin/chart/LineChart'
import Doughnut from '../../admin/chart/Doughnut'


defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.text = "20px"
defaults.plugins.title.color = "black";

const ChartPage = () => {


    const { data: productChart } = useGetProductsQuery(null)
    // console.log(productChart);

    // const { data: OrderData } = useGetAllOrderQuery(null)
    // console.log(OrderData);




    return (
        <div>
            <div className="flex">
                <div className="h-[500px] w-[600px]">
                    <Bar 
                        data={{
                            labels: productChart?.products?.map((data:any) => data?.updatedAt),
                            datasets: [
                                {
                                    label: "Số sản phẩm bán được/tháng",
                                    data: productChart?.products?.map((data: any) => data?.sold),
                                    backgroundColor: [
                                        "rgba(255, 0, 90, 1)",

                                    ],
                                    borderRadius: 5,
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
                <div className="h-[400px] w-[600px]">
                    <LineChart />
                </div>
            </div>
            <div>
                <div className=" w-[400px]">
                    <Doughnut />
                </div>
            </div>


        </div>
    )
}

export default ChartPage