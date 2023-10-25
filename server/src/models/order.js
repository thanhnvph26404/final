import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        commune: {
            type: String,

        },
        detailAddress: {
            type: String,
            required: true,
        },
        orderStatus: {
            type: String,
            default: "Đang chờ duyệt",
            enum: [
                "Đang chờ duyệt",
                "Đã nhận đơn",
                "Đang giao hàng",
                "Đã hoàn thành",
            ],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
        },
        productOrder: [
            {
                product: {
                    name: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        min: 0,
                        required: true,
                    },
                    original_price: {
                        type: Number,
                        min: 0,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: true,
                    },
                    images: [
                        {
                            status: {
                                type: String,
                                default: "done",
                            },
                            name: {
                                type: String,
                                required: true,
                            },
                            uid: {
                                type: String,
                                required: true,
                            },
                            url: {
                                type: String,
                                required: true,
                            },
                        },
                    ],
                    category: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Category",
                        required: true,
                    },
                    comments: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Comment",
                        },
                    ],
                },
                quantity: Number,
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

