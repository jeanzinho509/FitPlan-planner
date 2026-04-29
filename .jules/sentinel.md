## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2024-05-20 - Global Error Handler and Fingerprinting Prevention
**Vulnerability:** The application lacks a global error handler to prevent stack trace leaks and does not disable the `x-powered-by` header, allowing technology fingerprinting.
**Learning:** These are common Express vulnerabilities that can easily be mitigated with a custom error handler and `app.disable("x-powered-by")`.
**Prevention:** Implement a global error handler that returns a generic 500 JSON error and always disable the `x-powered-by` header in Express applications.
