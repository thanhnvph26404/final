import mongoose from "mongoose";

const cartSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    voucherId: {
        type: mongoose.Types.ObjectId,
        ref: "voucher",
        default: null
    },
    productVariantId: { type: mongoose.Types.ObjectId, ref: 'ProductVariant' },
    productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    quantity: Number,

    total: {

        type: Number,
        default: null
    }
}, { timestamps: true, versionKey: false } )
export default mongoose.model( "Cart", cartSchema )