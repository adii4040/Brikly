import mongoose, {Schema} from 'mongoose'

const PostDetailSchema = new Schema({}, {
    timestamps: true
})

const PostDetail = new mongoose.model('PostDetail', PostDetailSchema)

export default PostDetail