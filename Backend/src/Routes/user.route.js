import {Router} from 'express'


//Controllers
import { registerUser, loginUser, logoutUser, getCurrentUser, verifyEmail, resendEmailVerification, forgotPasswordRequest, resetForgotPassword, resetCurrentPassword, updateUser } from '../Controllers/user.controller.js'

//Middleware
import {validate, validationSource} from '../Middlewares/validate.middleware.js'
import upload from '../Middlewares/multer.middleware.js'
import verifyJWT from '../Middlewares/auth.middleware.js'

//Validators
import { emailValidation, registerUserValidation, loginUserValidation, resetPasswordValidation, updateUserValidation } from '../Validators/User.validator.js'





const router = Router()


router.route('/register').post( upload.single("avatar") , validate(registerUserValidation, validationSource.BODY), registerUser)
router.route('/login').post(validate(loginUserValidation, validationSource.BODY), loginUser)
router.route('/verify-email/:emailVerificationToken').post( verifyEmail)
router.route('/forgot-password').post( validate(emailValidation, validationSource.BODY), forgotPasswordRequest )
router.route('/reset-forgot-password/:forgotPasswordToken').post( validate(resetPasswordValidation, validationSource.BODY), resetForgotPassword )

//Secured Route
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route('/resend-email-verification').post(verifyJWT, resendEmailVerification)
router.route('/reset-password').post(verifyJWT, validate(resetPasswordValidation, validationSource.BODY), resetCurrentPassword)
router.route('/update').post(verifyJWT, upload.single("avatar"), validate(updateUserValidation, validationSource.BODY), updateUser)

export default router