import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "User",
        // },
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
        feed_back: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Feedback",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", commentSchema);
