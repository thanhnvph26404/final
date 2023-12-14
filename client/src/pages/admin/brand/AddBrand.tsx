import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useAddBrandMutation } from "../../../store/Brand/brand.services";
const AddBrand = () => {
    const navigate = useNavigate();
    const [brand] = useAddBrandMutation()
    const onFinish = (values: any) => {
        brand(values)
        message.success("Thêm thương hiệu thành công");
        navigate("/admin/brand");
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

    return (
        <div>
            <div className='mb-[20px]'>
                <h1 className='text-[25px] font-semibold text-[#23314B]'>Thêm Thương hiệu</h1>
            </div>
            <div className="bg-white pt-[20px] pb-[30px]">
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
                        label="Tên thương hiệu"
                        name="title"
                        rules={[
                            { required: true, message: "vui lòng nhập thương hiệu!" },
                            { max: 255 },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Thêm thương hiệu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};


export default AddBrand
