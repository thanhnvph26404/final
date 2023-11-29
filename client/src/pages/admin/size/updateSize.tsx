
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEditSizeMutation, useGetSizeQuery } from "../../../store/valueAttribute/Sizesevice";
import { toastError, toastSuccess } from "../../../hook/toastify";
import { useEffect } from "react";


interface IForm {
    _id: string;
    size: string;
}

const UpdateColor = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const { data: size, isLoading } = useGetSizeQuery(id)

    const [EditSizeMutation] = useEditSizeMutation()
    const [form] = Form.useForm();


    useEffect(() => {
        console.log(size);

        if (size) {
            form.setFieldsValue({
                _id: size?._id,
                size: size?.size,
            })
        }
    }, [isLoading])

    const onFinish = async (values: IForm) => {

        const newSize = {
            _id: values._id,
            size: values.size,
        };
        console.log(newSize);

        try {
            await EditSizeMutation(newSize).unwrap().then(() => {
                toastSuccess('sửa cỡ thành công!');
            }).then(() => {
                navigate('/admin/size');
            });
        } catch (error) {
            toastError('sửa cỡ thất bại!');
        }


    };
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
        <div className="w-100" style={{ marginTop: 100, backgroundColor: "white" }}>
            <h3 style={{ marginBottom: 50, marginTop: 20, color: "black" }}>
                sử kích cỡ
            </h3>
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
                    initialValue={id}
                    style={{ display: "none" }}
                    rules={[{ required: true, message: "vui lòng nhập kích cỡ!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="size Name"
                    name="size"
                    rules={[
                        { required: true, message: "vui lòng nhập kích cỡ!" },
                        { max: 255 },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Cập Nhập Cỡ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateColor;