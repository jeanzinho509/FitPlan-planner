## 2025-04-21 - [CRITICAL] Disable detailed Express error leakage in production

**Vulnerability:** Express defaults to sending detailed stack traces and debugging information in development, but it shouldn't in production. Error handling throughout Express isn't unified, potentially leaking system details. Also `x-powered-by` header fingerprinting is disabled, but explicit overarching error handlers aren't set to sanitize unhandled internal errors.
**Learning:** We need a global error handler for express that catches uncaught exceptions and strips sensitive data before returning to the user.
**Prevention:** Always define a custom global error handling middleware in Express at the end of the middleware chain.
