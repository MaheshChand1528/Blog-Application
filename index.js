import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routess.js";
import router from "./routes/user-routes.js";
import cors from "cors";

var app = express();
app.get("/", (req, res) => {
  res.send("server start");
});
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT =5000;
const DB = "mongodb+srv://admin:OcmGNASJxzXjndzx@cluster0.cwwdzqo.mongodb.net/Blog?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(
    app.listen(PORT, () => {
      console.log(`connected and listening on http://localhost:${PORT}`);
    })
  )
  .catch((err) => {
    console.log("err");
  });
