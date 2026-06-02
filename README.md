# RelayCore

**面向开发者与 AI 代理的高性能 Rust 流量拦截引擎。**

在本地以亚毫秒级开销拦截、检查、修改 HTTP/HTTPS/WebSocket 流量——规则、脚本、断点、MCP，一套 runtime 多种接入方式。

[![Website](https://img.shields.io/badge/website-relaycore.dev-00d4ff?style=flat-square)](https://relaycore.dev)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg?style=flat-square)](https://www.rust-lang.org)

[English](README_en.md) · [文档](https://relaycore.dev/docs/getting-started) · [GitHub](https://github.com/relaycraft/relay-core) · [Releases](https://github.com/relaycraft/relay-core/releases)

---

## 为什么选择 RelayCore

| | RelayCore | 传统 GUI 代理 | 脚本型代理 |
|---|-----------|---------------|------------|
| **定位** | 可嵌入引擎 + 多适配器 | 人工调试 | 自动化脚本 |
| **运行时** | Rust 零拷贝异步 | 解释型 / JVM | Python |
| **程序化** | REST · SSE · MCP · Tauri · CLI | 有限 API | 强 |
| **AI 友好** | 原生 MCP 适配器 | 弱 | 需自建 |

**典型场景：** API 调试与 Mock · HTTPS MITM 联调 · WebSocket 消息检查 · CI 流量录制 · AI Agent 网络探针 · 桌面应用内嵌代理（RelayCraft / Tauri）

---

## 30 秒上手

```bash
# 安装 CLI（任选其一）
cargo install relay-core-cli
npm install -g @relay-core/cli

# 生成并信任 CA（MITM 必需）
relay-core-cli ca generate

# 启动代理（默认 8080，可选 REST + SSE API）
relay-core-cli run --listen 127.0.0.1:8080
```

👉 完整指南：[快速开始](https://relaycore.dev/docs/getting-started) · [安装说明](https://relaycore.dev/docs/installation)

---

## 核心能力

- **MITM / TLS** — 动态证书、CA 管理、系统信任引导
- **WebSocket** — 消息级拦截、修改与重放
- **规则引擎** — URL / Header / Body 匹配 + Mock、重定向、延迟等动作
- **Deno 脚本** — 可选 `feature "script"`，运行时修改请求/响应
- **拦截断点** — 暂停流量，人工检查后继续或丢弃
- **可观测性** — Prometheus 指标、Flow 审计与可选 SQLite 持久化

---

## 架构

分层 crate 设计：**Adapter → API → Runtime → Engine**。公开 crate 可独立发布；核心状态由 `relay-core-runtime` 统一编排。

<p align="center">
  <a href="https://relaycore.dev/#architecture">
    <img src="docs/architecture.svg" alt="RelayCore crate architecture" width="920" />
  </a>
</p>

<p align="center"><sub>实线 = 主依赖链 · 虚线 = 可选能力（持久化 / feature）· <a href="https://relaycore.dev/docs/architecture">详细说明</a></sub></p>

**公开适配器（任选其一接入）：**

| Crate | 用途 |
|-------|------|
| `relay-core-http` | REST + SSE，适合自动化与后端集成 |
| `relay-core-probe` | MCP 工具，面向 AI Agent（`@relay-core/mcp`） |
| `relay-core-tauri` | Tauri 插件，桌面宿主（RelayCraft） |
| `relay-core-cli` | CLI · TUI · 内嵌 HTTP API |

---

## 性能参考

| 指标 | RelayCore | mitmproxy | Charles |
|------|-----------|-----------|---------|
| 吞吐量 | 10K+ req/s | ~1K req/s | ~2K req/s |
| 空闲内存 | ~38MB | ~150MB | ~300MB |
| P99 开销 | <5ms | ~50ms | ~30ms |

*实验室环境参考值，实际取决于规则复杂度与脚本启用情况。*

---

## 文档

| 主题 | 链接 |
|------|------|
| 快速开始 | [relaycore.dev/docs/getting-started](https://relaycore.dev/docs/getting-started) |
| 架构 | [relaycore.dev/docs/architecture](https://relaycore.dev/docs/architecture) |
| HTTP API | [relaycore.dev/docs/api](https://relaycore.dev/docs/api) |
| MCP / AI | [relaycore.dev/docs/mcp](https://relaycore.dev/docs/mcp) |
| CLI | [relaycore.dev/docs/cli](https://relaycore.dev/docs/cli) |
| 规则引擎 | [relaycore.dev/docs/rule-engine](https://relaycore.dev/docs/rule-engine) |
| Tauri 插件 | [relaycore.dev/docs/tauri-plugin](https://relaycore.dev/docs/tauri-plugin) |

Rust API：[docs.rs/relay-core-runtime](https://docs.rs/relay-core-runtime)

---

## 社区与许可

- **源码：** [github.com/relaycraft/relay-core](https://github.com/relaycraft/relay-core)
- **Crates：** [crates.io/crates/relay-core-runtime](https://crates.io/crates/relay-core-runtime)
- **许可：** [MIT](LICENSE)

---

<sub>本仓库为 <a href="https://relaycore.dev">relaycore.dev</a> 官网源码（Astro 静态站）。</sub>
