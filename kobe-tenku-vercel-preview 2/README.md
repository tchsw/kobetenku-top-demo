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
- public/assets/kobe-tenku/：CSS 6点、JS 2点、画像32点・動画2点
- public/robots.txt：noindexをクローラーが取得できるようクロールは許可

## 動作と確認事項

- メニュー、スクロール演出、地図カード、動画などを引き継いでいます。
- グランピング、日帰り、FAQへのリンクは https://kobetenku.com/ 以下の既存本番ページへ移動します。Vercel内に既存ページは複製していません。
- 素材はVercel上の同梱ファイルを読み込みます。仮WordPress環境やローカルPCには依存しません。
- HTMLのrobotsメタとHTTPのX-Robots-Tagでnoindex,nofollowを指定しています。検索除外はアクセス制限ではありません。URLを知っている人が閲覧できる確認用サイトです。
- WordPressのSEO・解析・キャッシュプラグイン、既存テーマとの互換性をこの版で検証することはできません。WordPress用ZIPは別途保管してください。
- PC/SPで動画・画像、メニューの開閉、地図9地点のカード、スクロール、既存ページへのリンクを確認してください。

## 実施した検証

HTMLのローカル参照、CSSの画像参照、JSの動的地図画像、ページ内リンク、ID重複、メールアドレス、PHP残存の有無、JavaScript構文、変換後の素材デコード、完成ZIPのCRCを検査しています。
実ブラウザーでのPC/SP操作確認とVercelへのデプロイは未実施です。

設定の参考： https://vercel.com/docs/project-configuration/vercel-json


## 2026-09-24 軽量版の変更

- 画像合計：25.81 MB → 4.48 MB（約83%削減）。WebP形式へ変換し、表示用途に合わせて解像度を調整しました。
- PC動画：6.74 MB → 3.29 MB（約51%削減）。1920×1080を維持し、24fpsで再圧縮しています。
- スマートフォン動画：0.88 MB（元動画比約87%削減）。幅767px以下で960×540版を選択します。元と同じ横長構図を維持しています。
- MP4の再生情報を先頭に配置し、ダウンロード完了前に再生開始しやすくしています。
- 冒頭のポスター画像を優先読込。ヘッダーと冒頭ロゴ以外の画像は遅延読込します。
- メールアドレス、地図9地点、既存本番へのリンクは維持しています。

## すでに公開済みの場合の差し替え

前のフォルダと同じ `kobe-tenku-vercel-preview` 構成です。展開したフォルダを前回と同じGitHubリポジトリの同じ場所へアップロードし、変更をコミットしてください。Root Directoryは `kobe-tenku-vercel-preview`、Output Directoryは `public` のままです。
`public/index.html`、CSS、JS、画像・動画を一緒に更新してください。古いPNG/JPGとhero-fv.mp4がGitHubに残っても新しいページからは参照しません。後で不要ファイルを削除できます。
Git連携で自動デプロイされない場合はVercelで最新コミットを再デプロイしてください。設定だけを変える必要はありません。

## 確認した範囲

画像のデコード、素材参照、JS構文、MP4全編のデコード、再生情報の先頭配置、代表画像と動画フレームの比較を確認しています。
容量はファイルの実測値です。回線や端末ごとの表示時間・画質は実際のVercel公開先で確認してください。特にスマートフォンの山並み・地図の文字、動画の自動再生を確認してください。自動再生が端末の省電力設定等で許可されない場合はポスターが表示されます。
この更新版のアップロード・公開・公開先での速度計測は行っていません。
