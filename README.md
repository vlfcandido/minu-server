# API-MINU Server Template

## Instruções

1. Copie `.env.example` para `.env` e preencha as variáveis.
2. `npm install`
3. `docker compose down -v`
4. `docker compose up -d db`
5. Aguarde logs do db até "ready to accept connections".
6. `docker compose up --build`
7. Monitore logs: `docker compose logs -f fetcher`, `docker compose logs -f api`
8. Teste endpoint:  
   ```
   curl http://localhost:3000/brazer/messages?since=2025-05-01T00:00:00Z
   ```
