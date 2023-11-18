import { Select } from 'antd'
import { useCreateOrderMutation, useGetCartQuery } from '../../store/Auth/Auth.services'
import { useState } from 'react';
import { toastSuccess } from '../../hook/toastify';
const CheckoutPage = () => {

    const { data: cart } = useGetCartQuery([]);
    console.log(cart);

    const [createOrder] = useCreateOrderMutation(); // Sử dụng useCreateOrderMutation để gọi hàm creatOrder
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(''); // Khởi tạo giá trị ban đầu là trống
    const [shippingFee, setShippingFee] = useState(30000); // Khởi tạo phí vận chuyển là 30,000đ
    const totalAmount = cart?.total + shippingFee;

    const handlePaymentMethodChange = (method: any) => {
        setPaymentMethod(method);
    };
    const handleCheckout = async () => {
        try {
            const paymentData: any = {
                COD: paymentMethod === 'COD',
                discountCode,
                shippingFee, // Gửi thông tin phí vận chuyển đi cùng đơn hàng
                // Thêm các thông tin khác cần thiết như địa chỉ giao hàng,...
            };

            // Tính toán tổng số tiền cần thanh toán
            const totalAmount = cart?.total + shippingFee;

            // Gọi hàm createOrder từ Authservice để tạo đơn hàng
            const response = await createOrder({ ...paymentData, totalAmount });
            console.log('Created order:', response);
            if (paymentMethod === 'COD') {
                // Navigate to the success page for COD
                // Replace '/success-cod' with the actual URL you want to navigate to
                window.location.href = '/OrderSuccess';
            } else if (paymentMethod === 'vnpay') {
                // Navigate to the failure page for VNPAY
                // Replace '/failure-vnpay' with the actual URL you want to navigate to
                window.location.href = '/failure-vnpay';
            }
            // Có thể thực hiện các hành động cập nhật UI, hiển thị thông báo thành công,...
        } catch (error) {
            // Xử lý lỗi khi gửi yêu cầu tạo đơn hàng
            console.error('Error creating order:', error);
            // Có thể hiển thị thông báo lỗi, cập nhật UI để thông báo lỗi,...
        }
    };
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
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="email" value={cart?.userId?.email} // Hiển thị email
                            placeholder="email" />
                        <input className="w-[274px] max-sm:mt-3 max-sm:w-[360px] h-[48px] rounded-md border border-gray-400 sm:ml-4" value={cart?.userId?.name} // Hiển thị email
                            type="text" placeholder="  Tên" />
                    </div>
                    <div className='mt-5'>
                        <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 " value={cart?.userId?.address} // Hiển thị email
                            type="text" placeholder="  Địa chỉ" />
                    </div>

                    <div className="mt-5">
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="text" name="Address" value={cart?.Address} placeholder="  Thành phố" />
                        <input className="w-[274px] h-[48px] max-sm:mt-3 max-sm:w-[360px] rounded-md border border-gray-400 sm:ml-4" type="text" placeholder="  Nhập 000, áp dụng cho mọi tỉnh thành" />
                    </div>
                    <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 mt-5" type="text" value={cart?.userId?.phone} // Hiển thị email
                        placeholder="  Điện thoại" />
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
                                <label htmlFor='cod' className={`radio-button flex py-3 ${paymentMethod === 'COD' ? 'selected' : ''}`} onClick={() => handlePaymentMethodChange('COD')}
                                >

                                    <input
                                        id='cod'
                                        type='radio'
                                        name='payment-method'
                                        checked={paymentMethod === 'COD'}
                                        readOnly
                                        value='COD'
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
                                <label
                                    htmlFor='vnpay'
                                    className={`radio-button flex py-3 ${paymentMethod === 'vnpay' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentMethodChange('vnpay')}
                                >
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

                    <button onClick={handleCheckout} className="border bg-[#23314B] max-sm:w-[360px] text-white w-[566px] h-[55px] mt-5 rounded-md hover:bg-blue-500">Hoàn tất đơn hàng</button>
                </div>

            </div>

            <div className="border-l-2 border-gray-200 sm:ml-4 pl-4 sm:w-[50%] bg-[#F5F5F5] ">
                <div className="mt-4">
                    {cart?.items?.map((item: any, index: any) => (
                        <div key={index} className="flex items-center p-2">
                            <img className="w-[64px] h-[64px] border rounded-md border-gray-300" src={item.product.images[0].url} alt="" />
                            <div className="ml-4 mr-4 w-[50%]">
                                <p>{item.product.name}</p>
                                <p>{item.productVariant.size}</p>
                                <p>{item.productVariant.color}</p>
                            </div>
                            <div className="w-1/4 sm:w-1/4 text-center ">
                                <div className="flex flex-col items-center">
                                    <p className="mb-2 border rounded-md border-gray-600 w-[48px] sm:w-[40px] h-[38px] sm:h-[32px] text-center pt-1">{item.quantity}</p>
                                </div>
                            </div>
                            <p className='max-sm:mr-2'>{item.productInfo.price}₫</p>


                        </div>
                    ))}

                </div>
                <div className='max-sm:flex max-sm:items-center max-sm:mt-5 max-sm:justify-between'>
                    <input type="text" placeholder="  Mã giảm giá" onChange={(e) => setDiscountCode(e.target.value)} className="rounded-md sm:mt-5 sm:w-[270px] h-[48px] border border-gray-200" />
                    <button className="border rounded-md border-gray-400 sm:ml-4 h-[48px] max-sm:mr-3 sm:w-[85px] bg-[#EDEDED]" >Áp dụng</button>
                </div>

                <div className="mt-6 w-[72.5%] max-sm:m-auto max-sm:mt-6">


                    <div className="flex justify-between">
                        <p>Vận chuyển</p>
                        <p>30.000 đ</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-mono text-xl">Tổng</p>
                        <p className="font-semibold">{totalAmount} đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage