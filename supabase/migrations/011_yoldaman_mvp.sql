create table if not exists public.driver_documents (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.driver_profiles(id) on delete cascade,
  document_type text not null check (document_type in ('LICENSE','VEHICLE_REGISTRATION','ID')),
  document_number text not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(driver_id, document_type)
);
alter table public.driver_documents enable row level security;
create index if not exists driver_documents_driver_idx on public.driver_documents(driver_id);
create index if not exists driver_profiles_status_idx on public.driver_profiles(status);
create index if not exists rides_selected_driver_idx on public.rides(selected_driver_id);
