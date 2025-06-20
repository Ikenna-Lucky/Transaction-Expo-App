// --- START OF FILE index.jsx (CORRECTED) ---

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import useTransactions from "../../hooks/useTransactions";
import { useEffect } from "react";

// 1. Create a new component for authenticated content
const TransactionData = () => {
  const { user } = useUser();
  // We can safely call user.id here because this component is only rendered when signed in.
  const { summary, isLoading, loadData, deleteTransaction } = useTransactions(
    user.id
  ); // Fixed typo: deleteTransactions -> deleteTransaction

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]); // Depend on user to refetch if user changes

  console.log("User ID:", user.id); // Log the user ID for debugging
  console.log("Transaction Summary:", summary); // Log the summary for debugging

  // Display a loading indicator while fetching data
  if (isLoading) {
    return (
      <View>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
        <SignOutButton />
      </View>
    );
  }

  // Display the data once loaded
  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Income: ${summary.income}</Text>
      <Text>Balance: ${summary.balance}</Text>
      <Text>Expenses: ${summary.expenses}</Text>
      {/* You can map over and display transactions here */}
      <SignOutButton />
    </View>
  );
};

// 2. Your main page component is now much cleaner
export default function Page() {
  return (
    <View>
      <SignedIn>
        {/* Render the new component only when the user is signed in */}
        <TransactionData />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
