import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Color", colorSchema);