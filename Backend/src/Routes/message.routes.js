import { Router } from 'express';
import { getMessages, createMessage } from '../Controllers/message.controller.js';

//Middleware
import verifyToken from '../Middlewares/auth.middleware.js';

//Validators
import { validateObjectId } from '../Middlewares/validate.middleware.js';
const router = Router();


router.route('/:receiverId/send-message').post(verifyToken , validateObjectId("receiverId"), createMessage);
router.route('/:receiverId/get-messages').get(verifyToken , validateObjectId("receiverId"), getMessages);




export default router;