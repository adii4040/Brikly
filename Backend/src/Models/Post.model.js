import mongoose, { Schema } from 'mongoose'
import { AvailablePropertyStatus, PropertyStatusEnum, AvailablePropertyType, PropertyTypeEnum } from '../Utils/Constants.js'


const PostSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [
            {
                url: {
                    type: String,
                    required: true,
                    trim: true
                }
            }
        ]
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: AvailablePropertyType,
        default: PropertyTypeEnum.APARTMENT
    },
    property: {
        type: String,
        required: true,
        enum: AvailablePropertyStatus,
        default: PropertyStatusEnum.BUY
    }

}, {
    timestamps: true
})

const Post = new mongoose.model('Post', PostSchema)

export default Post