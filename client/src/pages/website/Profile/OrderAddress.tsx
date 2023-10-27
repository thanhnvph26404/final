import { Button, Input, Form } from 'antd';
import { IUser } from '../../../store/Auth/Auth.interface';
import { useEditUserByTokenMutation } from '../../../store/Auth/Auth.services';
import { toastError, toastSuccess } from '../../../hook/toastify';
import { useNavigate } from 'react-router-dom';

type addressProps = {
    currentUser: IUser | null;
};

const OrderAddress = ( { currentUser }: addressProps ) =>
{
    const [ editAddress ] = useEditUserByTokenMutation();
    const token = localStorage.getItem( "token" );
    const [ form ] = Form.useForm();
    const navigate = useNavigate();

    const updateAdd = () =>
    {
        form.validateFields().then( ( values ) =>
        {
            if ( token )
            {
                const userData = {
                    address: values.address,
                    token: token,
                };

                editAddress( userData )
                    .unwrap()
                    .then( ( response ) =>
                    {

                        toastSuccess( 'Cập nhật địa chỉ thành công' );
                        navigate( '/profile/account' );
                    } )
                    .catch( ( error ) =>
                    {
                        console.log( error );
                        toastError( 'Lỗi thêm địa chỉ' );
                    } );
            }
        } );
    };

    return (
        <>
            <div className="p-3 bg-white rounded-xl">
                <h4 className="text-2xl font-medium capitalize mb-4 p-4">
                    Thêm địa chỉ
                </h4>

                <Form form={ form } onFinish={ updateAdd }>
                    <div className="space-y-4">
                        <Form.Item
                            name="address"
                            rules={ [
                                { required: true, message: 'Vui lòng nhập địa chỉ' },
                            ] }
                            initialValue={ currentUser?.address }
                        >
                            <Input
                                id='address'
                                name='address'
                                placeholder="Địa chỉ"
                            />
                        </Form.Item>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <div className="w-1/3">
                            <Button htmlType="submit">Cập nhật</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default OrderAddress;
