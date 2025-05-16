FROM node:18-alpine
WORKDIR /app

COPY fetcher/package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY common/ ./common/
COPY fetcher/src/ ./src/

CMD ["npx", "ts-node", "--project", "tsconfig.json", "src/fetcher.ts"]
