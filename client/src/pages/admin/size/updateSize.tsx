
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEditvalueattributeMutation, useGetvalueattributeQuery } from "../../../store/valueAttribute/valueAttribute.services";


interface IForm {
    _id: string;
    value: string;
}

const UpdateColor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data } = useGetvalueattributeQuery(id)
    console.log(id, data);


    const [editvalueattribute] = useEditvalueattributeMutation()
    const [form] = Form.useForm();


    form.setFieldsValue({
        _id: data?._id,
        value: data?.value,
    })

    console.log(data);

    const onFinish = (values: IForm) => {

        const newSize = {
            _id: values._id,
            attribute: "65311f7434441c10b2810467",
            value: values.value,
        };
        console.log(newSize);

        editvalueattribute(newSize);
        message.success("cập nhật kích cỡ thành công");
        navigate("/admin/size");

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
                Update Category
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
                    name="value"
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
                        Cập Nhập Màu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateColor;