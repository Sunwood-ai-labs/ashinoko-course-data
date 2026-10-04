# コースの構成と所有範囲

- `assets/`：manifest、ルート、風景GLB、植生ライブラリと配置、チェックサム
- `schemas/`：schema 1のJSON契約
- `course-loader.mjs`：描画・車体・入力に依存しない契約検証と読込API
- `PROVENANCE.json` / `LICENSE.md`：分離元と権利の記録
- `course-release.json`：ゲームへ取り込む32ファイルのSHA-256・サイズ・版
- `scripts/`：パック検証、契約テスト、完全export、文書検査

ゲーム側はこのrepoを正本として取り込み、`course.lock.json` でrelease一覧自体と各ファイルのハッシュを固定します。`PROVENANCE.json` と `LICENSE.md` はゲーム配布時に `assets/course-origin.json` と `assets/course-license.md` へ配置されます。コース契約とschemaはゲームへ同梱する固定コピーで、編集はここを起点にします。

コースの更新と公開ゲームの更新は別操作です。任意URLからの動的読込は行わず、ゲームの配信元に同梱するためCORS・外部CDN・通信中のupstream変更に依存しません。clone後はローカルHTTPサーバーだけで起動できます。オフラインでの再訪を保証するService Worker/PWAではありません。

経路・配置はlocal Z-up、GLBはglTF Y-up、単位はm。変換は `[x, z, -y]` です。道路幅7m、推奨開始距離1250m、既に適用済みの路面高補正+.14mと描画用lift .014mを二重適用しないでください。

4.0.0は元の配布データをそのまま抽出しています。新規repoへ履歴を偽造せず、[分離元commit](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive/tree/cb3914e4f81227be7a5b3b1e0a76adbb44a0e241)とハッシュで来歴を示します。
