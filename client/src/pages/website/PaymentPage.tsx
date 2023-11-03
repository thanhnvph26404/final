import { Select } from 'antd'
const PaymentPage = () => {
    return (
        <div className="sm:flex max-sm:w-[360px] m-auto max-sm:mb-4" >
            <div className="sm:w-[50%]">
                <div className="sm:ml-[160px]">
                    <h1 className="text-3xl my-4 font-semibold max-sm:text-center">Giao hàng</h1>
                    <Select
                        className='sm:w-[566px] sm:h-[50px] max-sm:w-[360px]'
                        defaultValue="vietnam"
                        // style={{ width: 566, height: 50 }}
                        options={[
                            { value: 'vietnam', label: 'Việt Nam' }
                        ]}
                    />
                    <div className="mt-5">
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="text" placeholder="  Họ(không bắt buộc)" />
                        <input className="w-[274px] max-sm:mt-3 max-sm:w-[360px] h-[48px] rounded-md border border-gray-400 sm:ml-4" type="text" placeholder="  Tên" />
                    </div>
                    <div className='mt-5'>
                        <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 " type="text" placeholder="  Địa chỉ" />
                        <input className="w-[564px] max-sm:mt-3 max-sm:w-[360px] h-[48px] rounded-md border border-gray-400 " type="text" placeholder="  Căn hộ, phòng, v.v. (không bắt buộc)" />
                    </div>

                    <div className="mt-5">
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="text" placeholder="  Thành phố" />
                        <input className="w-[274px] h-[48px] max-sm:mt-3 max-sm:w-[360px] rounded-md border border-gray-400 sm:ml-4" type="text" placeholder="  Nhập 000, áp dụng cho mọi tỉnh thành" />
                    </div>
                    <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 mt-5" type="text" placeholder="  Điện thoại" />
                    <h2 className="mt-5 text-xl font-semibold">Phương thức vận chuyển</h2>
                    <div className="border rounded-md border-black mt-5 flex justify-between sm:w-[565px] h-[55px] items-center bg-[#F5F6FB] ">
                        <p className="ml-4 max-sm:w-[360px]">Giao hàng tiết kiệm</p>
                        <p className="mr-4 font-semibold">30.000đ</p>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold ">Thanh toán</h2>
                    <p className="text-gray-600">Toàn bộ các giao dịch được bảo mật và mã hóa.</p>
                    <div className='w-[40%]'>
                        <div className=''>
                            <div className='method-list '>
                                <label htmlFor='cod' className='radio-button flex py-3'>
                                    <input
                                        type='radio'
                                        name='payment-method'
                                        readOnly
                                        value='cod'
                                    />
                                    <span className='ml-3 my-auto'></span>
                                    <span className='label flex my-auto'>
                                        <div className='style-label flex align-center'>
                                            <img
                                                className='method-icon mr-[12px] w-[32px] h-[32px]'
                                                src='https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png'
                                                alt='icon'
                                            />
                                            <div className='method-content'>
                                                <div className='w-[370px] mt-[10px]'>
                                                    <span>Thanh toán tiền mặt khi nhận hàng</span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </label>
                                <label htmlFor='vnpay' className='radio-button flex'>
                                    <input
                                        type='radio'
                                        name='payment-method'
                                        readOnly
                                        value='vnpay'
                                    />
                                    <span className='ml-3 my-auto'></span>
                                    <span className='label flex my-auto'>
                                        <div className='style-label flex align-center'>
                                            <img
                                                className='method-icon mr-[12px] w-[32px] h-[32px]'
                                                src='https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png'
                                                alt='icon'
                                            />
                                            <div className='method-content'>
                                                <div className='w-[370px] mt-[10px]'>
                                                    <span>Thanh toán bằng VNPAY</span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button className="border bg-[#23314B] max-sm:w-[360px] text-white w-[566px] h-[55px] mt-5 rounded-md hover:bg-blue-500">Hoàn tất đơn hàng</button>
                </div>

            </div>

            <div className="border-l-2 border-gray-200 sm:ml-4 pl-4 sm:w-[50%] bg-[#F5F5F5] ">
                <div className="mt-4">
                    <div className="flex items-center">
                        <img className="w-[64px] h-[64px] border rounded-md border-gray-300" src="https://cdn.shopify.com/s/files/1/0685/2237/7522/files/Polomanor_aopolo_Basic_Vneck_Xamnhat_1_64x64.jpg?v=1694405879" alt="" />
                        <div className="ml-4 mr-4 w-[50%]">
                            <p>Áo Polo Nam Basic Vee Màu Xám vải Extra Soft phom Regular Fit</p>
                            <p>M</p>
                        </div>
                        <p className='max-sm:mr-2'>299.000₫</p>
                    </div>

                </div>
                <div className='max-sm:flex max-sm:items-center max-sm:mt-5 max-sm:justify-between'>
                    <input type="text" placeholder="  Mã giảm giá" className="rounded-md sm:mt-5 sm:w-[270px] h-[48px] border border-gray-200" />
                    <button className="border rounded-md border-gray-400 sm:ml-4 h-[48px] max-sm:mr-3 sm:w-[85px] bg-[#EDEDED]" >Áp dụng</button>
                </div>

                <div className="mt-6 w-[72.5%] max-sm:m-auto max-sm:mt-6">
                    <div className="flex justify-between">
                        <p>Tổng phụ</p>
                        <p className="font-semibold">299.000 đ</p>
                    </div>

                    <div className="flex justify-between">
                        <p>Vận chuyển</p>
                        <p>30.000 đ</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-mono text-xl">Tổng</p>
                        <p className="font-semibold">299.000 đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage