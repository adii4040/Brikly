import mongoose, { Schema } from 'mongoose'
import { UtilityPolicyEnum, AvailableUtilityPolicy, PetPolicyEnum, AvailablePetPolicy } from '../Utils/Constants.js'
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
    generalPolicy: {
        utilityPolicy: {
            type: String,
            required: true,
            enum: AvailableUtilityPolicy,
            default: UtilityPolicyEnum.SHARED
        },
        petPolicy: {
            type: String,
            required: true,
            enum: AvailablePetPolicy,
            default: PetPolicyEnum.ALLOWED
        },
        incomePolicy: {
            type: String,
            required: true
        }
    },
    roomSizes: {
        size: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        }
    },

    nearByPlacesDistanace: {
            schoolDist: {
                type: Number,
                required: true,
            },
            hospitalDist: {
                type: Number,
                required: true,
            },
            restaurantDist: {
                type: Number,
                required: true,
            },
            railwayStationDist: {
                type: Number,
                required: true,
            },
            busStopDist: {
                type: Number,
                required: true,
            },
            airportDist: {
                type: Number,
                required: true,
            }
        },

}, {
    timestamps: true
})

const PostDetail = new mongoose.model('PostDetail', PostDetailSchema)

export default PostDetail