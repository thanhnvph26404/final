import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            uid: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
