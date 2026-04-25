## 2024-05-18 - [Fix empty string fallback for JWT_SECRET]

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `cookieSecret` allows JWT token forgery.
**Learning:** If the `JWT_SECRET` environment variable is not defined, an empty string is used as the default value, allowing attackers to forge JWT tokens by signing them with an empty string, compromising authentication.
**Prevention:** Use cryptographically secure random values (e.g., `randomBytes(32).toString('hex')` via `node:crypto`) as a fallback if the environment variable is missing to prevent token forgery.

## 2025-04-25 - Fix CSRF missing protection
**Vulnerability:** The session cookie's `sameSite` attribute was set to `"none"`, exposing the application to Cross-Site Request Forgery (CSRF) attacks.
**Learning:** In a single-origin architecture like this one (where Express serves both the tRPC API and frontend assets), `sameSite: "none"` is overly permissive. Setting it to `"lax"` secures authentication while remaining compatible with standard OAuth redirect flows.
**Prevention:** Always default to `sameSite: "lax"` or `"strict"` for session cookies unless cross-origin requests require credentials. Ensure configuration matches the specific architectural needs of the application (e.g., single-origin vs. cross-origin).
