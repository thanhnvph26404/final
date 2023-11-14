import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { IVoucher } from "../../../store/voucher/voucher.interface"
import {
    useEditVoucherMutation,
    useGetVoucherQuery
} from "../../../store/voucher/voucher.service"
import { toastError, toastSuccess } from "../../../hook/toastify"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../../../store/hook"
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { addNewVoucher } from "../../../store/voucher/voucher"
import { Skeleton } from "antd";




const EditVoucher = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<IVoucher>();

    const [EditVoucher, { isLoading: isLoadingEditVoucher }] =
        useEditVoucherMutation();

    const {
        data: voucher,
        isLoading: isLoadingVoucher
    } = useGetVoucherQuery(id!);

    useEffect(() => {
        console.log(voucher);
        if (voucher) {
            setValue("name", voucher?.name);
           
        }
    }, [voucher]);
    const onSubmit: SubmitHandler<IVoucher> = async (data) => {
       
            const formData = {
                _id: id,
                name: data.name,
                code: data.code,
                discount: data.discount,
                limit: data.limit,
                startDate: data.startDate,
                endDate: data.endDate,
                status: data.status
                
            };
            try {
                await EditVoucher(formData)
                    .unwrap()
                    .then(() => {
                        toastSuccess("Cập nhật thành công!");
                    })
                    .then(() => {
                        dispatch(addNewVoucher(formData));
                    })
                    .then(() => {
                        navigate("/admin/vouchers");
                    });
            } catch (error) {
                toastError("Cật nhật thất bại!");
            }
        
    };

    


    return (

        <div>
            <div className=" h-10">
                <h1 className="text-2xl font-semibold ">Cập nhật danh mục</h1>
            </div>

            {isLoadingVoucher ? <Skeleton active paragraph={{ rows: 7 }} /> : <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-full border-[#E0E2E7] border rounded-lg mx-auto mt-10 bg-white p-6">
                    <h3 className="text-xl text-[#1D1F2C] font-medium mb-3.5">
                        Thông tin danh mục{" "}
                    </h3>
                    <div>
                        <h5 className="text-sm text-[#777980] font-medium">
                            Tên voucher
                        </h5>
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục ở đây..."
                            className="px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1"
                            {...register("name", {
                                required: "Tên danh mục là bắt buộc",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Tên danh mục cần tối thiểu 2 kí tư",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </div>
               
                
                {/* button */}
                <div className="h-[72px] border-t bg-white flex items-center justify-end">
                    <button className="text-white bg-[#858D9D] rounded-lg flex items-center py-2.5 px-3.5 hover:opacity-70">
                        {isLoadingEditVoucher ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            <AiOutlinePlus className="font-semibold text-base mr-1" />
                        )}{" "}
                        <p className="text-sm font-semibold">
                            Cập nhật 
                        </p>
                    </button>
                </div>
            </form>}

        </div>
    );
    
}
export default EditVoucher