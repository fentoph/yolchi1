-- Repair the landing-page visit counter.
-- Safe for the fresh YO'LDAMAN Supabase project and idempotent.

create table if not exists public.site_stats (
  key text primary key,
  visits bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.site_stats enable row level security;

insert into public.site_stats (key, visits)
values ('landing', 0)
on conflict (key) do nothing;

revoke all on public.site_stats from anon, authenticated;
grant select on public.site_stats to anon;
grant all on public.site_stats to service_role;

create or replace function public.increment_site_visits()
returns bigint
language plpgsql
security invoker
set search_path = public
as $$
declare
  new_visits bigint;
begin
  insert into public.site_stats (key, visits)
  values ('landing', 1)
  on conflict (key)
  do update set
    visits = public.site_stats.visits + 1,
    updated_at = now()
  returning visits into new_visits;

  return new_visits;
end;
$$;

revoke execute on function public.increment_site_visits() from public, authenticated;
grant execute on function public.increment_site_visits() to anon, service_role;
