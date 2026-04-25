import type { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("[Express Error]", err);

  // If headers are already sent, delegate to default error handler
  if (res.headersSent) {
    return next(err);
  }

  // Return a generic error message to prevent leaking stack traces
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    // We intentionally omit err.stack here in all environments
  });
};
