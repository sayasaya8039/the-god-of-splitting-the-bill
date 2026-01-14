# 割り勘の神様 🧾✨

レシート画像をアップロードするだけで、AIが商品を読み取り、簡単に割り勘計算ができるWebアプリです。

## デモ

🌐 **本番環境**: [https://warikan-no-kamisama.sayasaya.workers.dev](https://warikan-no-kamisama.sayasaya.workers.dev)

## 特徴

| 機能 | 説明 |
|------|------|
| 📷 **レシートOCR** | Gemini Vision APIでレシート画像から商品名・価格を自動読取 |
| 📝 **ドロップダウン選択** | 各商品のドロップダウンから参加者を選ぶだけで簡単割り当て |
| 👥 **参加者管理** | 絵文字付きで参加者を追加・管理 |
| 💰 **1円単位の計算** | 正確な割り勘金額を自動計算 |
| 📋 **結果コピー** | ワンタップで結果をクリップボードにコピー |
| 📱 **モバイル対応** | スマホでレシートを撮影してそのまま使用可能 |

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| **フロントエンド** | SvelteKit 2 + Svelte 5 (Runes API) |
| **スタイリング** | Tailwind CSS |
| **OCR** | Google Gemini Vision API |
| **ホスティング** | Cloudflare Workers |
| **APIサーバー** | Hono |
| **言語** | TypeScript |

## 使い方

### 1. Gemini API Keyを取得

1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. 「Create API Key」をクリック
3. 取得したAPI Keyをアプリに設定

### 2. レシートをアップロード

1. 📷 ボタンをタップしてレシートを撮影 or 画像をドラッグ&ドロップ
2. AIが自動で商品名と価格を読み取り
3. 商品リストが表示される

### 3. 割り勘設定

1. 👥 タブに切り替え
2. 参加者を追加（絵文字で識別）
3. 各商品のドロップダウンから参加者を選択して割り当て
4. 各参加者の支払額が自動計算される

### 4. 結果を共有

- 📋 コピーボタンで結果をクリップボードにコピー
- LINEやメッセージアプリで共有

## ローカル開発

### 必要条件

- Node.js 20+ または Bun 1.3+
- pnpm または bun

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/sayasaya8039/the-god-of-splitting-the-bill.git
cd the-god-of-splitting-the-bill

# 依存関係をインストール
bun install
# または
pnpm install

# 開発サーバーを起動
bun run dev
# または
pnpm dev
```

### ビルド

```bash
bun run build
```

### デプロイ

```bash
# 本番環境にデプロイ
bun run deploy

# プレビュー環境にデプロイ
bun run deploy:preview
```

## プロジェクト構成

```
├── src/
│   ├── lib/
│   │   ├── components/       # Svelteコンポーネント
│   │   │   ├── ReceiptUploader.svelte  # レシートアップロード
│   │   │   ├── ItemList.svelte         # 商品リスト（ドロップダウン選択）
│   │   │   ├── ParticipantCard.svelte  # 参加者カード
│   │   │   ├── AddParticipant.svelte   # 参加者追加
│   │   │   └── ResultSummary.svelte    # 割り勘結果
│   │   ├── utils/            # ユーティリティ
│   │   ├── stores.svelte.ts  # 状態管理（Runes）
│   │   └── types.ts          # 型定義
│   └── routes/               # ページルーティング
│       ├── +page.svelte      # メインページ
│       └── +layout.svelte    # レイアウト
├── workers/
│   └── index.ts              # Hono APIサーバー
├── static/                   # 静的ファイル
├── wrangler.toml             # Cloudflare Workers設定
└── package.json
```

## ライセンス

MIT License

## 作者

[@sayasaya8039](https://github.com/sayasaya8039)