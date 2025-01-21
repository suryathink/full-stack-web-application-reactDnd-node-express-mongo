import express from "express";
import { TaskController } from "../../controllers/taskController";
import verifyToken from "../../middlewares/auth";

const router = express.Router();

router.post("/create", verifyToken, TaskController.createTask);
router.get("/", verifyToken, TaskController.getTasks);
router.patch("/status", verifyToken, TaskController.updateTaskStatus);
router.delete("/:taskId", verifyToken, TaskController.deleteTask);

export default router;
