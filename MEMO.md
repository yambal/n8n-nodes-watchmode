# n8n-nodes-starter

このリポジトリは、n8n 向けのカスタムインテグレーション（ノード）を作成し始めるための例と環境構成が含まれています。ノード用のリンターや各種依存関係も揃っており、開発のスタートに最適です。

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

If you would like your node to be available on n8n cloud you can also [submit your node for verification](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/).

## 必要環境（Prerequisites）

開発環境構築には以下が必要です

- [git](https://git-scm.com/downloads)
- Node.js と npm（最低 Node 20）。Linux / macOS / WSL では nvm（Node Version Manager） を推奨。Windows では Microsoft の公式ガイド参照
- n8n のインストール:
  ```
  npm install n8n -g
  ```
- 推奨：n8n の公式「開発環境セットアップガイド」に従う [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## スターターを使った開発手順

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) このテンプレートリポジトリから新しいリポジトリを作成
2. Clone your new repo:
   ```
   git clone https://github.com/<your organization>/<your-repo-name>.git
   ```
3. Run `npm i` to 依存パッケージをインストール.
4. エディタで開く.
5. `/nodes` または `/credentials` フォルダにあるサンプルを確認し、必要に応じてカスタマイズまたは置き換え
6. `package.json` の内容を自身のノード情報に書き換える.
7. Run `npm run lint` to check for errors or `npm run lintfix` to automatically fix errors when possible.
8. ローカルでノードをテスト. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. README を独自ノード用に書き換える. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. ライセンスファイル（LICENSE）も自分用に更新.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

ノード作成に関する詳細ドキュメントあり [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) .

---

# Memo

## ステップまとめ

### 前提：n8n のインストール

`npm install n8n -g`

#### 再インストール

なんだかおかしい時

```
npm uninstall n8n -g
```

- このあと、`~/.n8n`は削除する
- n8n をインストールする
- 起動すると`~/.n8n`が生成される

### 開発Cunstom Nodeプロジェクト直下で

```
npm run build
npm link
```

ソースコードを変更するたびに`npm run build`を実行すること

### ローカルn8nに開発したCustom Nodeをリンクする

#### 無ければ`~/.n8n/custom`を作成する

> チュートリアルでは ~/.n8n/custom 以外に、~/.n8n/nodes や任意フォルダを使う例も説明されているが、特に理由がなければ`~/.n8n/custom`を最初に使うのがシンプルで推奨通り。<br />
> 複数フォルダを使いたい／他の人と共有したい／特定の命名規則に従いたい等 → `N8N_CUSTOM_EXTENSIONS`を使ったカスタム配置も可能。

```
mkdir -p ~/.n8n/custom
npm init
```

#### リンクする

```
cd ~/.n8n/custom
npm link <your-package-name>
```

### 起動して確認する

```
n8n start
```

エディタでノード名で検索して動作確認

## Author Memo

- Genres
- Networks
- Search
- Sources
- Streaming Releases
- Title Details
- Title Streaming Sources
