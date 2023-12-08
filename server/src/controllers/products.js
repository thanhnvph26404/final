import { productSchema } from "../schemas/products"
import Category from "../models/categories"
import Brand from "../models/brand"

import Product from "../models/products"
import Auth from "../models/auth";
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

        const variantsToBeAdded = req.body.ProductVariants;
        console.log( variantsToBeAdded );
        // Check for duplicate variants with the same size and color
        const duplicateVariants = variantsToBeAdded.filter( ( variant, index, self ) =>
            index !== self.findIndex( ( v ) => v.size === variant.size && v.color === variant.color )
        );

        if ( duplicateVariants.length > 0 )
        {
            return res.status( 400 ).json( {
                message: `Bạn đã nhập 2 trường biến thể giống nhau Size ${ variantsToBeAdded[ 0 ].size } và Màu ${ variantsToBeAdded[ 0 ].color }. Vui lòng nhập lại.`,
            } );
        }
        const data = await Product.create( {
            name: req.body.name,
            price: req.body.price,
            original_price: req.body.original_price,
            description: req.body.description,
            brand: req.body.brand,
            images: req.body.images,
            category: req.body.category,
            comments: req.body.comments,
            ProductVariants: variantsToBeAdded,
        } );

        if ( data )
        {
            return res.status( 200 ).json( {
                message: "Thêm sản phẩm và biến thể thành công",
                data: data,
            } );
        } else
        {
            return res.status( 404 ).json( {
                message: "Thêm sản phẩm thất bại",
            } );
        }

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
        if ( req.query.category )
        {
            queryObj.category = req.query.category;
        }
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
            .populate( "brand" ).populate( "ProductVariants" ).sort( { createdAt: -1 } )
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
export const locproduct = async ( req, res ) =>
{
    const { category, brand, minPrice, maxPrice } = req.query;

    try
    {

        // Khởi tạo các điều kiện tìm kiếm
        const queryConditions = {};

        // Tìm ID của category dựa trên tên
        if ( category )
        {
            const foundCategory = await Category.findOne( { title: category } );
            if ( foundCategory )
            {
                queryConditions.category = foundCategory._id;
            }
        }

        // Tìm ID của brand dựa trên tên
        if ( brand )
        {
            const foundBrand = await Brand.findOne( { title: brand } );
            if ( foundBrand )
            {
                queryConditions.brand = foundBrand._id;
            }
        }

        // Thêm điều kiện lọc theo giá nếu được cung cấp
        if ( minPrice && maxPrice )
        {
            queryConditions.price = { $gte: minPrice, $lte: maxPrice };
        }
        console.log( queryConditions );
        // Tìm sản phẩm dựa trên điều kiện query
        const products = await Product.find( queryConditions ).populate( "category" ).populate( "brand" );

        res.status( 200 ).json( { products } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: 'Server error: ' + error.message } );
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

        const variantsToBeUpdated = req.body.ProductVariants;

        const duplicateVariants = variantsToBeUpdated.filter(
            ( variant, index, self ) =>
                index !==
                self.findIndex(
                    ( v ) => v.size === variant.size && v.color === variant.color
                )
        );

        if ( duplicateVariants.length > 0 )
        {
            return res.status( 400 ).json( {
                message: `Bạn đã nhập 2 trường biến thể giống nhau Size ${ variantsToBeUpdated[ 0 ].size } và Màu ${ variantsToBeUpdated[ 0 ].color }. Vui lòng nhập lại.`,
            } );
        }

        const data = await Product.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
        } );

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Cập nhật thất bại ",
            } );
        }

        return res.status( 200 ).json( {
            message: "Cập nhật thành công ",
            data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};


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
export const addTowishList = async ( req, res ) =>
{
    const { _id } = req.user;
    const { prodId } = req.body;
    try
    {
        const user = await Auth.findById( _id );
        const alreadyExists = user.wishList.find( ( id ) => id.toString() === prodId );
        console.log( alreadyExists );
        if ( alreadyExists )
        {
            return res.status( 400 ).json( { message: "Sản phẩm đã tồn tại trong danh sách yêu thích" } );
        } else
        {
            let updatedUser = await Auth.findByIdAndUpdate(
                _id,
                {
                    $push: { wishList: prodId },
                },
                {
                    new: true,
                }
            );
            res.json( updatedUser );
        }
    } catch ( error )
    {
        throw new Error( error );
    }
};


