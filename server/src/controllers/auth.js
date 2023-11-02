import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import Auth from '../models/auth';
import { sendVerifyEmail } from "../middleware/sendEmail";
import { registerSchema } from "../schemas/register";
import { generateRandomCode } from "../components/function";
import { loginSchema } from "../schemas/login";
import Product from "../models/products";
import Cart from "../models/cart";
import ProductVariants from "../models/productVariant";
import order from "../models/order";


config();
// đăng kí
export const register = async ( req, res ) =>
{
  try
  {
    const { error } = registerSchema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      const errors = error.details.map( ( err ) => err.message );
      return res.status( 400 ).json( {
        message: errors,
      } );
    }

    const email = await Auth.findOne( { email: req.body.email } );
    if ( email )
    {
      return res.status( 404 ).json( {
        message: "Email đã tồn tại",
      } );
    }

    const passwordHash = await bcrypt.hash( req.body.password, 12 );
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    };

    const data = await Auth.create( user );
    data.password = undefined;

    if ( !data )
    {
      return res.status( 404 ).json( { message: "Đăng ký thất bại" } );
    }

    let randomCode = generateRandomCode();
    let randomString = uuidv4();

    const token = jwt.sign(
      {
        email: req.body.email,
        randomCode: randomCode,
        randomString: randomString,
      },
      process.env.SECRET_KEY
    );

    const verifyUrl = `${ process.env.APP_URL }/auth/verify-email/${ randomString }/${ token }`;

    sendVerifyEmail( req.body.email, req.body.name, randomCode, verifyUrl );

    return res.status( 200 ).json( {
      message: "Đăng ký tài khoản thành công",
      data: data,
      token: token,
    } );
  } catch ( error )
  {
    console.log( error );

    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};

