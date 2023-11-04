import { LockOutlined } from '@ant-design/icons'


const CartPage = () => {
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

                    <div className="flex py-4 sm:py-8 items-center">
                        <div className="flex w-full items-center">
                            <img className="w-[96px] h-[125px] sm:w-[80px] sm:h-[100px] mr-4" src="https://polomanor.vn/cdn/shop/files/Polomanor_aopolo_Basic_Vneck_Xamnhat_1.jpg?v=1694405879&width=160" alt="" />
                            <div>
                                <a href="#">Áo Polo Nam Basic Vee Màu Xám vải Extra Soft </a>
                                <p className="text-gray-400">299.000đ</p>
                                <p className="text-gray-600 font-semibold">M</p>
                            </div>
                        </div>
                        <div className="w-1/4 sm:w-1/4 text-center mr-[55px]">
                            <div className="flex flex-col items-center">
                                <p className="mb-2 border rounded-md border-gray-600 w-[48px] sm:w-[40px] h-[38px] sm:h-[32px] text-center pt-1">1</p>
                                <button className="underline hover:text-red-500">Xóa</button>
                            </div>
                        </div>
                        <div className="w-[267px] text-center mr-[15px] hidden sm:block">
                            <p className="text-400">299.000đ</p>
                        </div>

                    </div>
                    <div className="flex py-4 sm:py-8 items-center">
                        <div className="flex w-full items-center">
                            <img className="w-[96px] h-[125px] sm:w-[80px] sm:h-[100px] mr-4" src="https://polomanor.vn/cdn/shop/files/Polomanor_aopolo_Basic_Vneck_Xamnhat_1.jpg?v=1694405879&width=160" alt="" />
                            <div>
                                <a href="#">Áo Polo Nam Basic Vee Màu Xám vải Extra Soft </a>
                                <p className="text-gray-400">299.000đ</p>
                                <p className="text-gray-600 font-semibold">M</p>
                            </div>
                        </div>
                        <div className="w-1/4 sm:w-1/4 text-center mr-[55px]">
                            <div className="flex flex-col items-center">
                                <p className="mb-2 border rounded-md border-gray-600 w-[48px] sm:w-[40px] h-[38px] sm:h-[32px] text-center pt-1">1</p>
                                <button className="underline hover:text-red-500">Xóa</button>
                            </div>
                        </div>
                        <div className="w-[267px] text-center mr-[15px] hidden sm:block">
                            <p className="text-400">299.000đ</p>
                        </div>

                    </div>

                    <hr className='my-4' />

                    {/* Các sản phẩm khác */}
                    {/* ... */}
                </div>

                <div className="w-full sm:w-1/4 mt-4 sm:mt-0">
                    <div className="border border-gray-300 rounded-md px-4 py-6 sm:px-8 sm:py-9">
                        <div className="flex justify-between text-[#A2A8B3] font-mono font-light text-lg sm:text-xl">
                            <p>Tổng phụ</p>
                            <p>299.000đ</p>
                        </div>
                        <div className="flex justify-between text-lg sm:text-xl text-[#23314B] py-4 font-semibold">
                            <p>Tổng cộng</p>
                            <p>299.000 VND</p>
                        </div>
                        <p>Phí vận chuyển (nếu có) sẽ được tính toán trong trang thanh toán.</p>
                        <textarea placeholder="Ghi chú đơn hàng" className="w-[282px] sm:w-[220px] h-[115px] sm:h-[60px] border my-4 border-gray-300 rounded-md" name="" id="" />
                        <button className="border rounded-full text-white w-[282px] sm:w-[220px] h-[62px] sm:h-[60px] bg-[#23314B]"><LockOutlined /> Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;