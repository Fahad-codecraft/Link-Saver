import mongoose from "mongoose";


const LinkSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        channel: {
            type: String,
        },
        duration: {
            type: String,
        },
    }, { timestamps: true }
)

const Link = mongoose.model("Link", LinkSchema)

export default Link;