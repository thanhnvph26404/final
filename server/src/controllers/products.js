import { productSchema } from "../schemas/products"
import Category from "../models/categories"
import Product from "../models/products"
export const create = async ( req, res ) =>
{
    try
    {
        const { error } = productSchema.validate( req.body, { abortEarly: false } );

        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors,
            } );
        }

        const checkCategory = await Category.findById( req.body.category );
        if ( !checkCategory )
        {
            return res.status( 400 ).json( {
                message: "Danh mục không tồn tại",
            } );
        }

        const data = await Product.create( req.body );

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Thêm sản phẩm thất bại",
            } );
        }

        return res.status( 200 ).json( {
            message: "Thêm sản phẩm thành công",
            data: data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};
export const getAll = async ( req, res ) =>
{
    try
    {
        const queryObj = { ...req.query };
        const excludeFields = [ "page", "sort", "limit", "fields" ];
        excludeFields.forEach( ( el ) => delete queryObj[ el ] );
        let queryStr = JSON.stringify( queryObj );
        queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/g, ( match ) => `$${ match }` );
        let query = Product.find( JSON.parse( queryStr ) );

        // Sắp xếp
        if ( req.query.sort )
        {
            const sortBy = req.query.sort.split( "," ).join( " " );
            query = query.sort( sortBy );
        } else
        {
            query = query.select( "-__v" );
        }

        // Phân trang
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = ( page - 1 ) * limit;
        query = query.skip( skip ).limit( limit );

        if ( req.query.page )
        {
            const productCount = await Product.countDocuments();
            if ( skip >= productCount ) throw new Error( "This page does not exist" );
        }

        console.log( page, limit, skip );

        // Sử dụng populate để nhúng dữ liệu từ các mối quan hệ
        query = query
            .populate( "category" )
            .populate( "brand" ).populate( "ProductVariants" )
        const products = await query;

        res.status( 200 ).json( {
            products,
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: "Server error: " + error.message,
        } );
    }
};


export const getOne = async ( req, res ) =>
{
    console.log( req.params.id );
    try
    {
        const data = await Product.findById( req.params.id )
            .populate( "category" ).populate( "brand" ).
            populate( "ProductVariants" )

        if ( !data || data.length === 0 )
        {
            return res.status( 404 ).json( {
                message: "Không có thông tin",
            } );
        }

        return res.status( 200 ).json( {
            message: "Thông tin sản phẩm",
            data: data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};
export const updateProduct = async ( req, res ) =>
{
    try
    {
        const { error } = productSchema.validate( req.body, { abortEarly: false } );
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors
            } );
        }
        const checkCategory = await Category.findById( req.body.category );
        if ( !checkCategory )
        {
            return res.status( 400 ).json( {
                message: "danh mục không tồn tại",
            } );
        }
        const data = await Product.findByIdAndUpdate( req.params.id, req.body, {
            new: true
        } );
        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "cập nhật thất bại ",
            } );
        }
        return res.status( 200 ).json( {
            message: "cập nhật thành công ",
            data
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}


export const remove = async ( req, res ) =>
{
    try
    {
        const data = await Product.findByIdAndDelete( req.params.id );

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Xóa sản phẩm thất bại",
            } );
        }

        return res.status( 200 ).json( {
            message: "Xóa sản phẩm thành công ",
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};