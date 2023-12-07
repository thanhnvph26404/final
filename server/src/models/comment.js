
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: 0,
        },
        feedback: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", commentSchema);
