import { db } from './client';
import fs from 'fs';
import path from 'path';

const schemaPath = path.resolve(process.cwd(), 'src/db/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

console.log('🌱 Seeding database...');

// 1. Reset Tables
db.exec(schema);

// 2. Prepare Insert (Casinos)
const insertCasino = db.prepare(`
  INSERT INTO casinos (id, name, website_url, established, license, owner, payout_speed_minutes, payout_ratio, theme_color, logo_url, thumbnail_url, bonus_offer, bonus_spins)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// 3. Insert Casinos
insertCasino.run(
	'bitstarz',
	'BitStarz Casino',
	'https://bitstarz.com',
	2014,
	'Curacao',
	'Dama N.V.',
	8,
	97.2,
	'#dc2626',
	'/images/casinos/logos/bitstarz-casino-200x200.png',
	'/images/casinos/thumbnails/bitstarz-casino.jpg',
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
	'/images/casinos/thumbnails/spin-casino.jpg',
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
	'/images/casinos/thumbnails/woo-casino.jpg',
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
	'/images/casinos/thumbnails/fastpay-casino.jpg',
	'Up To $150',
	100
);

// 4. Insert Software Providers
const insertProvider = db.prepare(
	'INSERT OR IGNORE INTO software_providers (id, name, logo_url) VALUES (?, ?, ?)'
);

// Standard Providers
insertProvider.run('netent', 'NetEnt', '/images/software/netent.png');
insertProvider.run(
	'evolution',
	'Evolution Gaming',
	'/images/software/evolution.png'
);
insertProvider.run(
	'pragmatic',
	'Pragmatic Play',
	'/images/software/pragmatic.png'
);
insertProvider.run(
	'microgaming',
	'Microgaming',
	'/images/software/microgaming.png'
);

// Link Casinos to Software
const linkSoftware = db.prepare(
	'INSERT INTO casino_software (casino_id, provider_id) VALUES (?, ?)'
);
linkSoftware.run('bitstarz', 'netent');
linkSoftware.run('bitstarz', 'evolution');
linkSoftware.run('spin', 'microgaming');
linkSoftware.run('woo', 'netent');
linkSoftware.run('woo', 'evolution');
linkSoftware.run('fastpay', 'pragmatic');

console.log('✅ Software seeded!');

// 5. Insert Slots
const insertSlot = db.prepare(`
  INSERT INTO slots (slug, title, provider_id, rtp, volatility, max_win, paylines, release_date, description, image_url, featured, min_bet, max_bet, layout, features)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Insert Slot Providers
insertProvider.run(
	'gaming-corps',
	'Gaming Corps',
	'/images/software/gaming-corps.png'
);
insertProvider.run('reelplay', 'ReelPlay', '/images/software/reelplay.png');
insertProvider.run(
	'relax-gaming',
	'Relax Gaming',
	'/images/software/relax-gaming.png'
);
insertProvider.run('swintt', 'Swintt', '/images/software/swintt.png');

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
	1,
	0.2,
	100,
	'5x3',
	JSON.stringify(['Stacked Wilds', 'Free Spins', 'Bonus Buy'])
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
	1,
	0.1,
	50,
	'7x7',
	JSON.stringify(['Cascading Reels', 'Multipliers', 'Cluster Pays'])
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
	1,
	0.2,
	20,
	'6x7',
	JSON.stringify(['Megaways', 'Progressive Multiplier', 'Free Spins'])
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
	1,
	0.05,
	100,
	'5x3',
	JSON.stringify(['Wild Symbols', 'Gamble Feature'])
);

// 6. Insert Payment Methods (NEW SECTION)
console.log('💳 Seeding Payment Methods...');

const insertPayment = db.prepare(`
	INSERT OR IGNORE INTO payment_methods (
		id, name, logo_url, description, type, avg_speed, fees, min_deposit, max_withdrawal, pros, cons
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Use .png to match your other files
insertPayment.run(
	'interac',
	'Interac',
	'/images/payments/interac.png',
	'Canada’s most popular payment method, connecting directly to your bank account.',
	'Bank Transfer',
	'Instant',
	'Free',
	10,
	5000,
	JSON.stringify(['Extremely safe', 'Widely accepted', 'No fees']),
	JSON.stringify(['Requires Canadian bank account'])
);

insertPayment.run(
	'idebit',
	'iDebit',
	'/images/payments/idebit.png',
	'Secure online banking transfers for Canadians without credit cards.',
	'Bank Transfer',
	'Instant',
	'1.5% Flat Fee',
	20,
	4000,
	JSON.stringify(['Secure', 'Fast']),
	JSON.stringify(['Small transaction fees'])
);

insertPayment.run(
	'muchbetter',
	'MuchBetter',
	'/images/payments/muchbetter.png',
	'Award-winning payment app designed specifically for igaming.',
	'E-Wallet',
	'Instant',
	'Low',
	10,
	10000,
	JSON.stringify(['Good for mobile', 'Low fees', 'Fast withdrawals']),
	JSON.stringify(['App installation required'])
);

insertPayment.run(
	'bitcoin',
	'Bitcoin',
	'/images/payments/bitcoin.png',
	' The original cryptocurrency, offering anonymity and high limits.',
	'Crypto',
	'10-60 Mins',
	'Network Fees',
	20,
	100000,
	JSON.stringify(['Anonymous', 'Huge limits', 'Provably fair games']),
	JSON.stringify(['Volatile price', 'Complex for beginners'])
);

insertPayment.run(
	'visa',
	'Visa',
	'/images/payments/visa.png',
	'Global credit/debit card standard accepted virtually everywhere.',
	'Card',
	'Instant (Dep) / 1-3 Days (With)',
	'None',
	10,
	5000,
	JSON.stringify(['Everyone has one', 'Instant deposits']),
	JSON.stringify(['Withdrawals can be slow', 'Bank may block gambling'])
);

insertPayment.run(
	'mastercard',
	'Mastercard',
	'/images/payments/mastercard.png',
	'One of the world’s leading payment brands for secure deposits.',
	'Card',
	'Instant',
	'None',
	10,
	5000,
	JSON.stringify(['Top tier security', 'Global acceptance']),
	JSON.stringify(['Withdrawals often not supported', 'Bank declines common'])
);

const linkPayment = db.prepare(
	'INSERT OR IGNORE INTO casino_payment_methods (casino_id, method_id) VALUES (?, ?)'
);

// Link Bitstarz (Crypto Heavy)
linkPayment.run('bitstarz', 'bitcoin');
linkPayment.run('bitstarz', 'interac');
linkPayment.run('bitstarz', 'visa');

// Link Spin Casino (Fiat Heavy)
linkPayment.run('spin', 'interac');
linkPayment.run('spin', 'visa');
linkPayment.run('spin', 'mastercard');
linkPayment.run('spin', 'idebit');

// Link Woo
linkPayment.run('woo', 'bitcoin');
linkPayment.run('woo', 'interac');
linkPayment.run('woo', 'visa');

// Link Fastpay
linkPayment.run('fastpay', 'bitcoin');
linkPayment.run('fastpay', 'interac');
linkPayment.run('fastpay', 'muchbetter');

console.log('✅ Payments Seeded!');
console.log('🚀 Database Ready!');
