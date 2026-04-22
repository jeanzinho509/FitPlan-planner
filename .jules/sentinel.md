## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.
## 2024-05-24 - [Medium] Fix Express error handling to prevent stack trace leaks
**Vulnerability:** Express default error handler or missing custom error handler can leak sensitive stack trace information to end users on production, potentially exposing internal implementation details. Express also crashes if standard error response sending is attempted when headers have already been sent.
**Learning:** Custom Express global error handlers must be placed at the very end of the middleware chain. Defensively checking `res.headersSent` and delegating to `next(err)` if true avoids application crashes while returning secure, standardized error responses without leaking stack traces.
**Prevention:** Always implement a custom global error handler in Express applications and ensure it checks `res.headersSent` before sending a response.
