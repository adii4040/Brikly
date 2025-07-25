import fs from 'fs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import Post from '../Models/Post.model.js'
import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from '../Utils/index.js'
import PostDetail from '../Models/PostDetails.model.js'
import SavedPost from '../Models/SavedPost.model.js'



const fileValidation = (files) => {
    const seen = new Set()
    const uniqueFiles = []

    if (!files || !Array.isArray(files) || files.length !== 4) {
        files.forEach(f => f?.path && fs.existsSync(f.path) && fs.unlinkSync(f.path))
        throw new ApiError(401, "Exactly 4 property images are required");
    }
    for (const file of files) {
        if (!file?.originalname || !file?.path) continue

        if (seen.has(file.originalname)) {
            // delete only valid files (avoid crashing on malformed ones)
            files.forEach(f => f?.path && fs.existsSync(f.path) && fs.unlinkSync(f.path))
            throw new ApiError(409, "Duplicate image filenames are not allowed!")
        }

        seen.add(file.originalname)
        uniqueFiles.push(file)
    }

    return uniqueFiles
}

const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        price,
        landmark,
        city,
        state,
        pincode,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        propertyType,
        propertyStatus,
        //Post Extra Details
        description,
        utilityPolicy,
        petPolicy,
        incomePolicy,
        size,
        schoolDist,
        hospitalDist,
        restaurantDist,
        railwayStationDist,
        busStopDist,
        airportDist
    } = req.body


    const localFiles = fileValidation(req.files)

    if (!localFiles) throw new ApiError(409, "Property images are required!!")

    const cloudinaryImages = await Promise.all(localFiles.map((file) => (uploadOnCloudinary(file?.path))))
    if (!cloudinaryImages) throw new ApiError(409, "Property images are required!!")


    const cloudinaryImagesUrl = cloudinaryImages.map((image) => ({ "url": image.url }))

    //console.log(cloudinaryImagesUrl)

    const post = await Post.create({
        title,
        postedBy: new mongoose.Types.ObjectId(req.user._id),
        images: cloudinaryImagesUrl,
        price,
        address: {
            landmark,
            city,
            state,
            pincode,
            latitude,
            longitude
        },
        bedrooms,
        bathrooms,
        propertyType,
        propertyStatus

    })


    if (!post) {
        throw new ApiError((401, "Error creating post, please try again!"))
    } 

    const postDetails = await PostDetail.create({
        postId: new mongoose.Types.ObjectId(post._id),
        description,
        generalPolicy: {
            utilityPolicy,
            petPolicy,
            incomePolicy
        },
        roomSizes: {
            size,
            bedrooms,
            bathrooms
        },
        nearByPlacesDistanace: {
            schoolDist,
            hospitalDist,
            restaurantDist,
            railwayStationDist,
            busStopDist,
            airportDist
        }
    })
    const createdPost = await Post.findById(post._id).populate("postedBy", "fullname email avatar isEmailVerified")

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                post: {
                    createdPost,
                    postDetails
                }
            },
            "Post created successfully"
        )
    )

})


const getPosts = asyncHandler(async (req, res) => {
    const allowedFilter = ['city', 'state', 'propertyStatus', 'propertyType', 'bedrooms', 'maxPrice', 'minPrice']
    let filter = {};

    allowedFilter.forEach((key) => {
        if (req.query[key] !== undefined) {
            if (key === 'city' || key === 'state') {
                if (!filter.address) {
                    filter[`address.${key}`] = { $regex: req.query[key], $options: "i" }
                }
            }
            else if (key === 'minPrice' || key === 'maxPrice') {
                const min = parseInt(req.query.minPrice)
                const max = parseInt(req.query.maxPrice)
                if (req.query.maxPrice && req.query.minPrice && min > max) throw new ApiError(400, "Max price should be greater than Min price")

                if (req.query.minPrice && isNaN(min)) throw new ApiError(400, "Invalid minPrice value")
                if (req.query.maxPrice && isNaN(max)) throw new ApiError(400, "Invalid maxPrice value")
                filter.price = {
                    $gte: req.query.minPrice ? min : 0,
                    $lte: req.query.maxPrice ? max : Number.MAX_SAFE_INTEGER
                }
            }
            else {
                filter[key] = isNaN(req.query[key]) ? { $regex: req.query[key], $options: "i" } : parseInt(req.query[key])
            }
        }
    })

    //console.log("filter:", filter)

    const allPosts = await Post.find(filter).populate("postedBy", "fullname email avatar isEmailVerified")
    if (!allPosts.length) throw new ApiError(404, "No post found!")

    return res.status(200).json(
        new ApiResponse(
            200,
            { posts: allPosts },
            "All posts fetched successfully"
        )
    )
})


const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const post = await Post.findById(postId).populate("postedBy", "fullname email avatar isEmailVerified")
    const postDetails = await PostDetail.findOne({ postId })
    if (!post && !postDetails) throw new ApiError(404, "No post found!")


    let userId;
    const token = req.cookies?.accessToken
    if (!token) {
        userId = null
    } else {
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        userId = decodedData._id
    }

    const saved = userId ? await SavedPost.findOne({
        savedPostId: postId,
        savedBy: userId
    }) : null

    const isSaved = userId ? !!saved : undefined   // if user is loged out, isSaved will be undefined and if user has saved the post saved = {...} therefore !!saved = truthy and if post is not saved, saved will be null therefore !!!saved or !!null = falsy

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                post: {
                    post,
                    postDetails,
                    ...(isSaved !== undefined && { isSaved }) // only add if logged in
                }
            },
            "Post fetched successfully!!"
        )
    )

})


