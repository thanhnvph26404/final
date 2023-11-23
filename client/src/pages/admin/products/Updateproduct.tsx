import TextArea from "antd/es/input/TextArea";
import { Form, Row, Col, Input, Button, Upload, Select, Space, UploadProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useGetCategoryListQuery } from "../../../store/categoies/category.services";

import { useGetBrandListQuery } from "../../../store/Brand/brand.services";
import { useGetsizeListQuery } from "../../../store/valueAttribute/Sizesevice";
import { useGetcolorListQuery } from "../../../store/valueAttribute/colorsevice";
import { useEditProductMutation, useGetProductQuery } from "../../../store/products/product.services";
import { toastError, toastSuccess } from "../../../hook/toastify";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductQuery(id);
    const { data: categories } = useGetCategoryListQuery([]);
    const { data: brands } = useGetBrandListQuery([]);
    const { data: size } = useGetsizeListQuery([])
    const { data: color } = useGetcolorListQuery([])
    const [EditProductMutation] = useEditProductMutation();
    const [loadings, setLoadings] = useState(false);

    console.log(product);
    const [fileList, setFileList] = useState<any[]>([])

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const [form] = Form.useForm();

    const setFields = () => {
        if (product) {
            setFileList(product.data.images)
            form.setFieldsValue({
                _id: product?.data?._id,
                name: product?.data?.name,
                price: product?.data?.price,
                original_price: product?.data?.original_price,
                description: product?.data?.description,
                brand: product?.data?.brand?._id,
                imgUrl: product?.data?.images,
                category: product?.data?.category?._id,
                ProductVariants: product?.data?.ProductVariants
            });
        }



    };

    useEffect(() => {
        setFields()
    }, [isLoading])



    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const beforeUpload = () => {
        return false;
    };



    const onSubmit = async (data: any) => {
        setLoadings(true);
        let newurls = [];

        // Check if data.images exists and has a fileList property
        if (data.imgUrl && data.imgUrl.fileList) {
            console.log(data.imgUrl.fileList)
            newurls = await Promise.all(data.imgUrl.fileList.map(async (item: any) => {
                if (item.originFileObj) {
                    const formData = new FormData();
                    formData.append("image", item.originFileObj);
                    const API_key = "42d2b4a414af48bbc306d6456dd1f943"
                    const apiResponse: any = await axios.post(
                        `https://api.imgbb.com/1/upload?key=${API_key}`,
                        formData
                    )

                    return { uid: apiResponse.data.data.id, url: apiResponse.data.data.url };
                }
                else {
                    return item
                }
            }))

        } else {
            newurls = data.imgUrl
        }


        const newProduct = {
            _id: data._id,
            name: data.name,
            price: data.price,
            original_price: data.original_price,
            description: data.description,
            brand: data.brand,
            images: newurls,
            category: data.category,
            ProductVariants: data.ProductVariants
        };
        console.log(newProduct);

        try {
            await EditProductMutation(newProduct).unwrap().then(() => {
                toastSuccess('sửa sản phẩm thành công!');
            }).then(() => {
                navigate('/admin/products');
            });
        } catch (error) {
            toastError('sửa sản phẩm thất bại!');
        } finally {
            setLoadings(false);
        }
    }


    return (
        <div className="w-100" style={{ marginTop: 100, backgroundColor: "white" }}>
            <h3 style={{ marginTop: 20, marginBottom: 50, color: "black" }}>
                sửa sản phẩm
            </h3>
            <Form
                name="Form"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                // style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}

            >
                <Form.Item
                    label="Tên sản Phẩm"
                    name="_id"
                    hidden
                    rules={[
                        { required: true },
                        { whitespace: true },
                        { min: 6, max: 255 },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={14}>
                        <Form.Item
                            label="Tên sản Phẩm"
                            name="name"
                            rules={[
                                { required: true },
                                { whitespace: true },
                                { min: 6, max: 255 },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="giá gốc"
                            name="price"
                            rules={[
                                { required: true, min: 1, max: 100000000, pattern: new RegExp(/^[0-9]+$/), message: "Price is not a valid number" },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="giá giảm"
                            name="original_price"
                            rules={[
                                { min: 1, max: 100000000, pattern: new RegExp(/^[0-9]+$/), message: "originPrice is not a valid number" },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Danh mục"
                            name="category"
                            labelCol={{ span: 8 }}
                            rules={[
                                { required: true },
                            ]}
                            hasFeedback
                        >
                            <Select id="" className="mx-2">
                                {categories?.data?.map((Category: any) => (
                                    <Select.Option key={Category?._id} value={Category?._id}>
                                        {Category?.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Thương hiệu"
                            name="brand"
                            labelCol={{ span: 8 }}
                            rules={[
                                { required: true },
                            ]}
                            hasFeedback
                        >
                            <Select id="" className="mx-2 ">
                                {brands?.brand?.map((brand: any) => (
                                    <Select.Option key={brand._id} value={brand._id}>
                                        {brand.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>

                        <Form.Item
                            labelCol={{ span: 3 }}
                            label="Chi tiết"
                            name="description"
                            rules={[
                                { required: true },
                            ]}
                            hasFeedback
                        >
                            <TextArea cols={40} rows={6} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 3 }}
                            label="Ảnh sản phẩm"
                            name="imgUrl"
                            rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
                        >
                            <Upload fileList={fileList} accept="image/*" listType="picture-card" multiple beforeUpload={beforeUpload}
                                onChange={handleChange} >
                                <Button icon={<UploadOutlined />} block>
                                    Chọn ảnh
                                </Button>
                            </Upload>
                        </Form.Item>

                    </Col>
                </Row>


                <h1 className="m-2" >Biến thể sản phẩm</h1>
                <hr className="py-3  " />
                <Form.List name="ProductVariants">
                    {(fields, { add, remove }) => (
                        <div className="flex flex-col gap-3 gap-x-10    ">
                            {fields?.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} className="flex justify-start items-center"
                                >
                                    <Form.Item
                                        {...restField}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 18 }}
                                        className="my-auto "

                                        name={[name, 'color']}  // Đặt tên cho trường "size"
                                        label="Color"
                                        rules={[{ required: true, message: 'Color is required' }]}
                                    >
                                        <Select id="" className="w-8 mx-3" >
                                            {color?.data?.map((color: any, index) => (
                                                <Select.Option key={index} value={color.color}>
                                                    {color.color}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="my-auto ml-3"

                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 18 }}
                                        {...restField}
                                        name={[name, 'size']}  // Đặt tên cho trường "color"
                                        label="Size"
                                        rules={[{ required: true, message: 'Size is required' }]}
                                    >
                                        <Select id="" className=" mx-3">
                                            {size?.data?.map((size: any) => (
                                                <Select.Option value={size.size}>
                                                    {size.size}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="my-auto"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 18 }}
                                        {...restField}
                                        name={[name, 'quantity']}  // Đặt tên cho trường "quantity"
                                        label="Số lượng"
                                        rules={[{ required: true, message: 'Quantity is required' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => { remove(name); }} />

                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => { add(); }}
                                    icon={<PlusOutlined />}
                                >
                                    Thêm biến thể sản phẩm
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                </Form.List>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" loading={loadings} className="bg-blue-500" htmlType="submit">
                        cập nhập sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default UpdateProduct;