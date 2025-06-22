const express = require("express");
const app = express();
const PORT = 4135;

// Middleware to trim the name parameter for any incoming request
app.use((req, res, next) => {
  if (req.query.name && typeof req.query.name === "string") {
    req.query.name = req.query.name.trim();
  }
  next();
});

// GET handler that takes a name query parameter and returns it in uppercase
app.get("/uppercase", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  const uppercaseName = name.toUpperCase();
  res.json({ name: uppercaseName });
});

app.get("/lowercase", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  const lowercaseName = name.toLowerCase();
  res.json({ name: lowercaseName });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}?name=yourname`);
});
