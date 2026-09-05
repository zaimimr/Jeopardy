create extension if not exists pgcrypto;

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  edit_key text not null default encode(gen_random_bytes(18), 'hex'),
  content jsonb not null default '{"categories": []}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  code text not null unique,
  state jsonb not null,
  version integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists games_board_id_idx on public.games(board_id);

alter table public.boards enable row level security;
alter table public.games enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "media public read" on storage.objects for select to anon, authenticated using (bucket_id = 'media');
