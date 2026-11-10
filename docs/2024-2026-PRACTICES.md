# Anthropic Claude Code / Agent：2024–2026 完整实践进化史

> 独立中文研究，由 AI 酋长 Andy 整理。内容基于截至 2026-11-10 的公开资料。官方记录和本站复刻绝不混淆。

## 一、十三个关键节点

| 时间 | 官方公开方法 | 我们怎么学 |
| --- | --- | --- |
| 2024-12 | [Building effective agents](https://www.anthropic.com/research/building-effective-agents)：优先简单架构，区分工作流和 Agent | 普通脚本能完成的，不必堆多 Agent |
| 2025-04 | [Claude Code 最佳实践](https://www.anthropic.com/research/claude-code-best-practices)：项目约定、上下文与测试 | 探索 → 计划 → 修改 → 验证 |
| 2025-06 | [Multi-agent research](https://www.anthropic.com/research/multi-agent-research-system)：研究任务拆分和并行证据收集 | 每个子任务有来源与独立标准 |
| 2025-07 | [Anthropic 内部十部门](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code)：营销、设计、法务等均可使用 | 每个部门先挑一个高频真实任务 |
| 2025-09 | [Agent context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)：上下文预算与信息选择 | 少堆规则，多按需加载 |
| 2025-10 | [Agent Skills](https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills)：组织知识技能化 | 用说明 + 脚本 + 资源固化方法 |
| 2025-11 | [Long-running harness](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)：初始化、交接、检查点 | 不依赖无限增长的聊天历史 |
| 2026-01 | [Agent evals](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)：可复现的任务评分 | 先写测试，再说“完成” |
| 2026-02 | [C 编译器多代理实验](https://www.anthropic.com/research/building-c-compiler)：高并行与巨额验证成本 | 看懂边界，勿盲目照搬规模 |
| 2026-03 | [Harness design](https://www.anthropic.com/research/harness-design-long-running-apps)：规划、生成、评估 | 将验收设计进任务 |
| 2026-04 | [Managed Agents](https://www.anthropic.com/research/managed-agents)：稳定接口和执行隔离 | 把逻辑与运行环境分开 |
| 2026-10 | [Scion 源码管理](https://www.anthropic.com/research/redesigning-source-control)：agent-scale 开发基础设施 | 工程约束、测试与审批仍不可省 |
| 2026-11 | [Agent memory](https://www.anthropic.com/research/components-of-agent-memory)：记忆、检索、校验与整理 | 记录经过证实且值得复用的信息 |

## 二、官方十部门的最小可复制版本

这里的“官方”是 2025 年公开访谈；“复刻”属于本站原创，并非 Anthropic 内部 Prompt。

| 部门 | 官方公开工作 | 本站复刻的 3 步 |
| --- | --- | --- |
| 数据基础设施 | 截图和日志排障、向非技术团队交付查询 | 脱敏日志 → 根因与只读检查 → 人工审批 |
| Claude Code 产品研发 | 快速原型、单测、理解代码、协助 PR | 探索代码 → 最小修复 → 运行回归 |
| 安全工程 | Terraform 变更审查、Runbook、测试 | 检查权限差异 → 风险清单 → 人工复核 |
| 推理工程 | 理解复杂项目、边界测试、跨语言迁移 | 列测试向量 → 翻译实现 → 等价核对 |
| 数据科学与可视化 | 非前端专家制作 React 交互看板 | 虚构表格 → 图表 → 独立汇总验算 |
| API Knowledge / 产品工程 | 大型仓库检索、定位文件与依赖链 | 只读找路径 → 复现问题 → 最小改动 |
| 增长营销 | CSV 广告分析、双子 Agent、批量创意 | CTR/CPC → 标题与描述分工 → 人工审稿 |
| 产品设计 | 截图到交互原型、状态与边界设计 | 5 状态定义 → 原型 → 可用性检查 |
| 强化学习工程 | 小型实现、检查点、失败回滚 | 最小任务 → 测试 → 可逆提交 |
| 法务 | 请求路由、会议工具、非程序员建工具 | 虚构请求 → 路由草稿 → 专业人员确认 |

原始资料：[Anthropic 官方十团队长文](https://www.anthropic.com/news/how-anthropic-teams-use-claude-code)；[原文报道](https://claude.com/resources/articles/how-anthropic-teams-use-claude-code)。

## 三、2026 扩展：更多真实内部实践

### Cowork 四个部门

Anthropic 公开的 [Cowork 内部团队案例](https://claude.com/resources/guides/deploying-claude-across-your-organization/how-anthropic-teams-use-cowork) 另覆盖财务、法务、销售、产品。此资料**不等于 2025 Claude Code 的十部门报告**。

- 财务：MCP 连接授权数据源，再用技能封装重复查询、偏差分析和仪表盘生成；适合复刻为虚构数据练习。
- 法务：借助 Skills 与受控文档处理营销审查与合同初稿；应由专业人员复核。
- 销售：组织关系上下文与业务资料；外呼、发信和 CRM 修改前保留授权。
- 产品：把内部文档、分析和跨职能协作连接起来；需求变更必须定义完成标准。

补充：[Anthropic 法务团队的公开访谈](https://claude.com/resources/articles/how-anthropic-uses-claude-legal)。

### DevRel 真实配置仓库

[anthropics/claude-code-playground](https://github.com/anthropics/claude-code-playground) 发布了 DevRel 员工真实使用的配置和演示：

- `claude-code/claude-md/`：真实项目约定与使用说明。
- `claude-code/hooks/`：工具 Hook 示例。
- `claude-code/settings/`：不同环境的设置。
- `claude-code/workflows/`：实际个人流程与设计取舍。
- `skills/`：可重用的 Agent Skills。
- `demos/` 与 `launch-demos/`：演示构建过程、实验限制。

请注意该仓库自己的声明：它是 DevRel 实验场，不是官方最佳实践标准，更不保证每个示例长期有效。

进一步参阅：[Agent Skills](https://github.com/anthropics/skills)、[Claude Code](https://github.com/anthropics/claude-code)、[Cookbook](https://github.com/anthropics/claude-cookbooks)、[官方 Plugins](https://github.com/anthropics/claude-plugins-official)。

## 四、把方法真正用到业务：一个 30 分钟练习

**0–5 分钟：写清任务。** 建立 TASK.md，写目标、样本输入、输出和三条验收标准。

**5–10 分钟：先让 AI 探索。** 复制：
> 请只读检查项目文件和 TASK.md，列已确认事实、依赖、未知、风险和能运行的测试。先不要修改任何文件。

**10–20 分钟：最小交付。**
> 只实现约定范围中的最小方案。不要接触真实客户数据或账户。完成后给出产物路径和真实检查结果。

**20–30 分钟：验证与记录。** 检查文件、运行测试、记录成本、失败原因与回滚点。只有重复出现且稳定的任务才值得写成 Skill。

推荐复刻 [广告 CSV 演练](../examples/ads/README.md)。样本全为虚构数据，既不连接广告平台，也不承诺收益。

## 五、工程五步法（作者独立建议）

1. 质疑需求：这件事带来什么可衡量增量？
2. 删除：有哪几步完全可以不做？
3. 简化：把任务缩到可验证的单元，脚本能做就先用脚本。
4. 加快迭代：小样本验证，保留反例，复查事实。
5. 自动化：在有基线和验证后再增加 Skills、Hooks、Subagents。

这不是 Anthropic 官方规定的五步法，而是对其公开方法做的业务化整理。

## 六、内容边界与合作

- 本项目已整理 [108 条公开链接及 17 个主题](SOURCE-MATRIX.md)，涵盖官方文章、文档、开源仓库。**不是声称知道 Anthropic 的全部内部活动。**
- 官方文档会持续修订；版本更新以 [Claude Code 官方索引](https://code.claude.com/docs/llms.txt) 为准。
- 免费教程不要求购买服务。整理者：AI 酋长 Andy；[个人官网](https://metaver.vip/)、[星觉科技](https://www.a6no1.cn/)；业务微信：**AIPMAndy**（请备注 Claude Code）。
