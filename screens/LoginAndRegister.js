import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import app from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, getCartAsync, addToCartAsync } from "../redux/CartSlice";
const auth = getAuth(app);
const database = getDatabase(app);
const LoginAndRegister = () => {
  // toast thông báo
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông báo của Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Kiểm soát trạng thái hiển thị Snackbar
  const [snackbarType, setSnackbarType] = useState("success");

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 4000); // Ẩn Snackbar sau 4 giây
  };
  const [isLogin, setIsLogin] = useState(true); // Quản lý trạng thái giữa login và register
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  // save data user
  const saveUserData = (userId, email, name, token) => {
    const db = getDatabase(); // Tạo kết nối tới Firebase Realtime Database
    set(ref(db, "users/" + userId), {
      email: email,
      name: name,
      token: token,
    })
      .then(() => {})
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  };
  // login
  const handleSubmit = async () => {
    if (!email || !password) {
      console.log("Email and password are required");
      showSnackbar("Email and password are required", "error");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // mere cart

      // Lấy token từ user
      const token = await user.getIdToken();

      // Lưu token vào localStorage hoặc AsyncStorage nếu cần

      await AsyncStorage.setItem("userData", JSON.stringify(token));
      showSnackbar("Login successful!", "success");
      setTimeout(() => {
        nav.reset({
          index: 0,
          routes: [{ name: "Tabs" }], // Điều hướng đến màn hình Tabs
        });
      }, 2000);
      const storedData = await AsyncStorage.getItem("userData");
      console.log("token_login", storedData);
      // Lấy giỏ hàng từ AsyncStorage
      const cartLocal = await AsyncStorage.getItem("cart");
      const localCart = cartLocal ? JSON.parse(cartLocal) : {};
      console.log("local", localCart);

      if (Object.keys(localCart).length > 0) {
        for (const item of Object.values(localCart)) {
          console.log("cart", item);
          await dispatch(addToCartAsync(item));
        }
        await dispatch(getCartAsync());

        await AsyncStorage.removeItem("cart");
      } else {
        console.log("error");
      }
    } catch (error) {
      showSnackbar("Wrong password or Email", "error");
    }
  };

  // Hàm đăng ký người dùng
  const handleRegister = async () => {
    if (password !== passwordAgain) {
      console.log("Passwords do not match");
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lưu thông tin người dùng vào Firebase Database
      await set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
      });

      console.log("Registration successful!");
      showSnackbar("Registration successful!", "success");
      setTimeout(() => {
        setIsLogin(true); // Chuyển trạng thái sang form đăng nhập
      }, 4000);
    } catch (error) {
      console.log("Error during registration:", error.message);
      showSnackbar(error.message, "error");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={4000}
          style={{
            backgroundColor: snackbarType === "error" ? "red" : "green", // Màu sắc thông báo (đỏ cho lỗi, xanh cho thành công)
          }}
          action={{
            label: "Dismiss",
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
        <Text style={styles.header}>{isLogin ? "Login" : "Register"}</Text>

        {/* Form nhập thông tin */}
        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={passwordAgain}
              onChangeText={setPasswordAgain}
            />
          )}
        </View>

        {/* Nút chính */}
        <TouchableOpacity
          style={styles.button}
          onPress={isLogin ? handleSubmit : handleRegister}
        >
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
