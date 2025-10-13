import express from 'express'
import { getChatPartners, getContacts, getMessageByUserId, sendMessage } from '../Controller/message.controller.js';
import { authUser } from '../Middleware/auth.middleware.js';
import { arcjetProtection } from '../Middleware/arcjet.middlware.js';
const router=express.Router();

router.use(arcjetProtection,authUser);

router.get('/contacts',getContacts);
router.get('/chats',getChatPartners);
router.get('/:id',getMessageByUserId);
router.post('/send/:id',sendMessage);

export default router;