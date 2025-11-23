import express from "express";
import { upsertUser, getProfileWithStats } from "../controllers/userController.js";

const router = express.Router();

router.post("/", upsertUser);
router.get("/:uid", getProfileWithStats);

export default router;
