import Post from '../Models/Post.model.js'
import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from '../Utils/index.js'
import { PropertyStatusEnum, PropertyTypeEnum } from '../Utils/Constants.js'

import fs from 'fs'
import mongoose from 'mongoose'
import { validate } from '../Middlewares/validate.middleware.js'


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
        propertyStatus
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

    if (!post) throw new ApiError((401, "Error creating post, please try again!"))

    const createdPost = await Post.findById(post._id).populate("postedBy", "fullname email avatar isEmailVerified")

    return res.status(201).json(
        new ApiResponse(
            201,
            { post: createdPost },
            "Post created successfully"
        )
    )

})


const getPosts = asyncHandler(async (req, res) => {
    const allPosts = await Post.find({}).populate("postedBy", "fullname email avatar isEmailVerified")
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
    if (!post) throw new ApiError(404, "No post found!")

    return res.status(200).json(
        new ApiResponse(
            200,
            { post },
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
        propertyStatus
    } = req.body

    const post = await Post.findOne({
        _id: postId,
        postedBy: req.user._id,
    })

    if (!post) throw new ApiError(401, "Unauthorized Request!")

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
    }
    if (bathrooms) {
        post.bathrooms = bathrooms  
    }
    if (propertyType) {
        post.propertyType = propertyType   
    }
    if (propertyStatus) {
        post.propertyStatus = propertyStatus   
    }

    if(req.files && req.files.length > 0) {
        const localFiles = fileValidation(req.files)

        if (!localFiles) throw new ApiError(409, "Property images are required!!")

        const cloudinaryImages = await Promise.all(localFiles.map((file) => (uploadOnCloudinary(file?.path))))
        if (!cloudinaryImages) throw new ApiError(409, "Property images are required!!")

        const cloudinaryImagesUrl = cloudinaryImages.map((image) => ({ "url": image.url }))

        post.images = cloudinaryImagesUrl
        
    }

    await post.save({validateBeforeSave: true})

    const updatedPost = await Post.findById(post._id).populate("postedBy", "fullname email avatar isEmailVerified")

    return res.status(200).json(
        new ApiResponse(
            200,
            { post: updatedPost },
            "Post updated successfully!!"
        )
    )

})


const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params

    const post = await Post.findOne({
        _id: postId,
        postedBy: req.user._id,
    })
    if (!post) throw new ApiError(401, "Unauthorized Request!")

    await Post.findByIdAndDelete(post._id)

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully!!"
        )
    )

})


export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}