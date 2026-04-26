## 2025-04-26 - CSRF Protection for Session Cookies
**Vulnerability:** Session cookies were configured with `sameSite: "none"`, which allows cookies to be sent in cross-site requests, increasing the risk of Cross-Site Request Forgery (CSRF).
**Learning:** For a single-origin architecture utilizing standard OAuth flows, `sameSite: "lax"` provides CSRF protection while still being compatible with OAuth redirects.
**Prevention:** Always default session cookies to `sameSite: "lax"` (or `"strict"`) unless cross-site cookie sending is strictly required and accompanied by other CSRF mitigation strategies.
