import { type NextFunction, type Request, type Response } from "express";
import { ENV } from "./env";

export function globalErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Unhandled Express error:", err);

  if (res.headersSent) {
    return _next(err);
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = ENV.isProduction
    ? "Internal Server Error"
    : err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    ...(ENV.isProduction ? {} : { stack: err.stack }),
  });
}
