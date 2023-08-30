import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);