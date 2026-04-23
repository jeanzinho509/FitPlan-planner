## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Prevent Express tech fingerprinting & error leakage]
**Vulnerability:** Express default configurations expose the `x-powered-by` header (revealing technology stack) and default error handlers may leak sensitive stack traces or crash when headers are already sent.
**Learning:** Calling `app.disable("x-powered-by")` prevents framework enumeration. Implementing a custom error handler that checks `res.headersSent` allows defensive error delegation without crashing, and returning a generic JSON response masks internal stack traces from attackers.
**Prevention:** Always disable `x-powered-by` immediately after Express app initialization, and attach a robust, defensive `globalErrorHandler` at the end of the middleware chain.
