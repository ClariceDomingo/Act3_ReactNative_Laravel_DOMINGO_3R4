import { View } from "react-native";
import React from "react";
import LoginForm from "../forms/LoginForm";

export default function LoginScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#f5f5f5" }}>
      <LoginForm {...props} />
    </View>
  );
}