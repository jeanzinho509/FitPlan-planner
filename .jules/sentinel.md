## 2024-05-24 - [Express Server Hardening & JWT Secret Fallback]
**Vulnerability:** Found insecure configurations: `x-powered-by` header exposed Express usage and `JWT_SECRET` fell back to an empty string. (Note: Large `50mb` body parsing limits were observed, but these are intentionally set for file uploads and shouldn't be altered without architectural changes).
**Learning:**
- Explicitly calling `app.disable("x-powered-by")` is needed as it defaults to true, revealing tech stack details.
- Fallback secrets must never be deterministic or empty strings. Using `crypto.randomBytes(32).toString('hex')` for `cookieSecret` ensures tokens cannot be trivially forged locally or if the secret is unconfigured, though it will invalidate sessions on restart.
**Prevention:**
- Standardize a secure Express baseline across microservices that disables server signatures.
- Enforce secure defaults for any missing sensitive environment variable, preferably with cryptographically secure PRNGs.
## 2024-05-24 - [CSRF Protection & Error Handling Enhancements]
**Vulnerability:** Found insecure configurations: `sameSite: 'none'` in session cookie which allowed Cross-Site Request Forgery (CSRF) and a lack of a global error handler which could leak internal stack traces to the client.
**Learning:**
- Same-origin architectures should utilize `sameSite: 'lax'` to prevent CSRF attacks while maintaining compatibility with standard OAuth redirect flows.
- Express applications need a robust custom global error handler at the end of the middleware chain to prevent leaking internal technical details, by sending generic error messages to the client and safely logging details locally.
**Prevention:**
- Set `sameSite: 'lax'` by default for session cookies when configuring express servers.
- Always include a global error handler that safely catches and obfuscates exceptions while delegating errors via `next(err)` if headers have already been sent to avoid breaking server responses.
