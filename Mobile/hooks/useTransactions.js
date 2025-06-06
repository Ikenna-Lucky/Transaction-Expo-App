//react custom hook file
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

const useTransactions = (userId) => {
  const backendUrl = "http://localhost:4000/api";
  const [transaction, setTransaction] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  //Usecllback is used for performance reasons, it will memoize the function and prevent it from being recreated on every render
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${backendUrl}/transactions/${userId}`);
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${backendUrl}/transactions/summary/${userId}`
      );
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      //best practice is to use Promise.all to fetch both transactions and summary at the same time
      await Promise.all([fetchTransactions(), fetchSummary()]);
      //Doing it this way means the first fetch will be done before the second one, so we can avoid
      fetchTransactions();
      fetchSummary();
    } catch (error) {
      console.error("Error Loading Data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      //refresh the data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");

    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return {
    transaction,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  }

};

export default useTransactions;
