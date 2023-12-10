import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' // CSS styles for ReactQuill

import { Form, Row, Col, Input, Button, Upload, Select, Space, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useGetCategoryListQuery } from "../../../store/categoies/category.services";
import { useGetBrandListQuery } from "../../../store/Brand/brand.services";
import { useGetsizeListQuery } from "../../../store/valueAttribute/Sizesevice";
import { useGetcolorListQuery } from "../../../store/valueAttribute/colorsevice";
import { useAddProductMutation } from "../../../store/products/product.services";
import { toastError, toastSuccess } from "../../../hook/toastify";

const AddProduct = () => {
    const navigate = useNavigate();
    const { data: categories } = useGetCategoryListQuery([]);
    const { data: brands } = useGetBrandListQuery([]);
    const { data: size } = useGetsizeListQuery([])
    const { data: color } = useGetcolorListQuery([])
    const [duplicateVariantError, setDuplicateVariantError] = useState(false);


    const [addProductMutation] = useAddProductMutation();

    const [loadings, setLoadings] = useState(false);

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
        let newUrls = [];

        if (data.imgUrl && data.imgUrl.fileList) {
            newUrls = await Promise.all(data.imgUrl.fileList.map(async (item: any) => {
                const formData = new FormData();
                formData.append("image", item.originFileObj);
                const API_key = "42d2b4a414af48bbc306d6456dd1f943";
                const apiResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${API_key}`,
                    formData
                );
                return { uid: apiResponse.data.data.id, url: apiResponse.data.data.url };
            }));
            console.log(newUrls);
        }
        console.log(data.imgUrl.fileList);

        const productVariants = data.ProductVariants || [];
        const existingVariants = new Set<string>();

        let hasDuplicate = false;
        let duplicateIndexes: number[] = [];

        productVariants.forEach((variant: any, index: number) => {
            const { color, size } = variant;
            const variantKey = `${color}-${size}`;

            if (existingVariants.has(variantKey)) {
                hasDuplicate = true;
                duplicateIndexes.push(index);
            } else {
                existingVariants.add(variantKey);
            }
        });

        if (hasDuplicate) {
            const errorFields = duplicateIndexes.map((index) => ({
                name: ['ProductVariants', index, 'color'],
                errors: ['Biến thể đã tồn tại'],
            }));

            form.setFields(errorFields);
            setLoadings(false);
            setDuplicateVariantError(true);
            return;
        }

        const newProduct: any = {
            name: data.name,
            price: data.price,
            original_price: data.original_price,
            description: data.description,
            brand: data.brand,
            images: newUrls,
            category: data.category,
            ProductVariants: data.ProductVariants,
        };
        console.log(newProduct);

        try {
            await addProductMutation(newProduct).unwrap().then(() => {
                toastSuccess('Thêm sản phẩm thành công!');
                navigate('/admin/products');
            });
        } catch (error: any) {
            toastError(error.data.message);
        } finally {
            setLoadings(false);
        }
    };


    const [form] = Form.useForm()
    const validateDiscount = (rule: any, value: any) => {
        const price = parseFloat(value);
        const originalPrice = form.getFieldValue('price');
        if (price > originalPrice) {
            return Promise.reject('Giá giảm không thể lớn hơn giá gốc');
        }
        return Promise.resolve();
    };


    return (
        <div>
            <div>
                <h3 className='text-[25px] font-semibold'>
                    Thêm Sản Phẩm
                </h3>
            </div>
            <div className="bg-white pt-[30px] pb-[40px] mt-[20px]" >
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
                        name="name"
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
                                label="Giá gốc"
                                name="price"
                                className='pr-[150px]'
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá gốc' },
                                    { type: 'number', min: 1, max: 100000000, message: 'Giá gốc không hợp lệ' },
                                ]}
                            >
                                <InputNumber className='ml-[37px]'/>
                            </Form.Item>
                            <Form.Item
                                label="Giá giảm"
                                name="original_price"
                                className='pr-[130px]'

                                rules={[

                                    { type: 'number', min: 1, max: 100000000, message: 'Giá giảm không hợp lệ' },
                                    { validator: validateDiscount },
                                ]}
                            >
                                <InputNumber className='ml-[34px]' />
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
                                <Select id="" className="mx-2 pl-[12px]">
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
                                className='pl-[20px]'
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
                                className='pr-[150px]'
                                label="Chi tiết"
                                name="description"
                                rules={[{ required: true }]}
                                hasFeedback
                            >
                                <ReactQuill className='pl-[40px]'/>
                            </Form.Item>
                            <Form.Item
                                label="Ảnh sản phẩm"
                                className='pr-[500px]'
                                name="imgUrl"
                                wrapperCol={{ offset: 3, span: 16 }}
                                rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
                            >
                                <Upload accept="image/*" listType="picture-card" multiple beforeUpload={beforeUpload} >
                                    <Button icon={<UploadOutlined />} block>
                                        Chọn ảnh
                                    </Button>
                                </Upload>
                            </Form.Item>

                        </Col>
                    </Row>


                    <h1 className="mt-[10px] pl-[80px] text-[20px] text-[#23314B] font-medium " >Biến thể sản phẩm</h1>
                    <hr className="py-3  " />
                    <Form.List name="ProductVariants">
                        {(fields, { add, remove }) => (
                            <div className="flex flex-col gap-3 gap-x-10">
                                {fields.map((field, index) => (
                                    <Space key={field.key} className="flex justify-start items-center pl-[80px]">
                                        <Form.Item
                                            validateStatus={duplicateVariantError ? 'error' : ''}
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 18 }} help={duplicateVariantError ? 'Biến thể đã tồn tại' : ''}
                                            label="Màu"
                                            name={[field.name, 'color']}
                                            className="my-auto pb-[20px]" 
                                            rules={[{ required: true, message: 'Vui lòng chọn màu' }]}
                                        >
                                            <Select placeholder="Chọn màu" className="w-8 mx-3">
                                                {color?.data?.map((colorItem: any) => (
                                                    <Select.Option key={colorItem._id} value={colorItem.color}>
                                                        {colorItem.color}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            validateStatus={duplicateVariantError ? 'error' : ''}
                                            help={duplicateVariantError ? 'Biến thể đã tồn tại' : ''}
                                            label="Size"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 18 }}
                                            className="my-auto ml-3 pb-[20px] "
                                            name={[field.name, 'size']}
                                            rules={[{ required: true, message: 'Vui lòng chọn kích cỡ' }]}
                                        >
                                            <Select placeholder="Chọn kích cỡ" className=" mx-3">
                                                {size?.data?.map((sizeItem: any) => (
                                                    <Select.Option key={sizeItem._id} value={sizeItem.size}>
                                                        {sizeItem.size}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Số lượng"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 18 }}
                                            className="my-auto pb-[20px]"
                                            name={[field.name, 'quantity']}
                                            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                        >
                                            <Input placeholder="Nhập số lượng" type="number" />
                                        </Form.Item>

                                        <MinusCircleOutlined className='pb-[25px] pl-[8px]' onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item className='pl-[80px]'> 
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Thêm biến thể sản phẩm
                                    </Button>
                                </Form.Item>
                            </div>
                        )}
                    </Form.List>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" loading={loadings} className="bg-blue-500" htmlType="submit">
                            Thêm sản phẩm mới

                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;