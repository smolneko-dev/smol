FROM node:19-alpine as deps
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile --shamefully-hoist

FROM node:19-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm run build

FROM node:19-alpine as runner
WORKDIR /output
COPY --from=builder --chown=node:node /app/.output ./
USER node

ENTRYPOINT [ "node", "./server/index.mjs" ]
