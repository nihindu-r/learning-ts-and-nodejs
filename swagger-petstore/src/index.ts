import express from "express";
import dbConnect from "./db/db";

const app = express();

// Connect to MongoDB
dbConnect();

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});