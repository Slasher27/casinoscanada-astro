-- src/db/schema.sql

-- 1. Drop old tables to ensure a clean reset
DROP TABLE IF EXISTS casino_payment_methods;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS slots;
DROP TABLE IF EXISTS casino_software;
DROP TABLE IF EXISTS software_providers;
DROP TABLE IF EXISTS casinos;

-- 2. Casinos Table
CREATE TABLE casinos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website_url TEXT,
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

-- 3. Software Providers Table
CREATE TABLE software_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT
);

-- 4. Connector: Casino <-> Software
CREATE TABLE casino_software (
  casino_id TEXT,
  provider_id TEXT,
  PRIMARY KEY (casino_id, provider_id),
  FOREIGN KEY(casino_id) REFERENCES casinos(id),
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);

-- 5. Slots Table
CREATE TABLE slots (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  provider_id TEXT,
  rtp REAL,
  volatility TEXT,
  max_win TEXT,
  paylines TEXT,
  release_date TEXT,
  description TEXT,
  image_url TEXT,
  featured INTEGER DEFAULT 0, -- 0 = false, 1 = true
  FOREIGN KEY(provider_id) REFERENCES software_providers(id)
);

-- 6. Payment Methods Table (NEW)
CREATE TABLE payment_methods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT
);

-- 7. Connector: Casino <-> Payment (NEW)
CREATE TABLE casino_payment_methods (
  casino_id TEXT,
  method_id TEXT,
  PRIMARY KEY (casino_id, method_id),
  FOREIGN KEY(casino_id) REFERENCES casinos(id),
  FOREIGN KEY(method_id) REFERENCES payment_methods(id)
);