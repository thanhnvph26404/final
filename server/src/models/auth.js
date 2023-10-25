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
    image: {
      type: String,
      required: false,
    },
    cards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Card",
      },
    ],
    vouchers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Voucher",
      },
    ],
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