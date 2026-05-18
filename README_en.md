# RelayCore

High-performance Rust traffic interception engine.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org)

## Features

- **Zero-copy async runtime** - Sub-millisecond overhead
- **Full MITM Support** - Dynamic TLS certificate generation, automatic CA installation
- **WebSocket Interception** - Message-level inspection, modification, replay
- **Rule Engine** - Flexible match + action pipeline
- **Scriptable** - Deno runtime for dynamic request/response modification
- **Interception Breakpoints** - Pause, inspect, modify, resume or drop
- **Prometheus Metrics** - Built-in metrics endpoint

## Quick Start

### Installation

```bash
# Cargo (Recommended)
cargo install relay-core-cli

# npm
npm install -g @relay-core/cli

# Or download pre-built binaries
# https://github.com/relaycraft/relay-core/releases
```

### Generate CA Certificate

```bash
relay-core-cli ca init
```

### Start Proxy

```bash
relay-core-cli run --port 8080
```

## Documentation

- [Quick Start](https://relaycore.dev/en/docs/getting-started)
- [Architecture](https://relaycore.dev/en/docs/architecture)
- [HTTP API](https://relaycore.dev/en/docs/api)
- [CLI Reference](https://relaycore.dev/en/docs/cli)
- [Rule Engine](https://relaycore.dev/en/docs/rule-engine)

## Performance Comparison

| Metric | RelayCore | mitmproxy | Charles |
|--------|------------|-----------|---------|
| Throughput | 10K+ req/s | ~1K req/s | ~2K req/s |
| Idle Memory | 38MB | ~150MB | ~300MB |
| P99 Overhead | <5ms | ~50ms | ~30ms |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      ADAPTER LAYER                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │ HTTP API│  │   MCP   │  │  Tauri  │  │  Embedded   │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └──────┬──────┘  │
│       └────────────┴─────────────┴─────────────┘           │
│                          │                                  │
│                          ▼                                  │
│               ┌─────────────────┐                          │
│               │relay-core-runtime│                         │
│               └────────┬─────────┘                          │
└────────────────────────┼────────────────────────────────────┘
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│   lib    │  │   storage    │  │   script     │
│ (engine) │  │  (SQLite)    │  │  (Deno/V8)   │
└──────────┘  └──────────────┘  └──────────────┘
```

## Community

- [GitHub](https://github.com/relaycraft/relay-core)
- [crates.io](https://crates.io/crates/relay-core-runtime)
- [Documentation](https://docs.rs/relay-core-runtime)

---

[中文版本](README.md)