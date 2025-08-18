import { Router } from 'express';
import { getMessages, createMessage, getMyChats } from '../Controllers/message.controller.js';

//Middleware
import verifyToken from '../Middlewares/auth.middleware.js';

//Validators
import { validateObjectId } from '../Middlewares/validate.middleware.js';
const router = Router();


router.route('/:receiverId/send-message').post(verifyToken, validateObjectId("receiverId"), createMessage);
router.route('/:receiverId/get-messages').get(verifyToken, validateObjectId("receiverId"), getMessages);
router.route('/get-my-chats').get(verifyToken, getMyChats);



export default router;