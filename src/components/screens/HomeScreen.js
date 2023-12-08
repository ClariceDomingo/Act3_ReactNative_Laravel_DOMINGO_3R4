import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Home</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>Explore and enjoy the features of our app!</Text>
        </View>

        <Button
          icon="logout"
          mode="contained"
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue", // Change the color as needed
  },
  content: {
    marginBottom: 40,
  },
  contentText: {
    fontSize: 18,
    color: "black", // Change the color as needed
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "green", // Change the color as needed
  },
};
