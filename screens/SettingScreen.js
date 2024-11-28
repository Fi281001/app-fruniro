import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth"; // Import signOut để đăng xuất
const SettingScreen = () => {
  const auth = getAuth();
  const nav = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm kiểm tra trạng thái đăng nhập
  const checkLoginStatus = async () => {
    const userData = await AsyncStorage.getItem("userData");
    setIsLoggedIn(!!userData); // Cập nhật trạng thái đăng nhập
  };

  // Lắng nghe khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  // Hàm xử lý khi nhấn nút
  const handleButtonPress = async () => {
    if (isLoggedIn) {
      // Logout: Xóa dữ liệu userData
      await AsyncStorage.clear();
      await signOut(auth);
      console.log("Logged out successfully");
      setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
    } else {
      // Login: Chuyển hướng đến màn hình Login
      nav.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>
          {isLoggedIn ? "Logout" : "Login"} {/* Hiển thị trạng thái */}
        </Text>
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
