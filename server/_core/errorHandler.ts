import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled Error:", err);

  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  });
};
