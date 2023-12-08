import { View, ToastAndroid, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import fetchServices from "../services/fetchServices";
import LogoImage from "../../../assets/logo1.png";

export default function SignupForm({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = (message = "Something went wrong") => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      // Form validation
      if (!name.trim() || !email.trim() || !password.trim() || !repassword.trim()) {
        showToast("Please input all required data");
        return;
      }

      // Validate email format
      if (!email.includes("@")) {
        showToast("Please enter a valid email address");
        return;
      }

      if (password !== repassword) {
        showToast("Passwords do not match");
        return;
      }

      const url = "http://192.168.1.2/api/v1/register";
      const data = {
        name,
        email,
        password,
        password_confirmation: repassword,
      };

      const result = await fetchServices.postData(url, data);

      if (result.message) {
        showToast(result.message);
        navigation.navigate("Login");
      } else {
        showToast("Registration failed");
      }
    } catch (e) {
      console.debug(e.toString());
      showToast("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Create an Account!</Text>
      <Text style={styles.subtitle}>Enter your details to get started!</Text>

      <TextInput
        mode="outlined"
        label="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        error={name.trim() === "" && loading === false}
      />
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        error={!email.includes("@") && loading === false}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={!showPass}
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            onPress={() => setShowPass(!showPass)}
          />
        }
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        error={password.trim() === "" && loading === false}
      />
      <TextInput
        mode="outlined"
        label="Re-type Password"
        secureTextEntry={!showRePass}
        right={
          <TextInput.Icon
            icon={showRePass ? "eye" : "eye-off"}
            onPress={() => setShowRePass(!showRePass)}
          />
        }
        style={styles.input}
        value={repassword}
        onChangeText={setRepassword}
        error={repassword.trim() === "" && loading === false}
      />
      <TouchableOpacity onPress={handleRegistration} style={styles.button}>
        <Text style={styles.buttonLabel}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLoginNavigation}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
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
    marginBottom: 4,
    color: "#666",
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    marginTop: 10,
    height: 55,
    backgroundColor: "#007bff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonLabel: {
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
  loginLink: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 6,
  },
};