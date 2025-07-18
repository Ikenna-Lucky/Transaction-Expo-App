import express from "express";
import "dotenv/config";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoute.js";
import { initDB } from "./config/db.js";

const app = express();

// Set the "trust proxy" setting
// This is crucial for rate limiting and other IP-based security to work correctly on Vercel.
app.set('trust proxy', 1);

app.use(rateLimiter);
app.use(express.json()); // Middleware to parse JSON bodies

const port = process.env.PORT || 4000;

app.use("/api/transactions", transactionRoute);

app.get("/", (req, res) => {
  res.send("Transaction API is 100% working");
});

initDB().then(() => {
  app.listen(port, () => console.log("Server is active on PORT:", port));
});
