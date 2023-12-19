import { Table, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { toastSuccess, toastError } from "../../hook/toastify";
import { useBlockUserMutation, useGetUserListQuery, useUnblockUserMutation } from "../../store/Auth/Auth.services";
import { IUser } from "../../store/Auth/Auth.interface";
import { Link } from "react-router-dom";
import { IoPencilSharp } from "react-icons/io5";

type IsBlockedStatus = { [ key: string ]: boolean };

const UserList = () =>
{
    const [ isBlocked, setIsBlocked ] = useState<IsBlockedStatus>( {} );

    const { data: users, isLoading: isUserListLoading } = useGetUserListQuery( [] );
    // console.log(users);





    const [ blockuser ] = useBlockUserMutation();
    const [ unblockuser ] = useUnblockUserMutation();
    const dataSource = users?.user.map( ( { _id, name, role, orders, isBlocked }: IUser ) => ( {
        key: _id || "",
        name: name,
        role: role,
        order: orders,
        isBlocked: isBlocked,
    } ) );



    useEffect( () =>
    {
        const storedStatus = localStorage.getItem( 'isBlockedStatus' );
        if ( storedStatus )
        {
            setIsBlocked( JSON.parse( storedStatus ) );
        }


    }, [] );

    const toggleUserStatus = ( id: any ) =>
    {
        const updatedStatus = { ...isBlocked };
        updatedStatus[ id ] = !updatedStatus[ id ];
        setIsBlocked( updatedStatus );

        // Lưu trạng thái vào localStorage
        localStorage.setItem( 'isBlockedStatus', JSON.stringify( updatedStatus ) );

        try
        {
            if ( updatedStatus[ id ] )
            {
                blockuser( id )
                    .unwrap()
                    .then( () =>
                    {
                        toastSuccess( "block người dùng thành công" );
                    } );
            } else
            {
                unblockuser( id )
                    .unwrap()
                    .then( () =>
                    {
                        toastSuccess( "unBlock người dùng thành công" );
                    } );
            }
        } catch ( error )
        {
            toastError( "Lỗi thực hiện thao tác" );
        }
    };

    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: ( role: any ) =>
            {
                const isRedText = role === "Admin";
                const isGreenText = role === "User";
                const roleClassName = isRedText ? "red-text" : isGreenText ? "green-text" : "";
                return <span className={ roleClassName }>{ role }</span>;
            },
        },
        {
            title: "Hành động  ",
            key: "action",
            render: ( { key: id }: { key: any } ) => (
                <div className="  flex  ">

                    <div className="">

                        <div
                            className={ `w-14 h-7 flex items-center rounded-full mx-3 px-1 ${ isBlocked[ id ] ? 'bg-red-500' : 'bg-gray-300'
                                }` }
                            onClick={ () => toggleUserStatus( id ) }
                        >
                            {/* Switch */ }
                            <div
                                className={ `bg-white w-5 h-5 rounded-full shadow-md transform ${ isBlocked[ id ] ? 'translate-x-7' : ''
                                    }` }
                            ></div>
                        </div>


                    </div>
                    <Link to={ `edit/${ id }` }>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-2xl font-semibold text-[#1D1F2C]">Khách hàng</h1>
            </div>
            { isUserListLoading ? (
                <Skeleton active paragraph={ { rows: 7 } } />
            ) : (
                <Table columns={ columns } dataSource={ dataSource || [] } />
            ) }
        </div>
    );
};

export default UserList;
