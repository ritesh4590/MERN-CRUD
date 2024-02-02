import User from "../models/userModel.js";

const registerUser = async (req, res) => {
  const { name, email, rollNo, phoneNo } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(404)
        .json({ success: false, message: `${email} already exists` });
    }

    const newUser = new User({ name, email, rollNo, phoneNo });
    await newUser.save();

    return res.status(200).json({ success: true, newUser });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find().sort({ updatedAt: -1 });
    const userCount = await User.countDocuments();
    return res.status(200).json({ success: true, userCount, user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const updatUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ success: false, message: `Invalid Id` });
    }
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export { getUser, registerUser, getUserById, updatUserById, deleteUser };
