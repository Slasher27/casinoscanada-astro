-- 1. DROP CHILD TABLES FIRST (The "Connector" tables)
DROP TABLE IF EXISTS casino_software;
DROP TABLE IF EXISTS slots;  -- <--- ADD THIS LINE HERE

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

-- 4. The Slots Table
CREATE TABLE slots (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  rtp REAL, -- e.g. 96.5
  volatility TEXT, -- 'High', 'Medium', 'Low'
  max_win TEXT, -- 'x10,000'
  paylines TEXT, -- '25' or 'Cluster Pays'
  release_date TEXT,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT 0,
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);

-- 5. Optional: Indexes for faster searching
CREATE INDEX idx_slots_provider ON slots(provider_id);
CREATE INDEX idx_slots_rtp ON slots(rtp);