import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If headers are already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  console.error("[GlobalError]", err);

  // Return generic message to prevent leaking stack trace or internals
  res.status(500).json({ error: "An unexpected internal error occurred" });
}
