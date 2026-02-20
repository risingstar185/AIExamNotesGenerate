import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config();

const isAuth=async(req,res,next)=>{
  try {
    let token=req.cookies.token;
    if(!token){
      res.status(400).json({message:"token is not found"})
    }
    let verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    if(!verifyToken){
      res.status(400).json({message:'user is not have valid token'})
    }
    req.userId=verifyToken.userId
    next()
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:'is Auth is error'})
  }
}

export default isAuth;