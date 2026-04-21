import type { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[Express Error]:", err);

  const isProduction = process.env.NODE_ENV === "production";

  // Truncate message in prod so we don't leak anything
  const message = isProduction ? "An unexpected error occurred" : err.message;

  res.status(err.status || 500).json({
    error: message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
