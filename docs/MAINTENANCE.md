# 更新・検証・取り込み

## コースを変更する

1. 元のcommit、パック版、対象データ、出典、権利を確認する
2. 元制作環境で資産を更新し、schema・座標・見た目・精度を検査する
3. 内容をレビューして `assets/course-manifest.json`、`package.json`、`PROVENANCE.json` の版と説明を揃える。互換性が変わるならschema版も変更し、ゲーム側の対応を確認する
4. `npm run course:checksums`、`npm run release:checksums`、`npm test` を実行する
5. 差分とファイルサイズをレビューし、元データ・秘密・ログ・依存物の混入を防ぐ
6. コースrepoでcommit/CIを確認した後、別途ゲーム側で取り込む

チェックサムの再作成は品質の検証ではありません。データ変更を先に確認してください。100 MiB以上のファイルは通常のGitHub commitへ入れず、現在のブラウザ配布資産は1ファイル25 MiB未満に保ちます。既存の約98.3 MBは意図した実行用データです。原Blenderや制作動画はここへ追加しません。

## 完全なパックを書き出す

```sh
npm test
npm run release:export -- ../ashinoko-course-export
```

新しい空フォルダーへ32資源とrelease一覧をexportします。assetのみの旧exportとは違い、契約・schema・出典・権利を含みます。生成元geometryを作り直す機能ではありません。

## ゲームへ取り込む

[ゲームrepo](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive)で、内容をレビュー後に実行します。

```sh
npm run course:import -- --source ../ashinoko-course-data --accept-update
npm run checksums
npm test
npm start
```

exportしたフォルダーも `--source` へ指定できます。`--accept-update` を省くと現在のlockと同一のreleaseだけを許可します。取込前に全ソースのSHA-256とサイズ、版、path、symlinkを検査します。新しいコース契約コードを取込中には実行しません。取込後のテスト実行前にもコードの変更をレビューしてください。

取込でI/Oエラーが出た場合、公開せず、作業差分を確認して同じ検証済みの取込を再実行します。lockと配布チェックサム検査が不一致のままCIを通す運用はしません。旧snapshotだけにあったデータは自動削除しないため、不要ファイルの削除は別途差分レビューします。

## CIとロールバック

PRとmainへのpushでNode 22/24の検証を実行します。CIは読み取り権限のみで、ゲーム配信は行いません。検証したパックをartifactとして14日間保持します。長期配布の正本はcommitされたrepositoryです。

問題があれば元データ・manifest・checksum・release一覧を同じ版へrevertし、CIを確認します。ゲーム側も同梱snapshotとlockを一緒に戻します。共有mainのforce pushや元履歴の削除はしません。
