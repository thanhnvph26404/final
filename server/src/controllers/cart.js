// import products from "../models/products";

// import Cart from '../models/cart.js'
// // xoas giỏ hàng
// export const resetCart = async ( idUser ) =>
// {
//     try
//     {
//         const cartExist = await Cart.findOne( { userId: idUser } )
//         const productsUpdated = []
//         cartExist.products = productsUpdated
//         const cartUpdated = await Cart.findOneAndUpdate( { _id: cartExist._id }, cartExist, { new: true } )
//         return cartUpdated
//     } catch ( error )
//     {
//         console.log( error.message )
//         return {}
//     }
// }



