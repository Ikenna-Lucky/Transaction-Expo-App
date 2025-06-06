import express from "express";
import {
  deleteTransaction,
  getTransactions,
  getTransactionSummary,
  postTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", postTransaction);

router.get("/:userId", getTransactions);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getTransactionSummary);

export default router;
