create extension if not exists "pgcrypto";

create type public.profile_role as enum ('admin', 'member');
create type public.project_status as enum ('draft', 'pending', 'published', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.profile_role not null default 'member',
  member_id text unique,
  division text,
  batch text,
  avatar_url text,
  skills text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  summary text not null,
  description text,
  cover_url text,
  demo_url text,
  repository_url text,
  tech_stack text[] not null default '{}',
  status public.project_status not null default 'draft',
  rejection_reason text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_owner_id_idx on public.projects(owner_id);
create index projects_status_idx on public.projects(status);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'PUPCL Member'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, full_name)
select
  id,
  coalesce(
    raw_user_meta_data ->> 'full_name',
    raw_user_meta_data ->> 'name',
    split_part(email, '@', 1),
    'PUPCL Member'
  )
from auth.users
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;

create policy "Profiles are visible to owners, admins, and published project owners"
on public.profiles for select
using (
  id = auth.uid()
  or public.is_admin()
  or exists (
    select 1
    from public.projects
    where projects.owner_id = profiles.id
      and projects.status = 'published'
  )
);

create policy "Members can update their own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid() and role = 'member');

create policy "Admins can manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "Published projects are public"
on public.projects for select
using (
  status = 'published'
  or owner_id = auth.uid()
  or public.is_admin()
);

create policy "Members can create their own projects"
on public.projects for insert
with check (
  owner_id = auth.uid()
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'member'
  )
);

create policy "Members can edit their own projects"
on public.projects for update
using (owner_id = auth.uid() or public.is_admin())
with check (
  public.is_admin()
  or (
    owner_id = auth.uid()
    and status in ('draft', 'pending', 'rejected')
  )
);

create policy "Members and admins can delete projects"
on public.projects for delete
using (owner_id = auth.uid() or public.is_admin());
