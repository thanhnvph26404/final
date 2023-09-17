import mongoose from "mongoose";

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
    sizes: [
      {
        size: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        inventory: {
          type: Number,
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
  { timestamps: true, versionKey: false }
);

export default mongoose.model( "Product", productSchema );
