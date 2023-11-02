import Joi from "joi";

const cartItemSchema = Joi.object( {
    productVariantId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
    productInfo: Joi.object( {
        image: Joi.array().items(
            Joi.object( {
                uid: Joi.string().required(),
                url: Joi.string().required()
            } )
        ),
        name: Joi.string().required(),
        brand: Joi.string().required(),  // You might want to add validations for Brand
        category: Joi.string().required(),  // You might want to add validations for Category
    } ),
    productVariantInfo: Joi.object( {
        attributeValues: Joi.array().items(
            Joi.object( {
                attribute: Joi.string().required(),  // You might want to add validations for Attribute
            } )
        )
    } ),
} );

export const cartSchema = Joi.object( {
    userId: Joi.string().required(),
    voucherId: Joi.string().allow( null ),
    total: Joi.number(),
    items: Joi.array().items( cartItemSchema ),
} );
