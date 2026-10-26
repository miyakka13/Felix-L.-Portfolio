-- 0001_init.sql
-- Schema, RLS, storage buckets/policies, admin allowlist for Supabase-backed portfolio admin.

create extension if not exists "pgcrypto";

-- admin_users (allowlist) - must exist before is_admin() references it
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Helper: is current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
drop policy if exists "admin_users self read" on public.admin_users;
create policy "admin_users self read" on public.admin_users
  for select to authenticated
  using (user_id = auth.uid());


-- profiles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  avatar_url text,
  resume_url text,
  email text,
  location text,
  github_url text,
  linkedin_url text,
  about text[] default '{}',
  mission text,
  expertise jsonb default '[]'::jsonb,
  philosophy jsonb default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  live_url text,
  repo_url text,
  tech text[] default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- certificates
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  abbreviation text,
  issuer text not null,
  category text not null,
  issue_date text,
  expiry_date text,
  credential_id text,
  credential_url text,
  file_path text,
  status text not null default 'status-unavailable',
  note text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- skills
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  level int,
  icon text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- experience
create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text,
  description text[] default '{}',
  technologies text[] default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- education
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  program text not null,
  type text,
  start_date text,
  end_date text,
  grade text,
  details text[] default '{}',
  courses text[] default '{}',
  links jsonb default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- RLS policies
do $$
declare
  t text;
begin
  for t in select unnest(array['profiles','projects','certificates','skills','experience','education']) loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format('create policy "public read published" on public.%I for select to anon, authenticated using (published = true)', t);
    execute format('drop policy if exists "admin read all" on public.%I', t);
    execute format('create policy "admin read all" on public.%I for select to authenticated using (public.is_admin())', t);
    execute format('drop policy if exists "admin insert" on public.%I', t);
    execute format('create policy "admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);
    execute format('drop policy if exists "admin update" on public.%I', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- updated_at triggers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  for t in select unnest(array['profiles','projects','certificates','skills','experience','education']) loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('portfolio-assets','portfolio-assets', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio-private','portfolio-private', false)
on conflict (id) do nothing;

-- Storage policies: public bucket
drop policy if exists "public read assets" on storage.objects;
create policy "public read assets" on storage.objects
  for select using (bucket_id = 'portfolio-assets');

drop policy if exists "admin insert assets" on storage.objects;
create policy "admin insert assets" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio-assets' and public.is_admin());

drop policy if exists "admin update assets" on storage.objects;
create policy "admin update assets" on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio-assets' and public.is_admin())
  with check (bucket_id = 'portfolio-assets' and public.is_admin());

drop policy if exists "admin delete assets" on storage.objects;
create policy "admin delete assets" on storage.objects
  for delete to authenticated
  using (bucket_id = 'portfolio-assets' and public.is_admin());

-- Storage policies: private bucket
drop policy if exists "admin read private" on storage.objects;
create policy "admin read private" on storage.objects
  for select to authenticated
  using (bucket_id = 'portfolio-private' and public.is_admin());

drop policy if exists "admin insert private" on storage.objects;
create policy "admin insert private" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio-private' and public.is_admin());

drop policy if exists "admin update private" on storage.objects;
create policy "admin update private" on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio-private' and public.is_admin())
  with check (bucket_id = 'portfolio-private' and public.is_admin());

drop policy if exists "admin delete private" on storage.objects;
create policy "admin delete private" on storage.objects
  for delete to authenticated
  using (bucket_id = 'portfolio-private' and public.is_admin());

-- Seed admin allowlist
insert into public.admin_users (user_id)
values ('9597c4a5-5aa5-44ef-891d-1432f742d07c')
on conflict (user_id) do nothing;
