import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "No Name",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
