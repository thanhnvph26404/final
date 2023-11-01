import joi from "joi";

export const cartSchema = joi.object( {
    userId: joi.string().required().messages( errorMessages( "User ID" ) ),
    voucherId: joi.string().allow( null ).messages( errorMessages( "Voucher ID" ) ),
    productVariantId: joi.string().required().messages( errorMessages( "ProductVariant ID" ) ),
    productId: joi.string().required().messages( errorMessages( "Product ID" ) ),
    quantity: joi.number().integer().positive().required().messages( errorMessages( "Quantity" ) ),
    total: joi.number().messages( errorMessages( "Total" ) ),
} );
