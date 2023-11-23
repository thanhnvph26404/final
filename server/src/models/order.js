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
            hasReviewed: {
                type: Boolean,
                default: false, // Ban đầu, đánh dấu là chưa đánh giá
            },
            productVariant: {
                size: String,
                color: String,
            },
            quantity: {
                type: Number,
                required: true,
            },
            productInfo: {
                images: [], // Dựa vào mô hình sản phẩm, bạn có thể lưu các thông tin tương tự
                name: String,
                brand: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Brand", // Tham chiếu đến model Brand hoặc bạn có thể đổi thành tên model thương hiệu tương ứng
                },
                price: {
                    type: Number,
                    required: true,
                },
                category: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category", // Tham chiếu đến model Category hoặc bạn có thể đổi thành tên model danh mục tương ứng
                },
            },
        }
    ],
    total: {
        type: Number,
    },
    shippingType: {
        type: String
    },
    paymentStatus: {
        type: String,
        default: "thanh toán khi nhận hàng",
        enum: [ "thanh toán khi nhận hàng", "Paypal" ]


    },
    status: {
        type: String,
        default: "Đang xử lý",
        enum: [
            "đang chờ được xử lý",
            "hủy đơn hàng",
            "không thể hủy đơn hàng",
            "thanh toán thành công",
            "Chờ thanh toán",
            "Đang xử lý",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
            "Đã hoàn tiền",
            "Đã hoàn thành",
        ],
    },
    cancelReason: {
        type: String,
        enum: [
            "chọn sản phẩm khác",
            "đổi địa chỉ",
            "muốn chọn màu,size khác",
            "lý do khác"
        ]
        // Trường lý do hủy đơn hàng
    },
    cancelRequest: {
        type: Boolean,
        default: false // Mặc định là false, khi không có yêu cầu hủy
    },
    paymentIntent: {},
    Phone: {
        type: String,
    },
    Address: {
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