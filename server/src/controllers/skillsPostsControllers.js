import User from "../models/User.js";

export const getSkillsPosts = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

        if (!users || users.length === 0) {
            return res.status(404).send("No other users found");
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
