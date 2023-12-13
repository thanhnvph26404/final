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
        setLoadings(true);
        let newUrls = [];

        if (data.imgUrl && data.imgUrl.fileList) {
            newUrls = await Promise.all(data.imgUrl.fileList.map(async (item: any) => {
                if (item.originFileObj) {
                    const formData = new FormData();
                    formData.append("image", item.originFileObj);
                    const API_key = "42d2b4a414af48bbc306d6456dd1f943";
                    const apiResponse: any = await axios.post(
                        `https://api.imgbb.com/1/upload?key=${API_key}`,
                        formData
                    );

                    return { uid: apiResponse.data.data.id, url: apiResponse.data.data.url };
                } else {
                    return item;
                }
            }));
        } else {
            newUrls = data.imgUrl;
        }

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
            return;
        }

        const updatedProduct = {
            _id: data._id,
            name: data.name,
            price: data.price,
            original_price: data.original_price,
            description: data.description,
            brand: data.brand,
            images: newUrls,
            category: data.category,
            ProductVariants: data.ProductVariants,
        };

        try {
            await EditProductMutation(updatedProduct).unwrap().then(() => {
                toastSuccess('Sửa sản phẩm thành công!');
                navigate('/admin/products');
            });
        } catch (error: any) {
            toastError(error.data.message);
        } finally {
            setLoadings(false);
        }
    };


    return (
        <div>
            <div>
                <h3 className='text-[25px] font-semibold'>
                    Sửa Sản Phẩm
                </h3>
            </div>
            <div className='bg-white mt-[20px] pt-[20px] pb-[30px]'>
                <Form
                    name="Form"

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
                        className='pr-[70px]'
                        rules={[
                            { required: true },
                        ]}
                        hasFeedback
                    >
                        <Select className='pl-[22px]' id="">
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
                        className='pr-[30px]'
                        rules={[
                            { required: true },
                        ]}
                        hasFeedback
                    >
                        <Select id="" className='ml-[10px]'>
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
                        className='pr-[120px]'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá gốc' },
                            { type: 'number', min: 1, max: 100000000, message: 'Giá gốc không hợp lệ' },
                        ]}
                    >
                        <InputNumber className='ml-[40px]'/>
                    </Form.Item>
                    <Form.Item
                        label="Giá giảm"
                        className='pr-[100px]'
                        name="original_price"
                        rules={[

                            { type: 'number', min: 1, max: 100000000, message: 'Giá giảm không hợp lệ' },
                            { validator: validateDiscount },
                        ]}
                    >
                        <InputNumber className='ml-[35px]'/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 3 }}
                        label="Chi tiết"
                        className='pl-[140px]'
                        name="description"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <ReactQuill />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="imgUrl"

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

                    <h1 className="mt-[10px] pl-[150px] text-[20px] text-[#23314B] font-medium " >Biến thể sản phẩm</h1>
                    <hr className="py-3  " />
                    <Form.List name="ProductVariants"  >
                        {(fields, { add, remove }) => (
                            <div className='pl-[120px]'>
                                {fields.map((field: any, index) => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'color']}
                                            fieldKey={[field.fieldKey, 'color']}
                                            label="Color"
                                            className='pl-[20px] '
                                            rules={[{ required: true, message: 'Color is required' }]}
                                        >
                                            <Select placeholder="Select color" className='pl-[20px]'>
                                                {color?.data?.map((color: any) => (
                                                    <Select.Option key={color._id} value={color.color}>
                                                        {color.color}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'size']}
                                            fieldKey={[field.fieldKey, 'size']}
                                            label="Size"
                                            rules={[{ required: true, message: 'Size is required' }]}
                                        >
                                            <Select placeholder="Select size" className='pl-[20px]' >
                                                {size?.data?.map((size: any) => (
                                                    <Select.Option key={size._id} value={size.size}>
                                                        {size.size}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'quantity']}
                                            fieldKey={[field.fieldKey, 'quantity']}
                                            label="Số lượng"
                                            className='pl-[20px]'
                                            rules={[{ required: true, message: 'Quantity is required' }]}
                                        >
                                            <InputNumber placeholder="Quantity" min={0} className='ml-[30px]'/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
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
                            Cập nhập sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </div>
    );
};

export default UpdateProduct;