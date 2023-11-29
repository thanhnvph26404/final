import { Table } from "antd";
import { useParams } from "react-router-dom";
import { CheckCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { MdAttachMoney } from "react-icons/md";

import { InfoCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetOneOrderQuery } from "../../store/Auth/Auth.services";
import { Steps } from 'antd';

const { Step } = Steps;
const OrderDetail = () => {
    const { id } = useParams<{ id: any }>()
    const { data: orderData } = useGetOneOrderQuery(id)
    const [productDataForTable, setProductDataForTable] = useState<any[]>([]);
    console.log(orderData);
    const statusHistory = orderData?.statusHistory || [];

    // Tạo một mảng các bước (steps) từ lịch sử trạng thái
    const steps = statusHistory.map((historyItem, index) => (
        <Step
            key={index}
            title={historyItem.status}
            description={historyItem.updatedAt ? new Date(historyItem.updatedAt).toLocaleString() : ''}
            icon={historyItem.status === 'Đã hoàn thành' ? <CheckCircleOutlined /> : null || historyItem.status === 'Đã hủy' ? <CloseSquareOutlined /> : null}
        />
    ));

    // Sử dụng useEffect để xử lý dữ liệu khi orderData thay đổi
    useEffect(() => {
        if (orderData && orderData?.products) {
            console.log(orderData); // Check orderData structure
            console.log(orderData?.products); // Check products array
            // Lấy thông tin từ productInfo và cập nhật state để hiển thị trong bảng
            const productsInfo = orderData?.products.map((product: any) => ({
                key: product._id,
                category: product.productInfo.category,
                name: product.productInfo.name,
                price: product.productInfo.price,
                quantity: product.quantity,
                images: product.productInfo.images,


                // Thêm các thông tin khác cần hiển thị từ productInfo
                // Ví dụ: category, images, brand, ...
            }));
            console.log(productsInfo); // Check productsInfo before setting state
            setProductDataForTable(productsInfo);
        }
    }, [orderData]);



    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
        },

        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images: any) => (
                <div className="">
                    {/* {images.map((image: any, index: any) => ( */}
                    <img src={images[0]?.url} alt={`Product Image`} style={{ width: 100 }} />
                    {/* // ))} */}
                </div>
            ),
        },
        {
            title: 'Danh mục sản phẩm',
            dataIndex: 'category',
            key: "category",
            render: (category: any) => <p>{category.title}</p>,
        },
        {
            title: 'Bình Luận',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },

    ];

    return (
        <div>
            <h1 className="text-[27px] font-bold">Order</h1>
            {/* <div></div> */}
            <div className="flex auto-cols-auto mt-[20px] space-x-4 ">
                <div className="">
                    <h2 className="font-semibold text-[20px]">Product</h2>
                    <Table columns={columns} dataSource={productDataForTable} />
                    <div className="flex">
                        {/* dưới */}
                        <div className="mt-[50px] bg-white w-[320px] h-[380px]">
                            <div className="ml-[20px] mt-[10px]">
                                <h2 className="font-bold text-[20px]  "><i className="fa-solid fa-location-dot text-[#286FFD]"></i> Địa chỉ giao hàng</h2>
                                <hr className="border-1 border-black w-[320px] mt-2" />
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]  ">
                                <i className="fa-solid fa-house text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Address</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >{orderData?.userId?.address}</p>
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]  ">
                                <i className="fa-solid fa-house text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Địa chỉ thêm</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >{orderData?.Address}</p>
                            </div>



                        </div>
                        {/* dưới */}
                        {/* <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                            <div className="ml-[20px] mt-[10px]">
                                <h2 className="font-bold text-[20px]  "><i className="fa-solid fa-location-dot text-[#286FFD]"></i> Địa chỉ thanh toán</h2>
                                <hr className="border-1 border-black w-[320px] mt-2" />
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]  ">
                                <i className="fa-solid fa-house text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Address</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >{ orderData?.userId?.address }</p>
                            </div>


                        </div> */}
                        <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                            <div className="ml-[20px] mt-[10px]">
                                <h2 className="font-bold text-[20px] "><i className="fa-solid fa-truck text-[#286FFD]"></i> {orderData?.status}</h2>
                                <hr className="border-1 border-black w-[320px] mt-2" />
                            </div>
                            <div className="ml-[20px] mt-4">
                                <h3 className="font-semibold">Lịch sử trạng thái đơn hàng</h3>
                                <Steps direction="vertical" current={steps.length - 1}>
                                    {steps}
                                </Steps>
                            </div>
                            <div className="flex space-x-4 mt-4 ml-[20px]">
                                <i className="fa-solid fa-truck text-[#ababab] pt-[3px] "></i>
                                <p className="text-gray-500 font-semibold">Phương thức vận chuyển</p>
                            </div>
                            <div className=" mt-4 ml-[50px]">
                                <p className="text-[15px] text-black-500 font-bold" >{orderData?.shippingType}</p>
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
                        <p className="text-[15px] text-gray-500" >{orderData?.status}</p>

                    </div>
                    <div>
                        <div className="flex space-x-4 mt-4 ml-[20px]">
                            <i className="fa-solid fa-user text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Tên người đặt</p>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-gray-500" >{orderData?.userId?.name}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]  ">

                            <i className="fa-solid fa-envelope text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Email</p>

                            <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[209px] "></i>

                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-gray-500" >{orderData?.userId?.email}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]  ">

                            <i className="fa-solid fa-mobile text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Số điện thoại</p>

                            <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[158px] "></i>

                        </div>

                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >{orderData?.userId?.phone}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]  ">

                            <i className="fa-solid fa-money-bill text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Tổng tiền</p>

                            <i className="fa-solid fa-copy text-[#ababab] pt-[3px] pl-[180px] "></i>

                        </div>

                       
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >{orderData?.paymentIntent?.amount}đ</p>
                        </div>
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
                            <p className="text-[15px] text-black-500 font-bold" >{orderData?.paymentIntent?.id}</p>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]">
                            <i className="fa-solid fa-credit-card text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Phương thức thanh toán</p>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >{orderData?.paymentStatus}</p>
                        </div>

                    </div>

                    {/* dưới */}
                    {/* <div className="mt-[50px] bg-white w-[350px] h-[380px]">
                        <div className="ml-[20px] mt-[10px]">
                            <h2 className="font-bold text-[20px] "><i className="fa-solid fa-truck text-[#286FFD]"></i> { orderData?.status }</h2>
                            <hr className="border-1 border-black w-[320px] mt-2" />
                        </div>
                        <div className="ml-[20px] mt-4">
                            <h3 className="font-semibold">Lịch sử trạng thái đơn hàng</h3>
                            <Steps direction="vertical" current={ steps.length - 1 }>
                                { steps }
                            </Steps>
                        </div>
                        <div className="flex space-x-4 mt-4 ml-[20px]">
                            <i className="fa-solid fa-truck text-[#ababab] pt-[3px] "></i>
                            <p className="text-gray-500 font-semibold">Phương thức vận chuyển</p>
                        </div>
                        <div className=" mt-4 ml-[50px]">
                            <p className="text-[15px] text-black-500 font-bold" >{ orderData?.shippingType }</p>
                        </div>

                    </div> */}
                </div>



            </div>
        </div>
    )

}

export default OrderDetail