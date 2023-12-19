
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useEditBrandMutation, useGetBrandQuery } from "../../../store/Brand/brand.services";
import { useEffect } from "react";
import { toastError, toastSuccess } from "../../../hook/toastify";


type FieldType = {
    title: string
};
const UpdateBrand = () =>
{
    const { _id } = useParams<{ _id: any }>();
    const navigate = useNavigate();
    const { data: branddata } = useGetBrandQuery( _id )
    const [ EditBrandMutation ] = useEditBrandMutation()
    console.log( branddata );
    const [ form ] = Form.useForm()
    useEffect( () =>
    {
        form.setFieldsValue(
            branddata?.brand
        )
    }, [ branddata?.brand ] )

    const onFinish = async ( values: any ) =>
    {
        const newBrand = {
            _id: values._id,
            title: values.title
        }
        console.log( newBrand );
        try
        {
            await EditBrandMutation( newBrand ).unwrap().then( () =>
            {
                toastSuccess( 'Sửa thương hiệu thành công!' );
            } ).then( () =>
            {
                navigate( '/admin/brand' );
            } );
        } catch ( error )
        {
            toastError( 'Sửa brand thất bại!' );
        }
    };


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
        <div>
            <div className='mb-[20px]'>
                <h1 className='text-[25px] font-semibold text-[#23314B]'>Sửa thương hiệu</h1>
            </div>
            <div className="bg-white pt-[20px] pb-[30px]">
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
                        label="Tên thương hiệu"
                        name="title"
                        rules={ [
                            { required: true, message: "vui lòng nhập thương hiệu !" },
                            { max: 255 },
                        ] }
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Cập nhật thương hiệu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdateBrand;