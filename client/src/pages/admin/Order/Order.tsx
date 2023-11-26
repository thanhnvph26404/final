import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import { Link } from "react-router-dom";
import { useGetAllOrderQuery, useUpdateOrderStatusMutation } from "../../../store/Auth/Auth.services";
import { IOrder, enumStatus } from "../../../store/Auth/Auth.interface";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai"
import { TiEye } from "react-icons/ti";


const ListOrder = () =>
{
    const [ updateOrderStatus ] = useUpdateOrderStatusMutation();
    const [ editingRowId, setEditingRowId ] = useState( null );
    const [ editedStatus, setEditedStatus ] = useState( "" );




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
            await updateOrderStatus( { id, status: editedStatus } );
        } catch ( error )
        {

        }
    };
    const { data } = useGetAllOrderQuery( [] )
    console.log( data );
    const columns: ColumnsType<IOrder> = [

        {
            title: "mã đơn hàng",
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
            title: "ngày mua hàng ",
            dataIndex: "createdAt",
            key: "createdAt",


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
                  <span className="" style={ { color: status === "Đã hủy" || status === "Đã hoàn tiền" ? "red" : "black" } }>
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
            title: "tên sản phẩm",
            dataIndex: "products",
            key: "products",
            render: ( products ) => (
                <ul>
                    { products.map( ( product: any ) => (
                        <li key={ product._id }>{ product.product?.name }</li>
                    ) ) }
                </ul>
            ),
        },
        {
            title: "hành động",
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

    const ListProduct = data?.Order.map( ( item: any ) =>
    {
        return {
            key: item._id,
            ...item,

        };
    } );

    return (
        <div style={ { marginTop: 100, paddingRight: 50 } }>

            <Table
                style={ { backgroundColor: "white", marginTop: 100, } }
                columns={ columns }
                dataSource={ ListProduct }
                pagination={ { pageSize: 6 } }
                rowClassName={ ( record ) =>
                    record.status === "Đã hủy" || record.status === "Đã hoàn tiền" ? "cancelled-row" : ""
                }
            />
        </div>
    );
};

export default ListOrder;
