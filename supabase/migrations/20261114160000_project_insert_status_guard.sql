-- Guard: members may only submit projects as draft or pending.
-- Prevents inserting rows directly with status 'published' (bypassing
-- admin review) through the Supabase API.
drop policy if exists "Members can create their own projects" on public.projects;

create policy "Members can create their own projects"
on public.projects for insert
with check (
  owner_id = auth.uid()
  and status in ('draft', 'pending')
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'member'
  )
);
