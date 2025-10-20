# Deployment Guide

Hướng dẫn deploy Zuno Marketplace Indexer lên production

## 📋 Checklist Trước Khi Deploy

- [ ] Database PostgreSQL đã được setup
- [ ] Environment variables đã được cấu hình
- [ ] RPC endpoints đã sẵn sàng (Alchemy/Infura)
- [ ] Contracts đã được deploy trên mạng target
- [ ] ABIs đã được đăng ký trên Zuno API

## 🚀 Deploy trên VPS/Server

### 1. Cài đặt Dependencies

```bash
# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# pnpm
npm install -g pnpm

# PostgreSQL
sudo apt-get install postgresql postgresql-contrib
```

### 2. Setup PostgreSQL

```bash
# Tạo database
sudo -u postgres createdb zuno_indexer

# Tạo user
sudo -u postgres psql
postgres=# CREATE USER zuno_user WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE zuno_indexer TO zuno_user;
postgres=# \q
```

### 3. Clone & Install Project

```bash
git clone <your-repo-url>
cd zuno-marketplace-indexer
pnpm install
```

### 4. Configure Environment

```bash
cp .env.example .env
nano .env
```

```env
DATABASE_URL="postgresql://zuno_user:your_password@localhost:5432/zuno_indexer"

ZUNO_API_URL="https://zuno-marketplace-abis.vercel.app/api"
ZUNO_API_KEY="your_api_key"

# RPC URLs (Alchemy/Infura)
PONDER_RPC_URL_1="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
PONDER_RPC_URL_137="https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY"
PONDER_RPC_URL_8453="https://base-mainnet.g.alchemy.com/v2/YOUR_KEY"

PORT=42069
PONDER_LOG_LEVEL="info"
```

### 5. Build & Start

```bash
# Build
pnpm build

# Start với PM2
pnpm global add pm2
pm2 start "pnpm start" --name zuno-indexer

# Monitor
pm2 logs zuno-indexer
pm2 monit
```

### 6. Setup Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name indexer.yourdomain.com;

    location / {
        proxy_pass http://localhost:42069;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/zuno-indexer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Setup SSL với Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d indexer.yourdomain.com
```

## ☁️ Deploy trên Railway

### 1. Connect Repository

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository

### 2. Add PostgreSQL Service

1. Click "New" → "Database" → "PostgreSQL"
2. Railway will auto-generate `DATABASE_URL`

### 3. Configure Environment Variables

Add trong Railway dashboard:

```env
ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
ZUNO_API_KEY=your_api_key
PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PORT=42069
```

### 4. Deploy

- Railway sẽ tự động detect `pnpm` và run `pnpm start`
- Domain sẽ được generate tự động: `your-project.up.railway.app`

## 🐳 Deploy với Docker

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 42069

# Start
CMD ["pnpm", "start"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  indexer:
    build: .
    ports:
      - "42069:42069"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/zuno_indexer
      - ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
      - ZUNO_API_KEY=${ZUNO_API_KEY}
      - PONDER_RPC_URL_1=${PONDER_RPC_URL_1}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=zuno_indexer
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### 3. Deploy

```bash
docker-compose up -d
docker-compose logs -f indexer
```

## 📊 Monitoring & Logs

### PM2 Monitoring

```bash
pm2 status
pm2 logs zuno-indexer
pm2 monit
```

### Database Monitoring

```bash
# Connection count
psql -U zuno_user -d zuno_indexer -c "SELECT count(*) FROM pg_stat_activity;"

# Table sizes
psql -U zuno_user -d zuno_indexer -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC LIMIT 10;"
```

### Health Checks

```bash
# API Health
curl http://localhost:42069/health

# Database Health
curl http://localhost:42069/api/stats

# GraphQL Health
curl -X POST http://localhost:42069/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'
```

## 🔧 Troubleshooting

### Indexer không kết nối được Database

```bash
# Check connection
psql $DATABASE_URL

# Check permissions
psql -U postgres -c "\du"
```

### Indexer không fetch được contracts

```bash
# Test API connection
curl -H "x-api-key: $ZUNO_API_KEY" \
  https://zuno-marketplace-abis.vercel.app/api/contracts
```

### RPC Rate Limiting

- Sử dụng multiple RPC providers
- Implement retry logic
- Consider paid plan (Alchemy Pro)

### Database Performance

```sql
-- Add indexes
CREATE INDEX CONCURRENTLY idx_trades_timestamp ON trade(block_timestamp DESC);
CREATE INDEX CONCURRENTLY idx_tokens_owner ON token(owner);

-- Vacuum
VACUUM ANALYZE;
```

## 📈 Scaling

### Horizontal Scaling

- Deploy multiple indexer instances
- Use load balancer (Nginx/HAProxy)
- Share PostgreSQL database

### Database Optimization

- Setup read replicas
- Implement connection pooling (PgBouncer)
- Archive old data

### Caching Layer

- Add Redis for API caching
- Cache frequently accessed queries
- Implement CDN for static responses

## 🔐 Security

- [ ] Enable SSL/TLS
- [ ] Setup firewall (ufw)
- [ ] Restrict database access
- [ ] Regular backups
- [ ] Monitor for anomalies
- [ ] Keep dependencies updated

## 📞 Support

Need help? Check:
- [Ponder Documentation](https://ponder.sh/docs)
- [GitHub Issues](../../issues)
- [Discord Community](#)

