import { Space, Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../store/products/product.services";
import { Iproductdata } from "../../../store/products/product.interface";
import { EyeFilled } from "@ant-design/icons";




const ListProduct = () =>
{

    const { data } = useGetProductsQuery( [] )
    const [ remove ] = useDeleteProductMutation()
    console.log( data );



    const removeProduct = ( id: string ) =>
    {
        remove( id )

    };

    const columns: ColumnsType<Iproductdata> = [
        {
            title: "Ảnh sản phẩm",
            dataIndex: "images",
            key: "images",
            render: ( images ) => (
                <div className="">
                    {/* {images.map((image: any, index: any) => ( */ }
                    <img src={ images[ 0 ]?.url } alt={ `Product Image` } style={ { width: 100 } } />
                    {/* // ))} */ }
                </div>
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: ( text ) => <p>{ text }</p>,
        },
        {
            title: "Giá  gốc",
            dataIndex: "price",
            key: "price",
            render: ( number ) => <p>{ number.toLocaleString() }đ</p>,

        },
        {
            title: "Giá  giảm",
            dataIndex: "original_price",
            key: "original_price",
            render: ( number ) => <p>{ number.toLocaleString() }đ</p>,
        }
        ,
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            render: ( category ) => <p>{ category.title }</p>,


        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            render: ( brand ) => <p>{ brand?.title }</p>,


        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: ( text ) => <div >{ text }</div>,
        },
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

    const ListProduct = data?.products?.map( ( item: any ) =>
    {
        return {
            key: item._id,
            ...item,

        };
    } );

    return (
        <div style={ { marginTop: 100, paddingRight: 50 } }>
            <Button type="primary" className="bg-blue-500" style={ { marginBottom: 30 } }>
                <Link to={ "/admin/products/add" }>Thêm Sản Phẩm</Link>
            </Button>
            <Table
                style={ { backgroundColor: "white", marginTop: 100, } }
                columns={ columns }
                dataSource={ ListProduct }
                pagination={ { pageSize: 6 } }
            />
        </div>
    );
};

export default ListProduct;
