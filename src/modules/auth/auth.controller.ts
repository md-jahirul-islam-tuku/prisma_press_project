import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const loginResult = await authService.loginUser(payload);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User logged in successfully",
    data: loginResult,
  });
};

export const authController = {
  loginUser,
};
