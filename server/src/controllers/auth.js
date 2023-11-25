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
import nodemailer from "nodemailer"

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
    const users = await Auth.findById( userId );
    console.log( users );
    const productInfo = await Product.findById( productId );
    const existingCart = await Cart.findOne( { userId } );

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
        address: users.address
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

          // Check if the quantity of size or color is less than 0 and return an error
          if ( variantToUpdate.quantity < 0 )
          {
            return res.status( 400 ).json( {
              message: `Sản phẩm đã hết size hoặc màu bạn đã chọn (${ size }, ${ color }).`,
            } );
          }

          await productToUpdate.save();
        }

        await existingCart.save();

        // Calculate total after updating the cart
        let total = 0;
        for ( const item of existingCart.items )
        {
          total += item.productInfo.price * item.quantity;
        }
        existingCart.total = total;
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

          // Check if the quantity of size or color is less than 0 and return an error
          if ( variantToUpdate.quantity < 0 )
          {
            return res.status( 400 ).json( {
              message: `Sản phẩm đã hết size hoặc màu bạn đã chọn (${ size }, ${ color }).`,
            } );
          }

          await productToUpdate.save();
        }

        await newCart.save();

        // Calculate total after saving the new cart
        let total = 0;
        for ( const item of newCart.items )
        {
          total += item.productInfo.price * item.quantity;
        }
        newCart.total = total;
        await newCart.save();
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
export const removeFromCart = async ( req, res ) =>
{
  try
  {
    const userId = req.user._id;
    const productId = req.params.id; // Lấy productId từ URL

    // Tìm giỏ hàng của người dùng
    const existingCart = await Cart.findOne( { userId } );

    if ( !existingCart )
    {
      return res.status( 404 ).json( {
        message: "Giỏ hàng không tồn tại.",
      } );
    }

    // Tìm index của sản phẩm cần xóa trong mảng items của giỏ hàng
    const itemIndex = existingCart.items.findIndex(
      ( item ) => item.product.toString() === productId
    );

    if ( itemIndex === -1 )
    {
      return res.status( 404 ).json( {
        message: "Sản phẩm không tồn tại trong giỏ hàng.",
      } );
    }

    // Xóa sản phẩm khỏi mảng items
    existingCart.items.splice( itemIndex, 1 );

    // Cập nhật tổng giá trị sau khi xóa sản phẩm
    let total = 0;
    for ( const item of existingCart.items )
    {
      total += item.productInfo.price * item.quantity;
    }
    existingCart.total = total;

    // Lưu thay đổi vào cơ sở dữ liệu
    await existingCart.save();

    return res.status( 200 ).json( {
      message: "Đã xóa sản phẩm khỏi giỏ hàng.",
    } );
  } catch ( error )
  {
    console.error( error );
    return res.status( 500 ).json( {
      message: "Lỗi máy chủ: " + error.message,
    } );
  }
};


export const getUserCart = async ( req, res ) =>
{
  const { _id } = req.user
  try
  {
    const getUser = await Cart.findOne( { userId: _id } ).populate( "items.product" ).populate( "userId" );
    res.json( getUser )
  } catch ( error )
  {
    throw new Error( error )
  }
}

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


