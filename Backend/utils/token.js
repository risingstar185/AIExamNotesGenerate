import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
  try {
    const token=jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '7d' });
     console.log(token);
    return token;
   
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }}