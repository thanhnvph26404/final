import mongoose from "mongoose";

const cartSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Tham chiếu đến model User hoặc bạn có thể đổi thành tên model người dùng tương ứng
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // Tham chiếu đến model Product hoặc bạn có thể đổi thành tên model sản phẩm tương ứng
                required: true,
            },
            productVariant: {
                size: String,
                color: String,
            },
            quantity: {
                type: Number,
                required: true,
            },
            totalProduct: {
                type: Number
            },
            productInfo: {
                images: [ String ], // Dựa vào mô hình sản phẩm, bạn có thể lưu các thông tin tương tự
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
        },
    ],
    total: {
        type: Number,
        default: 0,
    },
} );


export default mongoose.model( "Cart", cartSchema );
