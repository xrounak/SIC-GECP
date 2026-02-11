-- Enable UUID extension for auto-generating IDs
create extension if not exists "uuid-ossp";

-- 
-- Members Table
--
create table if not exists members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  domain text not null,
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table members enable row level security;

-- Policies for members
create policy "Enable read access for all users" on members for select using (true);
create policy "Enable insert for authenticated users only" on members for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on members for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on members for delete using (auth.role() = 'authenticated');

--
-- Events Table
--
create table if not exists events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date timestamptz not null,
  venue text not null,
  status text check (status in ('upcoming', 'past')) default 'upcoming',
  created_at timestamptz default now()
);

alter table events enable row level security;

create policy "Enable read access for all users" on events for select using (true);
create policy "Enable insert for authenticated users only" on events for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on events for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on events for delete using (auth.role() = 'authenticated');

--
-- Join Applications Table
--
create table if not exists join_applications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  branch text,
  year text,
  skills text,
  motivation text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table join_applications enable row level security;

-- Allow anyone to submit an application (public insert)
create policy "Enable insert access for all users" on join_applications for insert with check (true);
-- Only authenticated users (admins) can view applications
create policy "Enable read access for authenticated users only" on join_applications for select using (auth.role() = 'authenticated');
create policy "Enable update/delete for authenticated users only" on join_applications for all using (auth.role() = 'authenticated');

--
-- Event Registrations Table
--
create table if not exists event_registrations (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz default now()
);

alter table event_registrations enable row level security;

-- Allow anyone to register (public insert)
create policy "Enable insert access for all users" on event_registrations for insert with check (true);
-- Only authenticated users can view registrations
create policy "Enable read access for authenticated users only" on event_registrations for select using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on event_registrations for delete using (auth.role() = 'authenticated');

--
-- Gallery Table
--
create table if not exists gallery (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  caption text,
  created_at timestamptz default now()
);

alter table gallery enable row level security;

create policy "Enable read access for all users" on gallery for select using (true);
create policy "Enable insert for authenticated users only" on gallery for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on gallery for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on gallery for delete using (auth.role() = 'authenticated');

--
-- Insert Dummy Data (Seed)
--
