import { sql } from "../../src/config/db.js";

const postTransaction = async (req, res) => {
  //title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !amount || !category || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = await sql`
                INSERT INTO transactions (user_id, amount, title, category)
                VALUES (${user_id}, ${amount}, ${title}, ${category})
                RETURNING *;
            `;
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error in creating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transaction =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC;`;

    res.status(200).json(transaction);
  } catch (error) {
    console.log("Error in fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(typeof id, id);

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *;`;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error in deleting transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTransactionSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
          SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId};
        `;

    const incomeResult = await sql`
          SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0;
        `;

    const expensesResult = await sql`
          SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0;
        `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error in fetching transaction summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  postTransaction,
  getTransactions,
  deleteTransaction,
  getTransactionSummary,
};
