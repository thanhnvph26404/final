import categories from "../models/categories";
import voucher from "../models/voucher";
import { voucherSchema } from "../schemas/voucher"

export const creatVoucher = async ( req, res ) =>
{
    try
    {
        const { error } = voucherSchema.validate( req.body, { abortEarly: false } )
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors
            } );
        }
        const checkVoucher = await voucher.findOne( { code: req.body.code } )
        if ( checkVoucher )
        {
            return res.status( 404 ).json( {
                message: "mã code đã tồn tại "
            } );

        }
        const vouchers = await voucher.create( req.body );
        if ( !vouchers )
        {
            return res.status( 404 ).json( {
                message: "thêm voucher thất bại ",
            } )
        }

        res.status( 200 ).json( {
            vouchers,
            message: "thêm voucher thành công "
        } );


    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}
export const updateVoucher = async ( req, res ) =>
{
    try
    {
        const { error } = voucherSchema.validate( req.body, { abortEarly: true } )
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message )
            return res.status( 400 ).json( {
                errors
            } )
        }
        const checkCategory = await categories.findById( req.body.apply );
        if ( !checkCategory )
        {
            return res.status( 400 ).json( {
                message: "danh mục không tồn tại",
            } );
        }
        const vouchers = await voucher.findByIdAndUpdate( req.params.id, req.body, { new: true } )
        if ( !vouchers )
        {
            return res.status( 404 ).json( {
                message: "update không thành công "
            } )
        }
        res.status( 200 ).json( {
            vouchers,
            message: "update thành công "
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}