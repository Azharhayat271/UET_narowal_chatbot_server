const express = require("express");
const app = express();
const cors = require("cors");
const Signup = require("./routes/auth");
const dbConnection = require("./database/connection");
const predefinedQA = require("./dataset/questions");
const stringSimilarity = require("string-similarity");
const QAModel = require("./modals/bot");

app.use(express.json());

// Populate predefined questions and answers into MongoDB
async function populatePredefinedQA() {
  try {
    for (const qa of predefinedQA) {
      await QAModel.create(qa);
    }
    console.log("Predefined QA populated successfully");
  } catch (error) {
    console.error("Error populating predefined QA:", error);
  }
}

populatePredefinedQA();

// Function to find the most similar question
function findMostSimilarQuestion(userQuestion) {
  const questions = predefinedQA.map((qa) => qa.question);
  const matches = stringSimilarity.findBestMatch(userQuestion, questions);
  const bestMatch = matches.bestMatch;
  if (bestMatch.rating > 0.5) {
    return bestMatch.target; // Return the most similar question
  } else {
    return null;
  }
}

// Function to get the answer for a question
// API endpoint to handle user requests
app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question;

  // Find the most similar predefined question
  const matchedQuestion = findMostSimilarQuestion(userQuestion);

  if (matchedQuestion) {
    // If a match is found, return the corresponding answer
    const matchingQA = predefinedQA.find(
      (qa) => qa.question === matchedQuestion
    );
    res.json({ answer: matchingQA.answer });
  } else {
    // If no match is found, return a default response
    res.json({ answer: "Sorry, I cannot assist you with that." });
  }
});

// Enable CORS with specific options
app.use(
  cors({
    origin: "http://localhost:62266",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/api/auth", Signup);

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
