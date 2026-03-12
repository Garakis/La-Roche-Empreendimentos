-- CREATE PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  status text NOT NULL,
  "statusClass" text NOT NULL,
  "desc" text NOT NULL,
  "heroImage" text NOT NULL,
  "innerImage" text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  "order" integer NOT NULL
);

-- Allow public read/write (admin-managed data, no auth needed on table level)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
