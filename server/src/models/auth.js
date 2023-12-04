import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerifyEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      sparse: true,
    },
    address: {
      type: String,
      required: false,
    },
    Address: {
      type: String,
      required: false
    },
    country: {
      type: String,
      require: false
    },
    image: {
      type: String,
      required: false,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    cards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Card",
      },
    ],
    wishList: [ { type: mongoose.Schema.Types.ObjectId, ref: "Product" } ],
    vouchers: [ {
      type: mongoose.Schema.Types.ObjectId, // Hoặc Schema.Types.String nếu bạn lưu trữ dưới dạng chuỗi
      ref: 'voucher' // Tham chiếu tới mô hình Voucher nếu đây là ObjectId
    } ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Favorite",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    role: {
      type: String,
      enum: [ "User", "Admin" ],
      default: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model( "User", userSchema );