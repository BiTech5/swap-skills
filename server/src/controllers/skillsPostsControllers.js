import User from "../models/User.js";

export const getSkillsPosts = async (req, res) => {
  try {
    const user = await User.find({  _id: { $ne: req.user.id } }).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
