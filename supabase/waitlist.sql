-- Optional: run in your Supabase SQL editor
-- https://supabase.com/dashboard/org/psoonhcrdfhstbtxolmz

create table if not exists public.waitlist (
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
