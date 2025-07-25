/*-------Authentication-----*/

const registerUrl = "/api/v1/user/register"
const loginUrl = "/api/v1/user/login"
const currentUrl = "/api/v1/user/current-user"
const logoutUrl = '/api/v1/user/logout'
const resendVerificationUrl = '/api/v1/user/resend-email-verification'
const requestForgotPasswordUrl = '/api/v1/user/request-forgot-password'



/*------Post------*/
const addPostUrl = "/api/v1/post/create-post"
const getAllPostUrl = "/api/v1/post/get-posts"
const getPostByIdUrl = "/api/v1/post/:postId/get-post"
const deletePostUrl = "/api/v1/post/:postId/delete-post"
const updatePostUrl = "/api/v1/post/:postId/update-post"
const savePostUrl = "/api/v1/post/save"



export {
    registerUrl,
    loginUrl,
    currentUrl,
    logoutUrl,
    resendVerificationUrl,
    requestForgotPasswordUrl,
    
    addPostUrl,
    getAllPostUrl,
    getPostByIdUrl,
    deletePostUrl,
    updatePostUrl,
    savePostUrl
}