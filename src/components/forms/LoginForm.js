import { View, StyleSheet, ToastAndroid, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput, Checkbox } from "react-native-paper";
import fetchServices from "../services/fetchServices";
import LogoImage from "../../../assets/logo1.png";

export default function LoginForm({ navigation }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message = "Something went wrong") => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!email.trim() || !password.trim()) {
        showToast("Please enter both email and password");
        return;
      }

      // Validate email format
      if (!email.includes("@")) {
        showToast("Please enter a valid email address");
        return;
      }

      const url = "http://192.168.1.2/api/v1/login";
      const data = {
        email,
        password,
      };

      const result = await fetchServices.postData(url, data);

      if (result.token) {
        showToast("Login successful");
        navigation.navigate("Home");
      } else {
        showToast("Invalid credentials");
      }
    } catch (e) {
      console.debug(e.toString());
      showToast("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your account to continue.</Text>

      <TextInput
        mode="outlined"
        label="Email address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        selectionColor="#007bff"
        theme={{ colors: { primary: "#007bff" } }}
      />

      <TextInput
        mode="outlined"
        label="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPass}
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={() => setShowPass(!showPass)}
          />
        }
        selectionColor="#007bff"
        theme={{ colors: { primary: "#007bff" } }}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox.Android
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
          color="#007bff"
        />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>

      <Button
        loading={loading}
        disabled={loading}
        onPress={handleLogin}
        mode="contained"
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Button>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerButtonLabel}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: "#666",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    width: "100%",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  registerButtonLabel: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 6,
  },
});
