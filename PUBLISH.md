# GitHub Pages 网站发布与验收

网站源码已经保存在 `site/`。主网站为 `site/index.html`，深度报告为 `site/study.html`。静态站无后端，不需要第三方 API Key。

## 1. 首次激活（仓库所有者操作）

**为什么需要这一步？** 2026-11-10 验证时，GitHub Actions 的检查已全部通过，但自动创建 Pages 报 `Resource not accessible by integration`。这是当前 Actions 令牌无法替仓库所有者首次启用 Pages，并非 JS、CSS 或文章出错。

1. 打开 [本仓库 Pages 设置](https://github.com/AIPMAndy/anthropic-claude-code-agent-handbook/settings/pages)。
2. 在 **Build and deployment → Source** 选择 **GitHub Actions**（不是 Deploy from a branch）。
3. 保存（如界面没有保存按钮，选择即生效）。仓库必须允许 GitHub Actions。
4. 打开 [Actions](https://github.com/AIPMAndy/anthropic-claude-code-agent-handbook/actions/workflows/pages.yml)，选择 `Verify and publish Agent Atlas website`，点击 **Run workflow**，选择 `main`。
5. 等待该运行的 `verify`、`deploy` 两个 Job 都为绿色，再访问以下网站：

**在线首页**：https://aipmandy.github.io/anthropic-claude-code-agent-handbook/

**深度报告**：https://aipmandy.github.io/anthropic-claude-code-agent-handbook/study.html

若组织限制 Pages/Actions、GitHub 服务故障或令牌权限不足，请查看运行的具体错误，不要把上传代码等同于已上线。

## 2. 自动发布

`.github/workflows/pages.yml` 会在每次推送 `main` 后自动：
1. 运行 `python3 scripts/check_site.py`，核对已编目资料、站点资源、微信及官网。
2. 运行 `node --check site/data.js` 和 `node --check site/app.js`。
3. 运行广告练习单元测试。
4. 将 `site/` 作为 GitHub Pages Artifact 上传并部署。

如果 `verify` 失败，`deploy` 会跳过。若 `configure-pages` 失败，要检查第一次激活权限；若 `deploy-pages` 失败，请检查仓库 Pages 设置、Actions 权限、Github Pages 环境限制。

## 3. 本地预览

```bash
python3 scripts/check_site.py
python3 -m unittest discover -s tests -v
node --check site/data.js
node --check site/app.js
python3 -m http.server 8080 --directory site
```

浏览器打开：http://localhost:8080/

## 4. 线上验收清单

- 首页桌面/手机都能打开，右侧概念流程图与主题卡片不溢出。
- `/study.html` 可打开，文档表格能水平滚动。
- 10 个团队卡片可展开/收起。
- 搜索“Skills”“MCP”“数据基础设施”都能筛选。
- 类别/主题筛选和加载更多按钮有效。
- 角色切换与“复制起始 Prompt”有效。
- “复制微信号”复制的是 **AIPMAndy**。
- 个人官网指向 https://metaver.vip/ ，企业官网指向 https://www.a6no1.cn/ 。
- 免责声明明显，不能让访问者误以为这是 Anthropic 官方网站。

## 5. 更新资料

网站索引的唯一内容源为 `site/data.js`；新增时请提供可核实的官方原始 URL、摘要、主题和日期，同时更新 `docs/SOURCE-MATRIX.md`。不要单纯增加数字或抓取转载拼凑条目。

## 6. 已知边界

- 外链是官方公开资源，可能随时间改名、删除或迁移；网站没有运行实时爬虫。
- 若浏览器屏蔽 Google Fonts，使用本地备用字体，不影响文字内容和导航。
- 本站不收集用户数据、不运行营销追踪、不提供假冒 Anthropic 的登录功能。
- 公开业务微信号由作者已有开源项目交叉核验：`AIPMAndy`。

**状态口径**：站点代码、自动检查、部署工作流均完成；在 Pages 启用并打开真实网址之前，仍应表述为“待启用线上托管”。
