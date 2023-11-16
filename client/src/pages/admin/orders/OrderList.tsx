import { Table, Skeleton, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { InfoCircleTwoTone } from "@ant-design/icons";

const OrderList = () => {


    interface DataType {

        key: string,
        name: string,
        code: string,
        discount: string,
        limit: number,
        startDate: string,
        endDate: string,
        status: string,

    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Giá gốc sản phẩm',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'limit',
            key: 'limit',
        },
        {
            title: 'Ảnh',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Bình Luận',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Số lượng',
            dataIndex: 'status',
            key: 'status',
        },

    ];

    return (
        <div>
            <h1 className="text-[27px] font-bold">Order</h1>
            {/* <div></div> */}
            <div className="flex auto-cols-auto mt-[20px] space-x-4">
                <div className="">
                    <h2 className="font-semibold text-[20px]">Product</h2>
                    <Table columns={columns} />
                    <div className="flex">
                        {/* dưới */}
                        <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                            <div className="ml-[20px] mt-[10px]">
                                <h2 className="font-bold text-[20px]  "><i className="fa-solid fa-location-dot text-[#286FFD]"></i> Địa chỉ giao hàng</h2>
                                <hr className="border-1 border-black w-[320px] mt-2" />
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]  ">
                                <i className="fa-solid fa-house text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Address</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >Hà Nội</p>
                            </div>


                        </div>
                        {/* dưới */}
                        <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                            <div className="ml-[20px] mt-[10px]">
                                <h2 className="font-bold text-[20px]  "><i className="fa-solid fa-location-dot text-[#286FFD]"></i> Địa chỉ thanh toán</h2>
                                <hr className="border-1 border-black w-[320px] mt-2" />
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]  ">
                                <i className="fa-solid fa-house text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Address</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >Hà Nội</p>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="mt-[10px] bg-white w-[350px] h-[380px]">
                    <div className="ml-[20px] mt-[10px]">
                        <h2 className="font-bold text-[20px] "><InfoCircleTwoTone /> Người đặt hàng</h2>
                        <hr className="border-1 border-black w-[320px] mt-2" />
                    </div>
                    <div className="flex space-x-4 mt-4 ml-[20px]">
                        <i className="fa-solid fa-cart-shopping text-[#ababab] pt-[3px] "></i>
                        <p className="text-gray-500 font-semibold">Order Status</p>
                    </div>
                    <div className=" mt-4 ml-[50px]">
                        <select name="" id="" className="border-2 rounded-sm h-[30px] w-[200px]">
                            <option value="">Processing</option>
                            <option value="">Processing</option>
                        </select>
                    </div>
                    <div className="flex space-x-4 mt-4 ml-[20px]">
                        <i className="fa-solid fa-user text-[#ababab] pt-[3px] "></i>
                        <p className="text-gray-500 font-semibold">Tên người đặt</p>
                    </div>
                    <div className=" mt-4 ml-[50px]">
                        <p className="text-[15px] text-gray-500" >Nguyễn Văn A</p>
                    </div>
                    <div className="flex space-x-4 mt-4 ml-[20px]  ">

                        <i className="fa-solid fa-envelope text-[#ababab] pt-[3px] "></i>
                        <p className="text-gray-500 font-semibold">Email</p>

                        <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[209px] "></i>

                    </div>
                    <div className=" mt-4 ml-[50px]">
                        <p className="text-[15px] text-gray-500" >nva@gmail.com</p>
                    </div>
                    <div className="flex space-x-4 mt-4 ml-[20px]  ">

                        <i className="fa-solid fa-mobile text-[#ababab] pt-[3px] "></i>
                        <p className="text-gray-500 font-semibold">Số điện thoại</p>

                        <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[165px] "></i>

                    </div>
                    <div className=" mt-4 ml-[50px]">
                        <p className="text-[15px] text-black-500 font-bold" >0123456789</p>
                    </div>
                    {/* dưới */}
                    <div className="mt-[50px] bg-white w-[350px] h-[200px]">
                        <div className="ml-[20px] mt-[10px]">
                            <h2 className="font-bold text-[20px] "><i className="fa-solid fa-money-bill text-[#286FFD]"></i> Payment</h2>
                            <hr className="border-1 border-black w-[320px] mt-2" />
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]  ">
                            <i className="fa-solid fa-file-lines text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">ID</p>
                            <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[235px] "></i>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >123456789</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]">
                            <i className="fa-solid fa-credit-card text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Phương thức thanh toán</p>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >VISA</p>
                        </div>

                    </div>

                    {/* dưới */}
                    <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                        <div className="ml-[20px] mt-[10px]">
                            <h2 className="font-bold text-[20px] "><i className="fa-solid fa-truck text-[#286FFD]"></i> Đang chuyển hàng</h2>
                            <hr className="border-1 border-black w-[320px] mt-2" />
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]  ">
                            <i className="fa-solid fa-file-lines text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Shipping ID</p>
                            <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[175px] "></i>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >SHP123456789</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]">
                            <i className="fa-solid fa-truck text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Phương thức thanh toán</p>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >nhanh</p>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    )

}

export default OrderList