export const updateOrderStatus = async ( req, res, next ) =>
{
  const { status } = req.body;
  const { id } = req.params;
  const { _id } = req.user

  try
  {
    const existingOrder = await order.findById( id );

    // Kiểm tra nếu đơn hàng đã chuyển trạng thái nhất định
    if (
      existingOrder.status === "Đã hoàn thành" ||
      existingOrder.status === "Đã hủy" || existingOrder.status === "đang chờ được xử lý" || existingOrder.status === "Đã hoàn tiền"
    )
    {
      return res.status( 400 ).json( {
        error: "Không thể thay đổi trạng thái của đơn hàng này",
      } );
    }
    const isAllowedToChange = canChangeToNewStatus(
      existingOrder,
      status
    );

    if ( !isAllowedToChange )
    {
      return res.status( 400 ).json( {
        error: "Không thể quay lại trạng thái này",
      } );
    }

    // Thêm trạng thái mới vào lịch sử trạng thái
    existingOrder.statusHistory.push( {
      status: status,
      updatedBy: _id, // ID của người thực hiện hành động

      updatedAt: new Date(),
    } );

    // Cập nhật trạng thái mới cho đơn hàng
    existingOrder.status = status;
    const updatedOrder = await existingOrder.save();

    // Check if the order status is "Đã hủy" or "Đã hoàn tiền"
    if ( status === "Đã hủy" || status === "Đã hoàn tiền" )
    {
      // Iterate through the order items and update product quantities and sold values
      for ( const item of updatedOrder.products )
      {
        const { product, quantity } = item;
        await Product.updateOne(
          { _id: product._id },
          { $inc: { quantity, sold: -quantity } }
        );
      }
    }

    res.json( updatedOrder );
  } catch ( error )
  {
    return next( error );
  }
};
const canChangeToNewStatus = ( existingOrder, newStatus ) =>
{
  // Lấy lịch sử trạng thái của đơn hàng
  const statusHistory = existingOrder.statusHistory.map( ( item ) => item.status );

  // Kiểm tra trạng thái ban đầu của đơn hàng (lấy trạng thái đầu tiên trong lịch sử)
  const initialStatus = statusHistory[ 0 ];

  // Kiểm tra nếu trạng thái muốn chuyển đến không phải là trạng thái ban đầu
  if ( newStatus === initialStatus )
  {
    return false; // Trạng thái mới muốn chuyển đến là trạng thái ban đầu, không hợp lệ
  }

  // Kiểm tra nếu trạng thái muốn chuyển đến đã từng được chuyển qua từ trạng thái ban đầu
  const hasChangedToNewStatus = statusHistory.includes( newStatus );

  return !hasChangedToNewStatus;
};

export const applyCoupon = async ( req, res ) =>
{
  const { _id } = req.user;
  const { voucher } = req.body;

  const validcoupon = await Voucher.findOne( { code: voucher } )
  if ( validcoupon === null ) throw new Error( "mã voucher không đúng " );
  if ( validcoupon.limit <= 0 )
  {
    throw new Error( "Số lượng voucher đã hết" );
  }
  const currentDate = new Date();
  if ( currentDate > new Date( validcoupon.endDate ) )
  {
    console.log( "Voucher đã hết hạn" );
    return { error: "Voucher đã hết hạn" }; // Return an object indicating the error
  }
  const user = await Auth.findOne( { _id } );
  let { products, total } = await Cart.findOne( { userId: user._id } ).populate( "items.product" )
  console.log( total );
  let totalAfterDiscount = ( total - ( total * validcoupon.discount ) / 100 ).toFixed( 2 );
  await Cart.findOneAndUpdate( { userId: user._id }, { totalAfterDiscount }, { new: true } );
  await Voucher.findOneAndUpdate( { code: voucher }, { $inc: { limit: -1 } } );
  res.json( totalAfterDiscount )



}

