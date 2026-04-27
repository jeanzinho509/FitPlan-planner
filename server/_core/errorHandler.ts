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

  console.error("[Express Error]", err);
  const status = err.status || err.statusCode || 500;

  // If it's a 4xx error, the message is likely intentional and safe to show to the client.
  // Otherwise, it's a 5xx error and we should obscure it to prevent stack trace leaks.
  if (status >= 400 && status < 500) {
    res.status(status).json({ message: err.message || "Bad Request" });
  } else {
    res.status(status).json({ message: "An unexpected error occurred" });
  }
}
