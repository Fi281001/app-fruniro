import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SettingScreen = () => {
  const nav = useNavigation();
  const redirectLogin = () => {
    nav.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => redirectLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  button: {
    borderWidth: 2,
    borderColor: "#b88e2f",
    paddingVertical: 15, // Khoảng cách trên dưới
    paddingHorizontal: 30, // Khoảng cách trái phải
    borderRadius: 10, // Góc bo tròn
  },
  buttonText: {
    color: "black", // Màu chữ
    fontSize: 18, // Kích thước chữ
    fontWeight: "bold", // Đậm chữ
    textAlign: "center", // Căn giữa chữ
  },
});
