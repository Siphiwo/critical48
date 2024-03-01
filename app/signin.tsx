import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SignUpScreen from "@/components/SignUpScreen";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInScreen from "@/components/SignInScreen";
import { useLocalSearchParams, useRouter } from "expo-router";

const Signin = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { account } = params;

  console.log(params);
  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <Text>Create compoment to add missing person</Text>
      </SignedIn>
      <SignedOut>
        {account !== "create" ? <SignInScreen /> : <SignUpScreen />}
      </SignedOut>
    </SafeAreaView>
    // <Text>You are Signed in</Text>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Signin;
