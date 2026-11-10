/* Original, independent website logic. No external API calls or tracking. */
(function () {
  "use strict";
  var library = Array.isArray(window.ANTHROPIC_LIBRARY) ? window.ANTHROPIC_LIBRARY : [];
  var topic = "全部";
  var search = "";
  var kind = "all";
  var pageSize = 12;
  var shown = 12;
  var toastTimer = null;

  function e(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function external(url) {
    try {
      var p = new URL(url, location.href);
      if (p.protocol !== "https:" || !["www.anthropic.com","anthropic.com","claude.com","code.claude.com","github.com","www-cdn.anthropic.com","resources.anthropic.com"].includes(p.hostname)) return "#sources";
      return p.href;
    } catch (_) { return "#sources"; }
  }
  function notify(message) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {el.classList.remove("show");}, 2600);
  }
  function copyValue(value) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () { notify("已复制，可直接粘贴"); }, function () {fallbackCopy(value);});
    } else { fallbackCopy(value); }
  }
  function fallbackCopy(value) {
    var x=document.createElement("textarea");
    x.value=value;x.style.position="fixed";x.style.left="-9999px";
    document.body.appendChild(x);x.select();
    try {if(document.execCommand("copy")) notify("已复制，可直接粘贴");else notify("复制失败，请手动选择文字");}
    catch (_) {notify("复制失败，请手动选择文字");}
    x.remove();
  }
  document.addEventListener("click",function(ev){
    var b=ev.target.closest("[data-copy]");
    if(b){ev.preventDefault();copyValue(b.getAttribute("data-copy").replace(/&#10;/g,"\n"));}
  });

  var teams=[
    ["01","数据基础设施","诊断集群故障、处理数据、帮助新员工理解代码和上下游依赖。","用截图和日志排查 Kubernetes Pod IP 等问题；用 CLAUDE.md 梳理仓库规则，并帮助财务同事将需求转成查询。","准备一份脱敏日志和说明；要求 AI 先列根因假设、证据、只读命令。生产变更必须人工审批。","数据分析 / 运行手册","◈"],
    ["02","Claude Code 产品研发","用 AI 快速原型、读代码、运行测试和协助处理 PR。","探索代码库、原型迭代、测试驱动开发；不同风险等级决定人工监督程度。","给出单个可重现 Bug，要求先找文件，再写最小测试和补丁，最后审查 diff。","研发效率 / 测试","⌘"],
    ["03","安全工程","解释基础设施配置变更、产出排障文档并强化测试。","辅助 Terraform 变更审查、定位故障、编写 Runbook 和测试；不等于自动获批改线上资源。","提交已脱敏的 Terraform plan，让 AI 逐项列出权限、网络与删除风险；人工执行。","安全 / IaC","◎"],
    ["04","推理团队","快速理解陌生 ML 代码并补齐复杂边界测试。","辅助代码定位、Rust 等语言的测试迁移、理解模型推理相关实现及复现故障。","选一个小函数：先列边界条件，写测试，再交叉验证移植后的逻辑。","模型工程 / 测试","∴"],
    ["05","数据科学与可视化","从数据 Notebook 直接做出可以给他人用的交互看板。","非前端专家借助 Claude Code 创建 React/TypeScript 数据看板，推动临时研究产物产品化。","用虚构 CSV 做交互图表，并手动核对聚合数字、缺失值和极端值。","数据产品 / React","▧"],
    ["06","产品工程 / API Knowledge","让 Claude Code 成为定位代码问题的第一站。","在复杂仓库里找入口文件、调用链、依赖关系和需要看的最小文件集合，减少人工翻找。","先要求只读回答：功能在哪个文件，调用链是什么，附文件路径和可验证的引用。","代码检索 / 生产力","⌑"],
    ["07","增长营销","用专业子 Agent 生成广告标题与描述，辅助批量素材制作。","官方介绍 CSV 广告分析、标题 / 描述两个 subagent、Figma 批量创意及 Meta Ads MCP 探索。","先用项目内虚构 CSV 做 CTR/CPC 诊断，再分别写标题、描述并人工审核，不直接投放。","广告 / 获客","↗"],
    ["08","产品设计","把截图变成可操作原型，并提前发现状态与边界问题。","从 Figma / 页面截图走向可交互实现，辅助修改视觉样式、状态逻辑和 PR 修复。","拿一张授权截图，定义空/加载/成功/失败/无权限五状态，产出原型并逐屏检查。","交互设计 / 原型","◇"],
    ["09","强化学习工程","让 Claude 负责小型功能与测试，建立检查点和回滚流程。","辅助写功能、解释训练相关代码、测试调试与快速试错；强调失败后回退。","只给 AI 一项可在一两个文件里实现的任务，提交前跑测试，失败回退。","研发 / 迭代","⟳"],
    ["10","法务团队","让不会编程的业务人员也能把手工事务做成工具。","律师自行做请求分流、会议跟踪和无障碍沟通原型；后续公开资料还介绍 Skills + MCP 的法务审核。","用虚构法务事项做内部路由小工具，结果只作建议，不自动输出法律结论。","法务 / 非技术","§"]
  ];
  function renderTeams(){
    var target=document.getElementById("team-list");
    target.innerHTML=teams.map(function(t,index){
      return '<article class="team-card" id="team-'+(index+1)+'"><button class="team-trigger" type="button" aria-expanded="false" aria-controls="team-detail-'+index+'">'+
      '<div class="team-head"><span class="team-index">CASE '+e(t[0])+' / 10</span><span class="team-icon" aria-hidden="true">'+e(t[6])+'</span></div>'+
      '<h3>'+e(t[1])+'</h3><p class="team-summary">'+e(t[2])+'</p><span class="team-more">查看真实用法和复刻步骤 <span aria-hidden="true">↗</span></span></button>'+
      '<div id="team-detail-'+index+'" class="team-details" hidden><h4>官方公开方法</h4><p>'+e(t[3])+'</p><h4>我们的教学复刻（非官方 Prompt）</h4><p>'+e(t[4])+'</p><a href="https://www.anthropic.com/news/how-anthropic-teams-use-claude-code" target="_blank" rel="noopener noreferrer">查看官方访谈 ↗</a></div></article>';
    }).join("");
    target.addEventListener("click",function(ev){
      var btn=ev.target.closest(".team-trigger");if(!btn)return;
      var card=btn.closest(".team-card"),panel=card.querySelector(".team-details");
      var open=btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded",String(!open));panel.hidden=open;card.classList.toggle("is-open",!open);
    });
  }

  var methods=[
    ["单次调用","规则明确、输入小、输出能直接核对时，不必增加步骤。"],
    ["提示链","先核对事实，再生成总结；每步都应该有独立完成标准。"],
    ["路由分发","根据真实问题选择检索、数据、客服或其他专业处理器。"],
    ["并行工作者","多个独立资料源可以同时研究，但合并时要处理冲突。"],
    ["编排者与工作者","子任务不固定时，由主 Agent 动态拆解并监督交付。"],
    ["生成者与评估者","有客观评分标准时，让第二道环节验收和驱动改进。"]
  ];
  function renderMethods(){
    document.getElementById("method-list").innerHTML=methods.map(function(m,i){
      return '<div class="method-item"><div class="method-title"><span class="method-number">0'+(i+1)+'</span><span>'+e(m[0])+'</span></div><p>'+e(m[1])+'</p></div>';
    }).join("");
  }
  var paths={
    engineer:{
      no:"01 / TECH",title:"把一个 Bug 变成可验证的修复",
      desc:"从项目规则和调用链入手，不让 AI 盲目改代码。",
      steps:["打开项目，先读 README、CLAUDE.md 和相关测试。","要求列出根因假设及改动文件，先不写代码。","根据测试实施最小修改，检查 diff 与回退方案。"],
      prompt:"请先探索代码库，列出与【问题】有关的文件、证据、影响范围和测试方式。先不要修改。得到我确认后，完成最小改动并运行测试，报告结果与仍然未知的内容。",
      url:"https://code.claude.com/docs/en/best-practices",label:"阅读官方最佳实践"
    },
    founder:{
      no:"02 / BUSINESS",title:"先找到一个能省时间的真实流程",
      desc:"从企业的重复工作里选一个风险低、结果可验证的任务。",
      steps:["记录一个每周重复的流程：频率、输入、输出和耗时。","用虚构数据验证最小版本；能用脚本做就先用脚本。","记录人工审核时间、返工率、出错场景，再决定是否升级 Agent。"],
      prompt:"你是我的企业流程分析助手。请把【流程】拆成触发、输入、权限、动作、输出、验证。优先删除无效步骤，再比较普通脚本、单 Agent、多个 Agent 的成本和风险。不要自动操作真实账号。",
      url:"https://www.anthropic.com/research/building-effective-agents",label:"阅读 Agent 架构原理"
    },
    marketing:{
      no:"03 / GROWTH",title:"复刻 Anthropic 的广告分析与文案分工",
      desc:"用虚构广告表分析数据，再把标题和描述交给不同的创意职责。",
      steps:["先运行本仓库的广告 CSV 教学分析脚本。","分别生成标题与描述候选，不能编造效果和客户评价。","用审核清单过滤虚假承诺，小规模实验前人工审阅。"],
      prompt:"用虚构广告表中的 CTR、CPC 找出待优化候选。标题和描述分别独立生成，不重复原句。全部输出要给出真实卖点依据和假设；不要接入广告账号，不要自动投放。",
      url:"https://www.anthropic.com/news/how-anthropic-teams-use-claude-code",label:"阅读增长营销原始案例"
    },
    beginner:{
      no:"04 / BEGINNER",title:"30 分钟做出第一份 AI 文件交付",
      desc:"不要求会编程，先从一个自己理解的问题开始。",
      steps:["按官方 Quickstart 安装或使用受支持的入口。","写一份 TASK.md，告诉 AI 目标、限制与输出文件。","先看计划，再允许在练习目录内生成结果；最后核验文件。"],
      prompt:"请先读取 TASK.md，只复述目标、缺失信息和验收标准。先不要做任何修改。然后给我一个最少依赖的执行方案。未经确认，不运行有副作用的命令。",
      url:"https://code.claude.com/docs/en/quickstart",label:"官方 Quickstart"
    }
  };
  function renderPath(id){
    var p=paths[id]||paths.engineer;
    document.querySelectorAll(".path-tab").forEach(function(btn){
      var active=btn.dataset.path===id;btn.classList.toggle("is-active",active);
      btn.setAttribute("aria-selected",String(active));btn.setAttribute("tabindex",active?"0":"-1");
    });
    document.getElementById("path-panel").innerHTML='<div class="path-main"><span class="path-stepnum">'+e(p.no)+'</span><h3>'+e(p.title)+'</h3><p>'+e(p.desc)+'</p><ol class="steps">'+p.steps.map(function(s,i){return '<li><span>0'+(i+1)+'</span><span>'+e(s)+'</span></li>';}).join("")+'</ol></div>'+
    '<div class="path-side"><div class="label">复制下面的起始 Prompt</div><div class="path-code">'+e(p.prompt)+'</div><div class="path-actions"><button type="button" id="path-copy">复制实操指令 ↗</button><a href="'+external(p.url)+'" target="_blank" rel="noopener noreferrer">'+e(p.label)+' ↗</a></div></div>';
    document.getElementById("path-copy").addEventListener("click",function(){copyValue(p.prompt);});
  }
  document.querySelectorAll(".path-tab").forEach(function(btn){btn.addEventListener("click",function(){renderPath(btn.dataset.path);});});

  var topics=["全部","团队案例","Claude Code","Agent 设计","多 Agent","Skills","MCP 工具","Agent 记忆","Agent SDK","Hooks","Plugins","长任务","安全与评估","企业落地","真实配置","成本与优化","行业报告"];
  function renderTopics(){
    document.getElementById("topic-bar").innerHTML=topics.map(function(t){
      return '<button type="button" class="topic-chip'+(topic===t?' is-selected':'')+'" data-topic="'+e(t)+'" aria-pressed="'+(topic===t)+'">'+e(t)+'</button>';
    }).join("");
  }
  function sortValue(item){
    var date=item.date||"";
    return /^\d{4}-\d{2}/.test(date)?date:(date==="2026"?"2026-01-01":"0000");
  }
  function matched(){
    return library.filter(function(item){
      if(topic!=="全部"&&item.topic!==topic)return false;
      if(kind!=="all"&&item.type!==kind)return false;
      var haystack=[item.title,item.topic,item.description,item.type,item.date,item.url].join(" ").toLowerCase();
      return haystack.includes(search.toLowerCase());
    }).sort(function(a,b){
      if(b.weight!==a.weight)return b.weight-a.weight;
      var bd=sortValue(b),ad=sortValue(a);return bd<ad?-1:bd>ad?1:a.id.localeCompare(b.id);
    });
  }
  function renderSources(){
    var result=matched();
    document.getElementById("visible-count").textContent="找到 "+result.length+" / "+library.length+" 条原始资料";
    var active=result.slice(0,shown);
    document.getElementById("source-list").innerHTML=active.map(function(item){
      return '<article class="source-card"><div class="source-meta"><span class="source-type">'+e(item.type)+' · '+e(item.topic)+'</span><span>'+e(item.date)+'</span></div>'+
      '<h3>'+e(item.title)+'</h3><p>'+e(item.description)+'</p><div class="source-footer"><span>'+e(item.id)+' / ANTHROPIC PUBLIC</span><a href="'+external(item.url)+'" target="_blank" rel="noopener noreferrer" aria-label="打开官方来源：'+e(item.title)+'">查看原文 ↗</a></div></article>';
    }).join("");
    document.getElementById("empty-state").hidden=result.length!==0;
    document.getElementById("show-more").hidden=shown>=result.length;
    renderTopics();
  }
  document.getElementById("library-search").addEventListener("input",function(e){search=e.target.value.trim();shown=pageSize;renderSources();});
  document.getElementById("library-type").addEventListener("change",function(e){kind=e.target.value;shown=pageSize;renderSources();});
  document.getElementById("topic-bar").addEventListener("click",function(ev){var btn=ev.target.closest("[data-topic]");if(!btn)return;topic=btn.dataset.topic;shown=pageSize;renderSources();});
  document.getElementById("show-more").addEventListener("click",function(){shown+=pageSize;renderSources();});
  document.addEventListener("keydown",function(ev){
    if(ev.key==="/"&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"){
      ev.preventDefault();document.getElementById("library-search").focus();location.hash="sources";
    }
  });
  var mobile=document.querySelector(".mobile-menu-toggle"),mobilenav=document.getElementById("mobile-nav");
  mobile.addEventListener("click",function(){
    var expanded=mobile.getAttribute("aria-expanded")==="true";
    mobile.setAttribute("aria-expanded",String(!expanded));mobilenav.hidden=expanded;
  });
  mobilenav.querySelectorAll("a").forEach(function(link){link.addEventListener("click",function(){mobilenav.hidden=true;mobile.setAttribute("aria-expanded","false");});});
  renderTeams();renderMethods();renderPath("engineer");renderSources();
  document.getElementById("resource-count").textContent=String(library.length);
})();
