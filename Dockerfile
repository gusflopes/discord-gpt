FROM node:18-alpine AS BUILDER

WORKDIR /app

# Bundle APP files
COPY src src/
COPY package.json .
COPY package-lock.json .
COPY ecosystem.config.cjs .
COPY tsconfig.json .

RUN npm install
RUN npm run build

# Estágio 02
FROM keymetrics/pm2:18-alpine

WORKDIR /app

# Bundle APP files

# Verificar se precisa ajustar aqui
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/ecosystem.config.cjs ./ecosystem.config.cjs

# Setar variáveis de ambiente
ENV NODE_ENV=production \
  DISCORD_APP_ID=${DISCORD_APP_ID} \
  DISCORD_PUB_KEY=${DISCORD_PUB_KEY} \
  DISCORD_TOKEN=${DISCORD_TOKEN} \
  PERMISSION=${PERMISSION} \
  OPENAI_API_KEY=${OPENAI_API_KEY}

# Setar variáveis de ambiente do New Relic
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --only=production --omit-dev

# Expose the listening port of your app
# EXPOSE 8000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs" ]