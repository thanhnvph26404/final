import { useEffect, useState } from 'react';
import { useApplycouponMutation, useCreateOrderMutation, useGetCartQuery } from '../../store/Auth/Auth.services';
import { toastSuccess } from '../../hook/toastify';

import
{
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { Select } from 'antd';


const CheckoutPage = () =>
{
    const { data: cart } = useGetCartQuery( [] );

    const [ couponApplied, setCouponApplied ] = useState( false );
    const [ createOrder ] = useCreateOrderMutation();
    const [ discountCode, setDiscountCode ] = useState( '' );
    const [ paymentMethod, setPaymentMethod ] = useState( '' );
    const [ shippingType, setShippingType ] = useState( '' );
    const [ shippingFee, setShippingFee ] = useState( 0 ); // Giá vận chuyển
    const [ voucher ] = useApplycouponMutation();
    const [ showPaypalButton, setShowPaypalButton ] = useState( false );
    const style: {
        layout?: "vertical"
        // Các thuộc tính khác nếu có
    } = { layout: "vertical" };
    const ButtonWrapper = ( { quantity, amount, showSpinner, payload }: { quantity: string, amount: any, showSpinner: boolean, payload: any } ) =>
    {
        const [ { isPending, options }, dispatch ] = usePayPalScriptReducer();
        useEffect( () =>
        {
            dispatch( {
                type: "resetOptions",
                value: {
                    ...options,
                    currency: quantity
                }
            } );
        }, [ quantity, showSpinner ] );

        // Hàm xử lý khi nhấn thanh toán PayPal
        const handlePaypal = async () =>
        {
            try
            {
                const paymentData: any = {
                    TTONL: paymentMethod === 'TTONL',
                    shippingType,
                    couponApplied,
                    payload// Use the couponApplied state value
                    // Other necessary information such as Address...
                };

                const calculatedTotalAmount = couponApplied ? cart?.totalAfterDiscount + shippingFee : cart?.total + shippingFee;

                const response = await createOrder( { ...paymentData, calculatedTotalAmount } );
                console.log( response );
            } catch ( error )
            {
                console.log( error );
            }
        };

        return (
            <>
                { ( showSpinner && isPending ) && <div className="spinner" /> }
                <PayPalButtons
                    style={ style }
                    disabled={ false }
                    forceReRender={ [ style, amount.currency ] }
                    fundingSource={ undefined }
                    createOrder={ ( data, actions ) =>
                        actions.order.create( {
                            purchase_units: [ { amount: { currency_code: quantity, value: amount } } ]
                        } ).then( userId => userId )
                    }
                    onApprove={ ( data, actions ) =>
                        actions.order?.capture().then( async ( response ) =>
                        {
                            console.log( response );
                            if ( response?.status === "COMPLETED" )
                            {
                                handlePaypal();
                                console.log( "Order completed:", response );
                                console.log( payload );
                            } else
                            {
                                console.error( "Order not completed:", response );
                                // Xử lý khi capture không thành công ở đây
                            }
                        } ).then( () => undefined ) // Đảm bảo hàm onApprove trả về một Promise<void>
                    }
                />
            </>
        );
    }

    const Paypal = ( { amount, payload }: any ) =>
    {
        return (
            <div style={ { maxWidth: "750px", minHeight: "200px" } }>
                <PayPalScriptProvider options={ { clientId: "test", components: "buttons", currency: "USD" } }>
                    <ButtonWrapper payload={ payload } quantity={ "USD" } amount={ amount } showSpinner={ false } />
                </PayPalScriptProvider>
            </div>
        );
    }



    useEffect( () =>
    {
        if ( paymentMethod === 'TTONL' )
        {
            setShowPaypalButton( true );
        } else
        {
            setShowPaypalButton( false );
        }
    }, [ paymentMethod ] );

    const totalAmount = couponApplied ? cart?.totalAfterDiscount + shippingFee : cart?.total + shippingFee;

    const handlePaymentMethodChange = ( method: any ) =>
    {
        setPaymentMethod( method );
    };
    const handleApplyCoupon = async () =>
    {
        try
        {
            const response: any = await voucher( { voucher: discountCode } );
            if ( response.error )
            {
                console.error( 'Coupon application failed:', response.error );
                // Display an error message to the user
            } else
            {
                console.log( 'Coupon applied successfully:', response.data );
                // Update UI to reflect the successful application
                toastSuccess( 'Coupon applied successfully!' );
                setCouponApplied( true ); // Set couponApplied to true upon successful application
            }
        } catch ( error )
        {
            console.error( 'Error applying coupon:', error );
            // Display an error message to the user
        }
    };
    const calculateTotalAmount = () =>
    {
        // Tính toán tổng số tiền sau khi chọn phương thức vận chuyển và áp dụng mã giảm giá
        let total = couponApplied ? cart?.totalAfterDiscount : cart?.total;
        total += shippingFee;
        return total

    };

    const handleCheckout = async () =>
    {

        try
        {
            const paymentData: any = {
                COD: paymentMethod === 'COD',
                shippingType,
                couponApplied, // Use the couponApplied state value
                // Other necessary information such as Address...
            };

            const calculatedTotalAmount = calculateTotalAmount()
            console.log( calculatedTotalAmount );

            const response = await createOrder( { ...paymentData, calculatedTotalAmount } );
            console.log( 'Created order:', response );
            // Update UI or display success message...
        } catch ( error )
        {
            console.error( 'Error creating order:', error );
            // Display an error message to the user
        }
    };
    const handleShippingChange = ( e: any ) =>
    {
        const selectedShippingType = e.target.value;
        setShippingType( selectedShippingType );

        // Áp dụng giá vận chuyển tương ứng
        if ( selectedShippingType === 'standard' )
        {
            setShippingFee( 30 ); // Giá vận chuyển cho giao hàng tiêu chuẩn
        } else if ( selectedShippingType === 'express' )
        {
            setShippingFee( 50 ); // Giá vận chuyển cho giao hàng hỏa tốc
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
                        options={ [
                            { value: 'vietnam', label: 'Việt Nam' }
                        ] }
                    />
                    <div className="mt-5">
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="email" value={ cart?.userId?.email } // Hiển thị email
                            placeholder="email" />
                        <input className="w-[274px] max-sm:mt-3 max-sm:w-[360px] h-[48px] rounded-md border border-gray-400 sm:ml-4" value={ cart?.userId?.name } // Hiển thị email
                            type="text" placeholder="  Tên" />
                    </div>
                    <div className='mt-5'>
                        <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 " value={ cart?.userId?.address } // Hiển thị email
                            type="text" placeholder="  Địa chỉ" />
                    </div>

                    <div className="mt-5">
                        <input className="w-[274px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400" type="text" name="Address" value={ cart?.Address } placeholder="  Thành phố" />
                        <input className="w-[274px] h-[48px] max-sm:mt-3 max-sm:w-[360px] rounded-md border border-gray-400 sm:ml-4" type="text" placeholder="  Nhập 000, áp dụng cho mọi tỉnh thành" />
                    </div>
                    <input className="w-[564px] h-[48px] max-sm:w-[360px] rounded-md border border-gray-400 mt-5" type="text" value={ cart?.userId?.phone } // Hiển thị email
                        placeholder="  Điện thoại" />
                    <h2 className="mt-5 text-xl font-semibold">Phương thức vận chuyển</h2>
                    <label htmlFor='standardShipping' className={ `radio-button flex py-3 ` } >

                        <input
                            id='standardShipping'
                            type='radio'
                            name='shippingType'
                            checked={ shippingType === 'standard' }
                            readOnly
                            onChange={ handleShippingChange }

                            value='standard'
                        />
                        <div className="border rounded-md border-black  flex justify-between sm:w-[565px] h-[55px] items-center bg-[#F5F6FB] ">

                            <p className="ml-4 max-sm:w-[360px]">Giao hàng tiết kiệm</p>
                            <p className="mr-4 font-semibold">30đ</p>
                        </div>
                    </label>
                    <label htmlFor='expressShipping' className={ `radio-button flex ` } >

                        <input
                            type="radio"
                            id="expressShipping"
                            name="shippingType"
                            value="express"
                            checked={ shippingType === 'express' }
                            onChange={ handleShippingChange }
                        />
                        <div className="border rounded-md border-black  flex justify-between sm:w-[565px] h-[55px] items-center bg-[#F5F6FB] ">

                            <p className="ml-4 max-sm:w-[360px]">Giao hàng hỏa tốc</p>
                            <p className="mr-4 font-semibold">50đ</p>
                        </div>
                    </label>
                    <h2 className="mt-5 text-xl font-semibold ">Thanh toán</h2>
                    <p className="text-gray-600">Toàn bộ các giao dịch được bảo mật và mã hóa.</p>
                    <div className='w-[40%]'>
                        <div className=''>
                            <div className='method-list '>
                                <label htmlFor='cod' className={ `radio-button flex py-3 ${ paymentMethod === 'COD' ? 'selected' : '' }` } onClick={ () => handlePaymentMethodChange( 'COD' ) }
                                >

                                    <input
                                        id='cod'
                                        type='radio'
                                        name='payment-method'
                                        checked={ paymentMethod === 'COD' }
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
                                    htmlFor='TTONL'
                                    className={ `radio-button flex py-3 ${ paymentMethod === 'TTONL' ? 'selected' : '' }` }
                                    onClick={ () => handlePaymentMethodChange( 'TTONL' ) }
                                >
                                    <input
                                        id='TTONL'
                                        type='radio'
                                        name='payment-method'
                                        readOnly
                                        value='TTONL'
                                    />
                                    <span className='ml-3 my-auto'></span>
                                    <span className='label flex my-auto'>
                                        <div className='style-label flex align-center'>
                                            <img
                                                className='method-icon mr-[12px] w-[32px] h-[32px]'
                                                src='https://tse1.mm.bing.net/th?id=OIP.wBKSzdf1HTUgx1Ax_EecKwHaHa&pid=Api&P=0&h=220'
                                                alt='icon'
                                            />
                                            <div className='method-content'>
                                                <div className='w-[370px] mt-[10px]'>
                                                    <span>Thanh toán bằng Paypal</span>
                                                </div>


                                            </div>
                                        </div>
                                    </span>
                                </label>
                                <div className='w-[566px] '>
                                    {
                                        showPaypalButton ? (
                                            <Paypal className="  max-sm:w-[360px] w-[566px] h-[55px] mt-5" payload={ { items: cart?.items, total: totalAmount, totalAfterDiscount: cart?.totalAfterDiscount, } } amount={ totalAmount } />
                                        ) : (
                                            <button onClick={ handleCheckout } className="border bg-[#23314B] max-sm:w-[360px] text-white w-[566px] h-[55px] mt-5 rounded-md hover:bg-blue-500">Hoàn tất đơn hàng</button>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="border-l-2 border-gray-200 sm:ml-4 pl-4 sm:w-[50%] bg-[#F5F5F5] ">
                <div className="mt-4">
                    { cart?.items?.map( ( item: any, index: any ) => (
                        <div key={ index } className="flex items-center p-2">
                            <img className="w-[64px] h-[64px] border rounded-md border-gray-300" src={ item.product.images[ 0 ].url } alt="" />
                            <div className="ml-4 mr-4 w-[50%]">
                                <p>{ item.product.name }</p>
                                <p>{ item.productVariant.size }</p>
                                <p>{ item.productVariant.color }</p>
                            </div>
                            <div className="w-1/4 sm:w-1/4 text-center ">
                                <div className="flex flex-col items-center">
                                    <p className="mb-2 border rounded-md border-gray-600 w-[48px] sm:w-[40px] h-[38px] sm:h-[32px] text-center pt-1">{ item.quantity }</p>
                                </div>
                            </div>
                            <p className='max-sm:mr-2'>{ item.productInfo.price }₫</p>


                        </div>
                    ) ) }

                </div>
                <div className='max-sm:flex max-sm:items-center max-sm:mt-5 max-sm:justify-between'>

                    <input
                        type="text"
                        placeholder="  Mã giảm giá"
                        value={ discountCode }
                        onChange={ ( e ) => setDiscountCode( e.target.value ) } // Capture the input value
                        className="rounded-md sm:mt-5 sm:w-[270px] h-[48px] border border-gray-200"
                    />

                    <button
                        onClick={ handleApplyCoupon }
                        className="border rounded-md border-gray-400 sm:ml-4 h-[48px] max-sm:mr-3 sm:w-[85px] bg-[#EDEDED]"
                    >
                        Áp dụng
                    </button>
                </div>

                <div className="mt-6 w-[72.5%] max-sm:m-auto max-sm:mt-6">


                    <div className="flex justify-between">
                        <p>Vận chuyển</p>
                        <p>{ shippingFee } đ</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-mono text-xl">Tổng</p>
                        <p className="font-semibold">{ totalAmount } đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage