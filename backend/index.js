const express = require("express");
const cors = require("cors");
const path = require("path");
const gamesRoutes = require("./routes/games");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API routes
app.use("/", gamesRoutes);

app.get("/health", (_, res) =>
  res.json({ status: "ok", message: "API running" })
);

// React fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
