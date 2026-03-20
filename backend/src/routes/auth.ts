import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json({ message: "User created successfully" });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "User already exists" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // create token
   const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_ACCESS_SECRET as string,
  { expiresIn: "1d" }
);

    res.json({ token });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;