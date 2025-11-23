import Task from "../models/taskModel.js";
import { normalizeDateTime } from "../utils/dateTimeUtil.js";

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid)
      return res.status(400).json({ message: "Missing firebaseUID (uid)" });

    const tasks = await Task.find({ firebaseUID: uid }).sort({
      starred: -1,
      order: 1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, category, datetime, firebaseUID, repeat } = req.body;

    if (!firebaseUID)
      return res.status(400).json({ message: "firebaseUID is required" });

    // Normalize datetime
    const normalizedDate = normalizeDateTime(datetime);
    if (!normalizedDate)
      return res.status(400).json({ message: "Invalid datetime format" });

    // Get current max order for user
    const lastTask = await Task.findOne({ firebaseUID }).sort({ order: -1 });
    const nextOrder = lastTask ? lastTask.order + 1 : 0;

    const newTask = new Task({
      title,
      category,
      datetime: normalizedDate, // <-- fixed
      firebaseUID,
      repeat: repeat || "none",
      order: nextOrder,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.datetime) {
      const normalizedDate = normalizeDateTime(updateData.datetime);
      if (!normalizedDate)
        return res.status(400).json({ message: "Invalid datetime format" });
      updateData.datetime = normalizedDate;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(400).json({ message: err.message });
  }
};
