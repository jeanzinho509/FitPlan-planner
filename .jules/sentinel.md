## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.

## 2024-04-30 - [Missing Global Error Handler]
**Vulnerability:** The application was lacking a global Express error handler, which could lead to leaking sensitive internal details or stack traces to users on unexpected errors.
**Learning:** By default, Express will send back a detailed HTML response with the stack trace for unhandled errors. A custom global error handler is needed at the end of the middleware chain to catch these, log them internally, and return a generic 500 error to the client to avoid info leakage. It also must handle cases where headers have already been sent to prevent app crashes.
**Prevention:** Always implement a global error handler middleware `app.use((err, req, res, next) => { ... })` at the end of the Express app definition, ensuring it sends a generic error payload and checks `res.headersSent`.
