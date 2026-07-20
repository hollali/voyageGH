FROM node:20-alpine AS base
ENV NODE_ENV=production

FROM base AS development-dependencies-env
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci

FROM base AS production-dependencies-env
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM base AS build-env
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY . /app/
WORKDIR /app
RUN npm run build

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/.next /app/.next
COPY --from=build-env /app/public /app/public
COPY --from=build-env /app/package.json /app/package.json

WORKDIR /app
USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "run", "start"]
