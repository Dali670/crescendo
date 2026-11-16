-- Schéma du blog et de l'espace admin, relevé sur le projet Supabase distant le 2026-11-16.
-- Permet de recréer la base à l'identique (supabase db reset / nouveau projet).

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  content      text not null default '',
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id)
);

alter table public.posts  enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path to ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

create policy admins_read_self on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy public_read_published on public.posts
  for select to anon, authenticated
  using (published = true);

create policy admin_read_all on public.posts
  for select to authenticated
  using ((select public.is_admin()));

create policy admin_insert on public.posts
  for insert to authenticated
  with check ((select public.is_admin()));

create policy admin_update on public.posts
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy admin_delete on public.posts
  for delete to authenticated
  using ((select public.is_admin()));

-- Pour donner les droits admin à un compte créé dans Authentication > Users :
--   insert into public.admins (user_id) values ('<uuid du compte>');
