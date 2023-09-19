import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Size", sizeSchema);