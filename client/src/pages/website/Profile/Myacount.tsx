// import { Link } from "react-router-dom";
// import { useGetUserByTokenMutation } from "../../../store/Auth/Auth.services";
// import { useEffect, useState } from "react";
// import { IUser } from "../../../store/Auth/Auth.interface";
// import { message } from "antd";

// type MyAccountProps = {
//     url: string;
//     title: string;

// };

// const MyAccount = ( { title, url, }: MyAccountProps ) =>
// {
//     const [ getUserByToken ] = useGetUserByTokenMutation(); // Sử dụng mutation để lấy thông tin người dùng sau khi cập nhật
//     const token = localStorage.getItem( "token" );

//     const [ currentUser, setCurrentUser ] = useState<IUser | null>( null );
//     useEffect( () =>
//     {
//         if ( token )
//         {
//             getUserByToken( token )
//                 .unwrap()
//                 .then( ( response ) =>
//                 {
//                     setCurrentUser( response?.data );
//                 } )
//                 .catch( ( error ) =>
//                 {
//                     message.error( error.data.message );
//                 } );
//         }
//     }, [ getUserByToken, token ] );

//     return (
//         <>
//             <div className="shadow bg-white px-4 pt-6 pb-8 rounded-xl">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-medium text-gray-800 text-lg">{ title }</h3>

//                     <Link to={ `/profile/${ url }` } className="text-rose-500">
//                         Edit
//                     </Link>
//                 </div>

//                 <div className="space-y-1">
//                     <h4 className="text-gray-700 font-medium">{ currentUser?.name }</h4>

//                     <p className="text-gray-700">{ currentUser?.email }</p>

//                     <p className="text-gray-700">{ currentUser?.phone }</p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default MyAccount;
