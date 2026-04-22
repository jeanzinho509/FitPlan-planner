import type { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  console.error("[GlobalError]", err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Security enhancement: Prevent stack trace leakage in production
  // Mask the error message in production to prevent exposing internal details
  res.status(status).json({
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : message,
    },
  });
}
