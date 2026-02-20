import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import geminiRouter from './routes/geminiRoute.js';
import Pdfrouter from './routes/pdfRoute.js';
import creditsRoute from './routes/credits.Route.js';
import { stripeWebhook } from './controllers/credits.controller.js';

dotenv.config()
const PORT=8000||process.env.PORT

const app=express();
app.use(cookieParser());
app.use(cors(
  {
    origin: 'http://localhost:5174', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  }
));

app.post('/api/credits/webhook',express.raw({type:'application/json'}),stripeWebhook)

app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/gemini',geminiRouter);
app.use('/api/pdf',Pdfrouter);
app.use('/api/credits',creditsRoute)



connectDB();
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})
