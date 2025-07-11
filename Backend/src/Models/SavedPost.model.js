import mongoose, {Schema} from 'mongoose'

const SavedPostSchema = new Schema({}, {
    timestamps: true
})

const SavedPost = new mongoose.model('SavedPost', SavedPostSchema)

export default SavedPost