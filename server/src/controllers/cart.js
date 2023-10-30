import Auth from "../models/auth.js";

import Cart from '../models/cart.js'
// xoas giỏ hàng 
export const resetCart = async ( idUser ) =>
{
    try
    {
        const cartExist = await Cart.findOne( { userId: idUser } )
        const productsUpdated = []
        cartExist.products = productsUpdated
        const cartUpdated = await Cart.findOneAndUpdate( { _id: cartExist._id }, cartExist, { new: true } )
        return cartUpdated
    } catch ( error )
    {
        console.log( error.message )
        return {}
    }
}
export const createCart = async ( req, res ) =>
{
    try
    {
        const userId = req.params.id
        const productNeedToAdd = req.body
        const userExist = await Auth.findById( userId );
        const product = await ChildProduct.findOne( {
            productId: productNeedToAdd.productId,
            colorId: productNeedToAdd.colorId,
            sizeId: productNeedToAdd.sizeId
        } );
        const customProduct = await CustomizedProduct.findById( productNeedToAdd.productId );
        if ( !userExist )
        {
            return res.status( 404 ).json( {
                message: 'Người dùng không tồn tại !'
            } )
        }
        if ( !customProduct )
        {
            if ( !product || product.stock_quantity < productNeedToAdd.stock_quantity )
            {
                return res.status( 400 ).json( { message: `Đã quá số hàng tồn` } );
            }
        } else
        {
            if ( !customProduct || customProduct.stock_quantity < productNeedToAdd.stock_quantity )
            {
                return res.status( 400 ).json( { message: `Đã đạt số lượng mua tối đa` } );
            }
        }
        const { error } = cartSchema.validate( req.body, { abortEarly: false } );
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors
            } )
        }
        const cartExist = await Cart.findOne( { userId: userId } )
        if ( cartExist )
        {
            return addProduct( cartExist, productNeedToAdd, res )
        }
        const newCart = await Cart.create( {
            userId,
            products: [
                {
                    productId: productNeedToAdd._id,
                    ...productNeedToAdd
                }
            ],
            total: productNeedToAdd.product_price * productNeedToAdd.stock_quantity,
        } )
        if ( !newCart )
        {
            return res.status( 400 ).json( {
                message: 'Thêm vào giỏ hàng thất bại'
            } )
        }
        return res.status( 200 ).json( {
            message: 'Thêm vào giỏ hàng thành công',
            data: newCart
        } )
    } catch ( error )
    {
        return res.status( 400 ).json( {
            message: error.message
        } )
    }
}
