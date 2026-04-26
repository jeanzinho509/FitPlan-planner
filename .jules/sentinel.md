## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-05-24 - Missing Global Error Handler & Exposed x-powered-by
**Vulnerability:** The Express server lacked a global error handler, risking stack trace leakage on unhandled exceptions. Additionally, the `x-powered-by` header was exposed, potentially allowing technology fingerprinting.
**Learning:** In a single-origin architecture like this Vite + Express + tRPC stack, ensuring errors don't crash the server or leak internals is crucial. The global error handler must check `res.headersSent` and delegate to `next(err)` to avoid "headers already sent" errors when responding defensively.
**Prevention:** Always register a global error handler at the very end of the Express middleware chain, and explicitly disable the `x-powered-by` header via `app.disable("x-powered-by")` in `server/_core/index.ts`.
