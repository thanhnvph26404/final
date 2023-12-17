import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { profile } from "../../../data/Profile";
// import NavProfile from "../../../components/layouts/website/NavProfile";
import Container from "../../../components/layouts/website/Container";
import { useGetUserByTokenMutation } from "../../../store/Auth/Auth.services";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../../store/Auth/Auth.interface";
import { message } from "antd";
import MenuItem from "../../../hook/MenuItems";
import { MdOutlineAccountCircle } from "react-icons/md";
import Avatar from "../../../hook/Avatar";
import { IProfile } from "../../../store/Profile/Profiles";
import { toastError } from "../../../hook/toastify";


type ProfilePageProps = {
    imageUser: string | undefined;
    profiles: IProfile[];
    path?: string;
};

const ProfilePage = ( { imageUser, path }: ProfilePageProps ) =>
{
    const location = useLocation();

    const paths = location.pathname.substring(
        location.pathname.lastIndexOf( "/" ) + 1
    );
    const [ getUserByToken ] = useGetUserByTokenMutation(); // Sử dụng mutation để lấy thông tin người dùng sau khi cập nhật
    const token = localStorage.getItem( "token" );

    const [ currentUser, setCurrentUser ] = useState<IUser | null>( null );

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
                    toastError( error.data.message );
                } );
        }
    }, [ getUserByToken, token, location ] );
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState( false );

    const toggleOpen = useCallback( () =>
    {
        setIsOpen( ( value ) => !value );
    }, [] );
    return (
        <>
            <Container>
                <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">

                    <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 pt-4 pb-16">
                        <div className="md:col-span-3 p-3">
                            <div className="px-4 py-3 shadow flex items-center justify-between flex-row gap-4 bg-white rounded-xl">
                                <div className="flex-shrink-0">
                                    <Avatar src={ imageUser } />
                                </div>

                                <div className="flex-grow hidden md:block">
                                    <p className="text-gray-600">Xin chào </p>

                                    <h4 className="text-gray-800 font-medium">{ currentUser?.name }</h4>
                                </div>

                                <div className="md:hidden block" onClick={ toggleOpen }>
                                    <MdOutlineAccountCircle size={ 30 } />
                                </div>

                                { isOpen && (
                                    <div className="z-10 absolute md:hidden top-56 right-10 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm">
                                        <div className="flex flex-col cursor-pointer">
                                            { profile.map( ( item ) => (
                                                <MenuItem
                                                    key={ item.title }
                                                    label={ item.title }
                                                    icon={ item.Icon }
                                                    active={ paths === item.url }
                                                    onClick={ () => navigate( `/profile/${ item.url }` ) }
                                                    menuDrop={ item.list }
                                                />
                                            ) ) }
                                        </div>
                                    </div>
                                ) }
                            </div>

                            <div className="hidden md:block mt-6 bg-white shadow p-4 divide-y divide-gray-200 space-y-4 text-gray-500 rounded-xl">
                                { profile.map( ( { title, Icon, list, url } ) => (
                                    <div key={ title } className="space-y-1 pl-8 py-4">
                                        <div className="relative block font-medium capitalize transition">
                                            <span className="absolute -left-8 top-0 text-base text-rose-500">
                                                <Icon size={ 25 } />
                                            </span>

                                            <Link
                                                to={ `/profile/${ url }` }
                                                className={ `font-bold
              ${ path === url ? "text-rose-500" : "" }
              `}
                                            >
                                                { title }
                                            </Link>
                                        </div>
                                        { list?.map( ( { name, url } ) => (
                                            <Link
                                                key={ name }
                                                to={ `/profile/${ url }` }
                                                className={ `relative hover:text-rose-500 block capitalize transition
                ${ path === url ? "text-rose-500" : "" }
                `}
                                            >
                                                { name }
                                            </Link>
                                        ) ) }

                                    </div>
                                ) ) }
                            </div>
                        </div>


                        <div className="md:col-span-9 p-3">

                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            </div> */}



                            <Outlet />

                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ProfilePage;
