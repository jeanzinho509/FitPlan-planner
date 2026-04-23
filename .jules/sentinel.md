## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-05-18 - [Fix info leakage via error handler and x-powered-by header]

**Vulnerability:** Express default error handler leaks stack traces and default response headers expose the framework identity (x-powered-by: Express).
**Learning:** Default configurations in Express expose stack traces in unhandled exceptions and send the `X-Powered-By` header, revealing the underlying technology stack which can aid attackers in reconnaissance.
**Prevention:** Implement a global custom error handler that sanitizes responses to a generic 500 status without exposing internal error objects. Disable the `x-powered-by` header using `app.disable('x-powered-by')` at the beginning of the Express application initialization.
