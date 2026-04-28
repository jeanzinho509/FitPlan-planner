import { type NextFunction, type Request, type Response } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[GlobalError]", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: "Internal Server Error" });
}
