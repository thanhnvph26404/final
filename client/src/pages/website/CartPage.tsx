import { CodeSandboxOutlined, LockOutlined } from '@ant-design/icons'
import { Select } from 'antd'


const CartPage = () => {
    return (
        <div>
            <h1 className="text-center text-5xl py-4 font-semibold text-[#23314B]">Giỏ hàng</h1>
            <div className="flex">
                <div className="w-[70%] px-28">
                    <div className="flex mt-5">
                        <p className="w-[524px] font-mono text-xl">Sản phẩm</p>
                        <p className="w-[82px] text-center font-mono text-xl">Số lượng</p>
                        <p className="w-[267px] text-center font-mono text-xl">Tổng</p>
                    </div>
                    <hr className='my-6' />
                    {/*  */}
                    <div className="flex py-9 items-center">
                        <div className="flex w-[524px] items-center">
                            <img className="w-[96px] h-[125px] mr-4" src="https://polomanor.vn/cdn/shop/files/Polomanor_aopolo_Basic_Vneck_Xamnhat_1.jpg?v=1694405879&width=160" alt="" />
                            <div>
                                <a href="#">Áo Polo Nam Basic Vee Màu Xám vải Extra Soft phom Regular Fit</a>
                                <p className="text-gray-400">299.000đ</p>
                                <p className="text-gray-600 font-semibold">M</p>
                            </div>
                        </div>
                        <div className="w-[82px] text-center">
                            <p className="ml-4 border  rounded-md border-gray-600 w-[48px] h-[38px] text-center pt-1">1</p>
                            <button className="underline hover:text-red-500 ">Xóa</button>
                        </div>
                        <div className="w-[267px] text-center">
                            <p>299.000đ</p>
                        </div>
                    </div>
                    <hr className='my-6' />

                    <div className="flex py-9 items-center">
                        <div className="flex w-[524px] items-center">
                            <img className="w-[96px] h-[125px] mr-4" src="https://polomanor.vn/cdn/shop/files/Polomanor_aopolo_Basic_Vneck_Xamnhat_1.jpg?v=1694405879&width=160" alt="" />
                            <div>
                                <a href="#">Áo Polo Nam Basic Vee Màu Xám vải Extra Soft phom Regular Fit</a>
                                <p className="text-gray-400">299.000đ</p>
                                <p className="text-gray-600 font-semibold">M</p>
                            </div>
                        </div>
                        <div className="w-[82px] text-center">
                            <p className="ml-4 border  rounded-md border-gray-600 w-[48px] h-[38px] text-center pt-1">1</p>
                            <button className="underline hover:text-red-500 ">Xóa</button>
                        </div>
                        <div className="w-[267px] text-center">
                            <p>299.000đ</p>
                        </div>
                    </div>
                    <hr className='my-6' />
                    <div>
                        <h2 className="text-2xl font-semibold text-[#23314B]"><CodeSandboxOutlined /> Chi phí vận chuyển ước tính</h2>
                        <div className="mt-4">
                            <Select

                                defaultValue="vietnam"
                                style={{ width: 141, height: 60 }}
                                options={[
                                    { value: 'vietnam', label: 'Việt Nam' },
                                ]}
                            />
                            <input type="text" placeholder=" Mã bưu điện" className=" ml-4 w-[120px] h-[60px] border border-gray-300 rounded-md" />
                            <button className="border ml-4 bg-[#C6924D] w-[136px] h-[60px] rounded-full">Ước tính</button>
                        </div>
                    </div>
                    <hr className='my-6' />

                </div>


                <div className="w-[30%]">
                    <div className="border border-gray-300 rounded-md w-[380px] h-[460px] px-14 py-9">
                        <div className="flex justify-between text-[#A2A8B3] font-mono font-light text-xl">
                            <p>tổng phụ</p>
                            <p>299.000đ</p>
                        </div>
                        <div className="flex justify-between text-2xl text-[#23314B] py-4 font-semibold">
                            <p>Tổng cộng</p>
                            <p>299.000 VND</p>
                        </div>
                        <p>Phí vận chuyển (nếu có) sẽ được tính toán trong trang thanh toán.</p>
                        <textarea placeholder="Ghi chú đơn hàng" className="w-[282px] h-[115px] border my-4 border-gray-300 rounded-md" name="" id="" ></textarea>
                        <button className="border rounded-full text-white w-[282px] h-[62px] bg-[#23314B]"><LockOutlined /> Thanh toán</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartPage