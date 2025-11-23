import mongoose from "mongoose";

const privateTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  firebaseUID: { type: String, required: true },
  dateTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("PrivateTask", privateTaskSchema);
