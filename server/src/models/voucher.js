
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
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    detailVoucher: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: [ "active", "expored" ],
        default: "active"
    },
    minimumOrderAmount: {
        type: Number,
        required: true
    }
}, { versionKey: false, timeseries: true } )
export default mongoose.model( "voucher", voucherSchema )

