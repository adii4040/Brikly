import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost, savePost } from '../Controllers/post.controller.js';

//Middleware
import verifyToken from '../Middlewares/auth.middleware.js';
import upload from '../Middlewares/multer.middleware.js';
import { validate, validationSource } from '../Middlewares/validate.middleware.js';

//Validators
import { postValidation, postUpdateValidation } from '../Validators/Post.validator.js'
import { validateObjectId } from '../Middlewares/validate.middleware.js';
const router = Router();


router.route('/create-post').post(verifyToken, upload.array('postImages', 4), validate(postValidation, validationSource.BODY), createPost);
router.route('/get-posts').get(getPosts);
router.route('/:postId/get-post').get(validateObjectId("postId"), getPostById);
router.route('/:postId/update-post').put(verifyToken, validateObjectId("postId"), upload.array('postImages', 4), validate(postUpdateValidation, validationSource.BODY), updatePost);
router.route('/:postId/delete-post').delete(verifyToken, validateObjectId("postId"), deletePost);
router.route('/save').post(verifyToken, savePost)



export default router;