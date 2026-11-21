/* Curator audit export. Dates originate from the catalog; exporting does not verify links. */
(function(root,factory){
  var api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.AgentSourceAudit=api;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  function clean(value){return String(value==null?"":value).replace(/[\t\r\n]+/g," ").trim();}
  function exportText(rows){
    if(!Array.isArray(rows))throw new TypeError("rows must be an array");
    var intro=[
      "Agent Atlas · 官方资料人工复核清单",
      "整理者：AI 酋长 Andy | https://metaver.vip/",
      "原始资料整理截至：2026-11-10（历史快照；非实时验证）",
      "说明：公开日期不等于链接有效日。请逐条打开官网原文确认版本、适用性和权限。",
      "仅导出当前筛选的 "+rows.length+" 条记录；空白复核栏供人工填写，不自动标记通过。",
      ""
    ];
    var head=["ID","主题","类型","标题","原始公开日期","原始URL","人工核验日期（待填）","结论/备注（待填）"].join("\t");
    var body=rows.map(function(row){
      return [row.id,row.topic,row.type,row.title,row.date,row.url,"",""].map(clean).join("\t");
    });
    return "\uFEFF"+intro.concat(head,body).join("\n")+"\n";
  }
  return {exportText:exportText,clean:clean};
});
