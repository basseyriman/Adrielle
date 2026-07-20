# Adrielle

Premium clothing brand landing page — **exclusively for tall women** (5'9" and above).

## Stack

- Vite + React + TypeScript
- Optional Supabase waitlist (`waitlist` table)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Supabase waitlist (optional)

1. Create a project in your [Supabase org](https://supabase.com/dashboard/org/psoonhcrdfhstbtxolmz)
2. Create a `waitlist` table:

```sql
create table public.waitlist (
  id bigint generated always as identity primary key,
  email text unique not null,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

create policy "Allow anonymous inserts"
  on public.waitlist
  for insert
  to anon
  with check (true);
```

3. Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Without env vars, waitlist signups are stored in the browser (`localStorage`) so the form still works locally.
