## 2024-05-16 - [Fix insecure default JWT secret]
**Vulnerability:** Empty string fallback for JWT secret in `server/_core/env.ts` allows token forgery if `JWT_SECRET` environment variable is missing.
**Learning:** Defaulting security-sensitive variables like `cookieSecret` to empty strings is highly insecure. Missing environment variables shouldn't implicitly create a zero-security state.
**Prevention:** Use cryptographically secure random values (e.g., via `node:crypto`) as fallbacks for security tokens if the environment variable is missing, to ensure unauthorized access is prevented even in misconfigured environments.
