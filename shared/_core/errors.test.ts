import { describe, it, expect } from "vitest";
import {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from "./errors";

describe("HttpError", () => {
  it("should create an instance of HttpError and Error", () => {
    const error = new HttpError(500, "Internal Server Error");
    expect(error).toBeInstanceOf(HttpError);
    expect(error).toBeInstanceOf(Error);
  });

  it("should correctly set statusCode and message", () => {
    const status = 418;
    const message = "I'm a teapot";
    const error = new HttpError(status, message);
    expect(error.statusCode).toBe(status);
    expect(error.message).toBe(message);
  });

  it("should have the correct name property", () => {
    const error = new HttpError(400, "Error");
    expect(error.name).toBe("HttpError");
  });
});

describe("Convenience constructors", () => {
  it("BadRequestError should create a 400 error", () => {
    const msg = "Bad Request";
    const error = BadRequestError(msg);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe(msg);
    expect(error.name).toBe("HttpError");
  });

  it("UnauthorizedError should create a 401 error", () => {
    const msg = "Unauthorized";
    const error = UnauthorizedError(msg);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe(msg);
    expect(error.name).toBe("HttpError");
  });

  it("ForbiddenError should create a 403 error", () => {
    const msg = "Forbidden";
    const error = ForbiddenError(msg);
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe(msg);
    expect(error.name).toBe("HttpError");
  });

  it("NotFoundError should create a 404 error", () => {
    const msg = "Not Found";
    const error = NotFoundError(msg);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe(msg);
    expect(error.name).toBe("HttpError");
  });
});
