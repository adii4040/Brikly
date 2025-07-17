import mongoose, { Schema } from 'mongoose'

const PostDetailSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    utilities: {
        type: String,
        required: true,
        trim: true
    },
    nearByPlaces: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                distance: {
                    type: String,
                    required: true,
                    trim: true
                }
            }   
        ]
    },
}, {
    timestamps: true
})

const PostDetail = new mongoose.model('PostDetail', PostDetailSchema)

export default PostDetail