## 2025-02-23 - [Medium] Express Payload Size DoS

**Vulnerability:** The Express server was configured with a 50MB limit for JSON and URL-encoded payloads, allowing potential memory exhaustion DoS attacks.
**Learning:** High body parser limits can be exploited to exhaust server resources. The initial `50mb` limit was likely set for file uploads but was broadly applied to all JSON and URL-encoded requests instead of just the upload endpoints.
**Prevention:** Restrict general payload sizes to 1MB (`express.json({ limit: '1mb' })`) and only increase limits on specific endpoints that require handling larger payloads, like file uploads. Also disabled `x-powered-by` to reduce technology fingerprinting.
