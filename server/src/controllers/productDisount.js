import Product from "../models/products";

export const findProductsDiscounted = async ( req, res ) =>
{
    try
    {
        const productsWithOriginalPrice = await Product.find( { original_price: { $exists: true, $ne: null } } );

        productsWithOriginalPrice.forEach( async ( product ) =>
        {
            if ( !isNaN( product.price ) && !isNaN( product.original_price ) )
            {
                const discountAmount = product.price - product.original_price;
                product.discountProduct = discountAmount;
                await product.save(); // Lưu sản phẩm với giá giảm được tính toán vào trường discountProduct
            }
        } );

        return res.status( 200 ).json( {
            message: "Danh sách sản phẩm có giảm giá đã được tính toán và cập nhật",
            productsWithDiscount: productsWithOriginalPrice,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};

export const findProductsSoldOverTwenty = async ( req, res ) =>
{
    try
    {
        const productsSoldOverTwenty = await Product.find( { sold: { $gt: 20 } } );

        res.status( 200 ).json( {
            message: 'Danh sách sản phẩm có sold > 20',
            productsSoldOverTwenty: productsSoldOverTwenty,
        } );
    } catch ( error )
    {
        res.status( 500 ).json( {
            message: 'Lỗi server: ' + error.message,
        } );
    }
};