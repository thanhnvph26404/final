import { useGetVoucherQuery } from '../../../store/Auth/Auth.services';

const Myvoucher = () =>
{
    const { data: getvoucher } = useGetVoucherQuery( null );

    return (
        <div>
            <div className="flex flex-col mt-6 ml-4 space-x-[20px] mt-[20px] ml-[100px]">
                <h2 className="font-semibold text-lg ml-2 mb-2">Voucher:</h2>
                { getvoucher?.vouchers?.length === 0 ? (
                    <p>Bạn chưa có mã voucher nào.</p>
                ) : (
                    <div className="flex space-x-2 flex-wrap">
                        { getvoucher?.vouchers?.map( ( voucher: any ) => (
                            <div key={ voucher?._id } className="bg-gray-200 flex-wrap rounded-full p-2 text-sm font-medium flex items-center">
                                <p>{ voucher.name }</p>
                                <div> Mã code: { voucher.code } ({ voucher.discount } %)</div>
                            </div>
                        ) ) }
                    </div>
                ) }
            </div>
        </div>
    );
};

export default Myvoucher;
