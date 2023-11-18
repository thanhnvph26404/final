import React from 'react';
import { Button, Space, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Container from '../../components/layouts/website/Container';
import { useGetAllOrderQuery, useGetOrderQuery } from '../../store/Auth/Auth.services';
import { IOrder } from '../../store/Auth/Auth.interface';

const { Column } = Table;

const PurchaseHistory = () => {
    const { data: order } = useGetOrderQuery();

    // React.useEffect(() => {
    console.log(order);
    // }, [orderData]);

    // if (isLoading) {
    //     return <p>Đang tải...</p>;
    // }

    // if (isError) {
    //     return <p>Lỗi khi truy xuất dữ liệu</p>;
    // }

    return (
        <Container>
            <div className=''>
                <div className=''>
                    <h1 className='text-3xl font-semibold'>Lịch sử mua hàng</h1>
                    <p className='text-gray-500'>Xem các đơn đặt hàng gần đây của bạn, tải xuống hóa đơn của bạn.</p>
                </div>

                {order?.Order?.map((order: any) => (
                    <div key={order._id} className='border border-gray-200 my-10 rounded-xl'>
                        <div className='flex justify-between i items-center'>
                            <div className='flex mx-4 my-3 w-[472px]'>
                                <div className=''>
                                    <p className='text-gray-500'>ID đơn hàng</p>
                                    <p>{order._id || 'N/A'}</p>
                                </div>
                                <div className='ml-14 hidden md:block'>
                                    <p className='text-gray-500'>Ngày mua hàng</p>
                                    <p>{order.createdAt}</p>
                                </div>
                                <div className='ml-14 hidden md:block'>
                                    <p className='text-gray-500'>Tổng</p>
                                    <p>{order.totalAfterDiscount} VNĐ</p>
                                </div>
                            </div>
                            <div className='px-5'>
                                <Button type="primary" className='bg-black-400'>Xem hóa đơn</Button>
                            </div>
                        </div>
                        <hr className='bg-gray-200' />

                        <Table dataSource={order.products || []}>
                            <body className="" key={order.products._id}>
                                <Column
                                    title="ảnh"
                                    dataIndex="img"
                                    key="img"
                                    render={(text, record: any) => (
                                        <div>

                                            <img src={record.product.images[0]?.url} alt="" className='w-50 h-50' />
                                        </div>
                                    )}
                                />
                                <Column
                                    title="Sản phẩm"
                                    dataIndex="name"
                                    key="name"
                                    render={(text, record: any) => (
                                        <div>
                                            <p>{record.productInfo.name}</p>

                                        </div>
                                    )}
                                />
                                <Column title="Giá" dataIndex="price" key="price"
                                    render={(text, record: any) => (
                                        <div>
                                            <p className=" bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">{record.productInfo.price}VNĐ</p>

                                        </div>
                                    )}
                                />
                                <Column title="Trạng thái" dataIndex="status" key="status"
                                    render={(text, record: any) => (
                                        <div>

                                            <p>{order.status}</p>
                                        </div>
                                    )}

                                />

                                {/* <Column
                                title="Chi tiết"
                                key="action"
                                render={() => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            className="bg-blue-600 hidden md:block"
                                            icon={<DownloadOutlined />}
                                        >
                                            Tải xuống
                                        </Button>
                                        <Button
                                            type="primary"
                                            className="bg-blue-600 md:hidden block"
                                            icon={<DownloadOutlined />}
                                        />
                                    </Space>
                                )}
                            /> */}
                            </body>
                        </Table>

                    </div>
                ))}
            </div>
        </Container>
    );
}

export default PurchaseHistory;
