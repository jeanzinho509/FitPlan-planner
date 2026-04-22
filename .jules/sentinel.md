## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-05-18 - [Fix error handling and technology fingerprinting]

**Vulnerability:** Application crashes on unhandled errors, stack traces might be exposed, and `x-powered-by` header exposes Express.js framework usage.
**Learning:** Returning unhandled errors without checking `res.headersSent` can cause the app to crash. Exposing stack traces provides information to attackers. The `x-powered-by` header reveals the backend technology, enabling targeted attacks.
**Prevention:** Implement a global error handler that checks `res.headersSent`, delegates to `next(err)` if true, and returns generic error messages. Disable the `x-powered-by` header using `app.disable("x-powered-by")`.
