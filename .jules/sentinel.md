## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Prevent stack trace leaks and technology fingerprinting]

**Vulnerability:** Missing global error handler could lead to Express returning default error responses that contain sensitive stack traces, and the default `x-powered-by` header exposes that the server is using Express, which could aid attackers in finding vulnerabilities specific to the framework.
**Learning:** Adding a defensive global error handler at the end of the Express middleware chain ensures that errors do not crash the application or leak stack traces to clients. Using `app.disable('x-powered-by')` prevents the leakage of technology stack information. Defensive error handlers should also check `res.headersSent` and delegate to `next(err)` if true to avoid trying to modify an already sent response.
**Prevention:** Always register a custom global error handler that returns generic error messages (e.g., `Internal Server Error`) and explicitly disable `x-powered-by`.
