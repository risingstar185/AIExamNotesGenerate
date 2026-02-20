import UserModel from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Current user fetched',
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `get current user error ${error}`
    });
  }
};
