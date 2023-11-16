import { LockOutlined } from '@ant-design/icons'
import { useGetCartQuery } from '../../store/Auth/Auth.services';

import { useAppDispatch } from '../../store/hook';
import { addOrder } from '../../store/Order/Order.slice';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';



const CartPage = () =>
{
    const dispatch = useAppDispatch();

    const location = useLocation();

    const { data: cart, refetch } = useGetCartQuery( [] );

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                // Gọi hàm refetch để tải lại dữ liệu giỏ hàng
                await refetch();
                // Dữ liệu giỏ hàng đã được cập nhật
            } catch ( error )
            {
                // Xử lý lỗi nếu có
            }
        };

        fetchData(); // Gọi hàm fetchData khi location.pathname thay đổi
    }, [ location.pathname, refetch ] );

    return (
        <div className="p-4">
            <h1 className="text-center text-4xl sm:text-5xl py-4 font-semibold text-[#23314B]">Giỏ hàng</h1>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-3/4 px-4 sm:px-8">
                    <div className="flex mt-5">
                        <p className="hidden sm:block w-3/4 font-mono text-xl">Sản phẩm</p>
                        <p className="hidden sm:block w-1/4 text-center font-mono text-xl">Số lượng</p>
                        <p className="hidden sm:block w-[267px] sm:w-1/4 text-center font-mono text-xl">Tổng</p>
                    </div>
                    <hr className='my-4' />
                    { cart && cart?.items?.map( ( item: any, index: any ) => (

                        <div className="flex py-4 sm:py-8 items-center" key={ index }>
                            <div className="flex w-full items-center">
                                { item?.product?.images && item?.product?.images[ 0 ] && (
                                    <img
                                        className="w-[96px] h-[125px] sm:w-[80px] sm:h-[100px] mr-4"
                                        src={ item?.product?.images[ 0 ]?.url }
                                        alt=""
                                    />
                                ) }
                                <div>
                                    <a href="#">{ item.productInfo.name } </a>
                                    <p className="text-gray-400">{ item.productInfo.price }đ</p>
                                    <p className="text-gray-600 font-semibold">{ item.productVariant.size }</p>
                                    <p className="text-gray-600 font-semibold">{ item.productVariant.color }</p>

                                </div>
                            </div>
                            <div className="w-1/4 sm:w-1/4 text-center mr-[55px]">
                                <div className="flex flex-col items-center">
                                    <p className="mb-2 border rounded-md border-gray-600 w-[48px] sm:w-[40px] h-[38px] sm:h-[32px] text-center pt-1">{ item.quantity }</p>
                                    <button className="underline hover:text-red-500">Xóa</button>
                                </div>
                            </div>
                            <div className="w-[267px] text-center mr-[15px] hidden sm:block">
                                <p className="text-400">{ item.totalProduct }</p>
                            </div>

                        </div>

                    ) ) }

                    <hr className='my-4' />


                </div>

                <div className="w-full sm:w-1/4 mt-4 sm:mt-0">
                    <div className="border border-gray-300 rounded-md px-4 py-6 sm:px-8 sm:py-9">

                        <div className="flex justify-between text-lg sm:text-xl text-[#23314B] py-4 font-semibold">
                            <p>Tổng cộng</p>
                            <p>{ cart?.total } VND</p>
                        </div>
                        <p>Phí vận chuyển (nếu có) sẽ được tính toán trong trang thanh toán.</p>
                        <textarea placeholder="Ghi chú đơn hàng" className="w-[282px] sm:w-[220px] h-[115px] sm:h-[60px] border my-4 border-gray-300 rounded-md" name="" id="" />
                        <Link to="/payment">
                            <button className="border rounded-full text-white w-[282px] sm:w-[220px] h-[62px] sm:h-[60px] bg-[#23314B]" onClick={ () => dispatch( addOrder( { ...cart, total: 0 } ) ) }><LockOutlined /> Thanh toán</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;