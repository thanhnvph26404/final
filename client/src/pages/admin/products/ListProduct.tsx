import { Space, Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../store/products/product.services";
import { Iproductdata } from "../../../store/products/product.interface";
import { EyeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toastError } from "../../../hook/toastify";

const ListProduct = () =>
{
    const location = useLocation()
    const { data: products, isLoading, refetch } = useGetProductsQuery( {
        gte: 0, // Assuming value[0] contains the minimum price
        lte: 10000000, // Assuming value[1] contains the maximum price
    } )
    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                // Gọi hàm refetch để tải lại dữ liệu giỏ hàng
                await refetch();
                // Dữ liệu giỏ hàng đã được cập nhật
            } catch ( error: any )
            {
                toastError( error.data.error )   // Xử lý lỗi nếu có
            }
        };

        fetchData(); // Gọi hàm fetchData khi location.pathname thay đổi
    }, [ location.pathname, refetch ] );
    const [ remove ] = useDeleteProductMutation()

    const [ data, setdata ] = useState();
    useEffect( () =>
    {
        if ( products?.products?.length )
        {
            const newproducts = products?.products?.slice().reverse() // sắp xếp lại mảng
            const data1: any = newproducts.map( ( item: any ) =>
            {
                const count = item.ProductVariants.reduce( ( accumulator: any, currentValue: any ) =>
                {
                    return accumulator + currentValue.quantity
                }, 0 )
                console.log( count );

                return {
                    key: item._id,
                    sanpham: {
                        id: item._id,
                        image: item.images[ 0 ],
                        name: item.name
                    },
                    soluong: count,
                    ...item
                }

            } );
            setdata( data1 )
        }
    }, [ isLoading, refetch ] )

    const removeProduct = ( id: string ) =>
    {
        remove( id )

    };


    const columns: ColumnsType<Iproductdata> = [
        {
            title: " sản phẩm",
            dataIndex: "sanpham",
            key: "sanpham",
            render: ( sanpham ) => (
                <div className="flex w-[100px] items-center">
                    <img src={ sanpham.image.url } alt={ `Product Image` } style={ { width: 50 } } />
                    <div className=" flex flex-col justify-between">
                        <p className="line-clamp-2 text-base overflow-hidden">
                            { sanpham.name }

                        </p>
                        <span className="text-sm  overflow-hidden  text-gray-66 ">
                            { "ID:" + sanpham.id }

                        </span>

                    </div>
                </div>

            ),
        },
        {
            title: "Số lượng",
            dataIndex: "soluong",
            key: "soluong",
            render: ( number ) => <p className="ml-3">{ number?.toLocaleString() }</p>,

        },

        {
            title: "Giá  gốc",
            dataIndex: "price",
            key: "price",
            render: ( number ) => <p>{ number?.toLocaleString() }đ</p>,

        },
        {
            title: "Giá  giảm",
            dataIndex: "original_price",
            key: "original_price",
            render: ( number ) => <p>{ number?.toLocaleString() }đ</p>,
        }
        ,
        {
            title: "Đã cập nhập",
            dataIndex: "updatedAt",
            key: "update",
            render: ( update ) => <div className="text-sm text-gray-66 flex flex-col">
                <div className=""> { update.slice( 0, 10 ) }</div>
                <div className="">   { update.slice( 11, 16 ) }</div>

            </div>,
        }
        ,
        {
            title: "Hành động",
            key: "action",
            render: ( record ) => (
                <Space size="small" className="w-10">
                    <Link to={ `productDetailAdmin/${ record._id }` }>
                        <EyeFilled className="text-[20px]" />
                    </Link>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={ () => removeProduct( record._id ) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger><MdDelete />
                        </Button>
                    </Popconfirm>
                    <Button type="primary"
                        className="bg-blue-500"
                    >


                        <Link to={ `/admin/product/${ record._id }` }><MdEdit />
                        </Link>
                    </Button>
                </Space>
            ),
        },
    ];



    return (
        <div style={ { marginTop: 100, paddingRight: 50 } }>
            <Button type="primary" className="bg-blue-500" style={ { marginBottom: 30 } }>
                <Link to={ "/admin/products/add" }>Thêm Sản Phẩm</Link>
            </Button>
            <Table
                style={ { backgroundColor: "white", marginTop: 100, } }
                columns={ columns }
                dataSource={ data }
                pagination={ { pageSize: 6 } }
            />
        </div>
    );
};

export default ListProduct;
