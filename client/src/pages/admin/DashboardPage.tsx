// import React from 'react'
import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import LineChart from '../../pages/admin/chart/LineChart'
import Doughnut from '../../pages/admin/chart/Doughnut'
import BarChart from '../../pages/admin/chart/BarChart'
import { useGetAllOrderQuery } from "../../store/Auth/Auth.services";


defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.text = "20px"
defaults.plugins.title.color = "black";

const DashboardPage = () => {

  // const [customerCount, setCustomerCount] = useState(0);
  // const { data: users } = useGetUserListQuery([]);
  // console.log(users);

  // const userAccounts = users.filter((user:any) => user.role === "User");

  // // Đếm số lượng tài khoản người dùng
  // const numberOfUserAccounts = userAccounts.length;

  // console.log("Số tài khoản người dùng: ", numberOfUserAccounts);

  // const { data: OrderData } = useGetAllOrderQuery(null)
  // console.log(OrderData);

  

  return (
    <div>
      <div>

      </div>

      <div>
        <div className="flex">
          <div className="h-[400px] w-[600px]">
            <BarChart />

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


    </div>
  )
}

export default DashboardPage