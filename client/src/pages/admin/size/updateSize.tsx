
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
        } catch (error: any) {
            toastError(error.data.message);
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
        <div className="">
            <div className='mb-[20px]'>
                <h1 className='text-[25px] font-semibold text-[#23314B]'>Sửa Kích Cỡ</h1>
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
                        initialValue={id}
                        style={{ display: "none" }}
                        rules={[{ required: true, message: "vui lòng nhập kích cỡ!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tên Kích Cỡ"
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
                            Cập Nhập Kích Cỡ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdateColor;