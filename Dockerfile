FROM node:18-alpine as desp-stage
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --no-progress

## buildを実行
FROM node:18-alpine as build-stage

WORKDIR /work

COPY . /work/

RUN yarn install --no-progress

RUN yarn build

## runtime環境を作成
FROM node:18-alpine as runtime-stage

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json yarn.lock ./
COPY --from=desp-stage /app/node_modules ./node_modules
COPY --from=build-stage /work/dist ./dist

## PID1問題に対応する
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

USER node

EXPOSE 4000

ENV NODE_ENV prod

CMD ["node", "dist/index.js"]
