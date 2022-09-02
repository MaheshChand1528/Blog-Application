import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routess.js";
import router from "./routes/user-routes.js";
import cors from "cors";

var app = express();
app.get("/", (req, res) => {
  res.send("server start");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
module.exports.cors = {
  allRoutes: true,
  origin: '*',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  headers: 'content-type'
};
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
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
