import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";

const LoginAndRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Quản lý trạng thái giữa login và register

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>{isLogin ? "Login" : "Register"}</Text>

        {/* Form nhập thông tin */}
        <View style={styles.form}>
          {!isLogin && (
            <TextInput placeholder="Full Name" style={styles.input} />
          )}
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
            />
          )}
        </View>

        {/* Nút chính */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {isLogin ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>

        {/* Nút chuyển đổi */}
        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleText}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginAndRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  button: {
    borderWidth: 2,
    borderColor: "#b88e2f",

    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#007BFF",
    marginTop: 15,
    fontSize: 16,
  },
});
