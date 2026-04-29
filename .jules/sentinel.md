## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-20 - Global Error Handler Exposing Stack Traces
**Vulnerability:** The application was missing a global error handler, and Express by default will return a stack trace to the client when an unhandled error occurs in production if `NODE_ENV` is not strictly checked or if an error is explicitly passed to `next()` without a custom error handler in place.
**Learning:** Always implement a global error handler in Express to catch synchronous and asynchronous unhandled errors and format them into safe responses (like a generic 500 JSON) so that stack traces or sensitive internal details are not leaked.
**Prevention:** Always add a middleware with signature `(err, req, res, next)` at the very end of the Express application setup.
