import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found!" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
    date,
    month,
    year,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    await existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ blog });
};

export const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Not updated" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBLog = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Deletion not successfull" });
  }
  return res.status(200).json({ message: "Success" });
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
