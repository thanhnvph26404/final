import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from 'antd';

import { useResetPasswordAuthMutation } from "../../store/Auth/Auth.services";
import { toastError } from "../../hook/toastify";

const ResetPage = () =>
{
    const { randomString } = useParams<string>();
    const navigate = useNavigate();
    const [ password, setPassword ] = useState( "" );
    const [ randomCode, setRandomCode ] = useState( "" );
    const [ resetPasswordAuth, resultReset ] = useResetPasswordAuthMutation();

    const resetPassword = () =>
    {
        const data = { password, randomCode, randomString };

        resetPasswordAuth( data )
            .unwrap()
            .then( () =>
            {
                navigate( "/login" );
            } )
            .catch( ( error ) =>
            {
                console.log( error );
                toastError( "mã đăng nhập không đúng" )

            } );
    };

    return (
        <>

            <div>
                <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                        <div className=" px-16">
                            <h2 className="font-bold text-2xl text-black">Quên mật khẩu </h2>

                            <Form
                                name="basic"
                                className="mt-2"
                                layout="vertical"

                                autoComplete="off"
                            >


                                <Form.Item
                                    name="password"
                                    rules={ [
                                        { required: true, message: 'Please input your password!' },
                                        { min: 6, message: "Password must be at least 6 characters" }
                                    ] }
                                >
                                    <Input.Password prefix={ <LockOutlined /> } value={ password }
                                        onChange={ ( e: ChangeEvent<HTMLInputElement> ) =>
                                            setPassword( e.target.value )
                                        } placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="randomCode"
                                    rules={ [ { required: true, message: 'Please input your username!' } ] }
                                >
                                    <Input prefix={ <UserOutlined /> } value={ randomCode }
                                        onChange={ ( e: ChangeEvent<HTMLInputElement> ) =>
                                            setRandomCode( e.target.value )
                                        } placeholder="randomCode" />
                                </Form.Item>




                                <Form.Item>
                                    <button disabled={ resultReset.isLoading } onClick={ resetPassword } type="submit" className="bg-[#0F172A] rounded-2xl px-5 text-white py-2 hover:scale-105 duration-300">
                                        Submit
                                    </button>
                                </Form.Item>
                            </Form>



                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default ResetPage;
