import mongoose, { Schema } from 'mongoose'
import { AvailablePropertyStatus, PropertyStatusEnum, AvailablePropertyType, PropertyTypeEnum } from '../Utils/Constants.js'
import { ApiError } from '../Utils/ApiError.utils.js'


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

const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
}
PostSchema.pre("save", async function (next) {
    const post = this
    if (!post.isModified("address")) return next()

    if (post.address?.city) {
        post.address.city = toTitleCase(post.address.city)
    }
    if (post.address?.state) {
        post.address.state = toTitleCase(post.address.state)
    }
    next()
})

const Post = new mongoose.model('Post', PostSchema)

export default Post