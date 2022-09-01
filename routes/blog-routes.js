import express from "express";
import {
  addBlog,
  deleteBLog,
  getAllBlogs,
  getById,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBLog);
blogRouter.get("/user/:id", getByUserId);
export default blogRouter;
