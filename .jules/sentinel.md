## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.
## 2024-04-25 - Prevent Stack Trace Leaks via Global Error Handler
**Vulnerability:** Express default error handler leaks stack traces in responses if unhandled errors occur during the request lifecycle.
**Learning:** A custom global error handler applied at the end of the middleware chain is necessary to intercept unhandled errors, prevent leaking internals, and securely fall back to a generic error message, while handling the edge case of headers already being sent.
**Prevention:** Always define and apply a comprehensive global error handler at the end of the Express app definition, catching all uncaught exceptions within the context to strip off `stack` traces before the response is finalized.
