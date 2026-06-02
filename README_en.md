# RelayCore

**A high-performance Rust traffic interception engine for developers and AI agents.**

Capture, inspect, and modify HTTP/HTTPS/WebSocket traffic locally with sub-millisecond overhead—rules, scripts, breakpoints, and MCP on one shared runtime.

[![Website](https://img.shields.io/badge/website-relaycore.dev-00d4ff?style=flat-square)](https://relaycore.dev)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg?style=flat-square)](https://www.rust-lang.org)

[中文](README.md) · [Docs](https://relaycore.dev/en/docs/getting-started) · [GitHub](https://github.com/relaycraft/relay-core) · [Releases](https://github.com/relaycraft/relay-core/releases)

---

## Why RelayCore

| | RelayCore | Traditional GUI proxies | Script-first proxies |
|---|-----------|-------------------------|----------------------|
| **Role** | Embeddable engine + adapters | Manual debugging | Automation scripts |
| **Runtime** | Zero-copy async Rust | Interpreted / JVM | Python |
| **Programmatic** | REST · SSE · MCP · Tauri · CLI | Limited APIs | Strong |
| **AI-ready** | Native MCP adapter | Weak | BYO tooling |

**Typical use cases:** API debugging & mocking · HTTPS MITM in local dev · WebSocket inspection · CI traffic capture · AI agent network probes · Embedded desktop proxy (RelayCraft / Tauri)

---

## Quick start (30 seconds)

```bash
# Install the CLI (pick one)
cargo install relay-core-cli
npm install -g @relay-core/cli

# Generate and trust the CA (required for MITM)
relay-core-cli ca generate

# Start the proxy (default 8080; optional REST + SSE API)
relay-core-cli run --listen 127.0.0.1:8080
```

👉 Full guide: [Getting started](https://relaycore.dev/en/docs/getting-started) · [Installation](https://relaycore.dev/en/docs/installation)

---

## Core capabilities

- **MITM / TLS** — Dynamic certificates, CA management, system trust helpers
- **WebSocket** — Message-level intercept, modify, and replay
- **Rule engine** — Match URL / headers / body; mock, redirect, delay, and more
- **Deno scripting** — Optional `feature "script"` for runtime request/response edits
- **Breakpoints** — Pause live traffic, inspect, then resume or drop
- **Observability** — Prometheus metrics, flow audit, optional SQLite persistence

---

## Architecture

Layered crates: **Adapter → API → Runtime → Engine**. Public crates ship independently; `relay-core-runtime` orchestrates shared state.

<p align="center">
  <a href="https://relaycore.dev/en/#architecture">
    <img src="docs/architecture.svg" alt="RelayCore crate architecture" width="920" />
  </a>
</p>

<p align="center"><sub>Solid lines = primary dependency chain · Dashed = optional (persist / features) · <a href="https://relaycore.dev/en/docs/architecture">Details</a></sub></p>

**Public adapters (pick one entry point):**

| Crate | Purpose |
|-------|---------|
| `relay-core-http` | REST + SSE for automation and backend integration |
| `relay-core-probe` | MCP tools for AI agents (`@relay-core/mcp`) |
| `relay-core-tauri` | Tauri plugin for desktop hosts (RelayCraft) |
| `relay-core-cli` | CLI · TUI · embedded HTTP API |

---

## Performance (reference)

| Metric | RelayCore | mitmproxy | Charles |
|--------|-----------|-----------|---------|
| Throughput | 10K+ req/s | ~1K req/s | ~2K req/s |
| Idle memory | ~38MB | ~150MB | ~300MB |
| P99 overhead | <5ms | ~50ms | ~30ms |

*Lab figures; real numbers depend on rules and scripting.*

---

## Documentation

| Topic | Link |
|-------|------|
| Getting started | [relaycore.dev/en/docs/getting-started](https://relaycore.dev/en/docs/getting-started) |
| Architecture | [relaycore.dev/en/docs/architecture](https://relaycore.dev/en/docs/architecture) |
| HTTP API | [relaycore.dev/en/docs/api](https://relaycore.dev/en/docs/api) |
| MCP / AI | [relaycore.dev/en/docs/mcp](https://relaycore.dev/en/docs/mcp) |
| CLI | [relaycore.dev/en/docs/cli](https://relaycore.dev/en/docs/cli) |
| Rule engine | [relaycore.dev/en/docs/rule-engine](https://relaycore.dev/en/docs/rule-engine) |
| Tauri plugin | [relaycore.dev/en/docs/tauri-plugin](https://relaycore.dev/en/docs/tauri-plugin) |

Rust API: [docs.rs/relay-core-runtime](https://docs.rs/relay-core-runtime)

---

## Community & license

- **Source:** [github.com/relaycraft/relay-core](https://github.com/relaycraft/relay-core)
- **Crates:** [crates.io/crates/relay-core-runtime](https://crates.io/crates/relay-core-runtime)
- **License:** [MIT](LICENSE)

---

<sub>This repo powers <a href="https://relaycore.dev">relaycore.dev</a> (static Astro site).</sub>
