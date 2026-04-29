import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("[Global Error]", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: "Internal Server Error" });
};
