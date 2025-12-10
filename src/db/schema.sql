-- 1. DROP CHILD TABLES FIRST (The "Connector" tables)
DROP TABLE IF EXISTS casino_software;

-- 2. DROP PARENT TABLES SECOND
DROP TABLE IF EXISTS casinos;
DROP TABLE IF EXISTS software_providers;

-- 1. The Main Casino Table
CREATE TABLE casinos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  established INTEGER,
  license TEXT,
  owner TEXT,
  payout_speed_minutes INTEGER,
  payout_ratio REAL,
  theme_color TEXT,
  logo_url TEXT,
  bonus_offer TEXT,      -- e.g. "$500 Match"
  bonus_spins INTEGER    -- e.g. 180
);

-- 2. Many-to-Many Relationship: Casinos <-> Software Providers
-- This allows us to query: "Show me all casinos that have NetEnt slots"
CREATE TABLE software_providers (
  id TEXT PRIMARY KEY, -- e.g., 'netent', 'pragmatic'
  name TEXT NOT NULL
);

CREATE TABLE casino_software (
  casino_id TEXT,
  provider_id TEXT,
  PRIMARY KEY (casino_id, provider_id),
  FOREIGN KEY(casino_id) REFERENCES casinos(id),
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);