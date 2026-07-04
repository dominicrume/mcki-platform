FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# Set working directory
WORKDIR /app
RUN pnpm install -g turbo
COPY . .
# Argument to specify which app we are building (web, education, ai, live)
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN turbo prune --scope=@mcki/${APP_NAME} --docker

FROM base AS installer
WORKDIR /app
# First install dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
# Then copy source code and build
COPY --from=builder /app/out/full/ .
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN pnpm turbo run build --filter=@mcki/${APP_NAME}

FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

ARG APP_NAME
ENV APP_NAME=${APP_NAME}
# Copy standalone output
COPY --from=installer /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Note: The standalone build puts the server.js file inside apps/[APP_NAME]/server.js
CMD node apps/${APP_NAME}/server.js
