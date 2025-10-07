# Stemmen for Livet - Digitalt Minnearkiv

Et senior-vennlig digitalt arkiv for å ta opp og bevare livshistorier med stemme og AI-funksjonalitet.

## 🎯 Funksjoner

- 🎙️ **Ekte stemmeopptak** med MediaRecorder API
- 🤖 **AI-transkripsjon** med OpenAI Whisper (norsk)
- 🔊 **Stemme-kloning** med ElevenLabs AI
- 💾 **Sikker lagring** med Supabase
- 👴👵 **Senior-vennlig design** med store knapper og norsk språk
- 📱 **Responsiv design** for alle enheter

## 🚀 Deployment til Vercel

### 1. Opprett Vercel-prosjekt

1. Gå til [vercel.com](https://vercel.com)
2. Klikk "Add New..." → "Project"
3. Velg GitHub repository: `stemmen-for-livet`
4. Vercel vil automatisk detektere Next.js

### 2. Konfigurer miljøvariabler

I Vercel dashboard, gå til Settings → Environment Variables og legg til:

#### Supabase (Obligatorisk for database)
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

#### OpenAI (For AI-transkripsjon)
```
OPENAI_API_KEY=your-openai-api-key
```

#### ElevenLabs (For stemme-kloning)
```
ELEVENLABS_API_KEY=sk_2c303ce55a3742d351974a94adef628cc1082f97c7a33d19
```

#### App konfiguration
```
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### 3. Opprett Supabase Database

1. Gå til [supabase.com](https://supabase.com)
2. Opprett nytt prosjekt
3. Gå til SQL Editor og kjør dette scriptet:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  birth_year INTEGER,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  family_role TEXT,
  preferred_language TEXT DEFAULT 'no',
  privacy_level TEXT DEFAULT 'family' CHECK (privacy_level IN ('private', 'family', 'public')),
  elevenlabs_voice_id TEXT,
  voice_clone_status TEXT DEFAULT 'none' CHECK (voice_clone_status IN ('none', 'pending', 'ready', 'failed'))
);

-- Create stories table
CREATE TABLE stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('barndomsminner', 'familie-relasjoner', 'livets-eventyr', 'arbeid-karriere', 'visdom-lærdommer', 'annet')),
  privacy_level TEXT DEFAULT 'family' CHECK (privacy_level IN ('private', 'family', 'public')),
  prompt_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_completed BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0
);

-- Create recordings table
CREATE TABLE recordings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  audio_url TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  transcription TEXT,
  transcription_status TEXT DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  file_format TEXT NOT NULL,
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5)
);

-- Create family_members table
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  relationship TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('recordings', 'recordings', false),
  ('avatars', 'avatars', true);

-- Set up Row Level Security policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own stories" ON stories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stories" ON stories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stories" ON stories FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own recordings" ON recordings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recordings" ON recordings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recordings" ON recordings FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime for tables (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE stories;
ALTER PUBLICATION supabase_realtime ADD TABLE recordings;
```

### 4. Konfigurer Storage

I Supabase dashboard:
1. Gå til Storage
2. Opprett buckets: `recordings` (private) og `avatars` (public)
3. Sett opp RLS policies for storage

### 5. Deploy

1. I Vercel, klikk "Deploy"
2. Vent på at deployment fullføres
3. Test applikasjonen på den genererte URL-en

## 🔧 Lokal Utvikling

```bash
# Installer dependencies
bun install

# Kopier miljøvariabler
cp .env.example .env.local

# Rediger .env.local med dine verdier

# Start utviklingsserver
bun run dev
```

## 📁 Prosjektstruktur

```
src/
├── app/                   # Next.js app router
│   ├── auth/             # Autentisering sider
│   ├── record/           # Opptak-side
│   ├── inspiration/      # Historie-ideer
│   └── help/            # Hjelp og support
├── components/           # UI komponenter
│   └── ui/              # shadcn/ui komponenter
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Utilities og konfiguration
└── services/            # API services
```

## 🎨 Design System

- **Farger**: Varme amber/orange toner for trygghet
- **Typografi**: Store, lesbare fonter (18px+)
- **Komponenter**: shadcn/ui med senior-tilpasninger
- **Språk**: Komplett norsk med senior-vennlig terminologi

## 🔐 Sikkerhet

- Row Level Security (RLS) aktivert
- Brukerautentisering med Supabase Auth
- Sikker fillagring med signed URLs
- HTTPS-only kommunikasjon

## 📞 Support

For support eller spørsmål:
- GitHub Issues: [stemmen-for-livet/issues](https://github.com/deanmartian/stemmen-for-livet/issues)
- E-post: support@same.new

---

**Laget med ❤️ for å bevare livets mest verdifulle historier**
