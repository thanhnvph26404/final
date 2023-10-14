import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../store/Auth/Auth.services";
import { toastSuccess, toastError } from "../../hook/toastify";
import { Form, Input, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const SignupPage = () =>
{
    const navigate = useNavigate();
    const [ signup ] = useSignupMutation();

    const onFinish = async ( values: any ) =>
    {
        try
        {
            await signup( values ).unwrap();
            toastSuccess( "Đăng kí thành công" );
            navigate( "/login" );
        } catch ( error )
        {
            console.log( "Registration failed with error:", error );
            toastError( "Đăng kí thất bại" );
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
                        <h2 className="font-bold text-2xl text-black">Signup</h2>

                        <Form
                            name="basic"
                            className="mt-2"
                            layout="vertical"
                            onFinish={ onFinish }
                            onFinishFailed={ onFinishFailed }
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                rules={ [ { required: true, message: 'vui lòng nhập  username!' } ] }
                            >
                                <Input prefix={ <UserOutlined /> } placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={ [
                                    { required: true, message: 'vui lòng nhập  email!' },
                                    { type: "email", message: "email không đúng định dạng " }
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

                            <Form.Item
                                name="confirmPassword"
                                dependencies={ [ 'password' ] }
                                rules={ [
                                    { required: true, message: 'vui lòng nhập lại mật khẩu !' },
                                    ( { getFieldValue } ) => ( {
                                        validator ( _, value )
                                        {
                                            if ( !value || getFieldValue( 'password' ) === value )
                                            {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject( new Error( 'mật khẩu không khớp ' ) );
                                        },
                                    } ),
                                ] }
                            >
                                <Input.Password prefix={ <LockOutlined /> } placeholder="Confirm Password" />
                            </Form.Item>


                            <Form.Item>
                                <button type="submit" className="bg-[#0F172A] rounded-2xl px-5 text-white py-2 hover:scale-105 duration-300">
                                    Signup
                                </button>
                            </Form.Item>
                        </Form>

                        <hr className="border-gray-400" />
                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p>Do you already have an account</p>
                            <Link to="/login" className="py-2 px-5 bg-[#0F172A] border rounded-xl hover:scale-105 text-white duration-300">
                                Login
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

export default SignupPage;
