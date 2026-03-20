import express from "express";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ CREATE TASK
router.post("/", authMiddleware, async (req: any, res) => {
  try {
    const { title } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        userId: req.userId,
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✅ GET ALL TASKS (only user’s tasks)
router.get("/", authMiddleware, async (req: any, res) => {
  try {
    // 👉 Get query params
    const { page = 1, limit = 5, search = "", status } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,

        // 🔍 Search by title
        title: {
          contains: search,
          mode: "insensitive",
        },

        // 🎯 Filter by completed
        ...(status !== undefined && {
          completed: status === "true",
        }),
      },

      // 📄 Pagination
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ UPDATE TASK
// ✅ TOGGLE TASK (complete/incomplete)
router.put("/:id", authMiddleware, async (req: any, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        completed: !task?.completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle task" });
  }
});

// ✅ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;