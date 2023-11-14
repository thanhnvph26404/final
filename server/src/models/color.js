import mongoose from "mongoose"

const Colorschema = new mongoose.Schema( {
    color: {
        type: String,
        required: true,
    },

} )

export default mongoose.model( "Color", Colorschema )
