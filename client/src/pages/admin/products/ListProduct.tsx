import { Space, Table, Button, Popconfirm, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Select } from 'antd';

import { Link, useLocation } from "react-router-dom";
import { useDeleteProductMutation, useGetProductssQuery, useLocProductsQuery } from "../../../store/products/product.services";
import { Iproductdata } from "../../../store/products/product.interface";
import { EyeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../../hook/toastify";
import { useGetCategoryListQuery } from "../../../store/categoies/category.services";
import { useGetBrandListQuery } from "../../../store/Brand/brand.services";


const { Option } = Select;


const ListProduct = () => {
    const location = useLocation()

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(''); // Giá tiền tối đa
    const [products, setProducts] = useState([]); // State lưu trữ sản phẩm
    const { data: product } = useGetProductssQuery(null)
    const { data: categorys } = useGetCategoryListQuery(null)
    const { data: brands } = useGetBrandListQuery(null)
    const { data, refetch } = useLocProductsQuery({
        category: category,
        brand: brand,
        minPrice: minPrice,
        maxPrice: maxPrice,

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi hàm refetch để tải lại dữ liệu giỏ hàng
                await refetch();
                // Dữ liệu giỏ hàng đã được cập nhật
            } catch (error: any) {
                toastError(error.data.error)   // Xử lý lỗi nếu có
            }
        };

        fetchData(); // Gọi hàm fetchData khi location.pathname thay đổi
    }, [location.pathname, refetch]);

    const handleGetAllProducts = async () => {
        try {
            await refetch(); // Lấy lại dữ liệu sản phẩm từ server
            setProducts(product?.products || []); // Hiển thị tất cả sản phẩm
            toastSuccess("Hiển thị tất cả sản phẩm");
        } catch (error) {
            console.error(error);
        }
    };
    const handleFilterByPrice = async () => {
        try {
            await refetch();
            const filteredProducts = data?.products || [];
            if (filteredProducts.length === 0) {
                toastError("Không có sản phẩm nào trong khoảng giá này.");
                setProducts([])
                return
            }
            setProducts(filteredProducts);
            toastSuccess("Lọc sản phẩm thành công");
        } catch (error) {
            console.error(error);
        }
    };
    const [remove] = useDeleteProductMutation()
    const removeProduct = (id: string) => {
        remove(id)

    };

    const columns: ColumnsType<Iproductdata> = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <div className="">
                    <img src={images[0]?.url} alt={`Product Image`} style={{ width: 100 }} />
                </div>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <p className="text-sm overflow-hidden whitespace-normal w-[90px] h-[100px]">{text}</p>
            ),
        },


        {
            title: 'Giá gốc',
            dataIndex: 'price',
            key: 'price',
            render: (number) => <p>{number?.toLocaleString()}đ</p>,
        },
        {
            title: 'Giá giảm',
            dataIndex: 'original_price',
            key: 'original_price',
            render: (number) => (
                <p>{number ? `${number.toLocaleString()}đ` : '0đ'}</p>
            ),
        },

        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <p>{category.title}</p>,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (brand) => <p>{brand?.title}</p>,
        },
        {
            title: 'Đã cập nhật',
            dataIndex: 'updatedAt',
            key: 'update',
            render: (update) => (
                <div className="text-sm text-gray-66 flex flex-col">
                    <div className="">{update.slice(0, 10)}</div>
                    <div className="">{update.slice(11, 16)}</div>
                </div>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record) => (
                <Space size="small" className="w-10">
                    <Link to={`productDetailAdmin/${record._id}`}>
                        <EyeFilled className="text-[20px]" />
                    </Link>
                    <Popconfirm
                        title="Xóa tác vụ"
                        description="Bạn có chắc chắn muốn xóa tác vụ này không?"
                        onConfirm={() => removeProduct(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>
                            <MdDelete />
                        </Button>
                    </Popconfirm>
                    <Button type="primary" className="bg-blue-500">
                        <Link to={`/admin/product/${record._id}`}>
                            <MdEdit />
                        </Link>
                    </Button>
                </Space>
            ),
        },
    ];



    return (
        <div className="mt-8 px-10">
            <Button type="primary" className="mb-4 bg-blue-500 ">
                <Link to="/admin/products/add">Thêm Sản Phẩm</Link>
            </Button>

            <div className="flex gap-4 items-center mb-4">
                <Input
                    type="number"
                    value={minPrice}
                    onChange={(e: any) => {
                        const enteredValue = e.target.value;
                        // Chỉ cho phép giá trị không âm
                        if (enteredValue >= 0 || enteredValue === '') {
                            setMinPrice(enteredValue);
                        }
                    }}
                    placeholder="Giá tối thiểu"
                    className="border border-gray-300 p-1 rounded"
                    style={{ width: 150 }}
                />
                <Input
                    type="number"
                    value={maxPrice}
                    onChange={(e: any) => {
                        const enteredValue = e.target.value;
                        // Chỉ cho phép giá trị không âm
                        if (enteredValue >= 0 || enteredValue === '') {
                            setMaxPrice(enteredValue);
                        }
                    }}
                    placeholder="Giá tối đa"
                    className="border border-gray-300 p-1 rounded"
                    style={{ width: 150 }}
                />

                <Select
                    placeholder="Chọn Category"
                    className="w-50"
                    value={category}
                    onChange={(value) => setCategory(value)}
                    style={{ width: 200 }}
                >
                    <Option value="">Tất cả category</Option>

                    {categorys &&
                        categorys?.data?.map((category: any) => (
                            <Option key={category._id} value={category.title}>
                                {category.title}
                            </Option>
                        ))}
                </Select>
                <Select
                    placeholder="Chọn Brand"
                    value={brand}
                    onChange={(value) => setBrand(value)}
                    style={{ width: 200 }}
                >
                    <Option value="">Tất cả brand</Option>

                    {brands &&
                        brands?.brand?.map((brand: any) => (
                            <Option key={brand._id} value={brand.title}>
                                {brand.title}
                            </Option>
                        ))}
                </Select>
                <Button className="bg-blue-500" type="primary" onClick={handleFilterByPrice}>
                    Lọc sản phẩm
                </Button>
                <Button className="bg-blue-500" type="primary" onClick={handleGetAllProducts}>
                    Hiển thị tất cả sản phẩm
                </Button>
            </div>


            <Table
                style={{ backgroundColor: 'white' }}
                columns={columns}
                dataSource={products.length > 0 ? products : product?.products || []}
                pagination={{ pageSize: 6 }}
            />
        </div>
    );
};

export default ListProduct;
