## 2024-04-19 - Secure Cookie Secret Fallback

**Vulnerability:** Empty string fallback for `JWT_SECRET` in `server/_core/env.ts` could allow token forgery if the environment variable is missing.
**Learning:** Security-sensitive environment variables like `cookieSecret` should never fall back to an empty string or predictable value.
**Prevention:** Use cryptographically secure random values (e.g., `crypto.randomBytes(32).toString("hex")`) as a fallback if the environment variable is missing to ensure token signing remains secure.
