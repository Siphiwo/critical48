import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import SignUpScreen from "@/components/SignUpScreen";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import SignInScreen from "@/components/SignInScreen";
import { useLocalSearchParams } from "expo-router";

const Signin = () => {
  const { sessionId, isSignedIn } = useAuth();
  const params = useLocalSearchParams();
  const { type } = params;
  console.log(isSignedIn);
  return (
    <SafeAreaView style={styles.container}>
      {/* <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn> */}
      {/* <SignedOut> */}
      {/* <Text>Here now</Text> */}
      {type == "create" ? <SignUpScreen /> : <SignInScreen />}
      {/* </SignedOut> */}
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