const updatePost = asyncHandler(async (req, res) => {

    //Do not update all the fields, only update the ones that are provided in the request
    const { postId } = req.params
    const {
        title,
        price,
        landmark,
        city,
        state,
        pincode,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        propertyType,
        propertyStatus,
        //Post Extra Details
        description,
        utilityPolicy,
        petPolicy,
        incomePolicy,
        size,
        schoolDist,
        hospitalDist,
        restaurantDist,
        railwayStationDist,
        busStopDist,
        airportDist
    } = req.body

    const post = await Post.findOne({
        _id: postId,
        postedBy: req.user._id,
    })

    if (!post) throw new ApiError(401, "Unauthorized Request!")

    const postDetails = await PostDetail.findOne({ postId })
    if (!postDetails) throw new ApiError(401, "Unauthorized Request!")

    if (title) {
        post.title = title
    }
    if (price) {
        post.price = price
    }
    if (landmark) {
        post.address.landmark = landmark
    }
    if (city) {
        post.address.city = city
    }
    if (state) {
        post.address.state = state
    }
    if (pincode) {
        post.address.pincode = pincode
    }
    if (latitude) {
        post.address.latitude = latitude
    }
    if (longitude) {
        post.address.longitude = longitude
    }
    if (bedrooms) {
        post.bedrooms = bedrooms
        postDetails.roomSizes.bedrooms = bedrooms
    }
    if (bathrooms) {
        post.bathrooms = bathrooms
        postDetails.roomSizes.bathrooms = bathrooms
    }
    if (propertyType) {
        post.propertyType = propertyType
    }
    if (propertyStatus) {
        post.propertyStatus = propertyStatus
    }

    if (req.files && req.files.length > 0) {
        const localFiles = fileValidation(req.files)

        if (!localFiles) throw new ApiError(409, "Property images are required!!")

        const cloudinaryImages = await Promise.all(localFiles.map((file) => (uploadOnCloudinary(file?.path))))
        if (!cloudinaryImages) throw new ApiError(409, "Property images are required!!")

        const cloudinaryImagesUrl = cloudinaryImages.map((image) => ({ "url": image.url }))

        post.images = cloudinaryImagesUrl

    }

    //for post details

    if (description) {
        postDetails.description = description
    }
    if (utilityPolicy) {
        postDetails.generalPolicy.utilityPolicy = utilityPolicy
    }
    if (petPolicy) {
        postDetails.generalPolicy.petPolicy = petPolicy
    }
    if (incomePolicy) {
        postDetails.generalPolicy.incomePolicy = incomePolicy
    }
    if (size) {
        postDetails.roomSizes.size = size
    }
    if (schoolDist) {
        postDetails.nearByPlacesDistanace.schoolDist = schoolDist
    }
    if (hospitalDist) {
        postDetails.nearByPlacesDistanace.hospitalDist = hospitalDist
    }
    if (restaurantDist) {
        postDetails.nearByPlacesDistanace.restaurantDist = restaurantDist
    }
    if (railwayStationDist) {
        postDetails.nearByPlacesDistanace.railwayStationDist = railwayStationDist
    }
    if (busStopDist) {
        postDetails.nearByPlacesDistanace.busStopDist = busStopDist
    }
    if (airportDist) {
        postDetails.nearByPlacesDistanace.airportDist = airportDist
    }

    await post.save({ validateBeforeSave: true })
    await postDetails.save({ validateBeforeSave: true })

    const updatedPost = await Post.findById(post._id).populate("postedBy", "fullname email avatar isEmailVerified")
    const updatedPostDetails = await PostDetail.findById(postDetails._id)

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                post: {
                    updatedPost,
                    updatedPostDetails
                }
            },
            "Post updated successfully!!"
        )
    )

})


const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const post = await Post.findOne({
        _id: postId,
        postedBy: req.user?._id,
    })

    if (!post) throw new ApiError(401, "Unauthorized Request!")

    await Post.findByIdAndDelete(post._id)
    await PostDetail.findOneAndDelete({ postId: post._id })

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully!!"
        )
    )

})

const savePost = asyncHandler(async (req, res) => {
    const { postId } = req.body
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid Post ID")
    }

    const savedPost = await SavedPost.findOne({
        savedPostId: postId,
        savedBy: req.user._id
    })

    if (savedPost) {
        await SavedPost.findOneAndDelete({
            savedPostId: postId,
            savedBy: req.user._id
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Post removed from the saved list."
            )
        )
    } else {
        const savepost = await SavedPost.create({
            savedPostId: postId,
            savedBy: req.user._id
        })

        const savedPost = await SavedPost.findById(savepost._id).populate("savedPostId", "title images price address").populate("savedBy", "fullname email avatar isEmailVerified")

        return res.status(201).json(
            new ApiResponse(
                20,
                { savedPost },
                "Post saved."
            )
        )
    }
})




export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    savePost,
}