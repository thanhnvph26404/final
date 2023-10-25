import { BiBlock } from "react-icons/bi"
import { CgUnblock } from "react-icons/cg"
import { Space, Table, Popconfirm, Skeleton } from "antd";
import { useState } from "react";
import { toastSuccess, toastError } from "../../hook/toastify";
import { useBlockUserMutation, useGetUserListQuery, useUnblockUserMutation } from "../../store/Auth/Auth.services";
import { IUser } from "../../store/Auth/Auth.interface";



const UserList = () =>
{
    const [ isBlocked, setIsBlocked ] = useState( false );


    const {
        data: users,
        isLoading: isUserListLoading,
    } = useGetUserListQuery( [] );

    const [ blockuser ] =
        useBlockUserMutation();
    const [ unblockuser ] =
        useUnblockUserMutation();
    const dataSource = users?.user.map( ( { _id, name, role, orders, isBlocked }: IUser ) => ( {
        key: _id || "",
        name: name,
        role: role,
        order: orders,
        isBlocked: isBlocked,
    } ) );
    const confirms = ( id: any ) =>
    {
        try
        {
            unblockuser( id )
                .unwrap()
                .then( () =>
                {
                    toastSuccess( "Unblock người dùng thành công" );
                    setIsBlocked( true ); // Cập nhật trạng thái
                } );
        } catch ( error )
        {
            toastError( "Lỗi thực hiện thao tác" );
        }
    };

    const confirm = ( id: any ) =>
    {
        try
        {
            blockuser( id )
                .unwrap()
                .then( () =>
                {
                    toastSuccess( "Block người dùng thành công" );
                    setIsBlocked( true ); // Cập nhật trạng thái
                } );
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
            title: "Đơn hàng",
            dataIndex: "order",
            key: "order",
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

                return (
                    <span className={ roleClassName }>{ role }</span>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: ( { key: id, isBlocked }: { key: any, isBlocked: boolean } ) =>
            {
                return (
                    <Space size="middle">
                        { isBlocked ? ( // Check if the user is blocked
                            <span className="text-red-500">Blocked</span>
                        ) : (
                            <Popconfirm
                                title="Block"
                                description="Bạn có chắc muốn block người dùng này?"
                                onConfirm={ () => confirm( id ) }
                                okText="Block"
                                cancelText="Hủy"
                            >
                                <BiBlock className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                            </Popconfirm>
                        ) }
                        <Popconfirm
                            title="unBlock"
                            description="Bạn có chắc muốn unblock người dùng này?"
                            onConfirm={ () => confirms( id ) }
                            okText="unBlock"
                            cancelText="Hủy"
                        >
                            <CgUnblock className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];



    return (
        <div>
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-2xl font-semibold text-[#1D1F2C]">
                    Khách hàng
                </h1>

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
