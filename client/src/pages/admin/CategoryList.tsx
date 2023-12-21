import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import {
    useGetCategoryListQuery,
    useDeleteCategoryMutation,
} from "../../store/categoies/category.services";
import {
    loadCategoryList,
    deleteCategory,
} from "../../store/categoies/categorySlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import { ICategory } from "../../store/categoies/category.interface";

import { Space, Table, Popconfirm, Skeleton } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { Image } from "../../store/upload/upload.interface";
import { Link } from "react-router-dom";
import { toastSuccess, toastError } from "../../hook/toastify";

interface DataType {
    key: string;
    title: string;
    image: Image;
}

const CategoryList = () => {
    const dispatch = useAppDispatch();
    const categoryState = useAppSelector(
        (state) => state.categories.categories
    );

    const {
        data: category,
        isLoading: isCategoryListLoading,
        isSuccess: isCategoryListSuccess,
    } = useGetCategoryListQuery([]);
    const [deleteCategoryApi, { isError: isDeleteCategoryError }] =
        useDeleteCategoryMutation();
    const dataSource = categoryState?.map(
        ({ _id, title, image }: ICategory) => ({
            key: _id || "", // Thêm kiểm tra null hoặc undefined
            title,
            image: { uid: image?.uid || "", url: image?.url || "" }, // Đảm bảo image không bao giờ là undefined
        })
    );

    const confirm = async (id: string) => {
        try {
            await deleteCategoryApi(id)
                .unwrap()
                .then(() => {
                    dispatch(deleteCategory(id));
                })
                .then(() => {
                    toastSuccess("Xóa danh mục thành công");
                });
        } catch (error) {
            if (isDeleteCategoryError) {
                toastError("Xoá danh mục thất bại!");
            }
        }
    };

    // const cancel = (e: React.MouseEvent<HTMLElement>) => {
    //   console.log(e);
    //   message.error('Click on No');
    // };

    const columns: ColumnsType<DataType> = [
        {
            title: "Tên danh mục",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Ảnh danh mục",
            dataIndex: "image",
            key: "image",
            render: (image: Image) => (
                <div className="h-11 w-11 overflow-hidden ">
                    <img className="" src={image?.url || ""} alt="img" />
                </div>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`edit/${record.key}`}>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>

                    {/* <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => confirm(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <FaTrashCan className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Popconfirm> */}
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(loadCategoryList(category?.data || []));
    }, [isCategoryListSuccess]);

    return (
        <div>
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-2xl font-semibold text-[#1D1F2C]">
                    Danh mục
                </h1>
                <Link
                    to={"add"}
                    className="flex items-center bg-[#1D1F2C] px-3.5 py-2.5 rounded-lg"
                >
                    <AiOutlinePlus className="text-base font-semibold text-white mr-1" />
                    <p className="text-sm font-semibold text-white">
                        Thêm danh mục
                    </p>
                </Link>
            </div>
            {isCategoryListLoading ? (
                <Skeleton active paragraph={{ rows: 7 }} />
            ) : (
                <Table columns={columns} dataSource={dataSource || []} />
            )}
        </div>
    );
};

export default CategoryList;
