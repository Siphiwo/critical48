import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
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
        {!pendingVerification && (
          <View>
            <View>
              <Text style={styles.heading}>Sign up</Text>
              <Text style={styles.inputHeading}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="example@critical48.com"
                onChangeText={(email) => setEmailAddress(email)}
                style={styles.textInput}
              />
            </View>

            <View>
              <Text style={styles.inputHeading}>Password</Text>
              <TextInput
                value={password}
                placeholder="********"
                placeholderTextColor="#000"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <Text style={{color: '#9A9A9A'}}>By clicking "create account" you acknowledge that you have read and understood the {' '}
              <Text style={{color: '#A3303B'}} onPress={() => Linking.openURL('https://critical48.com/terms-of-service')}>Terms & Condition</Text> {' '} of this application.
              </Text>
            </View>

            <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
              <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 40}}>
        <Text style={{color: '#9A9A9A'}}>Already have an account?</Text>
        <Text style={styles.inputHeading} onPress={() => router.push('/signin?account=login')}>Sign in</Text>
      </View>
          </View>
        )}
        {pendingVerification && (
          <View>
            <View>
              <Text style={styles.inputHeading}>Enter Verification Code</Text>
              <TextInput
                value={code}
                placeholder="1234"
                onChangeText={(code) => setCode(code)}
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity onPress={onPressVerify} style={styles.button}>
              <Text style={styles.buttonText}>Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
