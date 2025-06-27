import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router/stack";

export default function Layout() {
  // Corrected the typo from isSisgnedIn to isSignedIn
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Wait for the user session to be loaded
    return null;
  }

  // If the user is not signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  // If the user is signed in, render the protected routes
  return <Stack screenOptions={{ headerShown: false }} />;
}
