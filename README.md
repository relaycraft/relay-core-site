# RelayCore

高性能 Rust 流量拦截引擎。

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org)

## 特性

- **零拷贝异步运行时** - 亚毫秒级开销
- **完整 MITM 支持** - 动态 TLS 证书生成，自动 CA 安装
- **WebSocket 拦截** - 消息级检查、修改、重放
- **规则引擎** - 灵活的匹配 + 动作管道
- **可脚本化** - Deno 运行时，动态修改请求/响应
- **拦截断点** - 暂停、检查、修改、继续或丢弃
- **Prometheus 指标** - 内置指标端点

## 快速开始

### 安装

```bash
# Cargo（推荐）
cargo install relay-core-cli

# npm
npm install -g @relay-core/cli

# 或下载预构建二进制
# https://github.com/relaycraft/relay-core/releases
```

### 生成 CA 证书

```bash
relay-core-cli ca init
```

### 启动代理

```bash
relay-core-cli run --port 8080
```

## 文档

- [快速开始](https://relaycore.dev/docs/getting-started)
- [架构](https://relaycore.dev/docs/architecture)
- [HTTP API](https://relaycore.dev/docs/api)
- [CLI 参考](https://relaycore.dev/docs/cli)
- [规则引擎](https://relaycore.dev/docs/rule-engine)

## 性能对比

| 指标 | RelayCore | mitmproxy | Charles |
|------|-----------|-----------|---------|
| 吞吐量 | 10K+ req/s | ~1K req/s | ~2K req/s |
| 空闲内存 | 38MB | ~150MB | ~300MB |
| P99 开销 | <5ms | ~50ms | ~30ms |

## 架构

```
┌─────────────────────────────────────────────────────────────┐
│                      ADAPTER LAYER                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │ HTTP API│  │   MCP   │  │  Tauri  │  │  Embedded   │  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └──────┬──────┘  │
│       └────────────┴─────────────┴─────────────┘           │
│                          │                                   │
│                          ▼                                   │
│               ┌─────────────────┐                            │
│               │relay-core-runtime│                           │
│               └────────┬─────────┘                           │
└────────────────────────┼────────────────────────────────────┘
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│   lib    │  │   storage    │  │   script     │
│ (engine) │  │  (SQLite)    │  │  (Deno/V8)   │
└──────────┘  └──────────────┘  └──────────────┘
```

## 社区

- [GitHub](https://github.com/relaycraft/relay-core)
- [crates.io](https://crates.io/crates/relay-core-runtime)
- [文档](https://docs.rs/relay-core-runtime)

---

[English Version](README_en.md)