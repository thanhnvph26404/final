
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEditColorMutation, useGetColorQuery } from "../../../store/valueAttribute/colorsevice";
import { useEffect } from "react";
import { toastSuccess } from "../../../hook/toastify";


type FieldType = {
    color: string
};
const Updatecolor = () =>
{
    const { _id } = useParams<{ _id: any }>();

    const { data: colordata } = useGetColorQuery( _id )
    const [ editcolor ] = useEditColorMutation()

    const [ form ] = Form.useForm();
    form.setFieldsValue( colordata )

    const onFinish = async ( values: any ) =>
    {
        const newColor = {
            _id: values._id,
            color: values.color
        }
        console.log( values );


        await editcolor( values )
    };
    useEffect( () =>
    {
        form.setFieldsValue(
            colordata
        )
    }, [ colordata ] )

    const onFinishFailed = ( values: any ) =>
    {
        console.log( "errors", values );
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
        <div className="w-100" style={ { marginTop: 100, backgroundColor: "white" } }>
            <h3 style={ { marginBottom: 50, marginTop: 20, color: "black" } }>
                Update color
            </h3>
            <Form

                labelCol={ { span: 8 } }
                wrapperCol={ { span: 16 } }
                form={ form }
                style={ { maxWidth: 800 } }
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                validateMessages={ validateMessages }
            >
                <Form.Item
                    label=""
                    name="_id"
                    initialValue={ _id }
                    style={ { display: "none" } }
                    rules={ [ { required: true, message: "vui lòng nhập kích cỡ!" } ] }
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Tên màu"
                    name="color"
                    rules={ [
                        { required: true, message: "vui lòng nhập Màu !" },
                        { max: 255 },
                    ] }
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Cập nhập màu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Updatecolor;