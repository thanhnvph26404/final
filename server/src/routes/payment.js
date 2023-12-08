// const express = require('express');
import express from 'express';


import { config } from 'dotenv';
const router = express.Router();
config()
function sortObject ( obj )
{
    let sorted = {};
    let str = [];
    let key;
    for ( key in obj )
    {
        if ( obj.hasOwnProperty( key ) )
        {
            str.push( encodeURIComponent( key ) );
        }
    }
    str.sort();
    for ( key = 0; key < str.length; key++ )
    {
        sorted[ str[ key ] ] = encodeURIComponent( obj[ str[ key ] ] ).replace( /%20/g, "+" );
    }
    return sorted;
}

router.post( '/create_payment_url', function ( req, res, next )
{
    let ipAddr = req.headers[ 'x-forwarded-for' ] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = process.env.VNP_TMN_CODE;
    let secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURN_URL;
    let date = new Date();
    let createDate = dateformat( date, 'yyyymmddHHmmss' );
    let orderId = dateformat( date, 'HHmmss' );
    let amount = req.body.amount;
    var locale = req.body.language;
    if ( locale === null || locale === '' )
    {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params[ 'vnp_Version' ] = '2.1.0';
    vnp_Params[ 'vnp_Command' ] = 'pay';
    vnp_Params[ 'vnp_TmnCode' ] = tmnCode;
    vnp_Params[ 'vnp_Locale' ] = locale;
    vnp_Params[ 'vnp_CurrCode' ] = currCode;
    vnp_Params[ 'vnp_TxnRef' ] = orderId;
    vnp_Params[ 'vnp_OrderInfo' ] = "gd đơn hàng " + orderId;
    vnp_Params[ 'vnp_OrderType' ] = "other";
    vnp_Params[ 'vnp_Amount' ] = amount * 100;
    vnp_Params[ 'vnp_ReturnUrl' ] = returnUrl;
    vnp_Params[ 'vnp_IpAddr' ] = ipAddr;
    vnp_Params[ 'vnp_CreateDate' ] = createDate;


    vnp_Params = sortObject( vnp_Params );

    var signData = qs.stringify( vnp_Params, { encode: false } );
    var hmac = crypto.createHmac( "sha512", secretKey );
    var signed = hmac.update( new Buffer( signData, 'utf-8' ) ).digest( "hex" );
    vnp_Params[ 'vnp_SecureHash' ] = signed;
    vnpUrl += '?' + qs.stringify( vnp_Params, { encode: false } );

    res.redirect( vnpUrl );
} );
router.get( '/vnpay_ipn', function ( req, res, next )
{
    var vnp_Params = req.query;
    var secureHash = vnp_Params[ 'vnp_SecureHash' ];

    delete vnp_Params[ 'vnp_SecureHash' ];
    delete vnp_Params[ 'vnp_SecureHashType' ];

    vnp_Params = sortObject( vnp_Params );
    const secretKey = process.env.VNP_HASH_SECRET;
    var signData = qs.stringify( vnp_Params, { encode: false } );
    var crypto = require( "crypto" );
    var hmac = crypto.createHmac( "sha512", secretKey );
    var signed = hmac.update( new Buffer( signData, 'utf-8' ) ).digest( "hex" );


    if ( secureHash === signed )
    {
        var orderId = vnp_Params[ 'vnp_TxnRef' ];
        var rspCode = vnp_Params[ 'vnp_ResponseCode' ];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status( 200 ).json( { RspCode: '00', Message: 'success' } )
    }
    else
    {
        res.status( 200 ).json( { RspCode: '97', Message: 'Fail checksum' } )
    }
} );

router.get( '/vnpay_return', function ( req, res, next )
{
    var vnp_Params = req.query;

    var secureHash = vnp_Params[ 'vnp_SecureHash' ];

    delete vnp_Params[ 'vnp_SecureHash' ];
    delete vnp_Params[ 'vnp_SecureHashType' ];

    vnp_Params = sortObject( vnp_Params );

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;

    var signData = qs.stringify( vnp_Params, { encode: false } );
    var hmac = crypto.createHmac( "sha512", secretKey );
    var signed = hmac.update( new Buffer( signData, 'utf-8' ) ).digest( "hex" );

    if ( secureHash === signed )
    {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render( 'success', { code: vnp_Params[ 'vnp_ResponseCode' ] } )
    } else
    {
        res.render( 'success', { code: '97' } )
    }
});

export default router
