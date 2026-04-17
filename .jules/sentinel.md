## 2023-10-27 - Path Traversal in Storage Normalization
**Vulnerability:** Path traversal in `server/storage.ts` where `normalizeKey` function stripped leading slashes but allowed `..` characters.
**Learning:** Functions that normalize paths must explicitly reject or sanitize `..` sequences to prevent attackers from accessing arbitrary files or escaping the intended storage directory via the API.
**Prevention:** Always validate that sanitized paths do not contain path traversal payloads like `..` before passing them to backend APIs or file system operations.
