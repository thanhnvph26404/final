
import mongoose from "mongoose"
const voucherSchema = new mongoose.Schema( {
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    discount: {
        type: Number,
        require: true,
    },
    limit: {
        type: Number,
        require: true
    },
    // apply: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     require: true
    // },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: [ "active", "expored" ],
        default: "active"
    }
}, { versionKey: false, timeseries: true } )
export default mongoose.model( "voucher", voucherSchema )

