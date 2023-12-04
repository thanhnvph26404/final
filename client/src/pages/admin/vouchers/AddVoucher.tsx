import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../store/hook"
import { SubmitHandler, useForm } from "react-hook-form"
import { IVoucher } from "../../../store/voucher/voucher.interface"
import { useAddVoucherMutation } from "../../../store/voucher/voucher.service"
import { toastError, toastSuccess } from "../../../hook/toastify"
import { addNewVoucher } from "../../../store/voucher/voucher"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"


const AddVoucher = () =>
{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<IVoucher>()
    const [ addVoucher, { isLoading: isLoadingVoucher } ] = useAddVoucherMutation()


    const onSubmit: SubmitHandler<IVoucher> = async ( data ) =>
    {
        const formData = {
            name: data.name,
            code: data.code,
            discount: data.discount,
            limit: data.limit,
            startDate: data.startDate,
            endDate: data.endDate,
            minimumOrderAmount: data.minimumOrderAmount,
            status: data.status
        }
        try
        {
            await addVoucher( formData ).unwrap().then( () =>
            {
                toastSuccess( 'Thêm voucher thành công' )
            } ).then( () =>
            {
                dispatch( addNewVoucher( formData ) )
            } ).then( () =>
            {
                navigate( '/admin/vouchers' )
            } )
        } catch ( error )
        {
            toastError( 'Thêm voucher thất bại' )
        }

    }



    return (
        <div>

            <div className=" h-10">
                <h1 className="text-2xl font-semibold ">Thêm voucher</h1>

            </div>
            <form action="" onSubmit={ handleSubmit( onSubmit ) }>
                <div className='max-w-full border-[#E0E2E7] border rounded-lg mx-auto mt-10 bg-white p-6'>
                    <h3 className='text-xl text-[#1D1F2C] font-medium mb-3.5'>Thông tin voucher </h3>
                    {/* Tên voucher */ }
                    <div>
                        <h5 className='text-sm text-[#777980] font-medium'>Tên voucher</h5>
                        <input type="text" placeholder='Nhập tên voucher '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'name', {
                                required: 'Tên voucher là bắt buộc',
                                minLength: {
                                    value: 3,
                                    message: 'Tên voucher cần tối thiểu 3 kí tư',
                                },
                            } ) } />
                        { errors.name && <p className='text-red-500'>{ errors.name.message }</p> }
                    </div>
                    {/* Mã code voucher */ }
                    <div>
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Mã Code</h5>
                        <input type="text" placeholder='Nhập mã code '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'code', {
                                required: 'Mã code là bắt buộc',
                                minLength: {
                                    value: 6,
                                    message: 'Mã voucher cần tối thiểu 6 kí tư',
                                },
                            } ) } />
                        { errors.code && <p className='text-red-500'>{ errors.code.message }</p> }
                    </div>
                    {/* Discount */ }
                    <div>
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Giảm Giá</h5>
                        <input type="text" placeholder='Nhập mã giảm giá'
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'discount', {
                                required: 'Mã giảm giá bắt buộc nhập',
                                minLength: {
                                    value: 2,
                                    message: 'Mã giảm giá cần tối thiểu 2 kí tư',
                                },
                            } ) } />
                        { errors.discount && <p className='text-red-500'>{ errors.discount.message }</p> }
                    </div>
                    {/* Limit */ }
                    <div>
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Số lượng giới hạn ( Limit )</h5>
                        <input type="number" placeholder='Nhập Số lượng giới hạn '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'limit', {
                                required: 'Số lượng giới hạn bắt buộc nhập ',
                            } ) } />
                        { errors.limit && <p className='text-red-500'>{ errors.limit.message }</p> }
                    </div>
                    {/* Ngày bắt đầu */ }
                    <div>
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Ngày bắt đầu</h5>
                        <input type="date" placeholder='Nhập ngày bắt đầu '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'startDate', {
                                required: 'Ngày bắt đầu bắt buộc nhập',
                                minLength: {
                                    value: 4,
                                    message: 'Ngày bắt đầu cần tối thiểu 4 kí tư',
                                },
                            } ) } />
                        { errors.startDate && <p className='text-red-500'>{ errors.startDate.message }</p> }
                    </div>
                    {/* Ngày kết thúc */ }
                    <div className="mb-4">
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Ngày kết thúc</h5>
                        <input type="date" placeholder='Nhập ngày kết thúc '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'endDate', {
                                required: 'Ngày kết thúc bắt buộc nhập',
                                minLength: {
                                    value: 4,
                                    message: 'Tên voucher cần tối thiểu 4 kí tư',
                                },
                            } ) } />

                        { errors.endDate && <p className='text-red-500'>{ errors.endDate.message }</p> }
                    </div>
                    <div className="mb-4">
                        <h5 className='text-sm text-[#777980] font-medium mt-4'>Giới hạn tiền </h5>
                        <input type="number" placeholder='giới hạn tiền  '
                            className='px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1'
                            { ...register( 'minimumOrderAmount', {
                                required: 'Ngày kết thúc bắt buộc nhập',
                                minLength: {
                                    value: 4,
                                    message: 'Tên voucher cần tối thiểu 4 kí tư',
                                },
                            } ) } />

                        { errors.minimumOrderAmount && <p className='text-red-500'>{ errors.minimumOrderAmount.message }</p> }
                    </div>
                </div>


                {/* button */ }
                <div className='h-[72px] border-t bg-white flex items-center justify-end'>
                    <button className='text-white bg-[#858D9D] rounded-lg flex items-center py-2.5 px-3.5 hover:opacity-70'>{ isLoadingVoucher ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiOutlinePlus className='font-semibold text-base mr-1' /> } <p className='text-sm font-semibold'>Thêm voucher</p></button>
                </div>
            </form>
        </div>
    )
}
export default AddVoucher