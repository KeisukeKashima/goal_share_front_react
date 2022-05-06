# dockerのマルチステージビルドを利用し、資材作成用のnodeコンテナでdistを作成し、nginxにデプロイする
# ビルド環境
FROM node:lts-alpine as build-stage
# docker-compose or タスク定義などから環境を渡す
ARG APP_ENV_PARAM

WORKDIR /app
# Dockerfileのビルド時にキャッシュを使えるように変更の少ないpackage.jsonを先にnpm installしておく
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
# 静的ホスティング用資材作成
RUN npm run build:$APP_ENV_PARAM

# 実行環境
FROM nginx:stable-alpine as production-stage
# npm run build時にnext exportしていて、それによりvueでいうdistにあたるoutディレクトリが作成されるので、それをドキュメントルートにコピー
COPY --from=build-stage /app/out /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf.template
EXPOSE 80
CMD /bin/sh -c "envsubst '\$API_DOMAIN' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
