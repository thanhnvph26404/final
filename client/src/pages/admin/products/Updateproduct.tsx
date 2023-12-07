import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Form, Input, Button, Upload, Select, Space, UploadProps, InputNumber } from "antd";
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
    const { data: product, isLoading } = useGetProductQuery(id!);

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


        setFileList(product?.data?.images)
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
    const validateDiscount = (rule: any, value: any) => {
        const price = parseFloat(value);
        const originalPrice = form.getFieldValue('price');
        if (price > originalPrice) {
            return Promise.reject('Giá giảm không thể lớn hơn giá gốc');
        }
        return Promise.resolve();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const beforeUpload = () => {
        return false;
    };




    const onSubmit = async (data: any) => {
        // setLoadings(true);
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
        } catch (error: any) {
            toastError(error.data.message);
        } finally {
            setLoadings(false);
        }
    }


    return (
        <div>
            <div>
                <div className='mb-[20px]'>
                    <h1 className='text-[25px] font-semibold text-[#23314B]'>Sửa Sản Phẩm</h1>
                </div>
            </div>
            <div className="w-100 bg-white" >
                <Form
                    name="Form"
                    className='pt-[40px]'
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                    autoComplete="off"
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
                        label="Danh mục"
                        name="category"
                        className='pr-[60px]'
                        rules={[
                            { required: true },
                        ]}
                        hasFeedback
                    >
                        <Select id="">
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
                        className='pr-[10px]'
                        rules={[
                            { required: true },
                        ]}
                        hasFeedback
                    >
                        <Select id="">
                            {brands?.brand?.map((brand: any) => (
                                <Select.Option key={brand._id} value={brand._id}>
                                    {brand.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Giá gốc"
                        name="price"
                        className='pr-[100px]'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá gốc' },
                            { type: 'number', min: 1, max: 100000000, message: 'Giá gốc không hợp lệ' },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Giá giảm"
                        className='pr-[90px]'
                        name="original_price"
                        rules={[

                            { type: 'number', min: 1, max: 100000000, message: 'Giá giảm không hợp lệ' },
                            { validator: validateDiscount },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 3 }}
                        label="Chi tiết"
                        className='pl-[150px]'
                        name="description"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <ReactQuill />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="imgUrl"
                        className='pl-[10px]'
                        wrapperCol={{ offset: 3, span: 16 }}
                        rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
                    >
                        <Upload fileList={fileList} accept="image/*" listType="picture-card" multiple beforeUpload={beforeUpload}
                            onChange={handleChange} >
                            <Button icon={<UploadOutlined />} block>
                                Chọn ảnh
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.List name="ProductVariants">
                        {(fields, { add, remove }) => (
                            <div>
                                {fields?.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} >
                                        <Form.Item className='pl-[160px] '
                                            {...restField}
                                            name={[name, 'color']}  // Đặt tên cho trường "size"
                                            label="Color"
                                            rules={[{ required: true, message: 'Color is required' }]}
                                        >

                                            <Select className='pl-[20px]'  id="">
                                                {color?.data?.map((color: any, index: any) => (
                                                    <Select.Option key={index} value={color.color}>
                                                        {color.color}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'size']}  // Đặt tên cho trường "color"
                                            label="Size"
                                            rules={[{ required: true, message: 'Size is required' }]}
                                        >

                                            <Select className='pl-[20px]' id="">
                                                {size?.data?.map((size: any) => (
                                                    <Select.Option value={size.size}>
                                                        {size.size}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item

                                            {...restField}
                                            name={[name, 'quantity']}  // Đặt tên cho trường "quantity"
                                            label="Số lượng"
                                            rules={[{ required: true, message: 'Quantity is required' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <MinusCircleOutlined className='pl-[10px] pb-[30px]' onClick={() => { remove(name); }} />
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
                            Cập nhập sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </div>
    );
};

export default UpdateProduct;