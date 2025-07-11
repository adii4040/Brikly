import jwt from 'jsonwebtoken'
import {asyncHandler, ApiError} from '../Utils/index.js'
import User from '../Models/User.model.js';


const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
        if(!accessToken) throw new ApiError(401,"UnAuthorized request!! No token provided")

        const decodedtUserData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
        
        const userData = await User.findById(decodedtUserData._id).select("-password -refreshToken")
        if(!userData) throw new ApiError(401, 'Invalid Access Token')

        req.user = userData
        next()
    } catch (error) {
        next(new ApiError(401, "No loged in user"))
    }
})

export default verifyJWT
