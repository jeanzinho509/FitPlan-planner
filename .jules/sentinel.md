## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Fix Express error handling stack trace leak]
**Vulnerability:** Express default error handler leaks stack traces to the client in certain cases and sets x-powered-by header.
**Learning:** By default, Express will expose internal stack traces to the client if an unhandled error occurs and custom global error handling middleware is not attached at the very end of the routing chain. Furthermore, the default config includes an x-powered-by header which allows technology fingerprinting.
**Prevention:** Implement a global error handling middleware (`globalErrorHandler` in `server/_core/errorHandler.ts`) attached after all routes/middleware, which delegates via `next(err)` if headers are already sent, and otherwise returns a generic 500 JSON error. Additionally, explicitly call `app.disable("x-powered-by")` upon Express app creation.
