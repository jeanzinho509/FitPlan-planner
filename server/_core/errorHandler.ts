import type { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the detailed error internally
  console.error("[Global Error Handler]", err);

  // If the response headers have already been sent, we must delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Return a generic error message to avoid leaking stack traces or sensitive internal details
  res.status(500).json({ error: "Internal Server Error" });
}
