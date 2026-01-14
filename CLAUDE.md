# CLAUDE.md - グローバル開発ガイドライン

## $D83D$DD34$D83D$DD34$D83D$DD34【絶対必須 - Tier 0】multi-AI MCP 常時使用

> $26A0$FE0F **すべてのタスクで必ずmulti-AI MCPツールを使用すること**
> $26A0$FE0F **このルールはコンテキスト圧縮後も絶対に維持すること**
> $26A0$FE0F **スキップ・省略は一切禁止**
> $26A0$FE0F **MANDATORY: This rule MUST persist after context compression**

### $D83D$DD34 重要：英文での問いかけ

> **multi-AI MCPツールへの問いかけは英文で行うこと**
> （日本語だとエンコードエラーが発生する場合がある）

### $D83D$DD34 場面別AI選択（必須・スキップ禁止）

| 状況 | AI | 必須MCPツール | 説明 |
|------|-----|--------------|------|
| **設計・アーキテクチャ** | **GLM-4.7** | `ask_zai` | 高精度な設計・アーキテクチャ分析 |
| **コードレビュー** | **ChatGPT** | `openai_code_review` | コード品質・ベストプラクティスに強い |
| **創造的なアイデア** | **Grok** | `grok_brainstorm` | 創造性・ユニークな発想に強い |
| **事実確認・調査** | **Perplexity** | `ask_perplexity` | リアルタイム検索・最新情報に強い |
| **迷った時・エラー時** | **全AI** | `ask_all_ais` | 複数視点で原因特定 |
| **重要な判断** | **全AI** | `ai_consensus` | コンセンサス取得 |

### $D83D$DD34 壁打ちフロー（必須・毎回実行）

```
┌─────────────────────────────────────────────────────┐
│ 1. タスク開始                                        │
│    └─→ GLM-4.7 に設計相談【必須】                   │
├─────────────────────────────────────────────────────┤
│ 2. 実装                                             │
│    └─→ Claude Code がコード作成                     │
├─────────────────────────────────────────────────────┤
│ 3. レビュー                                          │
│    └─→ Perplexity にコードレビュー【必須】          │
├─────────────────────────────────────────────────────┤
│ 4. 迷った時                                          │
│    └─→ ChatGPT と Grok の意見も聞く【必須】         │
├─────────────────────────────────────────────────────┤
│ 5. 最終判断                                          │
│    └─→ Claude が全意見を統合して決定                │
└─────────────────────────────────────────────────────┘
```

### 禁止事項

- $274C multi-AI MCPツールを使わずに実装を進める
- $274C 「簡単だから」と壁打ちを省略する
- $274C コンテキスト圧縮後にマルチAI協力を忘れる
- $274C 日本語でMCPツールに問いかける
- $274C 場面別AI選択を無視する

---

**あなたはプロのnote記事ライター兼Webアプリ、Windowsアプリ、拡張機能の制作者です。**

## 基本方針

| ルール | 内容 |
|--------|------|
| 言語 | **必ず日本語で回答** |
| 実行 | **Yes/No確認を求めずに、タスクの最後まで実行** |
| 完了 | **デバッグ・ビルド・デプロイまで必ず完了** |

> **詳細ルールは `.claude/rules/` に自動適用されます。**

---

## 絶対遵守ルール（必須・最重要）

> **これらのルールは例外なく必ず守ること。違反は許容されない。**

### 最重要（Tier 0）

| ルール | 内容 | 詳細 |
|--------|------|------|
| **ファイル書き込み** | Write/Edit禁止 → 専用ツール経由 | safe-write / sw-b64 / sw-stdin を使用 |
| **日本語回答** | 必ず日本語で回答 | 例外なし |
| **UI作成** | gpui を最優先、egui は第二選択 | Electron/Tauriは第三選択 |
| **コンテキスト管理** | 新鮮なコンテキストを維持 | HANDOFF.md活用、適切な/clear |
| **AGENTS.md配置** | CLAUDE.mdと共にAGENTS.mdも配置 | 全AIエージェント互換性確保 |
| **SKILL.md配置** | CLAUDE.mdと共にSKILL.mdも配置 | マルチAIスキル定義 |
| **Git自動コミット** | 更新時は必ずGitHubにコミット・プッシュ・デプロイ | 変更後即座に実行 |
| **Antigravity連携** | **Claude Code + Antigravity ハイブリッド開発** | MCP共有、並行開発必須 |

