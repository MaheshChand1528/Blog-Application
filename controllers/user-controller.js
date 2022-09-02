import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exist! Login Instead" });
  }
  const hashedPassowrd = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassowrd,
    blogs: [],
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res) => {
  console.log("i m login");
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found! Sing-Up Instead" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Wrong Password" });
  }
  return res.status(200).json({ message: "Login Successfull" , user:existingUser});
};
