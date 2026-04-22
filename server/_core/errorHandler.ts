import type { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If the headers have already been sent, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Log the error securely (without exposing to the client)
  console.error("Operation failed", err);

  // Return a generic error message to prevent leaking stack traces
  res.status(500).json({
    error: "An error occurred. Please try again later.",
  });
}
