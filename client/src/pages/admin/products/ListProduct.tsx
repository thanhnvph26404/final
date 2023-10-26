import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../store/products/product.services";
import { Iproductdata } from "../../../store/products/product.interface";




const ListProduct = () => {

    const { data } = useGetProductsQuery()
    console.log(data);


    const removeProduct = (id: string) => {
        console.log(id);

    };

    const columns: ColumnsType<Iproductdata> = [
        {
            title: "ảnh sản phẩm",
            dataIndex: "imgUrl",
            key: "imgUrl",
            render: (text) => <p>{text}</p>,
            // render: (imgUrls) => <img src={imgUrls[0]} alt="" style={{ width: 100 }} />,
        },
        {
            title: "tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Giá đã giảm",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giá gốc",
            dataIndex: "original_price",
            key: "original_price",
            render: (text) => <p>{text}</p>,
        }
        ,
        {
            title: "danh mục",
            dataIndex: "category",
            key: "category",
            ellipsis: true,
            render: (category) => <div >{category.title}</div>,
        },
        {
            title: "brand",
            dataIndex: "brand",
            key: "brand",
            ellipsis: true,
            render: (brand) => <div >{brand.title}</div>,
        },
        {
            title: "mổ tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (text) => <div >{text}</div>,
        },
        {
            title: "hành động",
            key: "action",
            render: (record) => (
                <Space size="middle" className="w-12">
                    <Button
                        type="primary"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            const delProduct = confirm("Bạn có muốn xoá không?");
                            if (delProduct) {
                                removeProduct(record._id);
                            }
                        }}
                    >
                        Remove
                    </Button>
                    <Button type="primary"
                        className="bg-blue-500"
                    >

                        <Link to={`/admin/products/${record._id}/update`}>Update</Link>
                    </Button>
                </Space>
            ),
        },
    ];

    const ListProduct = data?.data?.map((item: any) => {
        return {
            key: item._id,
            ...item,

        };
    });

    return (
        <div style={{ marginTop: 100, paddingRight: 50 }}>
            <Button type="primary" className="bg-blue-500" style={{ marginBottom: 30 }}>
                <Link to={"/admin/products/add"}>Add New Product</Link>
            </Button>
            <Table
                style={{ backgroundColor: "white", marginTop: 100, }}
                columns={columns}
                dataSource={ListProduct}
                pagination={{ pageSize: 6 }}
            />
        </div>
    );
};

export default ListProduct;
