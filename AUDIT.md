# DreamTeam Codebase Audit

## Overview
This audit captures quick observations about deployment, maintainability, and content freshness risks identified during a brief review of the current repository.

## Findings
- **Container hardening needed**: The Docker image runs the default `nginx:alpine` user as root and lacks any healthcheck. Running nginx as a non-root user and adding a simple HTTP healthcheck would reduce privilege and improve orchestration visibility. 【F:Dockerfile†L1-L20】
- **Development volume mounts miss the served root**: The Docker build copies `web/` into `/usr/share/nginx/html/`, but `docker-compose.yml` mounts `./web` into `/usr/share/nginx/html/web`. Edits to `web/index.html` or top-level assets will not hot-reload because nginx continues serving the baked files in `/usr/share/nginx/html/`. Mounting to `/usr/share/nginx/html` would align local changes with what nginx serves. 【F:docker-compose.yml†L4-L20】【F:Dockerfile†L4-L20】
- **Freshness badges use hard-coded future dates**: `DT_DOCS` hard-codes 2025 timestamps for several documents, so the “NEW/UPDATED” badges will eventually misrepresent stale content and undermine trust. Consider deriving dates from git history or file metadata instead of static values. 【F:web/assets/js/site.js†L3-L32】
- **Markdown viewer does not escape HTML**: The `escapeHtml` helper returns raw characters instead of HTML entities, so any Markdown loaded through `viewer.html?src=` is rendered with unescaped HTML. A malicious Markdown file (or edited local content) can execute arbitrary scripts in the browser. Implement proper escaping or sanitize rendered output before injecting it into `innerHTML`. 【F:web/assets/js/markdown-viewer.js†L24-L44】

## Recommendations
- Run nginx as a dedicated non-root user, add a healthcheck, and ensure static assets directory permissions align with the new user.
- Align local development volume mounts with the nginx document root (e.g., mount `./web` to `/usr/share/nginx/html`) so edits are reflected immediately.
- Replace the hard-coded `DT_DOCS` timestamps with automated data (git commit dates or a JSON manifest generated during build) to keep freshness indicators accurate.
- Fix `escapeHtml` (or apply a sanitizer) so Markdown-derived HTML is properly escaped before insertion into the DOM, preventing script injection via untrusted documents.
