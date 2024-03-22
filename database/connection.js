const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://root:root@ac-drf1rsh-shard-00-00.ywp46en.mongodb.net:27017,ac-drf1rsh-shard-00-01.ywp46en.mongodb.net:27017,ac-drf1rsh-shard-00-02.ywp46en.mongodb.net:27017/?replicaSet=atlas-585fva-shard-0&ssl=true&authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

module.exports = mongoose.connection;
