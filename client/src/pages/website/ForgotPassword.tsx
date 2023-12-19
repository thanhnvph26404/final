import { ChangeEvent, useState } from "react";

import { Form, Input } from 'antd';
import { useForgotPasswordAuthMutation } from "../../store/Auth/Auth.services";
import { MailOutlined } from "@ant-design/icons";
import { toastError, toastSuccess } from "../../hook/toastify";

const ForgotPage = () =>
{
    const [ email, setEmail ] = useState( "" );
    const [ forgotPasswordAuth ] = useForgotPasswordAuthMutation();

    const forgotPassword = () =>
    {
        const body = {
            email,
        };

        forgotPasswordAuth( body )
            .unwrap()
            .then( ( response ) =>
            {
                localStorage.setItem( "forgotToken", response.accessCode );
                toastSuccess( " đã gửi mã xác nhận vui lòng kiểm tra email" )
            } )
            .catch( ( error ) =>
            {
                console.log( "Registration failed with error:", error )
                toastError( "lỗi email không tồn tại  " );

            } );
    };
    const onFinishFailed = ( errorInfo: any ) =>
    {
        console.log( 'Failed:', errorInfo );
    };

    return (
        <>

            <div>
                <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                        <div className="md:w-1/2 px-16">
                            <h2 className="font-bold text-2xl text-black">Quên mật khẩu </h2>

                            <Form
                                name="basic"
                                className="mt-2"
                                layout="vertical"
                                onFinishFailed={ onFinishFailed }

                                autoComplete="off"
                            >


                                <Form.Item
                                    name="email"

                                    rules={ [
                                        { required: true, message: 'Please input your email!' },
                                        { type: "email", message: "Invalid email format" }
                                    ] }
                                >
                                    <Input prefix={ <MailOutlined /> } value={ email } onChange={ ( e: ChangeEvent<HTMLInputElement> ) =>
                                        setEmail( e.target.value )
                                    } placeholder="Email" />
                                </Form.Item>





                                <Form.Item>
                                    <button onClick={ forgotPassword } type="submit" className="bg-[#0F172A] rounded-2xl px-5 text-white py-2 hover:scale-105 duration-300">
                                        Khôi phục
                                    </button>
                                </Form.Item>
                            </Form>



                        </div>
                        <div className="md:block hidden w-1/2">
                            <img className="rounded-2xl" src="./images/polotron.png" alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ForgotPage;
