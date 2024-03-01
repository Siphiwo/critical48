import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Page = () => {
  const [signedIn, setSignedIn] = useState(false);

  const { isSignedIn, sessionId } = useAuth();

  if (isSignedIn) {
    console.log(sessionId);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/loading_icon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.descHeading}>The first 48 hours are crucial!</Text>
      <Text style={styles.descText}>
        Click on the button below to get started
      </Text>
      <Link href={"/signin?account=create"} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Acccount</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A3303B",
  },
  welcome: {
    width: "100%",
    height: 300,
    marginTop: "auto",
  },
  descHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#efefef",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  descText: {
    fontSize: 13,
    textAlign: "center",
    color: "#efefef",
    paddingBottom: 20,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 15,
    backgroundColor: "#efefef",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default Page;
