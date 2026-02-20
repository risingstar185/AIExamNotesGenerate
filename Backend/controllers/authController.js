import UserModel from '../models/userModel.js';
import { generateToken} from '../utils/token.js';

export const GoogleAuth = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await UserModel.findOne({
      email,
    });
    if (!user) {
    let  user = new UserModel({ 
        name,
        email,});
      await user.save();
    }
    const token = generateToken(user?._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path:"/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }
    )
    res.json({ token });
  }
    catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,   // localhost pe false
    sameSite: "None"
  });

  return res.status(200).json({
    message: "Logged out successfully"
  });
};

