# DEEP SEA LAB (深海ラボ) MVP

深海研究施設の「生活区」「制御室」を切り替えながら、研究員との会話を楽しめる 1 ページ構成のフロントエンド MVP です。

## セットアップ

```bash
npm install
npm run dev
```

- 開発サーバー: `http://localhost:5173`
- ビルド: `npm run build`
- プレビュー: `npm run preview`

## 仕様

- Vite + Vanilla JavaScript + CSS のみで構成
- 生活区/制御室の背景切り替え（フェード演出付き）
- 研究員 A/B/C のドット絵タップでキャラ色付き吹き出し会話（数秒で自動消去）
- 研究員タップ時に下部会話ボックスも更新
- 半透明ガラス風 UI + 青い発光演出
- 軽量な水中ゆらぎ/反射エフェクト
- `/public/assets/` が空でも、SVG プレースホルダーで表示可能

## ディレクトリ構成

```text
.
├── .github/workflows/
│   └── deploy-pages.yml
├── public/
│   └── assets/
│       ├── characters/
│       │   └── .gitkeep
│       ├── logo/
│       │   └── .gitkeep
│       └── maps/
│           └── .gitkeep
├── src/
│   ├── main.js
│   ├── style.css
│   └── world-data.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> 画像素材は `/public/assets/` 配下へ手動配置してください。未配置時はプレースホルダー表示になります。

## GitHub Pages での公開手順

1. このリポジトリを GitHub に push します（`main` または `work` ブランチ）。
2. GitHub の **Settings > Pages** を開き、**Build and deployment** の Source を **GitHub Actions** に設定します。
3. Actions タブで `Deploy to GitHub Pages` ワークフローが実行されると、自動で build/deploy されます。
4. 初回デプロイ完了後、公開 URL が発行されます。

### 公開URLの確認方法

- GitHub の **Actions** タブで `Deploy to GitHub Pages` の最新実行を開く
- `deploy` ジョブの `Deploy to GitHub Pages` ステップに表示される `page_url` を確認
- もしくは **Settings > Pages** の「Your site is live at ...」から確認

> 公開URLは通常 `https://<GitHubユーザー名>.github.io/DEEP-SEA-LAB/` 形式です。


## マージ運用メモ（競合を起こしにくくするため）

- `src/world-data.js` は「定数定義 → `makeCharacter` → `CHARACTERS`」の順で統一しています。
- キャラ情報を変更するときは `CHARACTER_SPRITE_PATH` / `TAP_SPEECH` / `CHARACTERS` の3箇所だけ編集してください。
- 競合解消時に `Accept both changes` を使う場合は、`src/main.js` と `src/style.css` の吹き出しブロックが重複していないか必ず確認してください。

## 画像差し替え方法

### 1) 背景画像

`src/world-data.js` の `ROOMS` を編集します。

```js
const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

living: {
  background: asset('maps/living-room.png'),
}
```

### 2) キャラ画像・立ち位置

`src/world-data.js` の `CHARACTERS` を編集します。

```js
{
  id: 'researcherA',
  sprite: asset('characters/researcher-a.png'),
  position: { left: '18%', top: '55%' },
}
```

### 3) セリフ

`src/world-data.js` の `DIALOGS` を編集します。各キャラごとに複数行を配列で管理しています。

## 拡張しやすいポイント

### 部屋追加

1. `ROOMS` に新しい部屋オブジェクトを追加
2. `CHARACTERS` に同じキーでキャラ配置を追加
3. `index.html` にメニューボタンを追加（`data-room` を一致させる）

### キャラ追加

1. `CHARACTERS.<room>` にキャラ定義を追加
2. `DIALOGS` に `id` と同名キーでセリフ配列を追加

### 移動機能追加（将来）

- `main.js` の `switchRoom` と `renderCharacters` は分離済みなので、
  次段階で「クリック移動」「ルート遷移」「マップ内ホットスポット」への拡張が容易です。
- `world-data.js` に `links` や `hotspots` を追加して、部屋遷移のデータ駆動化が可能です。
