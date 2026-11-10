# Anthropic / Claude Code / Agent 公开资料全索引

> 独立中文整理；不属于 Anthropic 官方。数据核对基准：2026-11-10。这里的“全索引”指**本项目范围内已收录的公开入口**，并非承诺涵盖互联网可访问的一切。

**共 108 条资料，17 个主题。** 对外只提供摘要、原始链接和实践提示，不全文搬运。

## 核查原则

- 只记录 Anthropic 官网、官方 Claude Code 文档或 Anthropic GitHub 维护的公开资料；保留来源与发布日期。
- 标注“持续更新”的文档没有固定发布日期；使用前应再次阅读原文。
- 2025 年团队使用方法属于当时报告，不表示 2026 年功能和权限完全相同。
- 官网报告与我们的复刻示例分离；不能声称拥有内部源码或未公开 Prompt。
- 新增资料优先同步 `site/data.js`，并重新生成此索引；发现失效链接通过 GitHub Issue 纠正。

## 文档索引（按主题）

### 团队案例（5）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S001 | 研究文章 | [内部十团队：Claude Code 实践](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code) | 真实访问十个部门：数据、产品、安全、推理、可视化、API、营销、设计、RL、法务。 | 2025-07-24 |
| S002 | 研究文章 | [原始报道：How Anthropic Teams Use Claude Code](https://claude.com/resources/articles/how-anthropic-teams-use-claude-code) | 源页面：跨职能团队公开访谈及关键方法，建议先读。 | 2025-07-24 |
| S003 | 研究文章 | [内部团队报告 PDF](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) | 官方团队访谈的完整公开 PDF，含实践过程与提示。 | 2025-07-24 |
| S004 | 研究文章 | [企业内部如何使用 Cowork](https://claude.com/resources/guides/deploying-claude-across-your-organization/how-anthropic-teams-use-cowork) | 财务、法务、销售、产品四种知识工作模式；与 Claude Code 做边界区分。 | 2026 |
| S005 | 研究文章 | [法务团队如何使用 Claude](https://claude.com/resources/articles/how-anthropic-uses-claude-legal) | 从内容审查、合同改写到技能文件与企业知识接入。 | 2025-12-08 |

### Agent 设计（6）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S006 | 研究文章 | [Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Agent 设计的基本原则：优先简单方案，使用链式、路由、并行、编排与评估模式。 | 2024-12-19 |
| S009 | 研究文章 | [Agent 上下文工程](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) | 决定加载哪些上下文，避免检索内容、工具回执与对话历史淹没重要任务。 | 2025-09-29 |
| S022 | 研究文章 | [Managed Agents 规模化](https://www.anthropic.com/research/managed-agents) | 将代理执行环境与协调能力解耦的工程实践。 | 2026-04-08 |
| S034 | 官方文档 | [扩展能力总览](https://code.claude.com/docs/en/features-overview) | CLAUDE.md、Skills、subagents、Hooks、MCP 如何分工 | 持续更新 |
| S036 | 官方文档 | [上下文窗口](https://code.claude.com/docs/en/context-window) | 哪些信息被加载、何时消耗上下文预算 | 持续更新 |
| S107 | 行业报告 | [Project Deal Agent 实验](https://www.anthropic.com/features/project-deal) | 让 Claude 参与员工间的商品交易实验，关注边界与监督。 | 2026-04-21 |

### Claude Code（20）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S007 | 研究文章 | [Claude Code 工程最佳实践（原研究）](https://www.anthropic.com/research/claude-code-best-practices) | 理解代码、规划方案、配置项目规则、测试、自动化。 | 2025-04-18 |
| S025 | 研究文章 | [Anthropic 源码管理重设计 Scion](https://www.anthropic.com/research/redesigning-source-control) | 大规模代理带来的版本管理与代码审查挑战；适用于高阶架构参考。 | 2026-10-13 |
| S030 | 官方文档 | [概览](https://code.claude.com/docs/en/overview) | 工具整体能力、终端与多平台入口 | 持续更新 |
| S031 | 官方文档 | [零基础 Quickstart](https://code.claude.com/docs/en/quickstart) | 安装、认证、打开项目和完成第一项任务 | 持续更新 |
| S032 | 官方文档 | [版本更新日志](https://code.claude.com/docs/en/changelog) | 检查当前版本是否支持教程中的功能 | 持续更新 |
| S033 | 官方文档 | [Claude Code 工作原理](https://code.claude.com/docs/en/how-claude-code-works) | 理解工具调用、上下文、权限与任务循环 | 持续更新 |
| S035 | 官方文档 | [项目 .claude 目录](https://code.claude.com/docs/en/claude-directory) | 项目级和个人级配置文件组织方式 | 持续更新 |
| S040 | 官方文档 | [常见实操任务](https://code.claude.com/docs/en/common-workflows) | 修 Bug、重构、测试和探索代码 | 持续更新 |
| S042 | 官方文档 | [最新最佳实践](https://code.claude.com/docs/en/best-practices) | 官方最新工具使用与验收建议 | 持续更新 |
| S043 | 官方文档 | [多平台入口](https://code.claude.com/docs/en/platforms) | CLI、桌面、IDE、浏览器与移动端 | 持续更新 |
| S044 | 官方文档 | [Remote Control](https://code.claude.com/docs/en/remote-control) | 在其他设备接续本地会话 | 持续更新 |
| S046 | 官方文档 | [Chrome 浏览器扩展](https://code.claude.com/docs/en/chrome) | 在浏览器中检查页面并调试 | 持续更新 |
| S047 | 官方文档 | [VS Code / IDE 入口](https://code.claude.com/docs/en/vs-code) | 编辑器内的任务实施；以官方导航为准 | 持续更新 |
| S084 | 官方文档 | [项目设置](https://code.claude.com/docs/en/settings) | 项目和个人配置的覆盖优先级 | 持续更新 |
| S085 | 官方文档 | [完整设置参考](https://code.claude.com/docs/en/settings-reference) | 可用配置键的官方权威索引 | 持续更新 |
| S086 | 官方文档 | [CLI 参数参考](https://code.claude.com/docs/en/cli-reference) | 命令行常用参数与自动化模式 | 持续更新 |
| S087 | 官方文档 | [内置命令索引](https://code.claude.com/docs/en/commands) | 各种命令和内置快捷能力 | 持续更新 |
| S095 | 官方文档 | [大型代码仓库](https://code.claude.com/docs/en/large-codebases) | Monorepo、大型项目的规则和工具组织 | 持续更新 |
| S100 | 官方文档 | [术语表](https://code.claude.com/docs/en/glossary) | Agentic loop、Skills、MCP 等术语释义 | 持续更新 |
| S106 | 行业报告 | [The making of Claude Code](https://www.anthropic.com/features/making-of-claude-code) | Claude Code 从内部 CLI 成长为产品的公开采访与过程。 | 2026-02-23 |

### 多 Agent（10）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S008 | 研究文章 | [多 Agent 研究系统](https://www.anthropic.com/research/multi-agent-research-system) | 主任务分解、并行子研究、来源交叉验证与综合评估。 | 2025-06-13 |
| S017 | 研究文章 | [多 Claude 并行构建 C 编译器](https://www.anthropic.com/research/building-c-compiler) | 研究性实验：并行代理、持续测试、成本与协调边界；不宜盲目照搬。 | 2026-02-05 |
| S045 | 官方文档 | [Claude Projects](https://code.claude.com/docs/en/claude-projects) | 长期持续任务与多云会话协作 | 持续更新 |
| S048 | 官方文档 | [并行代理总览](https://code.claude.com/docs/en/agents) | 对比 subagent、agent view、teams 与动态编排 | 持续更新 |
| S049 | 官方文档 | [自定义 Subagents](https://code.claude.com/docs/en/sub-agents) | 给研究、审核等任务建立独立上下文 | 持续更新 |
| S050 | 官方文档 | [Agent view](https://code.claude.com/docs/en/agent-view) | 管理多个会话并观察阻塞与进展 | 持续更新 |
| S051 | 官方文档 | [Agent teams](https://code.claude.com/docs/en/agent-teams) | 多个会话协作、任务划分和消息同步 | 持续更新 |
| S052 | 官方文档 | [Cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging) | 跨会话消息与协调 | 持续更新 |
| S053 | 官方文档 | [动态 Agent workflows](https://code.claude.com/docs/en/workflows) | 通过脚本化任务编排批量子代理 | 持续更新 |
| S054 | 官方文档 | [Git Worktrees](https://code.claude.com/docs/en/worktrees) | 隔离多个代理的代码更改以防冲突 | 持续更新 |

### Skills（2）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S010 | 研究文章 | [Agent Skills 设计理念](https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills) | 技能包由说明、脚本、资源构成；按需加载，复用组织知识。 | 2025-10-16 |
| S057 | 官方文档 | [Skills 完整指南](https://code.claude.com/docs/en/skills) | 创建、组织、调试复用技能 | 持续更新 |

### MCP 工具（7）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S011 | 研究文章 | [写好 Agent 工具](https://www.anthropic.com/research/writing-tools-for-agents) | 从工具描述、结构和反馈信号改进 Agent 的工具使用能力。 | 2025-09-11 |
| S012 | 研究文章 | [MCP 代码执行](https://www.anthropic.com/research/code-execution-with-mcp) | 通过代码执行聚合工具调用，降低工具负载与上下文成本。 | 2025-11-04 |
| S014 | 研究文章 | [高级工具使用](https://www.anthropic.com/research/advanced-tool-use) | 工具发现、工具调用与程序化工具编排。 | 2025-11-24 |
| S028 | 研究文章 | [Claude Desktop MCP Extensions](https://www.anthropic.com/research/desktop-extensions) | 桌面端 MCP 服务的一键安装与接入方式。 | 2025-06-26 |
| S055 | 官方文档 | [MCP 快速入门](https://code.claude.com/docs/en/mcp-quickstart) | 连接外部工具、检查工具权限 | 持续更新 |
| S056 | 官方文档 | [MCP 完整指南](https://code.claude.com/docs/en/mcp) | 把 GitHub、数据库、文件等安全接入 | 持续更新 |
| S088 | 官方文档 | [工具参考](https://code.claude.com/docs/en/tools-reference) | 工具权限与执行行为 | 持续更新 |

### 安全与评估（15）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S013 | 研究文章 | [Claude Code 沙箱实践](https://www.anthropic.com/research/claude-code-sandboxing) | 从权限提示进化到隔离执行与可审计的命令边界。 | 2025-10-20 |
| S016 | 研究文章 | [Agent 评估拆解](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) | 从可复现任务、评分标准到系统性测试集。 | 2026-01-09 |
| S018 | 研究文章 | [Agentic coding 评估中的基础设施噪声](https://www.anthropic.com/research/infrastructure-noise) | 评估系统运行环境如何影响对代理能力的判断。 | 2026-02-05 |
| S020 | 研究文章 | [如何设计难被 AI 攻破的技术考核](https://www.anthropic.com/research/AI-resistant-technical-evaluations) | 构建有效且具鉴别度的真实工程评估。 | 2026-01-21 |
| S021 | 研究文章 | [Claude Code 自动模式](https://www.anthropic.com/research/claude-code-auto-mode) | 新的权限审核和自动化执行平衡，使用前查阅最新权限说明。 | 2026-03-25 |
| S023 | 研究文章 | [Claude Code 质量问题复盘](https://www.anthropic.com/research/april-23-postmortem) | 公开工程质量反馈与改进思路，便于理解可靠性边界。 | 2026-04-23 |
| S024 | 研究文章 | [跨产品 Agent 隔离](https://www.anthropic.com/research/how-we-contain-claude) | 为 Claude 产品中的行动能力建立可控的边界。 | 2026-05-25 |
| S027 | 研究文章 | [BrowseComp 中的评估意识](https://www.anthropic.com/research/eval-awareness-browsecomp) | 评估透明度与能力测量中的交互问题。 | 2026-03-06 |
| S029 | 研究文章 | [一次生产问题复盘](https://www.anthropic.com/research/a-postmortem-of-three-recent-issues) | 从故障与回滚学习可靠性与沟通实践。 | 2025-09-17 |
| S063 | 官方文档 | [测试插件](https://code.claude.com/docs/en/plugin-evals) | 评估插件提供的能力是否真实有效 | 持续更新 |
| S065 | 官方文档 | [插件安全](https://code.claude.com/docs/en/plugins/security) | 第三方插件的安全与信任检查 | 持续更新 |
| S080 | 官方文档 | [安全总览](https://code.claude.com/docs/en/security) | 安全模型与实际防护建议 | 持续更新 |
| S081 | 官方文档 | [沙箱配置](https://code.claude.com/docs/en/sandboxing) | 限制文件系统访问和网络权限 | 持续更新 |
| S082 | 官方文档 | [权限配置](https://code.claude.com/docs/en/permissions) | 按作用域定义工具执行许可 | 持续更新 |
| S083 | 官方文档 | [权限模式](https://code.claude.com/docs/en/permission-modes) | 审批和自动执行模式的取舍 | 持续更新 |

### 长任务（4）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S015 | 研究文章 | [长周期 Agent 的 Harness](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) | 多轮任务需要初始化、状态交接、增量工作和验证。 | 2025-11-26 |
| S019 | 研究文章 | [长任务应用开发 Harness](https://www.anthropic.com/research/harness-design-long-running-apps) | 前端设计和长周期软件工程的规划者、生成者与评估者模式。 | 2026-03-24 |
| S039 | 官方文档 | [管理会话](https://code.claude.com/docs/en/sessions) | 恢复、命名和分支会话 | 持续更新 |
| S089 | 官方文档 | [Checkpointing](https://code.claude.com/docs/en/checkpointing) | 记录并撤销代码更改 | 持续更新 |

### Agent 记忆（2）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S026 | 研究文章 | [Agent Memory 的构成](https://www.anthropic.com/research/components-of-agent-memory) | 记忆笔记、知识索引与离线整理（dreaming）如何提升后续任务可靠性。 | 2026-11-06 |
| S038 | 官方文档 | [项目记忆与指令](https://code.claude.com/docs/en/memory) | CLAUDE.md 和自动记忆的边界与用法 | 持续更新 |

### 成本与优化（4）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S037 | 官方文档 | [Prompt Cache](https://code.claude.com/docs/en/prompt-caching) | 理解缓存为何可能失效 | 持续更新 |
| S090 | 官方文档 | [成本控制](https://code.claude.com/docs/en/costs) | Token、团队预算和上下文优化 | 持续更新 |
| S091 | 官方文档 | [监控](https://code.claude.com/docs/en/monitoring-usage) | OpenTelemetry 监控使用情况 | 持续更新 |
| S092 | 官方文档 | [团队分析](https://code.claude.com/docs/en/analytics) | 组织内使用指标与采用情况 | 持续更新 |

### 实战模板（1）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S041 | 官方文档 | [Prompt 库](https://code.claude.com/docs/en/prompt-library) | 可复制的常见任务起始提示 | 持续更新 |

### Hooks（2）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S058 | 官方文档 | [Hooks 教程](https://code.claude.com/docs/en/hooks-guide) | 编辑后校验、通知与硬性流程检查 | 持续更新 |
| S059 | 官方文档 | [Hooks 参考](https://code.claude.com/docs/en/hooks) | 触发事件、输入输出、退出状态 | 持续更新 |

### Plugins（4）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S060 | 官方文档 | [项目插件总览](https://code.claude.com/docs/en/plugins/overview) | 插件与独立 Skills、MCP 的区别 | 持续更新 |
| S061 | 官方文档 | [安装插件](https://code.claude.com/docs/en/plugins/install) | 插件发现、信任与更新 | 持续更新 |
| S062 | 官方文档 | [创建插件](https://code.claude.com/docs/en/plugins/create) | 构建独立插件的完整步骤 | 持续更新 |
| S064 | 官方文档 | [插件组件](https://code.claude.com/docs/en/plugins/components) | 插件内部打包 Skills、Hooks 与 MCP | 持续更新 |

### Agent SDK（14）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S066 | 官方文档 | [Agent SDK 概览](https://code.claude.com/docs/en/agent-sdk/overview) | 使用 SDK 构建程序化代理 | 持续更新 |
| S067 | 官方文档 | [Agent SDK 快速入门](https://code.claude.com/docs/en/agent-sdk/quickstart) | 用 Python / TypeScript 编写最小 Agent | 持续更新 |
| S068 | 官方文档 | [Agent SDK 配置](https://code.claude.com/docs/en/agent-sdk/configuration) | 配置工具权限、会话和模型 | 持续更新 |
| S069 | 官方文档 | [Agent SDK 示例](https://code.claude.com/docs/en/agent-sdk/examples) | 查看可运行例子和官方 Cookbook | 持续更新 |
| S070 | 官方文档 | [SDK Agent Loop](https://code.claude.com/docs/en/agent-sdk/agent-loop) | Agent 消息和工具执行生命周期 | 持续更新 |
| S071 | 官方文档 | [SDK 会话管理](https://code.claude.com/docs/en/agent-sdk/sessions) | 续接、恢复和分叉会话 | 持续更新 |
| S072 | 官方文档 | [SDK 结构化输出](https://code.claude.com/docs/en/agent-sdk/structured-outputs) | 以 JSON Schema 等校验输出 | 持续更新 |
| S073 | 官方文档 | [SDK 自定义工具](https://code.claude.com/docs/en/agent-sdk/custom-tools) | 以本地工具扩展代理的行动能力 | 持续更新 |
| S074 | 官方文档 | [SDK MCP 集成](https://code.claude.com/docs/en/agent-sdk/mcp) | 外部工具的认证与安全接入 | 持续更新 |
| S075 | 官方文档 | [SDK 工具搜索](https://code.claude.com/docs/en/agent-sdk/tool-search) | 大工具库中的按需发现和加载 | 持续更新 |
| S076 | 官方文档 | [SDK Subagents](https://code.claude.com/docs/en/agent-sdk/subagents) | 使用 SDK 构造分工子代理 | 持续更新 |
| S077 | 官方文档 | [SDK Skills](https://code.claude.com/docs/en/agent-sdk/skills) | 在程序化 Agent 中加载能力包 | 持续更新 |
| S078 | 官方文档 | [SDK 工具权限](https://code.claude.com/docs/en/agent-sdk/permissions) | 控制工具允许、拒绝和审阅 | 持续更新 |
| S079 | 官方文档 | [SDK Hooks](https://code.claude.com/docs/en/agent-sdk/hooks) | 在代理生命周期运行自定义检查 | 持续更新 |

### 企业落地（6）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S093 | 官方文档 | [企业部署](https://code.claude.com/docs/en/third-party-integrations) | 企业环境与第三方基础设施集成 | 持续更新 |
| S094 | 官方文档 | [网关部署](https://code.claude.com/docs/en/gateways) | 集中管理模型流量、权限和审计 | 持续更新 |
| S096 | 官方文档 | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | 用 CI 触发 Claude 任务与 PR | 持续更新 |
| S097 | 官方文档 | [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd) | 与 GitLab 自动化系统集成 | 持续更新 |
| S098 | 官方文档 | [企业引导工具包](https://code.claude.com/docs/en/communications-kit) | 向团队讲清楚工具用途和边界 | 持续更新 |
| S099 | 官方文档 | [推广倡导者手册](https://code.claude.com/docs/en/champion-kit) | 企业内部培训与推广 | 持续更新 |

### 真实配置（5）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S101 | 官方开源 | [Claude Code 源码与 Issues](https://github.com/anthropics/claude-code) | 产品代码和版本讨论的公开入口。 | 持续更新 |
| S102 | 官方开源 | [Agent Skills 官方模板](https://github.com/anthropics/skills) | 跨项目复用的 Skill 结构和真实示例。 | 持续更新 |
| S103 | 官方开源 | [Claude Cookbook](https://github.com/anthropics/claude-cookbooks) | 官方 API / Agents 示例与实践配方。 | 持续更新 |
| S104 | 官方开源 | [官方 Plugins 目录](https://github.com/anthropics/claude-plugins-official) | Anthropic 管理的 Claude Code 插件。 | 持续更新 |
| S105 | 官方开源 | [DevRel Claude Code Playground](https://github.com/anthropics/claude-code-playground) | DevRel 实际使用的 Hooks、CLAUDE.md、设置和工作案例；项目自身声明不代表规范。 | 持续更新 |

### 行业报告（1）

| ID | 类型 | 资料与来源 | 可用信息 | 日期 |
| --- | --- | --- | --- | --- |
| S108 | 行业报告 | [2026 Agentic Coding Trends 报告](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf) | Anthropic 对代理编程的趋势和跨职能应用的观察与预测。 | 2026 |

## 官方完整入口

- [Claude Code 官方 Docs Index](https://code.claude.com/docs/llms.txt)：从官方索引发现未来新增和改名的页面。
- [Anthropic Engineering](https://www.anthropic.com/engineering)：工程团队公开研究。
- [Anthropic News](https://www.anthropic.com/news)：官方产品和公司级动态。
- [Anthropic GitHub](https://github.com/anthropics)：官方开源仓库。

## 维护者与商业入口

作者：AI 酋长 Andy。个人官网：https://metaver.vip/ ，星觉科技：https://www.a6no1.cn/ ，公开业务微信：`AIPMAndy`。免费阅读并不需要加微信。
