FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN node scripts/verify-public.mjs dist/client
RUN node scripts/check-links.mjs dist/client
RUN npm prune --omit=dev

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321 KORA_DB_PATH=/data/kora.sqlite KORA_PRODUCTION=1
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/scripts ./scripts
RUN mkdir /data && chown node:node /data && chmod 700 /data
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
