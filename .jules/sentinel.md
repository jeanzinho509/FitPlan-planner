## 2024-04-19 - Ensure secure secret fallbacks and payload limits

**Vulnerability:** The application was using an empty string fallback for `process.env.JWT_SECRET` (used as `cookieSecret`) and allowing up to "50mb" JSON/URL-encoded payloads. It also exposed the `x-powered-by` header.
**Learning:** Using empty strings for cryptographic secrets can lead to serious token forgery vulnerabilities. Allowing 50mb payloads without chunking or streams is a memory exhaustion DoS risk. The `x-powered-by` header leaks framework information which is a security anti-pattern.
**Prevention:** Always use cryptographically secure random values (via `node:crypto`) as fallbacks for missing secrets. Ensure Express payload limits are restricted to small sizes (like "1mb") unless explicitly needed, and disable technology footprinting headers using `app.disable("x-powered-by");`.
