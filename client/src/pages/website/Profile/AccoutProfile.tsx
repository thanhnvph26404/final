import { useEffect, useState } from "react";
import { IUser } from "../../../store/Auth/Auth.interface";
import { useGetUserByTokenMutation } from "../../../store/Auth/Auth.services";
// import MyAccount from "./Myacount";
import { message } from "antd";
import { Link, useLocation } from "react-router-dom";




const Account = () =>
{
    const location = useLocation();

    const [ getUserByToken ] = useGetUserByTokenMutation(); // Sử dụng mutation để lấy thông tin người dùng sau khi cập nhật
    const token = localStorage.getItem( "token" );

    const [ currentUser, setCurrentUser ] = useState<IUser | null>( null );
    console.log( currentUser );

    useEffect( () =>
    {
        if ( token )
        {
            getUserByToken( token )
                .unwrap()
                .then( ( response ) =>
                {
                    setCurrentUser( response.data );
                } )
                .catch( ( error ) =>
                {
                    message.error( error.data.message );
                } );
        }
    }, [ getUserByToken, token, location ] );
    return (
        <>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="shadow bg-white px-4 pt-6 pb-8 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800 text-lg">Thông tin cá nhân </h3>

                        <Link to={ `/profile/information` } className="text-rose-500">
                            Edit
                        </Link>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-gray-700 font-medium">{ currentUser?.name }</h4>

                        <p className="text-gray-700">{ currentUser?.email }</p>

                        <p className="text-gray-700">{ currentUser?.phone }</p>
                    </div>
                </div>
                <div className="shadow bg-white px-4 pt-6 pb-8 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800 text-lg">Địa chỉ </h3>


                        <Link to={ `/profile/order-address` } className="text-rose-500">
                            Edit
                        </Link>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-gray-700 font-medium">{ currentUser?.address }</h4>
                        <h4 className="text-gray-700 font-medium">{ currentUser?.Address }</h4>

                        <h4 className="text-gray-700 font-medium">{ currentUser?.country }</h4>



                    </div>
                </div>
                <div className="shadow bg-white px-4 pt-6 pb-8 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800 text-lg">Đơn hàng  </h3>

                        <Link to={ `/profile/order-address` } className="text-rose-500">
                            Edit
                        </Link>
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-gray-700 font-medium">{ currentUser?.role }</h4>


                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl mt-5">
                <div className="p-3">Đơn hàng gần đây</div>
            </div>
        </>
    );
};

export default Account;
