const express = require("express");
const cors = require("cors");

// Initialize app
const app = express();

// Importing routes
const universityroutes = require("./routes/university");
const courseroutes = require("./routes/course");
const studentroutes = require("./routes/student");

// Importing database
const db = require("./db/models");

// Middleware
app.use(cors());
app.use(express.json());

// Using routes
app.use("/university", universityroutes); // Note: Make sure to place this line below all other app.use() methods.
app.use("/course", courseroutes);
app.use("/student", studentroutes);

// Handling Errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// Message
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// Start server
const run = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Server connected to database successfully.");

    app.listen(8000, () => {
      console.log("Server up and running on port 8000.");
      console.log("You can connect using http://localhost:8000");
    });
  } catch (error) {
    console.log("Failed to connect to database:", error);
  }
};

run();