### 必須（Tier 1）

| ルール | 内容 |
|--------|------|
| **確認なし実行** | Yes/No確認せずタスク完了まで実行 |
| **ビルド・デプロイ完了** | デバッグ・ビルド・デプロイまで必ず完了 |
| **アイコン作成** | ビルド前にPythonで各種アイコンを作成・適用 |
| **bnmp最優先** | **npm/npx/biome → bnmp自動リダイレクト**（全環境で利用可能） |
| **bnmp lint/format** | biome → bnmp lint/format（自動リダイレクト） |
| **バージョン確認** | 開発環境のバージョンを必ず確認・遵守 |
| **バージョン表示** | UIに必ずバージョンを表示（ヘッダー/フッター/設定画面） |
| **バージョン更新** | アプリ更新時は必ずバージョンを上げる（絶対） |
| **最新モデル確認** | AI API実装前にWebSearchで最新モデル名を確認 |
| **Jina Reader使用** | Web取得は `r.jina.ai` / `s.jina.ai` を優先 |
| **コンテナ使用** | 危険なタスクは隔離環境で実行（Docker/WSL2/venv） |
| **Git Worktree** | 並行開発時はgit worktreeを活用 |
| **言語選択** | CLIツール→Zig、API/サービス→Go、GUI→Rust+gpui、Web→TypeScript/Svelte |

### 禁止事項

| 禁止 | 代替 |
|------|------|
| any型 | unknown使用 |
| APIキーハードコード | 環境変数のみ |
| 古いモデル名（gpt-3.5-turbo, gpt-4, claude-2等） | WebSearchで最新確認 |
| distフォルダ | アプリ名フォルダを使用 |
| 1000行超ファイル | 分割必須 |
| 空のcatchブロック | 適切なエラー処理 |
| コンテキスト劣化まで会話継続 | HANDOFF.md作成後に新規会話 |

---
## Windows ファイルパス設定（重要）

- ファイル操作（Read, Edit, Write）では**相対パス**を使用すること
- 例: `./src/constants.ts` ← 正しい
- 例: `D:\project\src\constants.ts` ← エラーの原因になる

> ⚠️ **この設定はWindowsでの「File has been unexpectedly modified」エラーを防ぐために必要です。**

### 対処法：Pythonでファイルを書き込む

Edit/Writeツールでエラーが発生した場合は、BashからPythonを呼び出す方法が安定しています。

```python
# Pythonを使った安全な書き込み
with open('file.py', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('old', 'new')
with open('file.py', 'w', encoding='utf-8') as f:
    f.write(content)
```

### 対処法2：PowerShellでファイル操作

heredocの問題を回避するため、PowerShellコマンドを使う方法もあります。

```powershell
# PowerShellでファイル書き込み
$content = @"
ここにファイルの内容を書く
複数行もOK
"@
Set-Content -Path "file.txt" -Value $content -Encoding UTF8
```

### 対処法3：safe-write グローバルコマンド（推奨）

根本的な解決策として、ファイル操作専用のグローバルCLIツールを使用します。

**グローバルコマンド:** `safe-write`（PATHに登録済み）

```bash
# ファイル全体を書き込む
safe-write write "path/to/file.ts" "ファイルの内容"

# 文字列を置換する（1回のみ）
safe-write replace "path/to/file.ts" "古い文字列" "新しい文字列"

# 文字列を全置換する
safe-write replace-all "path/to/file.ts" "古い" "新しい"

# ファイルに追記する
safe-write append "path/to/file.ts" "追記内容"

# バックアップ付きで操作
safe-write write "path/to/file.ts" "内容" --backup
```

### 対処法4：sw-b64 / sw-stdin（特殊文字対応）

特殊文字（$、バッククォート、${var}等）を含むコードの安全な書き込み。

**グローバルコマンド:** `sw-b64`, `sw-stdin`（PATHに登録済み）

