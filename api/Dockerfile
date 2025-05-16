FROM node:18-alpine
WORKDIR /app

COPY api/package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY common/ ./common/
COPY api/src/ ./src/

EXPOSE 3000
CMD ["npx", "ts-node", "--project", "tsconfig.json", "src/server.ts"]
