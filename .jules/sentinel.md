## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.
## 2024-05-18 - [Fix Missing Global Error Handler]
**Vulnerability:** The Express server lacked a global error handler for uncaught exceptions in the middleware chain. Express's default error handler logs the stack trace to the console and also sends it in the HTTP response if the `NODE_ENV` is not set to `production`, potentially leaking sensitive internal implementation details to the client.
**Learning:** Even though `NODE_ENV` might be `production` in some environments, relying on Express's default error handling behavior is risky. A custom global error handler ensures consistent, generic error responses (like a 500 JSON) and prevents information leakage regardless of environment variables. It's crucial to check `res.headersSent` to prevent crashes when headers are already dispatched.
**Prevention:** Always implement and mount a custom global error handler (`app.use(errorHandler)`) at the very end of the Express application's middleware and route definitions. Ensure this handler defensively checks `res.headersSent` before attempting to set a status or send a response.
