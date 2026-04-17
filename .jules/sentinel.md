## 2025-05-15 - Tighten permissions on downloaded binaries
**Vulnerability:** Downloaded extension and Copilot binaries/directories were created with world-readable permissions (0755/0644).
**Learning:** Default permissions in Go's `os package often result in world-readable files, which can be a security risk for binaries and configuration data in user directories.
**Prevention:** Explicitly use owner-only permissions (0700 for directories/executables, 0600 for data files) when handling sensitive artifacts in the user's home or data directory.
