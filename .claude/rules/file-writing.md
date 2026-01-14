---
paths: "**/*"
alwaysApply: true
---

# ファイル書き込みルール（必須）

## 重要：Write/Editツールは直接使用禁止

Write/Editツールを直接使用するとエスケープエラーが頻発し、トークンの無駄になる。
**必ず以下の方法を使用すること。**

---

## ツール選択ガイド

| 状況 | 推奨ツール | 理由 |
|------|-----------|------|
| **通常のファイル書き込み** | safe-write | シンプル・高速 |
| **特殊文字を含むコード** | sw-b64 / safe_write_b64.py | Base64で完全回避 |
| **超長ファイル（1000行+）** | safe_write_b64.py lines | 行単位処理 |
| **stdin経由で書き込み** | sw-stdin | シェル完全回避 |
| **safe-write失敗時** | Python heredoc | フォールバック |

---

## 方法1: safe-write コマンド（推奨）

**グローバルコマンド:** safe-write（PATHに登録済み）

### 基本コマンド

| コマンド | 説明 |
|----------|------|
| safe-write write file content | ファイル書き込み |
| safe-write append file content | ファイル追記 |
| safe-write replace file old new | 文字列置換（1回） |
| safe-write replace-all file old new | 文字列全置換 |

### オプション

| オプション | 説明 |
|------------|------|
| --backup | 変更前にバックアップ作成 |
| --add-bom | UTF-8 BOMを追加 |

---

## 方法2: safe_write_b64.py（特殊文字対応）

**パス:** C:/Users/Owner/.local/bin/safe_write_b64.py

Base64エンコードにより特殊文字問題を**完全回避**。

### CLI コマンド

| コマンド | 説明 |
|----------|------|
| python safe_write_b64.py write path content | ファイル書き込み |
| python safe_write_b64.py replace path old new | 文字列置換 |
| python safe_write_b64.py replace path old new --all | 全置換 |
| python safe_write_b64.py append path content | 追記 |
| python safe_write_b64.py b64write path b64 | Base64直接書き込み |
| python safe_write_b64.py lines path | 行単位書き込み（stdin） |

### Python直接インポート（推奨）



### 特徴

- **原子的操作**: 一時ファイル→リネームで安全
- **検証付き**: 書き込み後に内容を検証
- **特殊文字完全対応**: Base64エンコードで問題回避
- **超長ファイル対応**: linesコマンドで行単位処理

---

## 方法2a: sw-b64（BATラッパー）

**パス:** C:/Users/Owner/.local/bin/sw-b64.bat

safe_write_b64.pyをBase64経由で呼び出すラッパー。

### 使用方法

```bash
# ファイル書き込み
sw-b64 write path/to/file.txt "内容"

# 文字列置換
sw-b64 replace path/to/file.txt "old" "new"
```

---

## 方法2b: sw-stdin（stdin方式）

**パス:** C:/Users/Owner/.local/bin/sw-stdin.bat

subprocess.runのinput引数でシェルを完全にバイパス。

### Python呼び出し例

```python
import subprocess
content = """特殊文字も安全: $var `cmd`"""
subprocess.run(["sw-stdin", "write", "file.txt"], input=content, text=True)
```

---

## 方法3: Python heredoc（フォールバック）

safe-write/safe_write_b64.pyが使えない場合のフォールバック。

### 書き込み



---

## 禁止事項

| 禁止 | 理由 |
|------|------|
| Editツール直接使用 | エスケープエラー頻発 |
| Writeツール直接使用 | 特殊文字で失敗 |
| cat << EOF heredoc | シェル変数展開問題 |
| echo > リダイレクト | 特殊文字問題 |
| sed -i 直接使用 | バックアップなし・エラー多発 |

---

## 許可される方法

| 方法 | 優先度 | 用途 |
|------|--------|------|
| safe-write | 最優先 | 通常のファイル操作 |
| safe_write_b64.py | 高 | 特殊文字・長大ファイル |
| Python heredoc | 中 | フォールバック |
| JSスクリプト | 低 | レガシー環境 |

---

## トラブルシューティング

### エラー: File has been unexpectedly modified

**原因**: Windows環境でのファイルパス問題
**解決策**: 相対パスを使用する、またはsafe_write_b64.pyを使用する

### エラー: SyntaxError (unterminated string literal)

**原因**: 特殊文字のエスケープ失敗
**解決策**: safe_write_b64.pyを使用する

### エラー: UnicodeEncodeError

**原因**: Windows端末のエンコーディング問題
**解決策**: CLIではなくPython直接インポートを使用する

---

## まとめ

1. **通常**: safe-write コマンドを使用
2. **特殊文字**: safe_write_b64.py を使用
3. **超長ファイル**: safe_write_b64.py lines を使用
4. **失敗時**: Python heredoc でフォールバック
5. **Write/Editツール直接使用は禁止**
