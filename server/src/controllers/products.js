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
        const data = await Product.find();

        if ( !data || data.length === 0 )
        {
            return res.status( 404 ).json( {
                message: "Không có dữ liệu",
            } );
        }

        return res.status( 200 ).json( {
            message: "Danh sách sản phẩm",
            data: data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};

export const getOne = async ( req, res ) =>
{
    try
    {
        const data = await Product.findById( req.params.id )
            .populate( "category" )
            .populate( {
                path: "comments",
                populate: [
                    {
                        path: "user",
                    },
                    {
                        path: "feed_back",
                        populate: {
                            path: "user",
                        },
                    },
                ],
            } );

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


export const remove = async (req, res) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);
  
      if (!data) {
        return res.status(404).json({
          message: "Xóa sản phẩm thất bại",
        });
      }
  
      return res.status(200).json({
        message: "Xóa sản phẩm thành công ",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  };