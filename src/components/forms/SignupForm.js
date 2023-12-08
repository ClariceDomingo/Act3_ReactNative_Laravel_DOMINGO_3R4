import { View, ToastAndroid, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import fetchServices from "../services/fetchServices";
import LogoImage from "../../../assets/logo1.png";

export default function SignupForm({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showRePass, setShowRePass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const showToast = (message = "Something went wrong") => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      if (name === "" || email === "" || password === "" || repassword === "") {
        showToast("Please input required data");
        setIsError(true);
        return false;
      }

      if (password !== repassword) {
        showToast("Passwords do not match");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.10.58/api/v1/register";
      const data = {
        name,
        email,
        password,
        password_confirmation: repassword,
      };

      const result = await fetchServices.postData(url, data);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Login");
      }
    } catch (e) {
      console.debug(e.toString());
      showToast(e.toString());
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
        error={isError}
      />
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        error={isError}
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
        error={isError}
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
        error={isError}
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
