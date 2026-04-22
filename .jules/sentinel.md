## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-05-24 - [Express Security Hardening]
**Vulnerability:** Information leakage through the `X-Powered-By` header and potential stack trace exposure on unhandled errors.
**Learning:** Default Express configurations are permissive and leak technology details and internal structure unless explicitly handled. The `globalErrorHandler` is essential to intercept unhandled errors before they are sent to the client, but it must be careful not to interfere with responses that have already begun (`res.headersSent`).
**Prevention:** Always disable the `X-Powered-By` header and implement a catch-all `globalErrorHandler` at the very end of the middleware chain that logs securely and returns generic 500 errors to clients.