export const createOrder = async ( req, res ) =>
{
  const { COD, Address, couponApplied, TTONL, shippingType } = req.body;
  const { _id } = req.user;

  try
  {
    let method = "COD";
    let paymentStatus = "thanh toán khi nhận hàng";

    if ( TTONL )
    {
      method = "TTONL";
      paymentStatus = "Paypal";
    } else if ( !COD )
    {
      throw new Error( "Create order failed" );
    }
    let shippingFee = 0;
    if ( shippingType === 'nhanh' )
    { // Xác định loại vận chuyển
      shippingFee = 30; // Nếu là giao hàng tiết kiệm, tăng phí vận chuyển lên 30k
    } else if ( shippingType === 'hỏa tốc' )
    {
      shippingFee = 50; // Nếu là giao hàng hỏa tốc, tăng phí vận chuyển lên 50k
    }

    const user = await Auth.findById( _id );
    let userCart = await Cart.findOne( { userId: user._id } );
    console.log( userCart );
    let finalAmount = couponApplied && userCart.totalAfterDiscount ? userCart.totalAfterDiscount + shippingFee : userCart.total + shippingFee;

    let newOrder = await new order( {
      products: userCart.items,
      paymentIntent: {
        id: uniqid(),
        method: method,
        amount: finalAmount,
        status: "thanh toán thành công",
        created: Date.now(),
        currency: "VND",
      },
      userId: user._id,
      paymentStatus: paymentStatus,
      Address,
      shippingType
    } ).save();

    // Clear the user's cart after creating the order
    await Cart.findOneAndDelete( { userId: user._id } );

    let update = userCart.items.map( ( item ) =>
    {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { sold: +item.quantity } },
        },
      };
    } );

    const updated = await Product.bulkWrite( update, {} );
    return res.json( { message: "success", newOrder } );
  } catch ( error )
  {
    return res.status( 500 ).json( { error: "Internal server error" } );
  }
};





export const getOrders = async ( req, res ) =>
{
  const { _id } = req.user
  try
  {
    const Order = await order.find( { userId: _id } ).populate( "products.product" ).sort( { createdAt: -1 } ).exec();
    res.json( {
      Order
    } )
  } catch ( error )
  {
    throw new Error( error )
  }
}
export const getAllOrders = async ( req, res ) =>
{
  try
  {
    const Order = await order.find().populate( "products.product" ).populate( "userId" ).sort( { createdAt: -1 } ).exec();
    res.json( { Order } )
  } catch ( error )
  {
    throw new Error( error )
  }
}

export const getoneOrders = async ( req, res ) =>
{
  const id = req.params.id
  try
  {
    const Order = await order.findById( id )
      .populate( {
        path: 'products.productInfo.category', // Đường dẫn đến category trong productInfo
        model: 'Category' // Tên của model Category
      } )
      .populate( 'products.product' ).populate( "userId" ) // Populate product (nếu có)
      .exec();
    res.json(
      Order
    )
  } catch ( error )
  {
    throw new Error( error )
  }
}
// API endpoint cho người dùng yêu cầu hủy đơn hàng
export const cancelOrderRequest = async ( req, res ) =>
{
  const { id } = req.params; // ID của đơn hàng
  const { reason } = req.body; // Lý do hủy đơn hàng từ người dùng

  try
  {
    const Order = await order.findById( id );

    // Kiểm tra trạng thái của đơn hàng trước khi hủy
    if ( Order.cancelReason )
    {
      return res.status( 400 ).json( { error: 'Đơn hàng đã được gửi yêu cầu trước đó' } );
    }

    // Tìm đơn hàng dựa trên ID và cập nhật thông tin hủy đơn hàng
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status: 'đang chờ được xử lý', cancelReason: reason, cancelRequest: true }, // Cập nhật cancelReason
      { new: true }
    );

    // Gửi email thông báo khi có yêu cầu hủy đơn hàng
    const transporter = nodemailer.createTransport( {
      service: 'gmail',
      auth: {
        user: 'thanhnvph26404@gmail.com', // Email của bạn
        pass: 'ricjggvzlskbtsxl', // Mật khẩu email của bạn
      },
    } );

    const mailOptions = {
      from: 'yourEmail@gmail.com',
      to: 'honggiang22112003@gmail.com', // Địa chỉ email muốn gửi thông báo đến
      subject: 'Yêu cầu hủy đơn hàng',
      text: `Đơn hàng ${ id } yêu cầu hủy với lý do: ${ reason } bạn hãy check tài khoản của mình`,
    };

    transporter.sendMail( mailOptions, ( error, info ) =>
    {
      if ( error )
      {
        console.log( 'Error occurred while sending email:', error );
      } else
      {
        console.log( 'Email sent:', info.response );
      }
    } );

    res.json( updatedOrder );
  } catch ( error )
  {
    return res.status( 500 ).json( { error: 'Lỗi server: ' + error.message } );
  }
};

