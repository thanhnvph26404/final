import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DatePicker, Select } from "antd";

import { Link } from "react-router-dom";
import { useGetAllOrderQuery, useGetOrdersByIdMutation, useGetOrdersByStatusMutation, useUpdateOrderStatusMutation } from "../../../store/Auth/Auth.services";
import { IOrder, StatusOrder, enumStatus } from "../../../store/Auth/Auth.interface";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai"
import { TiEye } from "react-icons/ti";
import { toastError, toastSuccess } from "../../../hook/toastify";
const { RangePicker } = DatePicker;
const { Option } = Select;

const ListOrder = () =>
{
    const [ updateOrderStatus ] = useUpdateOrderStatusMutation();
    const [ editingRowId, setEditingRowId ] = useState( null );
    const [ editedStatus, setEditedStatus ] = useState( "" );
    const [ filteredOrders, setFilteredOrders ] = useState( [] );
    const [ allOrders, setAllOrders ] = useState( [] );
    const [ orderId, setOrderId ] = useState( "" );
    const [ selectedOrder, setSelectedOrder ] = useState<any>( [] );
    console.log( selectedOrder );

    const [ status, setStatus ] = useState( "" );
    const [ startDate, setStartDate ] = useState( null );
    const [ endDate, setEndDate ] = useState( null );
    const [ statusOrder ] = useGetOrdersByStatusMutation()
    const { data } = useGetAllOrderQuery( [] )
    const [ byorderId ] = useGetOrdersByIdMutation()
    const handleFindOrderById = async () =>
    {
        if ( !orderId )
        {
            setFilteredOrders( allOrders );
            setSelectedOrder( [] ); // Set selectedOrder thành một mảng rỗng
            return;
        }

        console.log( orderId );

        byorderId( { orderId } )
            .unwrap()
            .then( ( response ) =>
            {
                // Kiểm tra nếu response không phải là một mảng
                const updatedSelectedOrder = Array.isArray( response ) ? response : [ response ];
                setSelectedOrder( updatedSelectedOrder );
            } )
            .catch( ( error ) =>
            {
                toastError( error.data.message );
            } );
    };
    const handleFilter = () =>
    {
        const statusoder = {
            status,
            startDate,
            endDate,
        };

        // Nếu không có bất kỳ điều kiện nào được áp dụng, hiển thị tất cả đơn hàng
        if ( !status && !startDate && !endDate )
        {
            setFilteredOrders( allOrders );
            return;
        }

        // Xử lý lọc dữ liệu dựa trên điều kiện đã chọn
        statusOrder( statusoder )
            .unwrap()
            .then( ( res ) =>
            {
                toastSuccess( "Lọc thành công" );
                setFilteredOrders( res );
                setSelectedOrder( [] ); // Cập nhật selectedOrder thành một mảng rỗng

                // Lưu dữ liệu đơn hàng đã lọc vào state
            } );
    };
    const handleToggleEdit = ( id: any, status: any ) =>
    {
        if ( editingRowId === id )
        {
            // Nếu đang trong trạng thái edit, thực hiện cập nhật
            handleUpdateStatus( id, editedStatus );
            // Kết thúc chỉnh sửa
            setEditingRowId( null );
        } else
        {
            // Nếu không, chuyển sang trạng thái edit
            setEditedStatus( status );
            setEditingRowId( id );
        }
    };

    const handleUpdateStatus = async ( id: any, status: any ) =>
    {
        try
        {
            await updateOrderStatus( { id, status: editedStatus } ).unwrap().then();
        } catch ( error: any )
        {
            toastError( error.data.error )
        }
    };
    useEffect( () =>
    {
        if ( data )
        {
            setAllOrders( data?.Order || [] );
        }
    }, [ data ] );
    const columns: ColumnsType<IOrder> = [

        {
            title: "Mã đơn hàng",
            dataIndex: "paymentIntent",
            key: "paymentIntent",
            render: ( paymentIntent ) => <p>{ paymentIntent?.id }</p>,

        },
        {
            title: "Khách hàng",
            dataIndex: "userId",
            key: "userId",
            render: ( userId ) => <p>{ userId?.name }</p>,

        },
        {
            title: "SDT",
            dataIndex: "userId",
            key: "userId",
            render: ( userId ) => <p>{ userId?.phone }</p>,

        },
        {
            title: "Tổng tiền ",
            dataIndex: "paymentIntent",
            key: "paymentIntent",
            render: ( paymentIntent ) => <p>{ paymentIntent?.amount }</p>,

        }
        ,
        {
            title: "Ngày mua hàng ",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (update) => {
                const dateObject = new Date(update);
                const formattedDate = dateObject.toISOString().slice(0, 10);


                return (
                    <div className="text-sm text-gray-66 flex flex-col" >
                        <div className="">{formattedDate}</div>
                    </div >
                );
            },


        },
        {
            title: "Phương thức thanh toán ",
            dataIndex: "paymentStatus",
            key: "paymentStatus",


        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: ( status, record ) => (
                <div className="grid grid-cols-2">
                    <div>
                        <span className="" style={ { color: status === "Đã hủy" || status === "đang chờ được xử lý" ? "red" : "black" } }>
                        </span>
                        { editingRowId === record._id ? (
                            <select
                                value={ editedStatus }
                                onChange={ ( e ) => setEditedStatus( e.target.value ) }
                            >
                                { enumStatus.map( ( enumItem ) => (
                                    <option key={ enumItem } value={ enumItem }>
                                        { enumItem }
                                    </option>
                                ) ) }
                            </select>
                        ) : (
                            <span>{ status }</span>
                        ) }
                    </div>
                    <div>
                        <Button
                            type="primary"
                            className="bg-blue-500"
                            onClick={ () => handleToggleEdit( record._id, status ) }
                        >
                            { editingRowId === record._id ? "Update" : <AiFillEdit /> }
                        </Button>
                    </div>
                </div>
            ),
        },

        {
            title: "Hành động",
            key: "action",
            render: ( record ) => (
                <Space size="middle" className="w-12">

                    <Button type="primary"
                        className="bg-blue-500"
                    >

                        <Link to={ `/admin/orderss/${ record._id }` }><TiEye />
                        </Link>
                    </Button>
                </Space>
            ),
        },
    ];

    const displayOrders = selectedOrder.length > 0 ? selectedOrder : filteredOrders.length > 0 ? filteredOrders : allOrders;

    console.log( selectedOrder );

    return (
        <div className="mt-8 px-10"> {/* Sử dụng classes của Tailwind để thiết lập margin-top và padding-right */ }
            <div className="flex gap-4 items-center mb-4">
                <Select value={ status } onChange={ ( value ) => setStatus( value ) } className="w-48">
                    <Option value="">Tất cả trạng thái</Option>
                    {/* Thêm các Option cho các trạng thái từ mảng enumStatus */ }
                    { StatusOrder.map( ( statusItem ) => (
                        <Option key={ statusItem } value={ statusItem }>
                            { statusItem }
                        </Option>
                    ) ) }
                </Select>

                <RangePicker
                    onChange={ ( dates: any ) =>
                    {
                        if ( dates && dates.length === 2 )
                        {
                            setStartDate( dates[ 0 ] );
                            setEndDate( dates[ 1 ] );
                        } else
                        {
                            setStartDate( null );
                            setEndDate( null );
                        }
                    } }
                    className="w-64"
                />

                <Button onClick={ handleFilter } className="bg-blue-500 text-white">
                    Lọc
                </Button>

                <input
                    type="text"
                    placeholder="Nhập mã ID đơn hàng"
                    value={ orderId }
                    onChange={ ( e ) => setOrderId( e.target.value ) }
                    className="border border-gray-300 p-1 rounded"
                />

                <Button onClick={ handleFindOrderById } className="bg-blue-500 text-white">
                    Tìm đơn hàng
                </Button>
            </div>

            <Table
                className="bg-white"
                columns={ columns }
                dataSource={ displayOrders || [] }
                pagination={ { pageSize: 6 } }
                rowClassName={ ( record ) =>
                    record.status === 'Đã hủy' || record.status === 'đang chờ được xử lý' ? 'cancelled-row' : ''
                }
            />
        </div>
    );
};

export default ListOrder;
