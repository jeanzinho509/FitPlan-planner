## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Harden Express Server]
**Vulnerability:** Express server by default leaks the `x-powered-by` header, lacks global error handling (leading to potential stack trace leaks in responses), and has excessively large payload size limits (50mb) which can cause DoS attacks.
**Learning:** Disabling the `x-powered-by` header, reducing body parser limits for `express.json` and `express.urlencoded` to a more reasonable value like 5mb, and implementing a global error handler at the end of the middleware chain hardens the application.
**Prevention:** Always ensure a global error handler is present to intercept exceptions, set reasonable body parser limits, and disable technology footprint headers like `x-powered-by`.
