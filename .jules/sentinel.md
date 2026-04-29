## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.
## 2024-05-24 - [Express Server Hardening: Global Error Handler]
**Vulnerability:** Express server did not have a global error handler, which could potentially expose stack traces or internal application details on unhandled errors, especially when used with `app.use()` in the final step of the middleware chain.
**Learning:**
- Always add a global `ErrorRequestHandler` at the end of the Express application middleware chain.
- The error handler needs to defensively check `res.headersSent` and delegate to `next(err)` if headers are already sent, to avoid crashing the server.
**Prevention:**
- Standardize the `globalErrorHandler` pattern across microservices to log unhandled errors and return a generic 500 JSON response (e.g., `{ error: "Internal Server Error" }`) instead of raw text or stack traces.
