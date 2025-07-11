import { asyncHandler, ApiResponse } from '../Utils/index.js'

export const healthCheck = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Server is running!!"
            )
        )
})

