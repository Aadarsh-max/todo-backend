import express from "express";
import {
  setPin,
  verifyPin,
  createPrivateTask,
  getPrivateTasks,
  deletePrivateTask,
  checkPin,
    toggleTaskComplete,
} from "../controllers/privateTaskController.js";

const router = express.Router();
router.post("/set-pin", setPin);
router.post("/verify-pin", verifyPin);
router.get("/check-pin", checkPin);
router.get("/", getPrivateTasks);
router.post("/", createPrivateTask);
router.delete("/:id", deletePrivateTask);
router.patch("/:id/toggle", toggleTaskComplete);

export default router;
