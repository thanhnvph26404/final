import { useGetVoucherQuery } from '../../../store/Auth/Auth.services';

const Myvoucher = () =>
{
    const { data: getvoucher } = useGetVoucherQuery( null );

    return (
        <div>
            <div className="flex flex-col space-x-[20px]  mt-[20px] ml-[100px]">
                <h2 className="font-semibold text-lg ml-2 mb-2">Voucher:</h2>
                { getvoucher?.vouchers?.length === 0 ? (
                    <p>Bạn chưa có mã voucher nào.</p>
                ) : (
                    <div className="flex flex-col space-y-4 ">
                        { getvoucher?.vouchers?.map( ( voucher: any ) => (
                            <div key={ voucher?._id } className="bg-gray-200 space-x-6 rounded-full pl-[50px] text-[15px] font-medium flex w-[450px]">
                                <p>{ voucher.name }</p>
                                <div> Mã code: { voucher.code } ({ voucher.discount }%)</div>
                            </div>
                        ) ) }
                    </div>
                ) }
            </div>
        </div>
    );
};

export default Myvoucher;
