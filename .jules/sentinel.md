## 2025-02-12 - Critical Error Handling Exposure
**Vulnerability:** The application lacks a global error handler for express, which could expose raw stack traces to end-users if an unexpected exception occurs inside an express middleware or route instead of TRPC. Also, there is a risk of not returning proper standard JSON for unknown errors.
**Learning:** In standard Express setups, untrapped errors propagate back down the middleware chain. By default, Express replies with an HTML page containing the stack trace in non-production environments, but it can still leak or format inappropriately in others.
**Prevention:** Implement a global error handler as the last middleware to catch unhandled errors, log them securely, and respond with generic, safe JSON.
