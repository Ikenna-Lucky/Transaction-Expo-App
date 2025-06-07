import express from "express";
import {
  deleteTransaction,
  getTransactions,
  getTransactionSummary,
  postTransaction,
} from "../controllers/transactionController.js";

const transactionRoute = express.Router();

transactionRoute.post("/", postTransaction);

transactionRoute.get("/:userId", getTransactions);

transactionRoute.delete("/:id", deleteTransaction);

transactionRoute.get("/summary/:userId", getTransactionSummary);

export default transactionRoute;
