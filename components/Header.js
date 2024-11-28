import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, getCartAsync } from "../redux/CartSlice";
const Header = () => {
  const nav = useNavigation();

  const redirect = () => {
    nav.navigate("Cart");
  };

  const redirectHome = () => {
    nav.navigate("Home");
  };

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  useEffect(() => {
    dispatch(getCartAsync()); // Chắc chắn bạn gọi hàm ở đây với dấu ngoặc ()
  }, [dispatch]); // Chỉ chạy khi `dispatch` thay đổi, nếu cần thiết có thể thêm các dependencies khác

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => redirectHome()}>
        <View style={styles.logomain}>
          <Image style={styles.logo} source={require("../img/logo.png")} />
          <Text style={styles.shopName}>Frurimo</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => redirect()}>
          <View>
            <MaterialIcons name="shopping-cart" size={26} color="black" />
            <View style={styles.cartBadge}>
              {totalQuantity > 0 ? (
                <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
              ) : (
                <Text style={styles.cartBadgeText}>0</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 0,
    height: 85,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 99999,
  },
  shopName: {
    paddingLeft: 10,
    marginTop: 25,
    fontSize: 20,
    color: "#b88e2f",
    fontWeight: "bold",
  },
  iconContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15, // khoảng cách giữa các icon
  },
  logomain: {
    marginTop: 10,
    flexDirection: "row",
  },
  logo: {
    marginTop: 19,
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "#b88e2f",
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
