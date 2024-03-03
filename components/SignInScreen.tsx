import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {!loading ? (
        <View style={styles.container}>
          <View>
            <Image
              source={require("@/assets/images/critical48-logo.png")}
              style={{
                width: 100,
                height: 100,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 40,
              }}
            />
            <Text style={styles.inputHeading}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="example@critical48.com"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              style={styles.textInput}
            />
          </View>
          <View>
            <Text style={styles.inputHeading}>Password</Text>
            <TextInput
              value={password}
              placeholder="*****"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity onPress={onSignInPress} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#9A9A9A", fontSize: 14 }}>
              Do not have an account?
            </Text>
            <Text
              style={{ color: "#A3303B", fontWeight: "600" }}
              onPress={() => router.push("/signin?type=create")}
            >
              Create account
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#A3303B" />
          <Text style={{ fontSize: 16, color: "#9A9A9A", marginTop: 20 }}>
            Signing you in...
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: Colors.headerSize,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 30,
  },
  inputHeading: {
    color: Colors.heading,
    fontSize: Colors.headingSize,
    fontWeight: "600",
    marginBottom: 10,
  },
  textInput: {
    width: "100%",
    height: 45,
    fontSize: 14,
    backgroundColor: "#efefef",
    borderRadius: 0,
    paddingLeft: 8,
    marginBottom: 20,
    borderColor: "#A4A4A4",
    borderBottomWidth: 1,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.heading,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.heading,
  },
});
