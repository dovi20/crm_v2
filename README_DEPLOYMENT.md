# Quick Deployment Guide - Vercel + Supabase

## Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account
- Supabase account

## Quick Steps

### 1. Setup Supabase (5 minutes)
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Save your database password
3. Get connection strings from Settings → Database
4. Get API keys from Settings → API

### 2. Update Local Environment
```bash
# Install dependencies
npm install

# Copy and update .env.local with your Supabase credentials
cp .env.example .env.local

# Generate secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 32  # For JWT_SECRET

# Run migrations
npx prisma migrate dev --name init_postgresql
npx prisma generate
```

### 3. Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

### 4. Deploy to Vercel
```bash
# Option A: Using Vercel CLI
npm install -g vercel
vercel login
vercel

# Option B: Using GitHub
# 1. Push code to GitHub
# 2. Go to vercel.com → Import Project
# 3. Select your repository
```

### 5. Configure Vercel Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_URL` (your-app.vercel.app)
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 6. Redeploy
```bash
vercel --prod
```

## Files Changed
- ✅ [`prisma/schema.prisma`](prisma/schema.prisma) - Updated to PostgreSQL
- ✅ [`package.json`](package.json) - Added Supabase, updated scripts
- ✅ [`lib/supabase.js`](lib/supabase.js) - New Supabase client
- ✅ [`.env.example`](.env.example) - Environment variables template
- ✅ [`.env.local`](.env.local) - Local development config
- ✅ [`vercel.json`](vercel.json) - Vercel deployment config

## Important Notes
- Remove Docker files after successful deployment
- Never commit `.env.local` to git
- Use strong secrets for production
- Enable Supabase Row Level Security (RLS) for production

## Need Help?
See detailed guide: [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md)