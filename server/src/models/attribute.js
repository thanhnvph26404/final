import mongoose from "mongoose"

const attributeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Attribute" , attributeSchema)
