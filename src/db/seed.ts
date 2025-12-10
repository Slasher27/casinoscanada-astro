import { db } from './client';
import fs from 'fs';
import path from 'path';

const schemaPath = path.resolve(process.cwd(), 'src/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

console.log('🌱 Seeding database...');

// 1. Reset Tables
db.exec(schema);

// 2. Prepare Insert (Added logo_url at the end)
const insertCasino = db.prepare(`
  INSERT INTO casinos (id, name, website_url, established, license, owner, payout_speed_minutes, payout_ratio, theme_color, logo_url, bonus_offer, bonus_spins)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// 3. Insert Data with Logos
insertCasino.run(
	'bitstarz',
	'BitStarz',
	'https://bitstarz.com',
	2014,
	'Curacao',
	'Dama N.V.',
	8,
	97.2,
	'#dc2626',
	'/images/casinos/logos/bitstarz-casino-200x200.png',
	'5 BTC Welcome Package',
	180
);

insertCasino.run(
	'spin',
	'Spin Casino',
	'https://spincasino.com',
	2001,
	'MGA',
	'Bayton Ltd',
	2880,
	96.5,
	'#ec3045',
	'/images/casinos/logos/spin-casino-200x200.png',
	'$1,000 Deposit Match',
	0
);

insertCasino.run(
	'woo',
	'Woo Casino',
	'https://woocasino.com',
	2020,
	'Curacao',
	'Dama N.V.',
	30,
	96.8,
	'#3b82f6',
	'/images/casinos/logos/woo-casino-200x200.png',
	'$200 Match Bonus',
	200
);

insertCasino.run(
	'fastpay',
	'Fastpay Casino',
	'https://fastpaycasino.com',
	2019,
	'Curacao',
	'Dama N.V.',
	30,
	96.8,
	'#8cc63f',
	'/images/casinos/logos/fastpay-casino-200x200.png',
	'Up To $150',
	100
);

// ... (Keep your Software Provider inserts below - they remain unchanged) ...
const insertProvider = db.prepare(
	'INSERT OR IGNORE INTO software_providers (id, name) VALUES (?, ?)'
);
insertProvider.run('netent', 'NetEnt');
insertProvider.run('evolution', 'Evolution Gaming');
insertProvider.run('pragmatic', 'Pragmatic Play');
insertProvider.run('microgaming', 'Microgaming');

const linkSoftware = db.prepare(
	'INSERT INTO casino_software (casino_id, provider_id) VALUES (?, ?)'
);
linkSoftware.run('bitstarz', 'netent');
linkSoftware.run('bitstarz', 'evolution');
linkSoftware.run('spin', 'microgaming');
linkSoftware.run('woo', 'netent');
linkSoftware.run('woo', 'evolution');
linkSoftware.run('fastpay', 'pragmatic');

console.log('✅ Database seeded with Images!');

// ... existing casino inserts ...

// 4. Insert Slots
const insertSlot = db.prepare(`
  INSERT INTO slots (slug, title, provider_id, rtp, volatility, max_win, paylines, release_date, description, image_url, featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Gaming Corps provider needs to exist first!
insertProvider.run('gaming-corps', 'Gaming Corps');
insertProvider.run('reelplay', 'ReelPlay');
insertProvider.run('relax-gaming', 'Relax Gaming');
insertProvider.run('swintt', 'Swintt');

console.log('🎰 Seeding Slots...');

insertSlot.run(
	'snoops-high-rollers',
	'Snoops High Rollers',
	'gaming-corps',
	96.5,
	'High',
	'x10,000',
	'25',
	'2024-01-01',
	'Join Snoop Dogg in this high-flying slot adventure featuring stacked wilds and a unique soundtrack.',
	'/images/slots/thumbnails/snoops-high-rollers.jpg',
	1 // Featured = true
);

insertSlot.run(
	'quackin-reels',
	"Quackin' Reels",
	'reelplay',
	96.1,
	'Medium',
	'x5,000',
	'Cluster Pays',
	'2023-05-15',
	'A fun farmyard frenzy with cascading wins and multiplier eggs.',
	'/images/slots/thumbnails/quackin-reels.jpg',
	1
);

insertSlot.run(
	'the-tumbles',
	'The Tumbles',
	'relax-gaming',
	96.4,
	'High',
	'x20,000',
	'Megaways',
	'2024-02-10',
	'Experience the tumbling reels mechanic in this icy adventure with progressive multipliers.',
	'/images/slots/thumbnails/the-tumbles.jpg',
	1
);

insertSlot.run(
	'hidden-treasures-rome',
	'Hidden Treasures of Rome',
	'swintt',
	95.8,
	'Low',
	'x2,000',
	'10',
	'2022-11-20',
	'Explore the ancient ruins and find hidden gold in this classic style slot.',
	'/images/slots/thumbnails/hidden-treasures-of-rome.jpg',
	1
);

console.log('✅ Slots Seeded!');
