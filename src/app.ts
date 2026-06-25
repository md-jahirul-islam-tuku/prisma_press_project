import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.routes";

const app: Application = express();

app.use(cors({ origin: config.app_url, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User retrieved successfully",
    data: {
      users,
    },
  });
});

export default app;
