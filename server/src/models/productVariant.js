import { number } from "joi"
import mongoose from "mongoose"

const productVariantSchema = new mongoose.Schema({
    AttributeValues: [
        {  type: mongoose.Schema.Types.ObjectId,
        ref: "ValueAttribute",
        required: true,}
    ],
    inventory : {
        type: Number,
        min: 0,
        required: true,
      },
})

export default mongoose.model("ProductVariant" , productVariantSchema)
