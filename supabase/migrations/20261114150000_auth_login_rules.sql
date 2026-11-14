create or replace function public.validate_campus_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_email text := lower(trim(new.email));
begin
  if normalized_email is null
    or (
      normalized_email not like '%@president.ac.id'
      and normalized_email not like '%@%.president.ac.id'
    ) then
    raise exception 'Only President University email addresses are allowed';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_campus_email_on_auth_user on auth.users;

create trigger validate_campus_email_on_auth_user
before insert or update of email on auth.users
for each row
execute function public.validate_campus_email();

drop policy if exists "Authenticated users can manage members" on public.members;
create policy "Admins can manage members"
on public.members for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated users can manage gallery" on public.gallery;
create policy "Admins can manage gallery"
on public.gallery for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated users can manage programs" on public.programs;
create policy "Admins can manage programs"
on public.programs for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
