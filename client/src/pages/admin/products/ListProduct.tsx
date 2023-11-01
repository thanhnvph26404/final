import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";




import { Space, Table, Popconfirm, Skeleton } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Image } from "../../../store/upload/upload.interface";
import { useDeleteProductMutation, useGetProductsQuery, useProductVariantQuery } from "../../../store/products/product.services";
import { Iproductdata } from "../../../store/products/product.interface";
import { toastError, toastSuccess } from "../../../hook/toastify";
import { useEffect, useState } from "react";


const ProductList = () =>
{

    const {
        data: product,
        isLoading: isCategoryListLoading,
    } = useGetProductsQuery( [] );
    const {
        data: productss,
    } = useProductVariantQuery();
    console.log( productss );



    const [ deleteproductApi, { isError: isDeleteCategoryError } ] =
        useDeleteProductMutation();
    const combineData = () =>
    {
        if ( product && productss )
        {
            return product?.products?.map(
                ( { _id, name, imgUrl, price, brand, category, ProductVariants }: Iproductdata ) => ( {
                    key: _id || "",
                    name,
                    price,
                    brand,
                    category: category,
                    ProductVariants,
                    image: { uid: imgUrl?.uid || "", url: imgUrl?.url || "" },
                } )
            );
        }
        return [];
    };

    const confirm = async ( id: string ) =>
    {
        try
        {
            await deleteproductApi( id )
                .unwrap()
                .then( () =>
                {
                    toastSuccess( "Xóa sản phẩm thành công" );
                } );
        } catch ( error )
        {
            if ( isDeleteCategoryError )
            {
                toastError( "Xoá sản phẩm  thất bại!" );
            }
        }
    };

    const dataSource = combineData();


    const columns: ColumnsType<Iproductdata> = [
        {
            title: "Tên sản phẩm ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "giá tiền ",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Thương hiệu  ",
            dataIndex: "brand",
            key: "brand",
            render: ( brand ) => brand?.title

        },
        {
            title: "danh mục ",
            dataIndex: "category",
            key: "category",
            render: ( category ) => category?.title
        },
        {
            title: "biến thể  ",
            dataIndex: "ProductVariants",
            key: "ProductVariants",
        },
        {
            title: "Ảnh ",
            dataIndex: "image",
            key: "image",
            render: ( image: Image ) => (
                <div className="h-11 w-11 overflow-hidden ">
                    <img className="" src={ image?.url || "" } alt="img" />
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: ( { key: id }: { key: any } ) => (
                <Space size="middle">
                    <Link to={ `edit/${ id }` }>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>

                    <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa sản phẩm này?"
                        onConfirm={ () => confirm( id ) }
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <FaTrashCan className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-2xl font-semibold text-[#1D1F2C]">
                    Sản phẩm
                </h1>
                <Link
                    to={ "add" }
                    className="flex items-center bg-[#1D1F2C] px-3.5 py-2.5 rounded-lg"
                >
                    <AiOutlinePlus className="text-base font-semibold text-white mr-1" />
                    <p className="text-sm font-semibold text-white">
                        Thêm sản phẩm
                    </p>
                </Link>
            </div>
            { isCategoryListLoading ? (
                <Skeleton active paragraph={ { rows: 7 } } />
            ) : (
                <Table columns={ columns } dataSource={ dataSource || [] } />
            ) }
        </div>
    );
};

export default ProductList;