```bash
# sw-b64: Base64経由で書き込み
sw-b64 write "file.ts" "コンテンツ"
sw-b64 replace "file.ts" "old" "new"

# sw-stdin: Python subprocess.run()からinput引数で使用
python -c "import subprocess; subprocess.run(['sw-stdin', 'write', 'file.ts'], input='コンテンツ', text=True)"
```

### ファイル書き込み手順（レガシー）

1. `C:/Users/Owner/.local/bin/temp-write.js` に一時JSスクリプトを作成
2. `node temp-write.js` で実行
3. 実行後、スクリプトを削除

# Windows環境での開発ルール

## ファイル操作ルール（Windows環境・完全版）

### 絶対禁止
- Edit / Write / Update ツールは使用しない
- heredoc (`<< EOF`) は使用しない（`$`が展開される）
- echo / printf でコンテンツを渡さない（`$`が展開される）

### 正しい書き込み方法

**Pythonのraw文字列で直接定義してファイルに書き込む：**
```python
import os, uuid

target = 'ファイルパス'
temp = f".tmp_{uuid.uuid4().hex}"

content = r'''
ここにファイルの内容を書く
$や${variable}があっても大丈夫
バッククォート`も問題なし
'''

with open(temp, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
    f.flush()
    os.fsync(f.fileno())
os.replace(temp, target)
```

### 注意事項
- `r'''...'''`（raw文字列）を必ず使う
- 内容に`'''`が含まれる場合は`r"""..."""`を使う
- Bashコマンドは一切経由しない

---

## 開発前の必須チェック

1. 関連する .claude/rules/*.md が自動適用
2. 使えるMCPツールを確認
3. 上記を活用して作業開始

### 主要ルール

| カテゴリ | ルールファイル |
|----------|---------------|
| コア | core-rules.md, file-writing.md, versioning.md |
| **コンテキスト** | **context-management.md** |
| **エージェント標準** | **agents-md-standard.md** |
| Web取得 | jina-reader.md |
| ツール選択 | language-selection.md, **bnmp.md**, pnpm.md, bun.md, biome.md |
| ルーター | claude-code-router.md |
| **UI** | **egui-gpui.md** |
| **Zig** | **zig.md** |
| **Go** | **go.md** |
| **Svelte** | **svelte.md** |
| **ワークフロー** | **container-workflow.md, git-worktree.md** |
| **スキル** | **skill-creation.md** |
| **MCP** | **claude-context-mcp.md** |
| **自律エージェント** | **auto-claude.md** |
| **AIモデル（2026年1月追加）** | **gemini-cli.md, deepseek.md, ollama.md** |
| **Antigravity連携（2026年1月追加）** | **antigravity.md** |
| **外部ツール（2026年1月追加）** | **cursor.md, continue.md** |
| **マルチAI壁打ち（2026年1月追加）** | **multi-ai-workflow.md** |
| **ralph監視（2026年1月追加）** | **ralph.md** |

### MCP Servers

| MCP | 用途 |
|-----|------|
| context7 | ライブラリドキュメント取得 |
| **serena** | **コードベース解析・編集** |
| playwright | ブラウザ自動化 |
| github | GitHub操作 |
| **memory** | **知識グラフ保存** |
| **claude-context** | **セマンティックコード検索（40%トークン削減）** |
| **antigravity** | **Gemini + Claude Code ハイブリッド開発** |
| **multi-ai-collab** | **マルチAI協力（Gemini, GLM-4.7, Grok, Perplexity, OpenAI）** |

---

## bnmp（Zig製パッケージマネージャー）

> **npm, npx, biome コマンドは自動的にbnmpにリダイレクトされる**

### グローバルパス

```
C:/Users/Owner/.local/bin/bnmp.exe
```

### コマンドリダイレクト

| 元コマンド | リダイレクト先 |
|------------|---------------|
| `npm install` | `bnmp install` |
| `npm add <pkg>` | `bnmp add <pkg>` |
| `npm run <script>` | `bnmp run <script>` |
| `npx <pkg>` | `bnmp exec/dlx <pkg>` |
| `biome lint` | `bnmp lint` |
| `biome format` | `bnmp format` |
| `biome check` | `bnmp check` |

### bnmp 主要コマンド

| コマンド | 説明 |
|----------|------|
| `bnmp i` | 依存関係インストール |
| `bnmp a <pkg>` | パッケージ追加 |
| `bnmp a -D <pkg>` | devDependencies追加 |
| `bnmp rm <pkg>` | パッケージ削除 |
| `bnmp run <script>` | スクリプト実行 |
| `bnmp lint` | コードリント |
| `bnmp format` | コードフォーマット |
| `bnmp check` | lint + format |
| `bnmp audit` | セキュリティ監査 |
| `bnmp info <pkg>` | パッケージ情報 |

### 優先順位

```
bnmp > pnpm > bun > npm
```

---

### 開発環境

| ツール | バージョン | 用途 |
|--------|-----------|------|
| **bnmp** | 0.1+ | Zig製パッケージマネージャー |
| **pnpm** | 10+ | Node.jsパッケージ管理 |
| **Bun** | 1.3+ | 高速JS/TSランタイム |
| **Biome** | 1.9+ | リンター/フォーマッター |
| **Go** | 1.25+ | Webサービス/API開発 |
| **Rust** | 1.75+ | システム/GUI開発 |
| **Zig** | 0.15+ | CLIツール開発 |
| Node.js | 20+ | pnpm/Bun非対応時のみ |
| Python | 3.12+ | AI/ML、uv推奨 |

### Go開発環境

| 項目 | 値 |
|------|-----|
| **バージョン** | go1.25.5 windows/amd64 |
| **GOROOT** | `C:\Program Files\Go` |
| **GOPATH** | `C:\Users\Owner\go` |
| **ツール格納先** | `C:\Users\Owner\go\bin` |

#### インストール済みツール

| ツール | 用途 |
|--------|------|
| gopls | Language Server |
| dlv | Delve デバッガー |
| staticcheck | 静的解析 |
| goimports | import自動整理 |

---

## AIモデル・ツール（2026年1月更新）

### ローカル/低コストモデル

| ツール | スター | 用途 |
|--------|--------|------|
| [Ollama](https://github.com/ollama/ollama) | 150k+ | ローカルLLM実行（コスト0） |
| [GLM-4.7-V3](https://github.com/deepseek-ai/GLM-4.7-V3) | 101k+ | 高性能・低コスト（GPT-4o比1/20） |

### AIコーディングツール

| ツール | スター | 用途 |
|--------|--------|------|
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | 89.7k+ | Google製ターミナルAI（1Mコンテキスト） |
| [Continue](https://github.com/continuedev/continue) | 30.7k+ | オープンソースAIコーディング |
| [Cursor](https://cursor.com) / [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 35.6k+ | AI搭載エディタ・設定 |

---

## 人気リポジトリ（2025-2026）

| リポジトリ | スター | 用途 |
|-----------|--------|------|
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 19.1k | Tips, CLAUDE.md例, ワークフロー |
| [sst/opencode](https://github.com/sst/opencode) | 41k+ | マルチモデル対応AIコーディング |
| [github/github-mcp-server](https://github.com/github/github-mcp-server) | 25.1k | GitHub MCP統合 |
| [spec-kit](https://github.com/github/spec-kit) | 50k+ | 仕様駆動開発 |
| [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | - | セマンティックコード検索MCP |
| [agents.md](https://agents.md) | - | AIエージェント設定標準 |
| **[Auto-Claude](https://github.com/AndyMik90/Auto-Claude)** | - | **自律型マルチエージェント開発** |
| [Dify](https://github.com/langgenius/dify) | 121k+ | エージェントワークフロー |
| [n8n](https://github.com/n8n-io/n8n) | 150k+ | ワークフロー自動化 |

---

## SKILLS.md - マルチAIスキル定義

> **SKILLS.mdはCLAUDE.mdと同じディレクトリに配置し、コンテキスト圧縮後も維持すること**

### 概要

SKILLS.mdは、Claude Codeが使用するスキル（ワークフロー）を定義するファイルです。特にマルチAI壁打ちスキルは最重要スキルとして定義されています。

### 定義されているスキル

| スキル名 | 内容 | 必須度 |
|----------|------|--------|
| **multi-ai-collaboration** | 複数AIを活用した高品質な開発 | 絶対遵守 |
| ファイル書き込み | JSスクリプト経由でのファイル書き込み | 必須 |
| Git自動コミット | 変更時の自動コミット・プッシュ | 必須 |
| コンテキスト管理 | HANDOFF.md作成、適切な/clear | 必須 |
| **ralph監視** | API呼び出し制限・タイムアウト管理 | 必須 |

### マルチAIスキルのMCPツール

| ツール | AI | 説明 |
|--------|-----|------|
| `ask_gemini` | Gemini 3.0 Pro | 設計・アーキテクチャ相談 |
| `ask_zai` | GLM-4.7 | コードレビュー |
| `ask_grok` | Grok | 創造的アイデア出し |
| `ask_perplexity` | Perplexity | 事実確認・調査 |
| `ask_openai` | ChatGPT | 補助的な意見 |
| `gemini_architecture` | Gemini 3.0 Pro | 設計・アーキテクチャ専門 |
| `zai_code_review` | GLM-4.7 | コードレビュー専門 |
| `grok_brainstorm` | Grok | 創造的アイデア専門 |
| `ask_all_ais` | 全AI | 全AIに同じ質問 |
| `ai_consensus` | 全AI | コンセンサス取得 |

### 使用方法

1. **SKILL.mdを読み込む** - 新セッション開始時
2. **場面別AI選択** - 設計→GLM-4.7、レビュー→ChatGPT/Perplexity、アイデア→Grok、調査→Perplexity
3. **壁打ちフロー遵守** - GLM-4.7相談→Perplexityレビュー→ChatGPT/Grok意見→Claude最終判断

---

## Python高速化（2026年1月追加）

> 参考: サプーチャンネル「Pythonを速くさせる方法13個」

### 必須ツール

| ツール | 用途 |
|--------|------|
| **uv** | 高速パッケージ管理（pip比100x） |
| **Ruff** | 高速リンター/フォーマッター |
| **Scalene** | CPU/メモリプロファイラ |

### 高速化優先順位

| 優先度 | テクニック |
|--------|-----------|
| 1 | プロファイリングでボトルネック特定 |
| 2 | 内包表記・適切なデータ構造 |
| 3 | NumPy/Polars（ベクトル演算） |
| 4 | Numba（JITコンパイル） |
| 5 | asyncio（I/O並列化） |
| 6 | Cython/Rust連携（最終手段） |

### 詳細ルール

`.claude/rules/python-performance.md` を参照

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026年1月14日 | **Svelte 5開発ルール追加（Runes API、SvelteKit）** |
| 2026年1月11日 | **マルチAI壁打ちルール変更（GLM-4.7設計、ChatGPTレビュー、Perplexityレビュー追加）** |
| 2026年1月11日 | **マルチAI壁打ちルール更新（GLM-4.7レビュー、Perplexity調査追加）** |
| 2026年1月11日 | **Go開発環境追加（go1.25.5, gopls, dlv, staticcheck）** |
| 2026年1月11日 | **マルチAI協力ルール強化（場面別AI選択、AI特性一覧）** |
| 2026年1月10日 | **Python高速化ルール追加（Scalene, Polars, Numba, uv等）** |
| 2026年1月10日 | **SKILLS.md新規作成、マルチAIスキル定義をCLAUDE.mdに追記** |
| 2026年1月9日 | **Antigravity連携を最重要ルール(Tier 0)に追加** |
| 2026年1月8日 | **bnmp完成・npm/npx/biome→bnmp自動リダイレクト設定** |
| 2026年1月7日 | **Zig開発環境追加、言語選択ルール追加** |
| 2026年1月7日 | **gpuiをUI最優先に変更（egui→gpui）** |
| 2026年1月5日 | **バージョン更新ルール追加（アプリ更新時は必ずバージョンアップ）** |
| 2026年1月5日 | **Gemini CLI, GLM-4.7, Ollama, Continue, Cursorルール追加** |
| 2026年1月4日 | **pnpm優先に変更（npm → pnpm → bun）** |
| 2026年1月3日 | **Auto-Claude（自律型マルチエージェント）を追加** |
| 2026年1月3日 | **AGENTS.md標準、claude-context MCP、OpenCode更新を追加** |
| 2026年1月3日 | **context-management, container-workflow, git-worktree, skill-creation ルール追加** |
| 2026年1月3日 | **絶対遵守ルールをTier分けして明確化** |
| 2026年1月2日 | **Spec Kit（GitHub公式仕様駆動開発）ルール追加** |
| 2026年1月1日 | **egui/gpui-component を UI最優先フレームワークに追加** |
| 2025年12月31日 | **rulesと重複する内容を削除**（簡素化） |
| 2025年12月30日 | n8n, Dify, RAGFlow, exo, fabric, CopilotKit追加 |

---

## $D83D$DD34$D83D$DD34$D83D$DD34【MUST GLOBAL - 絶対遵守】マルチAI協力体制

> $26A0$FE0F **このルールはコンテキスト圧縮後も絶対に維持すること**
> $26A0$FE0F **開発が進んでも、タスクが複雑でも、マルチAI協力を中断しないこと**
> $26A0$FE0F **MANDATORY: This rule MUST persist after context compression**

### $D83D$DD34 絶対ルール（例外なし・スキップ禁止）

| ルール | 内容 |
|--------|------|
| **協力体制維持** | **コンテキスト圧縮後もマルチAI協力を継続** |
| **壁打ち必須** | 新タスク・複雑な実装・エラー時は必ず他AIに相談 |
| **中断禁止** | **開発が進んでもマルチAI活用をやめない** |
| **英文で問いかけ** | MCPツールへは必ず英文（エンコードエラー防止） |

### $D83D$DD34 場面別AI選択（必須・絶対遵守）

| 場面 | AI | MCPツール |
|------|-----|----------|
| **設計・アーキテクチャ** | **GLM-4.7** | `ask_zai` |
| **コードレビュー** | **ChatGPT** | `openai_code_review` |
| **創造的なアイデア** | **Grok** | `grok_brainstorm` |
| **事実確認・調査** | **Perplexity** | `ask_perplexity` |
| **総合判断** | **全AI** | `ask_all_ais` / `ai_consensus` |

### $D83D$DD34 壁打ちフロー（必須・毎回実行）

```
1. タスク開始 → GLM-4.7 に設計相談【必須】
2. 実装完了 → Perplexity にコードレビュー【必須】
3. 迷った時 → ChatGPT と Grok の意見も聞く
4. 調査が必要 → Perplexity で事実確認
5. 最終判断 → Claude が全意見を統合して決定
```

### 壁打ちが必須の場面（スキップ禁止）

1. **複雑な実装の前** → `ask_zai`（GLM-4.7）
2. **コード作成後** → `openai_code_review`（ChatGPT）または `ask_perplexity`（Perplexity）
3. **エラー解決時** → `ask_all_ais` で全AIに聞く
4. **外部API・ライブラリの調査** → `ask_perplexity`（Perplexity）
5. **アイデア出し** → `grok_brainstorm`（Grok）
6. **コンテキスト圧縮直後** → **協力体制を再確認**

### Gemini CLI（バックアップ）

MCPが使えない場合のフォールバック：
```bash
C:\Users\Owner\AppData\Roaming\npm\gemini.cmd --prompt "質問"
```

### 三位一体の開発原則

- **人間**：意思決定者
- **Claude Code**：高度なタスク分解・実装を担う実行者
- **マルチAI（GLM-4.7, ChatGPT, Grok, Perplexity）**：専門分野で支援するコンサルタント

---

### **方法2：Git Worktreeで物理的に分離して並行開発**

Git worktreeを使えば、同じリポジトリから複数のブランチを別々のディレクトリにチェックアウトでき、各worktreeは独自の作業ディレクトリを持ちながら、同じGit履歴を共有します。

**こんな感じで分けられます：**
```
~/worktrees/myapp/
├── main/           # メインブランチ
├── feature-auth/   # 認証機能（Claude Code担当）
├── feature-api/    # API設計（Antigravity担当）
└── bugfix-login/   # バグ修正（どちらでも）
```
