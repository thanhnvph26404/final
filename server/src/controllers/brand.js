import Brand from "../models/brand";
import { brandSchema } from "../schemas/brand";
export const creatBrand = async ( req, res ) =>
{
    try
    {
        const { error } = brandSchema.validate( req.body, { abortEarly: false } )
        if ( error )
        {
            const errors = error.details.map( err => err.message )
            return res.status( 400 ).json( {
                message: errors,
            } );
        }
        const brand = await Brand.create( req.body )
        if ( !brand )
        {
            return res.status( 400 ).json( {
                message: "lỗi không thêm được thương hiệu "
            } )
        }
        return res.status( 200 ).json( {
            message: "thêm thương hiệu thành công ",
            brand
        } )

    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );

    }
}
export const getAllBrand = async ( req, res ) =>
{
    try
    {
        const brand = await Brand.find()
        if ( !brand )
        {
            return res.status( 400 ).json( {
                message: "lỗi lấy thương hiệu "
            } )
        }
        return res.status( 200 ).json( {
            message: "lấy thành công ",
            brand
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}
export const getOneBrand = async ( req, res ) =>
{
    try
    {
        const { id } = req.params

        const brand = await Brand.findById( id )
        if ( !brand )
        {
            return res.status( 400 ).json( {
                message: "lỗi lấy thương hiệu "
            } )
        }
        return res.status( 200 ).json( {
            message: "lấy thành công ",
            brand
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}
export const updateBrand = async ( req, res ) =>
{
    try
    {
        const { id } = req.params

        const brand = await Brand.findByIdAndUpdate( id, req.body, { new: true } )
        if ( !brand )
        {
            return res.status( 400 ).json( {
                message: "lỗi lấy thương hiệu "
            } )
        }
        return res.status( 200 ).json( {
            message: "update thành công ",
            brand
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }

}
export const deleteBrand = async ( req, res ) =>
{
    try
    {
        const { id } = req.params

        const brand = await Brand.findByIdAndDelete( id )
        if ( !brand )
        {
            return res.status( 400 ).json( {
                message: "lỗi lấy thương hiệu "
            } )
        }
        return res.status( 200 ).json( {
            message: "xóa  thành công ",
            brand
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}