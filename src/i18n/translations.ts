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
      subtitle: '~40x faster than mitmproxy. MITM proxy for HTTP/HTTPS/WebSocket with full programmatic control.',
      getStarted: 'Get Started',
      viewGithub: 'GitHub',
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
    sections: {
      architecture: 'Architecture',
      performance: 'Performance',
      api: 'HTTP API',
      cli: 'CLI Reference',
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
      title: '基于 Rust 的流量拦截引擎',
      subtitle: '吞吐量为 mitmproxy 的约 40 倍。支持 HTTP/HTTPS/WebSocket 的 MITM 代理，可编程控制流量拦截。',
      getStarted: '开始使用',
      viewGithub: 'GitHub 仓库',
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
        desc: '基于匹配条件对请求头、请求体、响应状态进行拦截、重定向或 mock。',
      },
      script: {
        title: '脚本扩展',
        desc: '内置 Deno 运行时，支持动态修改请求和响应。',
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
      source: '从源码编译',
      cargoCmd: 'cargo install relay-core-cli',
      npmCmd: 'npm install -g @relay-core/cli',
      sourceCmd: 'git clone https://github.com/relaycraft/relay-core && cd relay-core && cargo build --release',
    },
    sections: {
      architecture: '架构',
      performance: '性能',
      api: 'HTTP API',
      cli: 'CLI 参考',
    },
    nextSteps: '下一步',
    nextStepsLinks: {
      rustDocs: 'Rust API 文档',
      github: 'GitHub 源码仓库',
      releases: '下载预编译版本',
      docs: '完整文档',
    },
    footer: {
      tagline: '高性能 Rust 流量拦截引擎',
      project: '项目',
      crates: 'Crates',
      related: '相关',
      license: 'MIT License',
      builtWith: '基于 Rust 构建',
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
