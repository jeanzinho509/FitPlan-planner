import type { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("[Global Error Handler]", err);

  res.status(500).json({
    error: "Internal Server Error",
    // Do not leak stack traces or internal error details
    message: "An unexpected error occurred",
  });
};
