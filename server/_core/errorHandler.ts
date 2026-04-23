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

  res.status(err.status || 500).json({
    error: "Internal Server Error",
    // We intentionally do not leak the error.stack or error.message here
    // unless it is a safe operational error that we explicitly handle, but for now
    // we keep it generic to prevent leaking sensitive information.
  });
}
