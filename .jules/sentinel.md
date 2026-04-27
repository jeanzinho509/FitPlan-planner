## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Fix Stack Trace Leakage and Technology Fingerprinting]

**Vulnerability:** Express default error handler leaks stack traces in development/unhandled situations, and defaults to sending the `X-Powered-By: Express` header, facilitating fingerprinting.
**Learning:** Returning standard stack traces to end users or API consumers allows attackers to gain deep insight into server-side paths, file structure, and used libraries, which aids in targeting secondary exploits.
**Prevention:** Implement a global custom error handler (added at the very end of the middleware chain) that returns standard generic messages, using `res.headersSent` defensively to avoid crashing, and explicitly call `app.disable("x-powered-by")`.
