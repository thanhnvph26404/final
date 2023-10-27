import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Container from '../../components/layouts/website/Container';
const { Column, ColumnGroup } = Table;

interface DataType
{
    key: React.Key;
    image: string;
    product: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        image: 'image',
        product: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: [ 'nice' ],
    },
    {
        key: '2',
        image: 'image',
        product: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: [ 'nice' ],
    },

];

const PurchaseHistory = () =>
{
    return (
        <Container>
            <div className='' >
                <div className=''>
                    <h1 className='text-3xl font-semibold'>Lịch sử mua hàng</h1>
                    <p className='text-gray-500'>Xem các đơn đặt hàng gần đây của bạn, tải xuống hóa đơn của bạn.</p>
                </div>

                <div className='border border-gray-200 my-10 rounded-xl  '>
                    <div className='flex justify-between items-center'>
                        <div className='flex mx-4 my-3 w-[472px]'>
                            <div className=''>
                                <p className='text-gray-500'>ID đơn hàng</p>
                                <p >1</p>
                            </div>
                            <div className='ml-14 hidden md:block'>
                                <p className='text-gray-500'>Ngày mua hàng</p>
                                <p>2-10-2023</p>
                            </div>
                            <div className='ml-14 hidden md:block'>
                                <p className='text-gray-500'>Tổng</p>
                                <p>2.000.000 VNĐ</p>
                            </div>
                        </div>
                        <div className='px-5'>
                            <Button type="primary" className='bg-black-400'>Xem hóa đơn</Button>
                        </div>
                    </div>
                    <hr className='bg-gray-200' />

                    <Table dataSource={ data }>

                        <Column
                            title="Sản phẩm"
                            dataIndex="image"
                            key="image"

                        />

                        <Column title="Giá" dataIndex="age" key="age" />
                        <Column
                            title="Trạng thái"
                            dataIndex="tags"
                            key="tags"

                        />
                        <Column
                            title="Ngày"
                            dataIndex="address"
                            key="address" />
                        <Column

                            title="Chi tiết"
                            key="action"
                            render={ () => (
                                <Space size="middle">

                                    <Button
                                        type="primary"
                                        className="bg-blue-600 hidden md:block"
                                        icon={ <DownloadOutlined /> }
                                    >
                                        Tải xuống
                                    </Button>
                                    <Button
                                        type="primary"
                                        className="bg-blue-600 md:hidden block  "
                                        icon={ <DownloadOutlined /> }
                                    >

                                    </Button>
                                </Space>

                            ) }
                        />
                    </Table>
                </div>




            </div>
        </Container>
    )


}

export default PurchaseHistory;