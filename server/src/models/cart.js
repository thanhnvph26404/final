import mongoose from "mongoose";

const cartSchema = mongoose.Schema( {
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
    products: [ {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        original_price: {
            type: Number,
            min: 0,
            required: true,
        },
        images: [
            {
                status: {
                    type: String,
                    default: "done",
                },
                name: {
                    type: String,
                    required: true,
                },
                uid: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        ProductVariants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ValueAttribute",
                required: true,
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    } ],
    total: {
        type: Number,
    }
}, { timestamps: true, versionKey: false } )
export default mongoose.model( "cart", cartSchema )