// xác thực email 
export const verify = async ( req, res ) =>
{
  const { randomCode, randomString } = req.body;

  try
  {
    if ( !req.headers.authorization )
    {
      return res.status( 401 ).json( {
        message: "Bạn chưa đăng nhập",
      } );
    }

    const token = req.headers.authorization.split( " " )[ 1 ];
    const decoded = jwt.verify( token, process.env.SECRET_KEY );

    console.log( decoded );
    const email = decoded.email;

    const user = await Auth.findOne( { email } );
    if ( !user )
    {
      return res.status( 500 ).json( {
        message: "Không tìm thấy người dùng",
      } );
    }

    if ( user.isVerifyEmail )
    {
      return res.status( 400 ).json( {
        message: "Email đã được kích hoạt",
      } );
    }

    if (
      randomCode !== decoded.randomCode ||
      randomString !== decoded.randomString
    )
    {
      return res.status( 500 ).json( {
        message: "Mã xác minh không chính xác",
      } );
    }

    user.isVerifyEmail = true;
    await user.save();

    return res.status( 200 ).json( {
      message: "Xác minh email thành công",
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};
// getsuser
export const getAllUser = async ( req, res ) =>
{
  try
  {
    const user = await Auth.find()
    console.log( user );
    res.json( {
      user
    } )
  } catch ( error )
  {
    throw Error( error )
  }
}
export const getOneUser = async ( req, res ) =>
{
  try
  {
    const id = req.params.id
    const user = await Auth.findById( id )
    if ( !user || user.length === 0 )
    {
      return res.status( 400 ).json( {
        message: "không có danh sách người dùng "
      } )
    }
    res.json( {
      message: "Lấy người dùng thành công ",
      user
    } )
  } catch ( error )
  {
    console.log( error );

    return res.status( 500 ).json( {
      message: "Lỗi server " + error.message,
    } );
  }
}
export const removeUser = async ( req, res ) =>
{
  try
  {
    const id = req.params.id
    const user = await Auth.findByIdAndDelete( id )
    if ( !user || user.length === 0 )
    {
      return res.status( 400 ).json( {
        message: "không có danh sách người dùng cần xóa  "
      } )
    }
    res.json( {
      message: "xóa thành công "

    } )
  } catch ( error )
  {
    console.log( error );

    return res.status( 500 ).json( {
      message: "Lỗi server " + error.message,
    } );
  }
}
export const updateUser = async ( req, res ) =>
{
  const { _id } = req.user;
  const { name, email, phone } = req.body;

  try
  {
    const existingUser = await Auth.findOne( { email: email } );

    const currentUser = await Auth.findById( _id );
    //kiểm tra xem email có thay đổi hay k 
    if ( currentUser.email !== email )
    {
      if ( existingUser && existingUser._id.toString() !== _id )
      {
        // Nếu email thay đổi thì sẽ check xem  email đã tồn tại và không thuộc về người dùng hiện tại
        return res.status( 400 ).json( { message: "Email đã tồn tại trong hệ thống." } );
      }
      // Nếu email đã thay đổi, thì cập nhật
      currentUser.email = email;
    }

    currentUser.name = name;
    currentUser.phone = phone;


    // Kiểm tra xem email có thay đổi hay không


    const updatedUser = await currentUser.save();

    res.status( 200 ).json( {
      message: "Cập nhật thành công",
      user: updatedUser
    } );
  } catch ( error )
  {
    console.log( error );

    return res.status( 500 ).json( {
      message: "Lỗi server " + error.message,
    } );
  }
}


// Đăng nhập
export const logIn = async ( req, res ) =>
{
  try
  {
    const { email, password } = req.body;

    const { error } = loginSchema.validate( req.body, { abortEarly: false } );
    if ( error )
    {
      return res.status( 400 ).json( {
        message: error.details.map( ( err ) => err.message ),
      } );
    }

    const user = await Auth.findOne( { email } );
    if ( !user )
    {
      return res.status( 404 ).json( {
        message: "Tài khoản hoặc mật khẩu không đúng",
      } );
    }
    if ( user.isBlocked )
    {
      return res.status( 403 ).json( {
        message: "Tài khoản của bạn đã bị chặn. Liên hệ với quản trị viên để biết thêm chi tiết.",
      } );
    }

    const passwordHash = await bcrypt.compare( password, user.password );

    if ( !passwordHash )
    {
      return res.status( 404 ).json( {
        message: "Tài khoản hoặc mật khẩu không đúng",
      } );
    }

    const token = jwt.sign( { id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    } );

    user.password = undefined;

    return res.status( 200 ).json( {
      message: "Đăng nhập tài khoản thành công",
      token: token,
    } );
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
};
export const getUserByToken = async ( req, res ) =>
{
  try
  {
    if ( !req.headers.authorization )
    {
      return res.status( 401 ).json( {
        message: "Bạn chưa đăng nhập",
      } );
    }

    const token = req.headers.authorization.split( " " )[ 1 ];
    const decoded = jwt.verify( token, process.env.SECRET_KEY );
    const user = await Auth.findById( decoded.id );
    console.log( user );
    if ( !user )
    {
      return res.status( 401 ).json( {
        message: "Người dùng không tồn tại",
      } );
    }

    res.status( 200 ).json( {
      message: "Cập nhật thành công",
      data: user
    } );
  } catch ( error )
  {
    if ( error instanceof jwt.TokenExpiredError )
    {
      return res.status( 401 ).json( {
        message: "Token đã hết hạn!",
      } );
    } else if ( error instanceof jwt.NotBeforeError )
    {
      return res.status( 401 ).json( {
        message: "Token chưa có hiệu lực!",
      } );
    } else if ( error instanceof jwt.JsonWebTokenError )
    {
      return res.status( 401 ).json( {
        message: "Token không hợp lệ!",
      } );
    }

    console.error( error );
    return res.status( 500 ).json( {
      message: "Đã có lỗi xảy ra!",
    } );
  }
};
export const BlockUser = async ( req, res ) =>
{
  const { id } = req.params
  try
  {
    const block = await Auth.findByIdAndUpdate( id, {
      isBlocked: true
    }, { new: true } )
    res.status( 200 ).json( {
      message: "block thành công ",
      block
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
}
export const unBlockUser = async ( req, res ) =>
{
  const { id } = req.params
  try
  {
    const block = await Auth.findByIdAndUpdate( id, {
      isBlocked: false
    }, { new: true } )
    res.status( 200 ).json( {
      message: "unblock thành công ",
      block
    } )
  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
}
export const editAddressToken = async ( req, res ) =>
{
  const { _id } = req.user
  console.log( _id );
  try
  {
    const user = await Auth.findByIdAndUpdate( _id, {
      address: req?.body?.address,
    }, {
      new: true
    } )
    res.json( user )

  } catch ( error )
  {
    return res.status( 500 ).json( {
      message: "Lỗi server: " + error.message,
    } );
  }
}
// Add a route for adding items to the cart
export const addToCart = async ( req, res ) =>
{
  try
  {
    const userId = req.user._id;
    const { productId, productVariantId, quantity } = req.body;

    let cart = await Cart.findOne( { userId } );




    const productInfo = await Product.findById( productId );
    const productVariantInfo = await ProductVariants.findById( productVariantId ).populate( "AttributeValues" );

    if ( !productInfo || !productVariantInfo )
    {
      return res.status( 404 ).json( {
        message: "Sản phẩm hoặc biến thể không tồn tại",
      } );
    }
    if ( !cart )
    {
      cart = new Cart( { userId } );
    }
    if ( !cart.items )
    {
      cart.items = [];
    }
    const existingItem = cart.items.find( ( item ) => item.product === productId && item.productVariant === productVariantId );

    if ( existingItem )
    {
      existingItem.quantity += quantity;
    } else
    {
      const newItem = {
        product: productId,
        productVariant: productVariantId,
        quantity: quantity,
        productInfo: {
          images: productInfo.images,
          name: productInfo.name,
          brand: productInfo.brand,
          category: productInfo.category,
        },
        productVariantInfo: {

          attributeValues: productVariantInfo.AttributeValues
        },
      };

      cart.items.push( newItem );
    }

    const calculateTotal = async () =>
    {
      return Promise.all(
        cart.items.map( async ( item ) =>
        {
          return productInfo.price * item.quantity;
        } )
      );
    };

    const itemTotals = await calculateTotal();
    const newTotal = itemTotals.reduce( ( total, itemTotal ) => total + itemTotal, 0 );
    cart.total = newTotal;

    await cart.save();

    return res.status( 200 ).json( {
      cart: {
        _id: cart._id,
        userId: cart.userId,
        voucherId: cart.voucherId,
        total: cart.total,
        items: cart.items.map( ( item ) => ( {
          productVariantId: item.productVariant,
          productId: item.product,
          quantity: item.quantity,
          _id: item._id,
          productInfo: item.productInfo,
          productVariantInfo: item.productVariantInfo,
        } ) ),
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      },
    } );
  } catch ( error )
  {
    console.error( error );
    return res.status( 500 ).json( {
      message: "Lỗi máy chủ: " + error.message,
    } );
  }
};

export const emptyCart = async ( req, res ) =>
{
  const { _id } = req.user
  try
  {
    const user = await Auth.findOne( { _id } );
    const cart = await Cart.findOneAndRemove( { userId: user._id } )
    res.json( cart )
  } catch ( error )
  {
    throw new Error( error )
  }
}
export const updateOderStatus = async ( req, res ) =>
{
  const { status } = req.body
  const { id } = req.params
  try
  {
    const findOder = await order.findByIdAndUpdate( id, {
      status: status,
    }, { new: true } )
    res.json( findOder )
  } catch ( error )
  {
    throw new Error( error )


  }
}

