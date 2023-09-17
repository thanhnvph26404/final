import mongoose from "mongoose"
const brandSchema = new mongoose.Schema( {
    title: {
        type: String,
        require: true
    }
}, { timestamps: true } )
export default mongoose.model( "Brand", brandSchema )