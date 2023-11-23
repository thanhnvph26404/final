import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Space, Table } from 'antd';
import Container from '../../components/layouts/website/Container';
import { useCancelOrderMutation, useGetOrderQuery, useUpdateOrderStatusMutation } from '../../store/Auth/Auth.services';
import { Link } from 'react-router-dom';
import { toastError, toastSuccess } from '../../hook/toastify';

const { Column } = Table;
const { Option } = Select;

const PurchaseHistory = () =>
{
    const { data: order, refetch } = useGetOrderQuery( [] );
    const [ selectedOrderId, setSelectedOrderId ] = useState( null );
    const [ cancelReason, setCancelReason ] = useState( '' );
    const [ updateStatus ] = useCancelOrderMutation();
    const [ isOrderCancelled, setIsOrderCancelled ] = useState( false );
    const [ updatestatus ] = useUpdateOrderStatusMutation()
    const [ isReceived, setIsReceived ] = useState( false );
    const [ showThankYouModal, setShowThankYouModal ] = useState( false );

    const handleReceivedOrder = async ( orderId: string ) =>
    {
        try
        {
            await updatestatus( { id: orderId, status: 'Đã nhận hàng' } )
                .unwrap()
                .then( ( response ) =>
                {
                    toastSuccess( 'Đã cập nhật trạng thái đơn hàng' );
                    refetch();
                    setIsReceived( true ); // Đã nhận hàng, disable các nút
                    setShowThankYouModal( true );

                } )
                .catch( ( error ) =>
                {
                    console.log( error );
                    toastError( error.data.error );
                } );
        } catch ( error )
        {
            console.error( 'Error:', error );
        }
    };
    const handleCancelOrder = async () =>   
    {
        if ( selectedOrderId && cancelReason )
        {
            const cancel = {
                id: selectedOrderId,
                reason: cancelReason,
            };

            await updateStatus( cancel )
                .unwrap()
                .then( ( response ) =>
                {
                    toastSuccess( 'Gửi yêu cầu thành công' );
                    refetch();
                    setSelectedOrderId( null );
                    setCancelReason( '' );
                    setIsOrderCancelled( true ); // Set state khi hủy thành công

                } ).catch( ( error ) =>
                {
                    console.log( error );
                    toastError( error.data.error );
                } );
        }
    };

    const [ showModal, setShowModal ] = useState( false );

    const handleOpenModal = ( orderId: any ) =>
    {
        setSelectedOrderId( orderId );
        setShowModal( true );
    };

    const handleCancel = () =>
    {
        setShowModal( false );
    };

    return (
        <Container>
            <div className=''>
                <div className=''>
                    <h1 className='text-3xl font-semibold'>Lịch sử mua hàng</h1>
                    <p className='text-gray-500'>Xem các đơn đặt hàng gần đây của bạn, tải xuống hóa đơn của bạn.</p>
                </div>

                { order?.Order?.map( ( order: any ) => (
                    <div key={ order._id } className='border border-gray-200 my-10 rounded-xl'>
                        <div className='flex justify-between i items-center'>
                            <div className='flex mx-4 my-3 w-[472px]'>
                                <div className=''>
                                    <p className='text-gray-500'>ID đơn hàng</p>
                                    <p>{ order._id || 'N/A' }</p>
                                </div>
                                <div className='ml-14 hidden md:block'>
                                    <p className='text-gray-500'>Ngày mua hàng</p>
                                    <p>{ order.createdAt }</p>
                                </div>
                                <div className='ml-14 hidden md:block'>
                                    <p className='text-gray-500'>Tổng</p>
                                    <p>{ order.totalAfterDiscount } VNĐ</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='px-5'>
                                    <Link to={ `/profile/orderDetail/${ order._id }` }>
                                        <Button type='primary' className='bg-black-400'>
                                            Xem hóa đơn
                                        </Button>
                                    </Link>
                                    <div className='py-2'>
                                        <Button
                                            type="primary"
                                            className="bg-red-400"
                                            onClick={ () => handleOpenModal( order._id ) }
                                            disabled={ isOrderCancelled || isReceived || order.status === 'Đã hủy' || order.status === "Đã nhận hàng" }
                                        >
                                            Hủy đơn hàng
                                        </Button>
                                        <Modal
                                            title='Chọn lý do hủy đơn hàng'
                                            visible={ showModal && selectedOrderId === order._id }
                                            onCancel={ handleCancel }
                                            footer={ [
                                                <Button key='cancel' onClick={ handleCancel }>
                                                    Hủy
                                                </Button>,
                                                <Button key='confirm' type='primary' onClick={ handleCancelOrder }>
                                                    Xác nhận
                                                </Button>,
                                            ] }
                                        >
                                            <Select
                                                defaultValue=''
                                                onChange={ ( value ) => setCancelReason( value ) }
                                                style={ { width: '100%' } }
                                                placeholder='Chọn lý do hủy đơn hàng'
                                            >
                                                <Option value='đổi địa chỉ'>Đổi địa chỉ</Option>
                                                <Option value='Change of mind'>Thay đổi ý kiến</Option>
                                                {/* Thêm các lý do khác vào đây */ }
                                            </Select>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='bg-gray-200' />
                        <div className='p-2'>
                            { order.status === 'Đã hủy' && order.cancelReason && (
                                <div>
                                    <p>Người dùng đã đồng ý hủy đơn hàng.</p>
                                    {/* Hiển thị thông báo hoặc thông tin khác cho người dùng */ }
                                </div>
                            ) }
                            { order.status === 'Đang giao hàng' && order.cancelReason && (
                                <div>
                                    <p>Người dùng không đồng ý hủy đơn hàng.</p>
                                    {/* Hiển thị thông báo hoặc thông tin khác cho người dùng */ }
                                </div>
                            ) }
                        </div>
                        <Table dataSource={ order.products || [] }>
                            <body className="" key={ order.products._id }>
                                <Column
                                    title="ảnh"
                                    dataIndex="img"
                                    key="img"
                                    render={ ( text, record: any ) => (
                                        <div>

                                            <img src={ record.productInfo.images[ 0 ]?.url } alt="" className='w-50 h-50' />
                                        </div>
                                    ) }
                                />
                                <Column
                                    title="Sản phẩm"
                                    dataIndex="name"
                                    key="name"
                                    render={ ( text, record: any ) => (
                                        <div>
                                            <p>{ record.product?.name }</p>

                                        </div>
                                    ) }
                                />
                                <Column title="Giá" dataIndex="price" key="price"
                                    render={ ( text, record: any ) => (
                                        <div>
                                            <p className=" bg-[#f83a3a] text-[8px] sm:text-xs font-semibold rounded-full text-white px-2 py-[3px]">{ record.productInfo.price }VNĐ</p>

                                        </div>
                                    ) }
                                />
                                <Column title="Trạng thái" dataIndex="status" key="status"
                                    render={ ( text, record: any ) => (
                                        <div>

                                            <p>{ order.status }</p>
                                        </div>
                                    ) }

                                />
                                <Column
                                    title="Hành động"
                                    key="action"
                                    render={ ( text, record: any ) => (
                                        <Button
                                            type="primary"
                                            onClick={ () => handleReceivedOrder( order._id ) }
                                            disabled={ record.status === 'Đã nhận hàng' || isReceived || order.status === 'Đã hủy' || order.status === "Đã nhận hàng" }
                                        >
                                            Đã nhận được hàng
                                        </Button>
                                    ) }
                                />



                            </body>
                        </Table>
                        <Modal
                            title="Cảm ơn bạn đã mua hàng"
                            visible={ showThankYouModal }
                            onCancel={ () => setShowThankYouModal( false ) }
                            footer={ [
                                <Button key="cancel" onClick={ () => setShowThankYouModal( false ) }>
                                    Đóng
                                </Button>,
                                <Button key="feedback" type="primary">
                                    <Link to="/feedback">Đến trang feedback</Link>
                                </Button>,
                            ] }
                        >
                            <p>Xin cảm ơn bạn đã mua hàng!</p>
                            <p>Bạn có thể chia sẻ đánh giá của mình tại trang feedback.</p>
                        </Modal>a

                    </div>
                ) ) }
            </div>
        </Container>
    );
}

export default PurchaseHistory;
