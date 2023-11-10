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
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: String,
            quantity: {
                type: Number,
            },
            images: [ {
                uid: String,
                url: String,
            } ],
            price: {
                type: Number,
            },
            hasReviewed: {
                type: Boolean,
                default: false, // Ban đầu, đánh dấu là chưa đánh giá
            },
        }
    ],
    total: {
        type: Number,
    },
    status: {
        type: String,
        default: "đang xử lý",
        enum: [
            "thanh toán khi nhận hàng",
            "Chờ thanh toán",
            "Đang xử lý",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
            "Đã hoàn tiền",
            "Đã hoàn thành",
        ],
    },
    totalAfterDiscount: {
        type: Number
    },
    paymentIntent: {},
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    // notes: {
    //     type: String
    // },
    // paymentId: {
    //     type: String
    // },
    // paymentCode: {
    //     type: String
    // },
    // payerId: {
    //     type: String
    // }
},
    { timestamps: true, versionKey: false } );
export default mongoose.model( "order", orderSchema );