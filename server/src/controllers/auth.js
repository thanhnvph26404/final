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
import order from "../models/order";
import Voucher from "../models/voucher";
import uniqid from "uniqid"


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
    const { productId, size, color, quantity } = req.body;

    const productInfo = await Product.findById( productId );
    const existingCart = await Cart.findOne( { userId } );
    console.log( productInfo );

    const cartItem = {
      product: productId,
      productVariant: {
        size,
        color,
      },
      quantity,
      productInfo: {
        images: productInfo.images,
        name: productInfo.name,
        brand: productInfo.brand,
        category: productInfo.category,
        price: productInfo.price,
      },
    };

    const variantExists = productInfo.ProductVariants.some(
      ( variant ) => variant.size === size && variant.color === color
    );

    if ( variantExists )
    {
      if ( existingCart )
      {
        const existingItemIndex = existingCart.items.findIndex(
          ( item ) =>
            item.product.toString() === productId &&
            item.productVariant.size === size &&
            item.productVariant.color === color
        );

        if ( existingItemIndex !== -1 )
        {
          existingCart.items[ existingItemIndex ].quantity += quantity;
        } else
        {
          existingCart.items.push( cartItem );
        }

        const productToUpdate = await Product.findById( productId );
        const variantToUpdate = productToUpdate.ProductVariants.find(
          ( variant ) => variant.size === size && variant.color === color
        );

        if ( variantToUpdate )
        {
          variantToUpdate.quantity -= quantity;

          // Kiểm tra nếu quantity của size hoặc màu nhỏ hơn 0 thì thông báo
          if ( variantToUpdate.quantity < 0 )
          {
            return res.status( 400 ).json( {
              message: `Sản phẩm đã hết size hoặc màu bạn đã chọn (${ size }, ${ color }).`,
            } );
          }

          await productToUpdate.save();
        }
        await existingCart.save();
      } else
      {
        const newCart = new Cart( {
          userId,
          items: [ cartItem ],
        } );

        const productToUpdate = await Product.findById( productId );
        const variantToUpdate = productToUpdate.ProductVariants.find(
          ( variant ) => variant.size === size && variant.color === color
        );

        if ( variantToUpdate )
        {
          variantToUpdate.quantity -= quantity;

          // Kiểm tra nếu quantity của size hoặc màu nhỏ hơn 0 thì thông báo
          if ( variantToUpdate.quantity < 0 )
          {
            return res.status( 400 ).json( {
              message: `Sản phẩm đã hết size hoặc màu bạn đã chọn (${ size }, ${ color }).`,
            } );
          }

          await productToUpdate.save();
        }
        await newCart.save();
      }

      // Tính toán tổng tiền dựa trên số lượng sản phẩm trong giỏ hàng
      if ( existingCart )
      {
        let total = 0;
        for ( const item of existingCart.items )
        {
          total += item.productInfo.price * item.quantity;
        }
        existingCart.total = total;
        await existingCart.save();
      }

      return res.status( 200 ).json( {
        message: "Đã thêm sản phẩm vào giỏ hàng.",
      } );
    } else
    {
      return res.status( 400 ).json( {
        message: "Size hoặc màu không hợp lệ cho sản phẩm này.",
      } );
    }
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
export const applyCoupon = async ( req, res ) =>
{
  const { _id } = req.user;
  const { voucher } = req.body;
  const validcoupon = await Voucher.findOne( { code: voucher } )
  if ( validcoupon === null ) throw new Error( "mã voucher không đúng " );
  const user = await Auth.findOne( { _id } );
  let totals = await order.findOne( { userId: user._id } ).populate( "products.product" )
  console.log( totals );
  if ( totals.paymentIntent.amount )
  {
    console.log( totals.paymentIntent.amount );
    let totalAfterDiscount = ( totals.paymentIntent.amount - ( totals.paymentIntent.amount * validcoupon.discount ) / 100 ).toFixed( 2 );
    await order.findOneAndUpdate( { userId: user._id }, { totalAfterDiscount }, { new: true } );
    res.json( totalAfterDiscount )

  } else
  {
    throw new Error( "lỗi khi giảm giá hoặc mã giảm giá đã hết hạn" )
  }

}
export const createOrder = async ( req, res ) =>
{
  const { COD, discountCode } = req.body;
  const { _id } = req.user;

  try
  {
    if ( !COD )
    {
      throw new Error( "Create cash order failed" );
    }

    const user = await Auth.findById( _id );
    let userCart = await Cart.findOne( { userId: user._id } );

    let finalAmount = 0;
    if ( userCart.total )
    {
      finalAmount = userCart.total;
    } else
    {
      finalAmount = userCart.total;
    }

    // Check if a discount code is provided
    if ( discountCode )
    {
      // Apply the discount code and update the final amount
      const discount = await applyDiscountCode( user._id, finalAmount, discountCode );
      console.log( discount );
      finalAmount -= discount;
    }

    let newOrder = await new order( {
      products: userCart.items,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "thanh toán khi nhận hàng",
        created: Date.now(),
        currency: "VND",
      },
      userId: user._id,
      status: "thanh toán khi nhận hàng",
    } ).save();

    let update = userCart.items.map( ( item ) =>
    {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    } );

    const updated = await Product.bulkWrite( update, {} );
    return res.json( { message: "success" } );
  } catch ( error )
  {
    throw new Error( error );
  }
};

// Function to apply discount code and return the discount amount
const applyDiscountCode = async ( userId, amount, discountCode ) =>
{
  try
  {
    const validCoupon = await Voucher.findOne( { code: discountCode } );
    if ( !validCoupon )
    {
      throw new Error( "Mã voucher không đúng" );
    }

    // Calculate the discount amount
    const discount = ( amount * validCoupon.discount ) / 100;

    // Update the order total with the discount
    await order.findOneAndUpdate( { userId }, { totalAfterDiscount: amount - discount }, { new: true } );

    return discount;
  } catch ( error )
  {
    throw new Error( error );
  }
};