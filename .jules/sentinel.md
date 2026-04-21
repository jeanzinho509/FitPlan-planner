## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]

**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**

- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
  **Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.

## 2025-04-21 - [Fix Express Error Handler Leaking Stack Traces]

**Vulnerability:** Express server was missing a global error handler at the end of the middleware chain, which can cause Express to leak stack traces and sensitive internal information to users in production when unhandled errors occur.
**Learning:** The Express server utilizes a custom global error handler (`globalErrorHandler` in `server/_core/errorHandler.ts`) which must be applied at the end of the middleware chain in `server/_core/index.ts` to prevent leaking stack traces and internal errors in production environments.
**Prevention:** Always register a custom global error handler as the very last middleware in Express applications, especially if custom routing (like tRPC or Vite SSR) is used, to ensure standard Express HTML error pages with stack traces are not exposed.
