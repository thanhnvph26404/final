import Category from '../models/categories'
import { categorySchema } from "../schemas/category";

export const getAll = async ( req, res ) =>
{
  try
  {
    const data = await Category.find();

    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không có danh sách",
      } );
    }

    return res.status( 200 ).json( {
      message: "Danh sách danh mục",
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
    const data = await Category.findByIdAndDelete( req.params.id );

    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không có thông tin",
      } );
    }

    return res.status( 200 ).json( {
      message: "Thông tin danh mục",
      data: data,
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};

export const create = async ( req, res ) =>
{
  try
  {
    const { error } = categorySchema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      const errors = error.details.map( ( err ) => err.message );
      return res.status( 400 ).json( {
        message: errors,
      } );
    }

    const data = await Category.create( req.body );

    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không thêm được danh mục",
      } );
    }

    return res.status( 200 ).json( {
      message: "Thêm danh mục thành công ",
      data: data,
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
    const data = await Category.findByIdAndDelete( req.params.id );

    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Xóa danh mục thất bại",
      } );
    }

    return res.status( 200 ).json( {
      message: "Xóa danh mục thành công ",
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};

export const update = async ( req, res ) =>
{
  try
  {
    const { error } = categorySchema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      const errors = error.details.map( ( err ) => err.message );
      return res.status( 400 ).json( {
        message: errors,
      } );
    }

    const data = await Category.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    } );

    if ( !data )
    {
      return res.status( 404 ).json( {
        message: "Cập nhật danh mục thất bại",
      } );
    }

    return res.status( 200 ).json( {
      message: "Cập nhật danh mục thành công ",
      data: data,
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};