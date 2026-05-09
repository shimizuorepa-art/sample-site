# 業務改善サンプルサイト

タニコー応募書類の補足として使う、統合サンプルサイトです。

## 構成

- `index.html`: 統合トップページ
- `demos/admin_standardization/`: 事務手順標準化サンプル
- `demos/daily_operations_dashboard/`: 日々の業務管理システムサンプル。スマホ報告、選択式計画、分析画面をつなげる試作
- `demos/price_check/`: 価格表・帳票確認サンプル
- `demos/sales_support_dashboard/`: 営業支援実績ビュー
- `demos/order_system/`: 受発注システム電子化サンプルの入口。管理者画面、発注フォーム、注文履歴へ遷移
- `demos/foreign_staff_database/`: 人員管理台帳サンプルの入口。実画面は `app.html`

## Vercel公開

このフォルダをGitHubへアップし、Vercelでプロジェクト化すれば、ルートURLの `index.html` から全サンプルを確認できます。

ビルドコマンドは不要です。Framework PresetはOther、Output Directoryは空欄のままで問題ありません。

## 注意

価格表・帳票確認、受発注システム電子化、営業支援実績ビュー、人員管理台帳は、実務の中で実際に制作した画面や資料をもとに、サンプルとして加工・簡素化し、社名、場所名、数値などをサンプルデータへ差し替えています。実顧客情報、実価格、現職の機密情報は含めない前提です。
