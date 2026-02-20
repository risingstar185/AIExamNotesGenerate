import express from 'express'
import isAuth from '../middleware/isAuth.js';
import { createCreditsOrder } from '../controllers/credits.controller.js';


const creditsRoute=express.Router();  

creditsRoute.post('/order',isAuth,createCreditsOrder);


export default creditsRoute;
