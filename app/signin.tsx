import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SignUpScreen from "@/components/SignUpScreen";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInScreen from "@/components/SignInScreen";

const Signin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        {/* <SignInScreen /> */}
        <SignUpScreen />
      </SignedOut>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Signin;
