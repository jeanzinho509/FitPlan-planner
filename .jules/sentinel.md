## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.
## 2026-05-01 - [Express DoS and Info Leak Prevention]
**Vulnerability:** Express default configurations leaked technology stack via `x-powered-by` headers and lacked a global error handler, risking internal server state exposure to users (e.g., stack traces). Additionally, payload limits were excessively high (50mb), making it susceptible to DoS attacks.
**Learning:** It is crucial to limit the surface area of potential attacks by minimizing what the server exposes via headers and unhandled error responses, and enforcing payload size restrictions.
**Prevention:** Implement a secure global error handler that returns generic 500 status responses for unhandled errors. Disable technology fingerprinting headers (like `x-powered-by`), and keep default body parser payload sizes to a low, reasonable limit (e.g., 5mb) to avoid memory exhaustion from oversized requests.
