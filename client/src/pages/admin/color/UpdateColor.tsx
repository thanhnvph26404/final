
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEditColorMutation, useGetColorQuery } from "../../../store/valueAttribute/colorsevice";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../../hook/toastify";


type FieldType = {
    color: string
};
const Updatecolor = () => {
    const { _id } = useParams<{ _id: any }>();
    const navigate = useNavigate();
    const { data: colordata } = useGetColorQuery(_id)
    const [EditColorMutation] = useEditColorMutation()

    const [form] = Form.useForm();
    form.setFieldsValue(colordata)

    const onFinish = async (values: any) => {
        const newColor = {
            _id: values._id,
            color: values.color
        }
        console.log(newColor);
        try {
            await EditColorMutation(newColor).unwrap().then(() => {
                toastSuccess('sửa màu thành công!');
            }).then(() => {
                navigate('/admin/color');
            });
        } catch (error) {
            toastError('sửa màu thất bại!');
        }
    };
    useEffect(() => {
        form.setFieldsValue(
            colordata
        )
    }, [colordata])

    const onFinishFailed = (values: any) => {
        console.log("errors", values);
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        }
    };
    return (
        <div>
            <div className='mb-[20px]'>
                <h1 className='text-[25px] font-semibold text-[#23314B]'>Thêm Màu</h1>
            </div>
            <div className="bg-white pt-[20px] pb-[30px]">
                <Form

                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    style={{ maxWidth: 800 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label=""
                        name="_id"
                        initialValue={_id}
                        style={{ display: "none" }}
                        rules={[{ required: true, message: "vui lòng nhập kích cỡ!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Tên màu"
                        name="color"
                        rules={[
                            { required: true, message: "vui lòng nhập Màu !" },
                            { max: 255 },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Cập nhập màu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Updatecolor;