import { View } from "react-native";
import React from "react";
import SignupForm from "../forms/SignupForm";

export default function RegisterScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#f5f5f5" }}>
      <SignupForm {...props} />
    </View>
  );
}
