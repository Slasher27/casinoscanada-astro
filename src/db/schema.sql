-- 1. DROP CHILD TABLES FIRST (The "Connector" tables)
DROP TABLE IF EXISTS casino_software;
DROP TABLE IF EXISTS slots;

-- 2. DROP PARENT TABLES SECOND
DROP TABLE IF EXISTS casinos;
DROP TABLE IF EXISTS software_providers;

-- 3. The Main Casino Table
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
  bonus_offer TEXT,
  bonus_spins INTEGER
);

-- 4. Software Providers Table (UPDATED with logo_url)
CREATE TABLE software_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT -- Added this column. Note the comma on the line above!
);

-- 5. Many-to-Many Relationship
CREATE TABLE casino_software (
  casino_id TEXT,
  provider_id TEXT,
  PRIMARY KEY (casino_id, provider_id),
  FOREIGN KEY(casino_id) REFERENCES casinos(id),
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);

-- 6. The Slots Table
CREATE TABLE slots (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  rtp REAL,
  volatility TEXT,
  max_win TEXT,
  paylines TEXT,
  release_date TEXT,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT 0,
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);

-- 7. Indexes
CREATE INDEX idx_slots_provider ON slots(provider_id);
CREATE INDEX idx_slots_rtp ON slots(rtp);