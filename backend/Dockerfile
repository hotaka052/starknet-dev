# ベースとなるイメージを指定
FROM node:18-alpine

# curlとgitのインストール
RUN apk update && \
    apk add --no-cache curl git ncurses

# starkliのインストール
RUN curl https://get.starkli.sh | sh
ENV PATH="/root/.starkli/bin:${PATH}"

# Scarbのインストール
ENV PATH="/root/.local/bin:${PATH}"
RUN curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# # starknetのアカウント情報へのパス
# ENV STARKNET_ACCOUNT=/root/.starkli-wallets/deployer/account.json
# ENV STARKNET_KEYSTORE=~/.starkli-wallets/deployer/keystore.json

# # アカウント情報をDocker内にコピー
# COPY argent/account.json /root/.starkli-wallets/deployer/account.json
# COPY argent/keystore.json /root/.starkli-wallets/deployer/keystore.json

# node_modulesのインストール
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

# ts-nodeへのパスを追加
ENV PATH="/workspaces/node_modules/.bin":$PATH