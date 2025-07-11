import mongoose, {Schema} from 'mongoose'

const PostSchema = new Schema({
    
}, {
    timestamps: true
})

const Post = new mongoose.model('Post', PostSchema)

export default Post