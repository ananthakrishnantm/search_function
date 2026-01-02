CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  region TEXT NOT NULL,
  image_url TEXT NOT NULL,
  original_price REAL NOT NULL,
  discount_percent INTEGER NOT NULL,
  final_price REAL NOT NULL,
  cashback REAL NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO games (
  title,
  region,
  image_url,
  original_price,
  discount_percent,
  final_price,
  cashback,
  likes
) VALUES
(
  'Split Fiction EA App Key (PC)',
  'GLOBAL',
  'https://via.placeholder.com/300x400',
  49.99,
  18,
  40.93,
  4.50,
  626
),
(
  'FIFA 23 EA App Key (PC)',
  'EUROPE',
  'https://via.placeholder.com/300x400',
  59.99,
  25,
  44.99,
  5.00,
  1021
),
(
  'Red Dead Redemption 2 Rockstar Key (PC)',
  'GLOBAL',
  'https://via.placeholder.com/300x400',
  59.99,
  50,
  29.99,
  6.00,
  2103
),
(
  'FIFA 23 EA App Key (PC)',
  'GLOBAL',
  'https://via.placeholder.com/300x400',
  59.99,
  25,
  44.99,
  5.00,
  1021
);
