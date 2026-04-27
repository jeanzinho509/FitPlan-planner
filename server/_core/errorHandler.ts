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

  // Log the error internally
  console.error("[Global Error Handler]", err);

  // Return a generic error to prevent stack trace leakage
  res.status(500).json({ error: "Internal Server Error" });
}
