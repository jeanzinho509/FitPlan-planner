## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-04-24 - Prevent Information Leakage in Express
**Vulnerability:** Express by default leaks its technology stack via the `x-powered-by` header and can expose sensitive internal details or stack traces on unhandled exceptions if a custom error handler isn't defined.
**Learning:** Adding a generic catch-all `ErrorRequestHandler` at the very end of the middleware chain prevents uncaught exceptions from bubbling up to the client with sensitive data. Disabling `x-powered-by` mitigates tech stack fingerprinting.
**Prevention:** Always include `app.disable("x-powered-by")` immediately after `express()` instantiation. Implement a `globalErrorHandler` that checks `res.headersSent` to safely delegate, logs internally, and returns a generic 500 error response.
