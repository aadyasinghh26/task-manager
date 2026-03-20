import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

if (!token) {
  return res.status(401).json({ error: "No token" });
}

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as any;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};