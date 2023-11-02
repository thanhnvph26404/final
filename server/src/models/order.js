import mongoose from "mongoose";

const orderSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    vouchers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voucher",
        required: false  // Đặt required là false để cho phép giá trị null
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: String,
            quantity: {
                type: Number,
                required: true,
            },
            images: [ {
                uid: String,
                url: String,
            } ],
            price: {
                type: Number,
                required: true,
            },
            hasReviewed: {
                type: Boolean,
                default: false, // Ban đầu, đánh dấu là chưa đánh giá
            },
        }
    ],
    total: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "đang xử lý",
        enum: [
            "Chờ thanh toán",
            "Đang xử lý",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
            "Đã hoàn tiền",
            "Đã hoàn thành",
        ],
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    paymentId: {
        type: String
    },
    paymentCode: {
        type: String
    },
    payerId: {
        type: String
    }
},
    { timestamps: true, versionKey: false } );
export default mongoose.model( "order", orderSchema );