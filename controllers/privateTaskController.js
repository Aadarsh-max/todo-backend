import bcrypt from "bcryptjs";

import PrivateTask from "../models/privatetaskModel.js";
import PrivatePin from "../models/privatePinModel.js";

// Set PIN (first time)
export const setPin = async (req, res) => {
  try {
    const { firebaseUID, pin } = req.body;
    if (!firebaseUID || !pin)
      return res.status(400).json({ message: "Missing data" });

    const existing = await PrivatePin.findOne({ firebaseUID });
    if (existing) return res.status(400).json({ message: "PIN already set" });

    const pinHash = await bcrypt.hash(pin, 10);
    await PrivatePin.create({ firebaseUID, pinHash });

    res.status(201).json({ message: "PIN set successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify PIN
export const verifyPin = async (req, res) => {
  try {
    const { firebaseUID, pin } = req.body;
    const pinRecord = await PrivatePin.findOne({ firebaseUID });
    if (!pinRecord) return res.status(404).json({ message: "PIN not set" });

    const isMatch = await bcrypt.compare(pin, pinRecord.pinHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid PIN" });

    res.status(200).json({ message: "PIN verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Private Task (with full dateTime)
export const createPrivateTask = async (req, res) => {
  try {
    const { title, description, dateTime, firebaseUID } = req.body;

    if (!firebaseUID)
      return res.status(400).json({ message: "firebaseUID required" });
    if (!title) return res.status(400).json({ message: "title required" });
    if (!dateTime)
      return res.status(400).json({ message: "dateTime required" });

    const newTask = await PrivateTask.create({
      title,
      description,
      dateTime,
      firebaseUID,
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Private Tasks
export const getPrivateTasks = async (req, res) => {
  try {
    const { firebaseUID } = req.query;
    if (!firebaseUID) return res.status(400).json({ message: "Missing UID" });

    const tasks = await PrivateTask.find({ firebaseUID }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Private Task
export const deletePrivateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PrivateTask.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Check if PIN exists
export const checkPin = async (req, res) => {
  try {
    const { firebaseUID } = req.query;
    if (!firebaseUID)
      return res.status(400).json({ message: "Missing firebaseUID" });

    const existing = await PrivatePin.findOne({ firebaseUID });
    return res.status(200).json({ pinSet: !!existing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle Complete
export const toggleTaskComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await PrivateTask.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