// API endpoint cho quản trị viên xác nhận yêu cầu hủy đơn hàng
export const confirmCancelOrder = async ( req, res ) =>
{
  const { id } = req.params; // ID của đơn hàng
  const { isConfirmed } = req.body; // Xác nhận hoặc từ chối yêu cầu hủy đơn hàng từ quản trị viên
  const { email } = req.user
  console.log( email );
  try
  {
    // Tìm đơn hàng dựa trên ID
    const orderToCancel = await order.findById( id );

    if ( !orderToCancel )
    {
      return res.status( 404 ).json( { error: 'Đơn hàng không tồn tại.' } );
    }

    if ( isConfirmed )
    {
      // Nếu quản trị viên chấp nhận hủy đơn hàng
      await order.findByIdAndUpdate(
        id,
        { status: 'Đã hủy', cancelReason: orderToCancel.cancelReason },
        { new: true }
      );

      // Gửi email thông báo cho người dùng đăng nhập
      const transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
          user: 'thanhnvph26404@gmail.com', // Email của bạn
          pass: 'ricjggvzlskbtsxl', // Mật khẩu email của bạn
        },
      } );

      const mailOptions = {
        from: 'yourEmail@gmail.com',
        to: 'giangnhph23819@fpt.edu.vn', // Email người dùng đăng nhập
        subject: 'Xác nhận hủy đơn hàng',
        text: `Đơn hàng ${ id } đã được hủy.`,
      };

      transporter.sendMail( mailOptions, ( error, info ) =>
      {
        if ( error )
        {
          console.log( 'Error occurred while sending email:', error );
        } else
        {
          console.log( 'Email sent:', info.response );
        }
      } );

      res.json( { message: 'Đơn hàng đã được hủy.' } );
    } else
    {
      // Nếu quản trị viên từ chối yêu cầu hủy đơn hàng
      // Thay đổi trạng thái về "Đang giao hàng"
      await order.findByIdAndUpdate(
        id,
        { status: 'Đang giao hàng', cancelReason: orderToCancel.cancelReason, cancelRequest: false },
        { new: true }
      );

      // Gửi email thông báo cho người dùng đăng nhập
      const transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
          user: 'thanhnvph26404@gmail.com', // Email của bạn
          pass: 'ricjggvzlskbtsxl', // Mật khẩu email của bạn
        },
      } );

      const mailOptions = {
        from: 'yourEmail@gmail.com',
        to: 'giangnhph23819@fpt.edu.vn', // Email người dùng đăng nhập
        subject: 'Từ chối hủy đơn hàng',
        text: `Yêu cầu hủy đơn hàng ${ id } không được chấp nhận.`,
      };

      transporter.sendMail( mailOptions, ( error, info ) =>
      {
        if ( error )
        {
          console.log( 'Error occurred while sending email:', error );
        } else
        {
          console.log( 'Email sent:', info.response );
        }
      } );

      res.json( { message: 'Đơn hàng không thể hủy.' } );
    }
  } catch ( error )
  {
    return res.status( 500 ).json( { error: 'Lỗi server: ' + error.message } );
  }
};
export const getCancelledOrders = async ( req, res ) =>
{
  try
  {
    const cancelledOrders = await order.find( { cancelRequest: true } );
    res.json( cancelledOrders );
  } catch ( error )
  {
    return res.status( 500 ).json( { error: "Lỗi server: " + error.message } );
  }
};
export const getCancelledtrueOrders = async ( req, res ) =>
{
  try
  {
    const cancelledOrders = await order.find( { cancelRequest: false } );
    res.json( cancelledOrders );
  } catch ( error )
  {
    return res.status( 500 ).json( { error: "Lỗi server: " + error.message } );
  }
};


