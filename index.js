const express = require("express");
const app = express();
const cors = require("cors");
const Signup = require("./routes/auth");
const dbConnection = require("./database/connection");

app.use(express.json());

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:52084',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use('/api/auth', Signup);

// Use the Mongoose connection object to get notified when connected
dbConnection.on("connected", () => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Handle connection errors
dbConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Export the Express app object
module.exports = app;
