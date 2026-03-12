-- CREATE PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  status text NOT NULL,
  statusClass text NOT NULL,
  desc text NOT NULL,
  heroImage text NOT NULL,
  innerImage text NOT NULL,
  gallery text[] NOT NULL,
  "order" integer NOT NULL
);

-- DISABLE ROW LEVEL SECURITY TEMPORARILY OR ALLOW ALL FOR DEV
-- (In a real production app, do not allow public inserts without auth,
-- but for this static migration MVP with an obscure secret admin we allow anon access)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
