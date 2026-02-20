import express from 'express';
import { GoogleAuth,logout } from '../controllers/authController.js';

const authRouter = express.Router();
// Register route
authRouter.post('/google',GoogleAuth)
authRouter.post('/logout', logout);

export default authRouter;
