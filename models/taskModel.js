import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: "personal" },
  datetime: { type: String, default: Date.now },
  completed: { type: Boolean, default: false },
  firebaseUID: { type: String, required: true },
  repeat: { type: String, default: "none" },
  starred: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

export default mongoose.model("Task", taskSchema);
