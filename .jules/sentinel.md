## 2024-05-18 - Express x-powered-by header
**Vulnerability:** Express explicitly sends an `x-powered-by: Express` header.
**Learning:** This exposes technology fingerprinting and makes it slightly easier for an attacker to identify the framework used.
**Prevention:** Always use `app.disable('x-powered-by');` when setting up an Express instance.
