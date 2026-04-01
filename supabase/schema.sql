-- IndieEats Database Schema
-- Run this in your Supabase SQL editor

-- Restaurant signups table
create table if not exists restaurant_signups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  restaurant text not null,
  city text,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Customer waitlist table
create table if not exists customer_waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  city text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table restaurant_signups enable row level security;
alter table customer_waitlist enable row level security;

-- Allow anyone to insert (public signups)
create policy "Allow public inserts on restaurant_signups"
  on restaurant_signups for insert
  to anon
  with check (true);

create policy "Allow public inserts on customer_waitlist"
  on customer_waitlist for insert
  to anon
  with check (true);

-- Only authenticated users (you) can read signups
create policy "Allow authenticated reads on restaurant_signups"
  on restaurant_signups for select
  to authenticated
  using (true);

create policy "Allow authenticated reads on customer_waitlist"
  on customer_waitlist for select
  to authenticated
  using (true);
