import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillEye } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import { Space, Table, Popconfirm, Skeleton } from "antd";
import { useEffect } from "react";
// import { Image } from "../../store/upload/upload.interface";
import { Link } from "react-router-dom";
import { toastSuccess, toastError } from "../../hook/toastify";
import { useDeleteUserMutation, useGetUserListQuery } from "../../store/Auth/Auth.services";
import { IUser } from "../../store/Auth/Auth.interface";
import { deleteUser, loaduserList } from "../../store/Auth/Auth.Slice";



const UserList = () =>
{
    const dispatch = useAppDispatch();
    const userState = useAppSelector(
        ( state ) => state.users.users
    );

    console.log( userState );

    const {
        data: users,
        isLoading: isUserListLoading,
        isSuccess: isUserListSuccess,
    } = useGetUserListQuery( [] );
    const [ deleteUsers, { isError: isDeleteUserError } ] =
        useDeleteUserMutation();
    const dataSource = userState?.map(
        ( { _id, name, role, orders }: IUser ) => ( {
            key: _id || "", // Thêm kiểm tra null hoặc undefined
            name: name,
            role: role,
            order: orders

            // Đảm bảo image không bao giờ là undefined
        } )
    );

    const confirm = async ( id: any ) =>
    {
        try
        {
            await deleteUsers( id )
                .unwrap()
                .then( () =>
                {
                    dispatch( deleteUser( id ) );
                } )
                .then( () =>
                {
                    toastSuccess( "Xóa người dùng  thành công" );
                } );
        } catch ( error )
        {
            if ( isDeleteUserError )
            {
                toastError( "Xoá người dùng  thất bại!" );
            }
        }
    };

    // const cancel = (e: React.MouseEvent<HTMLElement>) => {
    //   console.log(e);
    //   message.error('Click on No');
    // };

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
            title: "Ngày tạo",
            dataIndex: "start_date",
            key: "start_date",
        },
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "status",
            key: "status",
        },


        // {
        //     title: "Ảnh danh mục",
        //     dataIndex: "image",
        //     key: "image",
        //     render: ( image: Image ) => (
        //         <div className="h-11 w-11 overflow-hidden ">
        //             <img className="" src={ image?.url || "" } alt="img" />
        //         </div>
        //     ),
        // },
        {
            title: "Action",
            key: "action",
            render: ( { key: id }: { key: any } ) =>
            {
                return (
                    <Space size="middle" >
                        <Link to={ "" }>
                            <AiFillEye className="text-xl text-gray-85 hover:text-[#1D1F2C]" />
                        </Link>
                        <Link to={ `edit/${ id }` }>
                            <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                        </Link>

                        <Popconfirm
                            title="Xóa danh mục"
                            description="Bạn có chắc muốn xóa người dùng này?"
                            onConfirm={ () => confirm( id ) }
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <FaTrashCan className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                        </Popconfirm>
                    </Space >
                )
            },
        },
    ];
    useEffect( () =>
    {
        dispatch( loaduserList( users?.user || [] ) );
    }, [ isUserListSuccess ] );

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
