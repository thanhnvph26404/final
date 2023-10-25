import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineAccountCircle } from "react-icons/md";

import { IProfile } from "../../../store/Profile/Profiles";
import Avatar from "../../../hook/Avatar";
import MenuItem from "../../../hook/MenuItems";


type NavProfileProps = {
    nameUser: string | undefined;
    imageUser: string | undefined;
    profile: IProfile[];
    path?: string;
};

const NavProfile = ( {
    nameUser,
    imageUser,
    path,
    profile,
}: NavProfileProps ) =>
{
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState( false );

    const toggleOpen = useCallback( () =>
    {
        setIsOpen( ( value ) => !value );
    }, [] );

    return (
        <>
            <div className="px-4 py-3 shadow flex items-center justify-between flex-row gap-4 bg-white rounded-xl">
                <div className="flex-shrink-0">
                    <Avatar src={ imageUser } />
                </div>

                <div className="flex-grow hidden md:block">
                    <p className="text-gray-600">Hello</p>

                    <h4 className="text-gray-800 font-medium">{ nameUser }</h4>
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
                                    active={ path === item.url }
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
        </>
    );
};

export default NavProfile;
