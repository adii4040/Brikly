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
    images: [
        {
            url: {
                type: String,
                required: true,
                trim: true
            }
        }

    ],
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: {
            landmark: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                trim: true,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },

    propertyType: {
        type: String,
        required: true,
        enum: AvailablePropertyType,
        default: PropertyTypeEnum.APARTMENT
    },
    propertyStatus: {
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