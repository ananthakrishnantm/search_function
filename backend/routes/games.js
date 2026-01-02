const express = require("express");
const db = require("../db/database");
const fuzzySearch = require("../utils/fuzzySearch");

const router = express.Router();

router.get("/list", (req, res) => {
  const search = req.query.search;

  db.all("SELECT * FROM games", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (!search) return res.json(rows);

    const filtered = rows.filter(
      (g) => fuzzySearch(g.title, search) || fuzzySearch(g.publisher, search)
    );

    res.json(filtered);
  });
});

router.get("/game/:id", (req, res) => {
  db.get("SELECT * FROM games WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

router.post("/game/:id/favorite", (req, res) => {
  db.run(
    "UPDATE games SET favorites = favorites + 1 WHERE id = ?",
    [req.params.id],
    function () {
      db.get("SELECT * FROM games WHERE id = ?", [req.params.id], (_, row) =>
        res.json(row)
      );
    }
  );
});

module.exports = router;
