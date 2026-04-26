import type { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[Express] Unhandled Error:", err);

  // If headers have already been sent to the client, we must delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Return a generic error message, avoiding leaking internal stack traces to the client
  res.status(500).json({ error: "An unexpected error occurred." });
}
