## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]

**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**

- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
  **Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.

## 2026-04-23 - [Express Error Handling]

**Vulnerability:** Unhandled Express errors could leak stack traces to the client, exposing internal implementation details.
**Learning:** Express needs a global error handler at the very end of the middleware chain to catch all synchronous and asynchronous errors that reach it, instead of falling back to its default behavior which includes stack traces in some environments. Checking `res.headersSent` is necessary to avoid crashing the server if the response was already partially sent.
**Prevention:** Always implement a custom global error handler that returns generic 500 errors and explicitly defensively checks `res.headersSent`.
