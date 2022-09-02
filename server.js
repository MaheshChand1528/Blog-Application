import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 5000 || 8000 || 3000;

app.get("/", (req, res) => {
  res.json("server start");
});

mongoose
  .connect(
    "mongodb+srv://admin:OcmGNASJxzXjndzx@cluster0.cwwdzqo.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(
    app.listen(PORT, () => {
      console.log(`connected and listening on ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("err");
  });
