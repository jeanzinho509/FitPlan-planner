import type { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  console.error("[Global Error]", err);

  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred."
  });
}
