import mongoose from "mongoose"

const valueAttributeSchema = new mongoose.Schema( {
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
} )

export default mongoose.model( "ValueAttribute", valueAttributeSchema )
