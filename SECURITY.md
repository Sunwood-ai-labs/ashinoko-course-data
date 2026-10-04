# Security / 安全性

This repository supplies data and a data contract. Import only reviewed releases into the game. SHA-256 verifies equality with a reviewed snapshot; it does not establish that an unknown author or asset is trustworthy.

Do not submit credentials, private paths, personal data or exploit payloads containing sensitive information in public issues. Report a reproducible, minimal, redacted description through the repository's private security reporting facility when available. If it is unavailable, request a private reporting channel without publishing the vulnerability details.

任意URLからのパック読込や、外部コードの自動実行は提供していません。ゲームの取込ツールは危険なpath、車体ファイル上書き、symlink、ハッシュ不一致を拒否します。公開前にはPR差分と出典・権利も確認してください。
