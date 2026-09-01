# ============================================================
# 壹苯图书馆 · recent 分支一键部署脚本（放在仓库根目录，随 recent 分支管理）
# 作用：在 recent 分支提交改动并推送，触发 CI 自动组装部署
# 提交信息格式：更新：<yyyy-MM-dd>-<NN>（同一天递增，NN 从 01 开始）
#
# 用法（在 E:\library 根目录）：
#   .\deploy-recent.ps1             # 提交 + 推送
#   .\deploy-recent.ps1 -Generate   # 先运行 script\generate-portal.mjs 重新生成，再提交推送
# ============================================================
param([switch]$Generate)

$ErrorActionPreference = 'Stop'
$repo = 'E:\library'
Set-Location $repo

# 1) 确保在 recent 分支（生成 / 提交都应在 recent 上进行）
$branch = git branch --show-current
if ($branch -ne 'recent') {
  Write-Host '>> 切换到 recent 分支...' -ForegroundColor Cyan
  git checkout recent
  if ($LASTEXITCODE -ne 0) { throw '切换到 recent 分支失败' }
}

# 2) 可选：重新生成 recent/current 内容
if ($Generate) {
  Write-Host '>> 重新生成 recent/current 页面...' -ForegroundColor Cyan
  node "$repo\script\generate-portal.mjs"
  if ($LASTEXITCODE -ne 0) { throw 'generate-portal.mjs 执行失败' }
}

# 3) 暂存全部改动
git add -A

# 4) 计算递增编号：统计今天已有 "更新：yyyy-MM-dd-NN" 提交数，下一条 = 数量 + 1
$today = Get-Date -Format 'yyyy-MM-dd'
$pat = "^更新：$today-[0-9][0-9]"
$count = (git log --oneline --grep=$pat --no-merges | Measure-Object).Count
$num = '{0:D2}' -f ($count + 1)
$msg = "更新：$today-$num"

# 5) 提交（无改动则跳过提交，仅推送）
$changes = (git status --porcelain | Measure-Object).Count
if ($changes -eq 0) {
  Write-Host '>> 没有改动，仅执行推送...' -ForegroundColor Yellow
}
else {
  git commit -m $msg
  if ($LASTEXITCODE -ne 0) { throw 'git commit 失败' }
  Write-Host ">> 已提交：$msg" -ForegroundColor Green
}

# 6) 推送 -> 触发自动部署
git push origin recent
if ($LASTEXITCODE -ne 0) { throw 'git push 失败' }
Write-Host '✔ 已推送 origin/recent，CI 将自动组装并部署（约 2~4 分钟）' -ForegroundColor Green
