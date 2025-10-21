# 🚂 Railway Deployment Guide

Complete guide để deploy Zuno Marketplace Indexer lên Railway.

---

## 📋 Prerequisites

1. **Railway Account** - [Sign up](https://railway.app)
2. **Railway CLI** - Install globally:
   ```bash
   npm install -g @railway/cli
   ```
3. **PostgreSQL Database** - Railway cung cấp free PostgreSQL
4. **RPC Endpoints** - Alchemy, Infura, hoặc public RPCs

---

## 🚀 Quick Deploy (3 Steps)

### Step 1: Login to Railway
```bash
railway login
```

### Step 2: Create New Project
```bash
# In project directory
cd zuno-marketplace-indexer

# Initialize Railway project
railway init

# Link to existing project (if already created)
# railway link
```

### Step 3: Add PostgreSQL Database
```bash
# Add PostgreSQL plugin
railway add --database postgres

# Railway sẽ tự động set DATABASE_URL
```

### Step 4: Setup Environment Variables

**Option A: Using Script (Recommended)**
```bash
bash scripts/setup-railway-env.sh
```

**Option B: Manual Setup**
```bash
# Core variables
railway variables set NODE_ENV=production
railway variables set ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
railway variables set ZUNO_API_KEY=your_api_key_here

# RPC URLs (add for each chain you want to index)
railway variables set PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
railway variables set PONDER_RPC_URL_137=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
railway variables set PONDER_RPC_URL_8453=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### Step 5: Deploy!
```bash
# Deploy using script
bash scripts/deploy-railway.sh

# Or deploy directly
railway up
```

---

## ⚙️ Detailed Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection | Auto-set by Railway |
| `ZUNO_API_URL` | Zuno API endpoint | `https://zuno-marketplace-abis.vercel.app/api` |
| `ZUNO_API_KEY` | Zuno API key | `zuno_xxxxx` |
| `PONDER_RPC_URL_{CHAIN_ID}` | RPC endpoint per chain | See table below |

### RPC URLs by Chain

| Chain | ID | Variable | Provider |
|-------|-----|----------|----------|
| Ethereum | 1 | `PONDER_RPC_URL_1` | [Alchemy](https://alchemy.com) |
| Sepolia | 11155111 | `PONDER_RPC_URL_11155111` | [Alchemy](https://alchemy.com) |
| Polygon | 137 | `PONDER_RPC_URL_137` | [Alchemy](https://alchemy.com) |
| Base | 8453 | `PONDER_RPC_URL_8453` | [Alchemy](https://alchemy.com) |
| Optimism | 10 | `PONDER_RPC_URL_10` | [Alchemy](https://alchemy.com) |
| Arbitrum | 42161 | `PONDER_RPC_URL_42161` | [Alchemy](https://alchemy.com) |

### Optional Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VERBOSE_LOGGING` | `false` | Enable verbose logging |
| `DETAILED_LOGGING` | `false` | Enable detailed event logging |
| `ENABLE_METRICS` | `true` | Track performance metrics |
| `ENABLE_ERROR_RETRY` | `true` | Retry failed events |
| `ENABLE_CACHE` | `true` | Enable response caching |

---

## 🔧 Railway Project Setup

### 1. Via Railway Dashboard

1. Go to [railway.app/new](https://railway.app/new)
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select `zuno-marketplace-indexer` repository
5. Click "Deploy Now"

### 2. Via Railway CLI

```bash
# Create new project
railway init

# Or link existing project
railway link

# Set environment
railway environment production
```

### 3. Add PostgreSQL

**Via Dashboard:**
1. Open your project
2. Click "+ New"
3. Select "Database" → "PostgreSQL"
4. Done! `DATABASE_URL` is auto-set

**Via CLI:**
```bash
railway add --database postgres
```

---

## 📦 Build Configuration

Railway uses the following build process:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm generate-config && pnpm codegen"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Build Steps

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Generate Config**
   ```bash
   pnpm generate-config
   # Fetches ABIs from Zuno API
   # Generates ponder.config.ts
   ```

3. **Generate Types**
   ```bash
   pnpm codegen
   # Generates TypeScript types
   # Creates ponder-env.d.ts
   ```

4. **Start Server**
   ```bash
   pnpm start
   # Runs Ponder in production mode
   ```

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

**Via Dashboard:**
1. Open your service
2. Go to "Settings" → "Domains"
3. Click "Generate Domain" or "Custom Domain"
4. Add your domain: `indexer.yourdomain.com`

**Via CLI:**
```bash
railway domain
```

### DNS Setup

Add CNAME record:
```
Type: CNAME
Name: indexer (or your subdomain)
Value: <your-railway-domain>.railway.app
```

---

## 📊 Monitoring & Logs

### View Logs

**Via Dashboard:**
- Open project → Click "View Logs"

**Via CLI:**
```bash
# Real-time logs
railway logs

# Last 100 lines
railway logs --tail 100

# Follow logs
railway logs --follow
```

### Monitor Metrics

**Built-in Metrics:**
- CPU usage
- Memory usage
- Network traffic
- Request count

**Custom Metrics:**
- Ponder prints metrics every 5 minutes
- Check logs for metric reports

---

## 🔄 Deployment Workflow

### Automatic Deployment

Railway auto-deploys on git push:

```bash
git add .
git commit -m "Update indexer"
git push origin main
# Railway automatically deploys
```

### Manual Deployment

```bash
# Deploy current directory
railway up

# Deploy specific branch
railway up --branch production

# Deploy with environment
railway up --environment production
```

### Rollback

```bash
# Via Dashboard: Deployments → Click "Rollback"

# Via CLI
railway rollback
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails - "Cannot find module"

**Solution:** Check `package.json` dependencies
```bash
# Ensure all deps in dependencies, not devDependencies
pnpm install
pnpm typecheck
```

#### 2. "No RPC URL configured"

**Solution:** Add RPC URLs
```bash
railway variables set PONDER_RPC_URL_1=https://your-rpc-url
```

#### 3. Database Connection Error

**Solution:** Verify DATABASE_URL
```bash
# Check if variable exists
railway variables

# PostgreSQL should be added as plugin
railway add --database postgres
```

#### 4. "Contract not found" warnings

**Solution:** Check Zuno API key
```bash
railway variables set ZUNO_API_KEY=your_actual_key
```

#### 5. High Memory Usage

**Solution:** Reduce indexed chains or upgrade plan
```bash
# Remove unused RPC URLs
railway variables delete PONDER_RPC_URL_137

# Or upgrade plan for more memory
```

### Debug Commands

```bash
# Check environment variables
railway variables

# View service status
railway status

# Check recent deployments
railway deployments

# Open project dashboard
railway open

# SSH into container (if needed)
railway run bash
```

---

## 💰 Cost Optimization

### Free Tier Limits

- **$5/month credit** (hobbyist plan)
- **Unlimited deployments**
- **PostgreSQL included**

### Tips to Save Costs

1. **Index only necessary chains**
   ```bash
   # Remove unused RPCs
   railway variables delete PONDER_RPC_URL_42161
   ```

2. **Use public RPCs for testnets**
   ```bash
   PONDER_RPC_URL_11155111=https://sepolia.infura.io/v3/public
   ```

3. **Disable verbose logging in production**
   ```bash
   railway variables set VERBOSE_LOGGING=false
   ```

4. **Monitor usage**
   - Check Railway dashboard daily
   - Set up billing alerts

---

## 🔒 Security Best Practices

### 1. Secure Environment Variables

```bash
# Never commit .env files
echo ".env*" >> .gitignore

# Rotate API keys regularly
railway variables set ZUNO_API_KEY=new_key
```

### 2. Database Security

- Railway PostgreSQL is private by default
- Use connection pooling
- Enable SSL (auto-enabled)

### 3. API Security

```bash
# Add rate limiting (if using custom API)
# Set CORS headers in src/api/index.ts
```

---

## 📈 Scaling

### Horizontal Scaling

Railway supports replicas:

```bash
# Via Dashboard: Settings → Replicas
# Set replica count: 2-10
```

### Vertical Scaling

Upgrade plan for more resources:
- **Hobby**: $5/month credit
- **Pro**: $20/month, more resources
- **Enterprise**: Custom pricing

### Database Scaling

```bash
# Upgrade PostgreSQL plugin
# Dashboard → Database → Settings → Upgrade
```

---

## 🎯 Production Checklist

Before going live:

- [ ] PostgreSQL database added
- [ ] All RPC URLs configured
- [ ] Zuno API key set
- [ ] Environment set to `production`
- [ ] Logs reviewed for errors
- [ ] Health check endpoint working (`/`)
- [ ] GraphQL endpoint accessible (`/graphql`)
- [ ] Custom domain configured (optional)
- [ ] Monitoring setup
- [ ] Backup strategy planned

---

## 📞 Support

### Railway Support

- **Docs**: [docs.railway.app](https://docs.railway.app)
- **Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Twitter**: [@Railway](https://twitter.com/Railway)

### Project Support

- **Issues**: GitHub Issues
- **Docs**: Project README.md

---

## 🔗 Useful Links

- [Railway Dashboard](https://railway.app/dashboard)
- [Railway CLI Docs](https://docs.railway.app/develop/cli)
- [Ponder Docs](https://ponder.sh/docs)
- [Zuno API](https://zuno-marketplace-abis.vercel.app)

---

## 📝 Example: Full Deployment

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
cd zuno-marketplace-indexer
railway init

# 4. Add PostgreSQL
railway add --database postgres

# 5. Set environment variables
railway variables set NODE_ENV=production
railway variables set ZUNO_API_URL=https://zuno-marketplace-abis.vercel.app/api
railway variables set ZUNO_API_KEY=zuno_xxxxx
railway variables set PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/xxxxx
railway variables set PONDER_RPC_URL_137=https://polygon-mainnet.g.alchemy.com/v2/xxxxx

# 6. Deploy
railway up

# 7. View logs
railway logs --follow

# 8. Open dashboard
railway open
```

🎉 **Deployed!** Your indexer is now live on Railway!

---

**Last Updated**: 2025-10-21
**Railway Version**: Latest
**Ponder Version**: 0.14.3
