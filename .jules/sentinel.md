## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]
**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Always use a cryptographically secure random value or enforce the variable existence when an authentication secret is missing.
## 2024-05-18 - [Fix framework fingerprinting and stack trace leakage]
**Vulnerability:** Express default behaviour exposes "X-Powered-By" header and missing global error handler can leak stack traces to clients.
**Learning:** By disabling "x-powered-by" we prevent technology fingerprinting. The global error handler must check `res.headersSent` to safely delegate errors if headers have already been sent to avoid crashes, while returning a generic 500 error to clients to mask implementation details.
**Prevention:** Always disable "x-powered-by" in Express apps and implement a global error handler at the end of the middleware chain.
