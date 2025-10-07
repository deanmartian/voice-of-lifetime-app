# Stemmen for Livet - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Supabase Project**: Set up a Supabase project with the required database schema
3. **ElevenLabs API Key**: Get your API key from https://elevenlabs.io
4. **OpenAI API Key**: Get your API key from https://openai.com

## Environment Variables

Set these environment variables in your Vercel project settings:

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# ElevenLabs API (for voice cloning)
ELEVENLABS_API_KEY=sk_your-elevenlabs-api-key

# OpenAI API (for transcription)
OPENAI_API_KEY=sk-your-openai-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Option 3: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables
5. Deploy

## Database Setup

Ensure your Supabase database has the following tables:

- `profiles` - User profile information
- `stories` - Story records
- `recordings` - Audio recording metadata
- `family_members` - Family connection data

The database schema is defined in `src/lib/database.types.ts`.

## Features

✅ Voice recording and storage
✅ AI transcription with OpenAI Whisper
✅ Voice cloning with ElevenLabs
✅ User authentication with Supabase
✅ Real-time database updates
✅ Responsive design
✅ TypeScript and ESLint compliant

## Build Verification

The project builds successfully with:
- Zero TypeScript errors
- Zero ESLint errors
- All dependencies properly resolved
- Production-ready optimizations

## Support

For deployment issues, check:
1. Environment variables are correctly set
2. API keys have proper permissions
3. Supabase project is accessible
4. Build logs in Vercel dashboard

## Live Demo

Once deployed, you can access all features:
- `/` - Homepage with authentication
- `/record` - Voice recording with AI features
- `/inspiration` - Story prompts and ideas
- `/help` - User guidance and support
- `/auth/login` - Authentication pages
