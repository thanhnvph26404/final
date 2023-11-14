import mongoose from "mongoose"

const sizeSchema = new mongoose.Schema( {
    size: {
        type: String,
        required: true,
    }
} )

export default mongoose.model( "size", sizeSchema )
