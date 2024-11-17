import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const nav = useNavigation();
  const redirect = () => {
    nav.navigate("Cart");
  };
  const redirectHome = () => {
    nav.navigate("Home");
  };
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
          <MaterialIcons name="shopping-cart" size={26} color="black" />
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
});
