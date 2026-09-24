# 神戸天空 Vercel確認用パッケージ

2026-09-24 / WordPress移植パッケージv2.0.0から変換

HTML・CSS・JavaScript・画像・動画だけで動く、見た目と操作の確認用です。PHP・WordPress・データベース・ビルド・環境変数は不要です。メールは表示とリンクともに info@kobetenku.com です。公開作業は実施していません。

## Vercelへの配置

1. ZIPを展開します。
2. 展開した `kobe-tenku-vercel-preview` フォルダの中身（vercel.jsonとpublicを含む）をGitリポジトリのルートへ入れます。
3. Vercelでそのリポジトリを新規プロジェクトとしてインポートします。
4. Root Directoryをvercel.jsonがある階層に設定します。Framework PresetはOther、Build CommandとInstall Commandは空、Output Directoryはpublicです。同梱vercel.jsonに設定済みです。
5. DeployするとVercelが発行する *.vercel.app のURLで確認できます。独自ドメインの設定は不要です。

Vercel CLIを利用する場合は、このフォルダを作業ディレクトリにして `npx vercel` を実行します。初回はログインとプロジェクト作成の案内に従います。ZIP自体をテーマとしてインストールするものではありません。

## 内容

- vercel.json：静的公開設定と検索除外ヘッダー
- public/index.html：新トップ
- public/assets/kobe-tenku/：CSS 6点、JS 2点、画像・動画33点
- public/robots.txt：noindexをクローラーが取得できるようクロールは許可

## 動作と確認事項

- メニュー、スクロール演出、地図カード、動画などを引き継いでいます。
- グランピング、日帰り、FAQへのリンクは https://kobetenku.com/ 以下の既存本番ページへ移動します。Vercel内に既存ページは複製していません。
- 素材はVercel上の同梱ファイルを読み込みます。仮WordPress環境やローカルPCには依存しません。
- HTMLのrobotsメタとHTTPのX-Robots-Tagでnoindex,nofollowを指定しています。検索除外はアクセス制限ではありません。URLを知っている人が閲覧できる確認用サイトです。
- WordPressのSEO・解析・キャッシュプラグイン、既存テーマとの互換性をこの版で検証することはできません。WordPress用ZIPは別途保管してください。
- PC/SPで動画・画像、メニューの開閉、地図9地点のカード、スクロール、既存ページへのリンクを確認してください。

## 実施した検証

HTMLのローカル参照、CSSの画像参照、JSの動的地図画像、ページ内リンク、ID重複、メールアドレス、PHP残存の有無、JavaScript構文、素材の元ZIPとの一致、完成ZIPのCRCを検査しています。
実ブラウザーでのPC/SP操作確認とVercelへのデプロイは未実施です。

設定の参考： https://vercel.com/docs/project-configuration/vercel-json
