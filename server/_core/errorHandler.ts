import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // If the response headers have already been sent, we must delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Log the actual error for internal debugging
  console.error("Unhandled Application Error:", err);

  // Return a generic error response to the client to avoid leaking stack traces or sensitive internal details
  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred. Please try again later.",
  });
};
