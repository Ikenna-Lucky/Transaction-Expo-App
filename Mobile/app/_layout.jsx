import { Stack } from "expo-router";
import SafeScreens from "../components/SafeScreens";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreens>
        <Slot />
      </SafeScreens>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
