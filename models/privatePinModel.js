import mongoose from "mongoose";

const privatePinSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  pinHash: { type: String, required: true },
});

export default mongoose.model("PrivatePin", privatePinSchema);
