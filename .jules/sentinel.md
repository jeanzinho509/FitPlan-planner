## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Prevent Leaking Stack Traces and Technology Fingerprinting]

**Vulnerability:** Missing global error handler in Express allows unhandled errors to leak stack traces to the client. The default Express setup also sends the `X-Powered-By` header, revealing the underlying technology stack.
**Learning:** By default, Express will catch errors and send a stack trace in the response if `NODE_ENV` is not `production`. It also automatically adds `X-Powered-By: Express` to responses, aiding attackers in fingerprinting the application.
**Prevention:** Implement a global error handling middleware that defensively delegates to `next(err)` if `res.headersSent` is true, and otherwise returns a generic error payload (e.g., `500 Internal Server Error`). Also, call `app.disable("x-powered-by")` immediately after creating the Express app.
