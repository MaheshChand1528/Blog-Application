import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
  date:{
    type: String,
    required:true,
  },
  month:{
    type:String,
    required:true,
  },
  year:{
    type:String,
    required:true,
  },
});
export default mongoose.model("Blog", blogSchema);
