# 芦ノ湖 GT · コースデータ

[English](README.md) · [日本語](README.ja.md)

[KUROTORA DRIVE](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive)から独立して管理するコースパックです。約25.03 kmの経路・風景・植生・schema・出典・描画エンジン非依存のデータ契約を収録しています。車体、操作、走行物理、公開ゲームはゲーム用リポジトリが担当します。

![Blenderで制作した芦ノ湖コースの試写](docs/assets/blender-course-preview.png)

*Blender制作モデルの試写です。実ゲームのスクリーンショットではありません。ブラウザの材質・LODは異なり、実ゲーム3D描画とFPSは未検証です。*

## 📦 リポジトリと版

- コース正本：[ashinoko-course-data](https://github.com/Sunwood-ai-labs/ashinoko-course-data)、パック4.0.0、schema 1
- ゲーム本体：[ashinoko-kurotora-drive](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive)
- 遊ぶ：[GitHub Pagesゲーム](https://sunwood-ai-labs.github.io/ashinoko-kurotora-drive/)
- ゲームは全ファイルのSHA-256を固定した、レビュー済みのコピーを同梱します。コース側の更新だけで公開ゲームが変わることはありません

## 🚀 検証とexport

Node.js 22以上を使用します。検証にnpmパッケージのインストールやネットワーク通信は不要です。

```sh
git clone https://github.com/Sunwood-ai-labs/ashinoko-course-data.git
cd ashinoko-course-data
npm test
npm run release:export -- ../ashinoko-course-export
```

新しい空のexport先を指定してください。完全exportには32の固定資源と `course-release.json` が含まれ、圧縮転送前で約98.3 MBです。契約・schema・権利・出典を含み、車体・描画エンジンは含みません。既存パックをまとめ直す機能で、Blender原形状の再生成機能ではありません。

## 🔁 ゲームへ取り込む

両リポジトリを隣同士にcloneし、ゲーム側で実行します。

```sh
npm run course:import -- --source ../ashinoko-course-data
npm test
```

既定では固定済みの同一版だけを取り込みます。内容をレビューして新しい版へ更新する場合は `npm run course:import -- --source ../ashinoko-course-data --accept-update`、続けて `npm run checksums` と `npm test` を実行し、同梱データとlockを一緒にcommitします。取込はローカルファイルだけを読み、改変・危険なパスを拒否します。取込コードそのものは実行しません。[更新手順](docs/MAINTENANCE.md)を参照してください。

## 🧭 データ契約

10,016点からなる全長25,031.460 mの閉ループ、209,834件の植生配置、manifestから参照する24資源を収録しています。単位はメートル。経路・配置はlocal Z-up、GLBはglTF Y-up、描画への変換は `[x, z, -y]` です。Meshopt圧縮を含むGLBは外部ファイルに依存しません。

- [構成と所有範囲](docs/ARCHITECTURE.md)
- [データの出典・精度・権利](docs/DATA.md)
- [検証・更新・ロールバック](docs/MAINTENANCE.md)
- [検証の限界](docs/VERIFICATION.md)
- [リポジトリ整備記録](docs/REPOSITORY_POLISH.md)

詳細ガイドは日本語です。日英READMEは同じ利用手順と制約を説明しています。

## ✅ 検証と制約

`npm test` はデータ契約・資産チェックサム・release一覧・ローカル文書リンクを検査します。CIはNode 22/24で検証し、確認用artifactをexportします。これだけで実描画・モバイル性能・ブラウザ操作の品質を保証するものではありません。

分離前の履歴は元のゲームリポジトリに残ります。[PROVENANCE.json](PROVENANCE.json)に分離元commitを記録しています。原Blenderファイルと地図・DEMの完全な作業セットは含まず、一部の取得情報は不明です。芸術的な再構成であり、ナビゲーション・測量・安全判断には使えません。

## 📄 権利と貢献

© OpenStreetMap contributors / ODbL、国土地理院の出典と条件を維持しています。原コード・制作資産に新たな包括的ライセンスは付けていません。再利用・変更前に[LICENSE.md](LICENSE.md)、[変更の提案](CONTRIBUTING.md)、[安全性](SECURITY.md)を確認してください。
