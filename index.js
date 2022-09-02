import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routess.js";
import router from "./routes/user-routes.js";
import cors from "cors";

var app = express();
app.get("/", (req, res) => {
  res.send("server start");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({
  origin:"*",
  methods:['GET','POST','PUT','DELETE'],
}));
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE;

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
