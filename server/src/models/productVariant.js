import { number } from "joi"
import mongoose from "mongoose"

const productVariantSchema = new mongoose.Schema( {
    Attribute: [
        {
            attribute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attribute",
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }
    ],
    inventory: {
        type: Number,
        min: 0,
        required: true,
    },
} )

export default mongoose.model( "ProductVariant", productVariantSchema )
