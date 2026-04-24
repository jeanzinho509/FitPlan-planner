## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Fix stack trace leakage via global error handler]

**Vulnerability:** Default error handling exposing internal stack traces.
**Learning:** Express's default error handler leaks stack traces if not caught. Overriding it with a custom `globalErrorHandler` is essential, but it must defend against calling `res.status()` if `res.headersSent` is already true to avoid app crashes.
**Prevention:** Implement a global error handler at the end of the Express middleware chain that checks `res.headersSent` and returns generic error responses without exposing system internals.
