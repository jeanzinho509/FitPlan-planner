import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled server error:", err);

  res.status(500).json({
    error: {
      message: "An internal server error occurred",
    },
  });
}
