const express = require("express");
const cors = require("cors");

// initialize app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Message
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// Start server
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
