import express from "express";
import dbConnect from "./db/db";
import storeRouter from "./routes/store";
import userRouter from "./routes/user";
import petRouter from "./routes/pet";

const app = express();

dbConnect();

app.use(express.json());

// Handle pet requests
app.use('/pet',petRouter);

// Handle store requests
// Hand user requests

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});