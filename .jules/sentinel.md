## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2024-05-18 - [Fix CSRF Vulnerability in Session Cookies]

**Vulnerability:** Session cookies configured with `sameSite: "none"` are vulnerable to Cross-Site Request Forgery (CSRF) attacks.
**Learning:** Since the Express server serves both the tRPC API and frontend assets (same-origin architecture), `sameSite: "none"` is unnecessarily permissive and exposes the application to CSRF.
**Prevention:** Configure session cookies with `sameSite: "lax"` to provide CSRF protection while remaining compatible with standard OAuth redirect flows.
