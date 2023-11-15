// import express from "express"
// import { Vnpay, VnpaySuccess } from "../controllers/payment";
// const router = express.Router();

// // app.post( '/vnpay_callback', ( req, res ) =>
// // {
// //     // Xử lý callback từ VNPAY ở đây
// //     console.log( 'Callback Data:', req.body );
// //     res.send( 'OK' );
// // } );
// // app.get( '/initiate_payment', ( req, res ) =>
// // {
// //     // Thông tin từ VNPAY
// //     const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
// //     const returnUrl = 'http://localhost:8080/payment/vnpay_callback'; // Đặt đúng đường dẫn callback của bạn
// //     const tmnCode = 'Q248BRNA';
// //     const secretKey = 'BTHMOOFQWXHUGTGHGEHUHWLFVIOOXCUO';

// //     // Dữ liệu thanh toán
// //     const data = {
// //         vnp_Version: '2.0.0',
// //         vnp_TmnCode: tmnCode,
// //         vnp_Amount: 100000, // Số tiền thanh toán (đơn vị là VND)
// //         vnp_Command: 'pay',
// //         vnp_CreateDate: new Date().toISOString(),
// //         vnp_CurrCode: 'VND',
// //         vnp_IpAddr: req.ip,
// //         vnp_Locale: 'vn',
// //         vnp_OrderInfo: 'Mô tả đơn hàng của bạn',
// //         vnp_OrderType: 'billpayment',
// //         vnp_ReturnUrl: returnUrl,
// //         vnp_TxnRef: 'ORDER123',
// //         vnp_SecureHashType: 'MD5',
// //     };

// //     // Sắp xếp các trường theo thứ tự alphabetic
// //     const sortedData = Object.keys( data )
// //         .sort()
// //         .reduce( ( accumulator, currentValue ) =>
// //         {
// //             accumulator[ currentValue ] = data[ currentValue ];
// //             return accumulator;
// //         }, {} );

// //     // Tạo chuỗi dữ liệu cần hash
// //     let hashData = secretKey + '&' + Object.values( sortedData ).join( '' );

// //     // Tính toán chuỗi hash
// //     const secureHash = require( 'crypto' ).createHash( 'md5' ).update( hashData ).digest( 'hex' );

// //     // Thêm chuỗi hash vào dữ liệu thanh toán
// //     data.vnp_SecureHash = secureHash;
// //     data.vnp_SecureHashType = 'MD5';

// //     // Tạo đường dẫn thanh toán và chuyển hướng người dùng đến đó
// //     const paymentUrl = vnpUrl + '?' + Object.entries( data ).map( ( [ key, value ] ) => `${ key }=${ encodeURIComponent( value ) }` ).join( '&' );
// //     res.redirect( paymentUrl );
// // } );
// router.get( '/initiate_payment', Vnpay )
// router.post( '/vnpay_callback', VnpaySuccess )
// export default router