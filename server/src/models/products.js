import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
  },

);

const productSchema = new mongoose.Schema(
  {
    sold: {
      type: Number,
      required: false,
    },
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
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    images: [
      {
        uid: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],

    ProductVariants: [ productVariantSchema ], // Sử dụng mô hình biến thể sản phẩm

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
  { timestamps: true, versionKey: false }
);

export default mongoose.model( "Product", productSchema );
