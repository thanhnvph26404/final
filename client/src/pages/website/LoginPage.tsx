import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/Auth/Auth.services";
import { toastSuccess, toastError } from "../../hook/toastify";
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () =>
{
    const navigate = useNavigate();
    const [ login ] = useLoginMutation();

    const onFinish = async ( values: any ) =>
    {
        try
        {
            const response = await login( values ).unwrap();
            toastSuccess( "Đăng nhập thành công" );
            console.log( response );

            localStorage.setItem( "token", response.token );

            navigate( "/" );
        } catch ( error )
        {
            console.log( "Registration failed with error:", error );
            toastError( "Đăng nhập thất bại" );
        }
    };

    const onFinishFailed = ( errorInfo: any ) =>
    {
        console.log( 'Failed:', errorInfo );
    };

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-16">
                        <h2 className="font-bold text-2xl text-black">Login</h2>

                        <Form
                            name="basic"
                            className="mt-2"
                            layout="vertical"
                            onFinish={ onFinish }
                            onFinishFailed={ onFinishFailed }
                            autoComplete="off"
                        >


                            <Form.Item
                                name="email"
                                rules={ [
                                    { required: true, message: 'vui lòng nhập  email!' },
                                    { type: "email", message: "email không đúng định dạng" }
                                ] }
                            >
                                <Input prefix={ <MailOutlined /> } placeholder="Email" />
                            </Form.Item>


                            <Form.Item
                                name="password"
                                rules={ [
                                    { required: true, message: 'vui lòng nhập  password!' },
                                    { min: 6, message: "Password phải đủ 6 kí tự " }
                                ] }
                            >
                                <Input.Password prefix={ <LockOutlined /> } placeholder="Password" />
                            </Form.Item>



                            <Form.Item>
                                <button type="submit" className="bg-[#0F172A] rounded-2xl px-5 text-white py-2 hover:scale-105 duration-300">
                                    Login
                                </button>
                            </Form.Item>
                        </Form>

                        <hr className="border-gray-400" />
                        <Link to={ "/forgot-password" } className="  mt-5 text-xs border-b border-gray-400 py-4">
                            Forgot your password?
                        </Link>
                        <div className="mt-5  text-xs flex justify-between py-3 items-center">
                            <p>If you don't have an account..</p>
                            <Link to={ "/signup" }
                                className="py-2 px-5 bg-[#0F172A] text-white
                  border rounded-xl hover:scale-105 duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="./images/backgrround-thoi-trang-vintage-cuc-dep_044610084.jpeg" alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;
