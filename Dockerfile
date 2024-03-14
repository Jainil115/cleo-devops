FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --production
# --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY .env ./.env
# Expose environment variables from .env file
ENV $(cat .env | grep -v ^# | xargs)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD [ "npm", "run", "start" ]

