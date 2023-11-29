import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useAddSizeMutation } from "../../../store/valueAttribute/Sizesevice";
import { toastError, toastSuccess } from "../../../hook/toastify";
const AddSize = () => {
    const navigate = useNavigate();

    const [AddSizeMutation] = useAddSizeMutation()
    const onFinish = async (values: any) => {
        console.log(values);

        try {
            await AddSizeMutation(values).unwrap().then(() => {
                toastSuccess('thêm cỡ thành công!');
            }).then(() => {
                navigate('/admin/size');
            });
        } catch (error) {
            toastError('thêm cỡ thất bại!');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
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

    return (<div className="w-100" style={{ marginTop: 100, backgroundColor: "white" }}>
        <h3 style={{ marginTop: 20, marginBottom: 50, color: "black" }}>
            Thêm kích Cỡ Mới
        </h3>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
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
                    Thêm Size
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
};


export default AddSize
