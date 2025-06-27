// --- START OF FILE index.jsx (CORRECTED) ---

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import useTransactions from "../../hooks/useTransactions";
import { useEffect, useState } from "react";
import { styles } from "../../assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionItem } from "@/components/TransactionItem";
import { NoTransactionFound } from "@/components/NoTransactionFound";
// 1. Create a new component for authenticated content
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  // We can safely call user.id here because this component is only rendered when signed in.
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user?.id); // Fixed typo: deleteTransactions -> deleteTransaction

  const onRefresh = async (params) => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]); // Depend on user to refetch if user changes

  // console.log("User ID:", user.id); // Log the user ID for debugging
  // console.log("Transaction Summary:", summary); // Log the summary for debugging

  // Function to handle deletion of a transaction
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };
  // Display a loading indicator while fetching data
  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Display the header with user information and add transaction button */}
        <View style={styles.header}>
          {/* Left hand side for the header */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back,</Text>
              <Text style={styles.usernameText}>
                {user.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* Right hand side for the header */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/CreateScreen")}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        {/* Other components like TransactionList can be added here */}
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );

  // Display the data once loaded
}
