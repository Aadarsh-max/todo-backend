import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import privateTaskRoutes from "./routes/privateTaskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/private-tasks", privateTaskRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((err) => console.log("MongoDB connection error:", err));
