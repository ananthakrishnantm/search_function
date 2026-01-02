const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "games.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      region TEXT NOT NULL,
      original_price REAL NOT NULL,
      discount INTEGER NOT NULL,
      current_price REAL NOT NULL,
      cashback REAL NOT NULL,
      favorites INTEGER DEFAULT 0,
      image_url TEXT
    )
  `,
    (err) => {
      if (err) return console.error(err);

      db.get("SELECT COUNT(*) as count FROM games", (err, row) => {
        if (row.count === 0) seedDatabase();
      });
    }
  );
}

function seedDatabase() {
  const games = [
    {
      title: "Split Fiction EA App Key (PC)",
      region: "GLOBAL",
      original_price: 49.99,
      discount: 18,
      current_price: 40.93,
      cashback: 4.5,
      favorites: 626,
      image_url: "https://wallpapercave.com/wp/wp15037073.webp",
    },
    {
      title: "Split Fiction EA App Key (PC)",
      region: "EUROPE",
      original_price: 49.99,
      discount: 18,
      current_price: 40.93,
      cashback: 4.5,
      favorites: 512,
      image_url: "https://wallpapercave.com/wp/wp15037073.webp",
    },
    {
      title: "Split Fiction Xbox Series X|S Key",
      region: "GLOBAL",
      original_price: 49.99,
      discount: 30,
      current_price: 34.99,
      cashback: 3.75,
      favorites: 1039,
      image_url: "https://wallpapercave.com/wp/wp15037073.webp",
    },
    {
      title: "Split Fiction Nintendo Switch eShop Key",
      region: "EUROPE",
      original_price: 59.99,
      discount: 40,
      current_price: 36.25,
      cashback: 3.99,
      favorites: 288,
      image_url: "https://wallpapercave.com/wp/wp15037073.webp",
    },

    // ─────────────── FIFA 23 ───────────────
    {
      title: "FIFA 23 EA App Key (PC)",
      region: "GLOBAL",
      original_price: 69.99,
      discount: 25,
      current_price: 52.49,
      cashback: 5.25,
      favorites: 1842,
      image_url: "https://wallpapercave.com/wp/wp11326329.jpg",
    },
    {
      title: "FIFA 23 Xbox One / Series X|S Key",
      region: "EUROPE",
      original_price: 69.99,
      discount: 35,
      current_price: 45.49,
      cashback: 4.55,
      favorites: 931,
      image_url: "https://wallpapercave.com/wp/wp11326329.jpg",
    },

    // ─────────────── Red Dead Redemption 2 ───────────────
    {
      title: "Red Dead Redemption 2 Rockstar Key (PC)",
      region: "GLOBAL",
      original_price: 59.99,
      discount: 33,
      current_price: 40.19,
      cashback: 4.0,
      favorites: 2156,
      image_url:
        "https://www.ireddead.com/content/images/official-red-dead-redemption-2-placeholder-box-art-1060.jpg?etag=58087c06",
    },
    {
      title: "Red Dead Redemption 2 Xbox One Key",
      region: "EUROPE",
      original_price: 59.99,
      discount: 45,
      current_price: 32.99,
      cashback: 3.3,
      favorites: 1048,
      image_url:
        "https://www.ireddead.com/content/images/official-red-dead-redemption-2-placeholder-box-art-1060.jpg?etag=58087c06",
    },
    {
      title: "Hogwarts Legacy Steam Key (PC)",
      region: "GLOBAL",
      original_price: 69.99,
      discount: 20,
      current_price: 55.99,
      cashback: 5.6,
      favorites: 2890,
      image_url:
        "https://cdn-hogwartslegacy.warnerbrosgames.com/community/slide-07.jpg",
    },
    {
      title: "Hogwarts Legacy Steam Key (PC)",
      region: "EUROPE",
      original_price: 69.99,
      discount: 30,
      current_price: 48.99,
      cashback: 4.9,
      favorites: 1742,
      image_url:
        "https://cdn-hogwartslegacy.warnerbrosgames.com/community/slide-07.jpg",
    },
    {
      title: "Hogwarts Legacy Xbox Series X|S Key",
      region: "GLOBAL",
      original_price: 69.99,
      discount: 25,
      current_price: 52.49,
      cashback: 5.25,
      favorites: 963,
      image_url:
        "https://cdn-hogwartslegacy.warnerbrosgames.com/community/slide-07.jpg",
    },

    // ─────────────── Grand Theft Auto V ───────────────
    {
      title: "Grand Theft Auto V Rockstar Key (PC)",
      region: "GLOBAL",
      original_price: 29.99,
      discount: 35,
      current_price: 19.49,
      cashback: 1.95,
      favorites: 6789,
      image_url: "https://wallpapercave.com/wp/wp1809630.jpg",
    },
    {
      title: "Grand Theft Auto V Steam Key (PC)",
      region: "EUROPE",
      original_price: 29.99,
      discount: 40,
      current_price: 17.99,
      cashback: 1.8,
      favorites: 3421,
      image_url: "https://wallpapercave.com/wp/wp1809630.jpg",
    },
    {
      title: "Grand Theft Auto V Xbox One Key",
      region: "GLOBAL",
      original_price: 29.99,
      discount: 45,
      current_price: 16.49,
      cashback: 1.65,
      favorites: 2154,
      image_url: "https://wallpapercave.com/wp/wp1809630.jpg",
    },

    // ─────────────── Cyberpunk 2077 ───────────────
    {
      title: "Cyberpunk 2077 Steam Key (PC)",
      region: "GLOBAL",
      original_price: 59.99,
      discount: 40,
      current_price: 35.99,
      cashback: 3.6,
      favorites: 3421,
      image_url: "https://wallpapercave.com/uwp/uwp4228508.jpeg",
    },
    {
      title: "Cyberpunk 2077 GOG Key (PC)",
      region: "EUROPE",
      original_price: 59.99,
      discount: 50,
      current_price: 29.99,
      cashback: 3.0,
      favorites: 1987,
      image_url: "https://wallpapercave.com/uwp/uwp4228508.jpeg",
    },
    {
      title: "Cyberpunk 2077 Xbox Series X|S Key",
      region: "GLOBAL",
      original_price: 59.99,
      discount: 45,
      current_price: 32.99,
      cashback: 3.3,
      favorites: 1214,
      image_url: "https://wallpapercave.com/uwp/uwp4228508.jpeg",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO games
    (title, region, original_price, discount, current_price, cashback, favorites, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  games.forEach((g) =>
    stmt.run(
      g.title,
      g.region,
      g.original_price,
      g.discount,
      g.current_price,
      g.cashback,
      g.favorites,
      g.image_url
    )
  );

  stmt.finalize(() => console.log("Database seeded"));
}

module.exports = db;
