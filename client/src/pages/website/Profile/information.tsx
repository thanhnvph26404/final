import { Form, Input, Button } from "antd";
import { IUser } from "../../../store/Auth/Auth.interface";
import { useEditUserMutation } from "../../../store/Auth/Auth.services";
import { toastError, toastSuccess } from "../../../hook/toastify";
import { useNavigate } from "react-router-dom";

type UserProps = {
    currentUser: IUser | null;
};

const Information = ( { currentUser }: UserProps ) =>
{
    const [ edituser ] = useEditUserMutation();
    const token = localStorage.getItem( "token" );
    const [ form ] = Form.useForm(); // Sử dụng Form của Ant Design
    const navigate = useNavigate();

    // Quy tắc kiểm tra cho các trường


    const updateUser = () =>
    {
        form.validateFields().then( ( values ) =>
        {
            if ( token )
            {
                const user = {
                    email: values.email,
                    token: token,
                    name: values.name,
                    phone: values.phone,
                };

                edituser( user )
                    .unwrap()
                    .then( ( response ) =>
                    {
                        toastSuccess( "Cập nhật thành công" );
                        navigate( "/profile/account" );
                        console.log( response );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( error );
                        toastError( error.data.message );
                    } );
            }
        } );
    };

    return (
        <>
            <div className="p-3 bg-white rounded-xl">
                <h4 className="text-2xl font-medium capitalize mb-4 p-4">
                    Thông tin cá nhân
                </h4>

                <Form form={ form } onFinish={ updateUser }>
                    <div className="space-y-4">
                        <Form.Item
                            name="name"
                            rules={ [ { required: true, message: "trường name không được để trống " } ] }
                            initialValue={ currentUser?.name }
                        >
                            <Input
                                placeholder="Tên"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={ [ { required: true, message: "trường email không được để trống " },
                            { type: "email", message: "vui lòng nhập đúng định dạng " } ] }
                            initialValue={ currentUser?.email }
                        >
                            <Input
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={ [ { required: true, message: "trường phone không được để trống " } ] }
                            initialValue={ currentUser?.phone }
                        >
                            <Input
                                placeholder="Số điện thoại"
                            />
                        </Form.Item>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <div className="w-1/3">
                            <Button htmlType="submit">Update</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Information;
