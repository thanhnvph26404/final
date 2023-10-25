import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Table, Skeleton, Space, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useGetVoucherListQuery, useDeleteVoucherMutation } from "../../../store/voucher/voucher.service";
import {  loadVoucherList,deleteVoucher } from "../../../store/voucher/voucher";
import { toastSuccess, toastError } from "../../../hook/toastify";
import { IVoucher } from "../../../store/voucher/voucher.interface";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { IoPencilSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";




const VouCherList = () => {

    interface DataType {
        
        key: string,
        name: string,
        code: string,
        discount: string,
        limit: number,
        startDate: string,
        endDate: string,
        status: string,

    }

    const dispatch = useAppDispatch();
    const voucherState = useAppSelector(
        (state) => state.vouchers.vouchers
    )

    const { data: voucher, isLoading: isVoucherListLoading, isSuccess: isVoucherListSuccess } = useGetVoucherListQuery([]);
    const [deleteVoucherApi, { isError: isDeleteVoucherError }] = useDeleteVoucherMutation();

    const confirm = async (id: string) => {
        try {
            await deleteVoucherApi(id)
                .unwrap()
                .then(() => {
                    dispatch(deleteVoucher(id));
                })
                .then(() => {
                    toastSuccess("Xóa thành công");
                });
        } catch (error) {
            if (isDeleteVoucherError) {
                toastError("Xoá thất bại!");
            }
        }
    };

    const dataSource = voucherState?.map(
        ({ _id, name, code, discount, limit, startDate, endDate, status }: IVoucher) => ({
            key: _id || "", // Thêm kiểm tra null hoặc undefined
            name,
            code,
            discount,
            limit,
            startDate,
            endDate,
            status
        })
    );

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Limit',
            dataIndex: 'limit',
            key: 'limit',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`editVoucher/${record.key}`}>
                        <IoPencilSharp className="text-lg text-gray-85 hover:text-[#1D1F2C]" />
                    </Link>

                    <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => confirm(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <FaTrashCan className="text-lg text-gray-500 hover:text-[#1D1F2C]" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // <Table dataSource={dataSource} columns={columns} />;
    useEffect(() => {
        dispatch(loadVoucherList(voucher?.data || []));
    }, [isVoucherListSuccess]);

    return (
        <div>
            <div className="flex justify-between items-center mb-9">
                <h1 className="text-2xl font-semibold text-[#1D1F2C]">
                    Danh sách Voucher
                </h1>
                <Link
                    to={"createVoucher"}
                    className="flex items-center bg-[#1D1F2C] px-3.5 py-2.5 rounded-lg"
                >
                    <AiOutlinePlus className="text-base font-semibold text-white mr-1" />
                    <p className="text-sm font-semibold text-white">
                        Thêm voucher
                    </p>
                </Link>
            </div>
            {isVoucherListLoading ? (
                <Skeleton active paragraph={{ rows: 7 }} />
            ) : (
                <Table columns={columns} dataSource={dataSource || []} />
            )}
        </div>
    )
}
export default VouCherList;