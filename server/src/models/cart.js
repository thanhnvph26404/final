import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema( {
    productVariantId: { type: mongoose.Types.ObjectId, ref: 'ProductVariant' },
    productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    productInfo: {
        images: [ {
            uid: String,
            url: String,
        } ],
        name: String,
        brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' }
    },
    productVariantInfo: {
        attributeValues: [ {
            attribute: { type: mongoose.Types.ObjectId, ref: 'Attribute' },

        } ]
    }
} );

const cartSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    voucherId: {
        type: mongoose.Types.ObjectId,
        ref: "Voucher",
        default: null
    },
    total: Number,
    items: [ cartItemSchema ]
}, { timestamps: true, versionKey: false } );

export default mongoose.model( "Cart", cartSchema );
