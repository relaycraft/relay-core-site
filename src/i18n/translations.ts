export const translations = {
  en: {
    nav: {
      features: 'Features',
      architecture: 'Architecture',
      docs: 'Docs',
      github: 'GitHub',
    },
    hero: {
      title: 'RUST-BASED TRAFFIC INTERCEPTION ENGINE',
      subtitle: 'Zero-copy async runtime. Sub-millisecond overhead. MITM proxy for HTTP/HTTPS/WebSocket with full programmatic control.',
      getStarted: 'Get Started',
      viewDocs: 'View Docs',
    },
    features: {
      label: '// CAPABILITIES',
      title: 'What RelayCore Does',
      mitm: {
        title: 'Full MITM Support',
        desc: 'Dynamic TLS certificate generation with automatic CA installation.',
      },
      websocket: {
        title: 'WebSocket Interception',
        desc: 'Message-level inspection, modification, and replay for WebSocket.',
      },
      rule: {
        title: 'Rule Engine',
        desc: 'Match + action pipeline for headers, body, status, redirect, mock.',
      },
      script: {
        title: 'Scriptable',
        desc: 'Deno runtime for dynamic request/response modification.',
      },
      breakpoints: {
        title: 'Interception Breakpoints',
        desc: 'Pause live traffic, inspect, modify, then resume or drop.',
      },
      metrics: {
        title: 'Prometheus Metrics',
        desc: 'Built-in Prometheus text format and JSON metrics endpoint.',
      },
    },
    install: {
      label: '// INSTALL',
      title: 'Get Started',
      cargo: 'Cargo',
      npm: 'npm',
      source: 'Build from Source',
      cargoCmd: 'cargo install relay-core-cli',
      npmCmd: 'npm install -g @relay-core/cli',
      sourceCmd: 'git clone https://github.com/relaycraft/relay-core && cd relay-core && cargo build --release',
    },
    nextSteps: 'Next Steps',
    nextStepsLinks: {
      rustDocs: 'Read the Rust API documentation',
      github: 'View source on GitHub',
      releases: 'Download pre-built binaries',
      docs: 'Read the documentation',
    },
    footer: {
      tagline: 'High-performance Rust traffic interception engine',
      project: 'Project',
      crates: 'Crates',
      related: 'Related',
      license: 'MIT License',
      builtWith: 'Built with Rust',
    },
  },
  zh: {
    nav: {
      features: '功能',
      architecture: '架构',
      docs: '文档',
      github: 'GitHub',
    },
    hero: {
      title: 'RUST 编写的流量拦截引擎',
      subtitle: '零拷贝异步运行时。亚毫秒级开销。支持 HTTP/HTTPS/WebSocket 的 MITM 代理，提供完整的编程控制能力。',
      getStarted: '开始使用',
      viewDocs: '查看文档',
    },
    features: {
      label: '// 功能特性',
      title: 'RelayCore 功能',
      mitm: {
        title: '完整 MITM 支持',
        desc: '动态 TLS 证书生成，自动 CA 安装。',
      },
      websocket: {
        title: 'WebSocket 拦截',
        desc: '双向 WebSocket 通信的消息级检查、修改和重放。',
      },
      rule: {
        title: '规则引擎',
        desc: '支持 headers、body、status、redirect、mock 的匹配+动作管道。',
      },
      script: {
        title: '可脚本化',
        desc: 'Deno 运行时，支持动态请求/响应修改。',
      },
      breakpoints: {
        title: '拦截断点',
        desc: '暂停实时流量，检查、修改，然后继续或丢弃。',
      },
      metrics: {
        title: 'Prometheus 指标',
        desc: '内置 Prometheus 文本格式和 JSON 指标端点。',
      },
    },
    install: {
      label: '// 安装',
      title: '开始使用',
      cargo: 'Cargo',
      npm: 'npm',
      source: '源码构建',
      cargoCmd: 'cargo install relay-core-cli',
      npmCmd: 'npm install -g @relay-core/cli',
      sourceCmd: 'git clone https://github.com/relaycraft/relay-core && cd relay-core && cargo build --release',
    },
    nextSteps: '后续步骤',
    nextStepsLinks: {
      rustDocs: '阅读 Rust API 文档',
      github: '在 GitHub 上查看源码',
      releases: '下载预构建二进制文件',
      docs: '阅读完整文档',
    },
    footer: {
      tagline: '高性能 Rust 流量拦截引擎',
      project: '项目',
      crates: ' crates',
      related: '相关',
      license: 'MIT 协议',
      builtWith: '使用 Rust 构建',
    },
  },
};

export function getLocaleFromUrl(url: URL): 'en' | 'zh' {
  return url.pathname.startsWith('/en') ? 'en' : 'zh';
}

export function getAlternateUrl(url: URL): string {
  const locale = getLocaleFromUrl(url);
  if (locale === 'en') {
    return url.pathname.replace(/^\/en/, '') || '/';
  }
  return '/en' + url.pathname;
}
