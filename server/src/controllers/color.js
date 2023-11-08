import Color from "../models/color";
import { Colorschema } from "../schemas/color";


export const create = async ( req, res ) =>
{
  try
  {
    const { error } = Colorschema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      const errors = error.details.map( ( err ) => err.message );
      return res.status( 400 ).json( {
        message: errors,
      } );
    }

    const data = await Color.create( req.body );
    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không thêm được thuộc tính",
      } );
    }

    return res.status( 200 ).json( {
      message: "Thêm thuộc tính thành công ",
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
    const data = await Color.find();
    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không có danh sách",
      } );
    }

    return res.status( 200 ).json( {
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
    const result = await Color.findById( req.params.id );

    if ( !result || result.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Không có thông tin",
      } );
    }

    return res.status( 200 ).json( result );
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
    const data = await Color.findByIdAndDelete( req.params.id );

    if ( !data || data.length === 0 )
    {
      return res.status( 404 ).json( {
        message: "Xóa thuộc tính thất bại",
      } );
    }

    return res.status( 200 ).json( {
      message: "Xóa thuộc tính thành công ",
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
    const { error } = Colorschema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      const errors = error.details.map( ( err ) => err.message );
      return res.status( 400 ).json( {
        message: errors,
      } );
    }

    const data = await Color.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
    } );

    if ( !data )
    {
      return res.status( 404 ).json( {
        message: "Cập nhật thuộc tính thất bại",
      } );
    }

    return res.status( 200 ).json( {
      message: "Cập nhật thuộc tính thành công ",
      data: data,
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};