// 构建/开发前准备：1) 统一代码块顶格 2) 列表内代码块缩进修复 3) 文档标题
// 4) 目录索引 index.md（重命名分类目录后需重新生成）5) 最近学习入口
import { execSync } from 'node:child_process'

execSync('node scripts/top-align-fences.mjs', { stdio: 'inherit' })
execSync('node scripts/fix-list-fences.mjs', { stdio: 'inherit' })
execSync('node scripts/add-title.mjs', { stdio: 'inherit' })
execSync('node scripts/generate-index.mjs', { stdio: 'inherit' })
execSync('node scripts/update-latest.mjs', { stdio: 'inherit' })
