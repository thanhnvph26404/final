import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { IValueAttribute } from "../../../store/valueAttribute/valueAttribute.interface";
import { useAddvalueattributeMutation } from "../../../store/valueAttribute/valueAttribute.services";
const AddColor = () => {
    const navigate = useNavigate();

    const [Addvalueattribute] = useAddvalueattributeMutation()
    const onFinish = (values: IValueAttribute) => {
        const newSize = {
            attribute: "65311f8034441c10b2810469",
            value: values.value,
        };
        Addvalueattribute(newSize)
        message.success("Thêm Màu thành công");
        navigate("/admin/color");
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
            Thêm kích Màu Mới
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
                label="Tên màu"
                name="value"
                rules={[
                    { required: true, message: "vui lòng nhập màu!" },
                    { max: 255 },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" className="bg-blue-500">
                    Thêm màu
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
};


export default AddColor
