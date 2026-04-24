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

  console.error("[GlobalError]", err);

  res.status(500).json({
    error: "An unexpected error occurred",
  });
}
