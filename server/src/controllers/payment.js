// import { log } from 'console';

// // export const Vnpay = async ( req, res ) =>
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
// // }
// export const VnpaySuccess = async ( req, res ) =>
// {
//     // Xử lý callback từ VNPAY ở đây
//     console.log( 'Callback Data:', req.body );
//     res.send( 'OK' );
// }

// router.post( '/create_payment_url', function ( req, res, next )
// {
//     var ipAddr = req.headers[ 'x-forwarded-for' ] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     var config = require( 'config' );
//     var dateFormat = require( 'dateformat' );


//     var tmnCode = config.get( 'vnp_TmnCode' );
//     var secretKey = config.get( 'vnp_HashSecret' );
//     var vnpUrl = config.get( 'vnp_Url' );
//     var returnUrl = config.get( 'vnp_ReturnUrl' );
//     console.log( tmnCode );
//     var date = new Date();

//     var createDate = dateFormat( date, 'yyyymmddHHmmss' );
//     var orderId = dateFormat( date, 'HHmmss' );
//     var amount = req.body.amount;
//     var bankCode = req.body.bankCode;

//     var orderInfo = req.body.orderDescription;
//     var orderType = req.body.orderType;
//     var locale = req.body.language;
//     if ( locale === null || locale === '' )
//     {
//         locale = 'vn';
//     }
//     var currCode = 'VND';
//     var vnp_Params = {};
//     vnp_Params[ 'vnp_Version' ] = '2.1.0';
//     vnp_Params[ 'vnp_Command' ] = 'pay';
//     vnp_Params[ 'vnp_TmnCode' ] = tmnCode;
//     // vnp_Params['vnp_Merchant'] = ''
//     vnp_Params[ 'vnp_Locale' ] = locale;
//     vnp_Params[ 'vnp_CurrCode' ] = currCode;
//     vnp_Params[ 'vnp_TxnRef' ] = orderId;
//     vnp_Params[ 'vnp_OrderInfo' ] = orderInfo;
//     vnp_Params[ 'vnp_OrderType' ] = orderType;
//     vnp_Params[ 'vnp_Amount' ] = amount * 100;
//     vnp_Params[ 'vnp_ReturnUrl' ] = returnUrl;
//     vnp_Params[ 'vnp_IpAddr' ] = ipAddr;
//     vnp_Params[ 'vnp_CreateDate' ] = createDate;
//     if ( bankCode !== null && bankCode !== '' )
//     {
//         vnp_Params[ 'vnp_BankCode' ] = bankCode;
//     }

//     vnp_Params = sortObject( vnp_Params );

//     var querystring = require( 'qs' );
//     var signData = querystring.stringify( vnp_Params, { encode: false } );
//     var crypto = require( "crypto" );
//     var hmac = crypto.createHmac( "sha512", secretKey );
//     var signed = hmac.update( new Buffer( signData, 'utf-8' ) ).digest( "hex" );
//     vnp_Params[ 'vnp_SecureHash' ] = signed;
//     vnpUrl += '?' + querystring.stringify( vnp_Params, { encode: false } );

//     res.redirect( vnpUrl )
// } );
// // Vui lòng tham khảo thêm tại code demo