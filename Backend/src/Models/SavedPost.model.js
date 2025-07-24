import mongoose, { Schema } from 'mongoose'

const SavedPostSchema = new Schema({
    savedPostId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    savedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

}, {
    timestamps: true
})

const SavedPost = new mongoose.model('SavedPost', SavedPostSchema)

export default SavedPost