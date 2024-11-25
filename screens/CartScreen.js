import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import data from "../data/data.json";
import CartForm from "../components/CartForm";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const [carts, useCarts] = useState(data.products);
  const nav = useNavigation();

  const handleBack = () => {
    nav.goBack();
  };

  return (
    <View style={styles.cartcontainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headertext}>My Cart</Text>
        <View></View>
      </View>

      {/* cart list */}
      <View style={styles.cart}>
        <FlatList
          data={carts}
          renderItem={({ item }) => {
            return <CartForm item={item} />;
          }}
          keyExtractor={(item) => item.id} // Chắc chắn rằng mỗi phần tử có một key duy nhất
        />
      </View>

      {/* footer cart check out */}
      <View style={styles.footer}>
        <View style={styles.bottomContentContainer}>
          <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Total:</Text>
            <Text style={styles.priceText}>299999</Text>
          </View>
          <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Shipping:</Text>
            <Text style={styles.priceText}>$0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Grand Total:</Text>
            <Text style={[styles.priceText, styles.grandPriceText]}>
              299999
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartcontainer: {
    flex: 1, // Thêm flex để chiếm hết không gian màn hình
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headertext: {
    fontSize: 28,
    fontWeight: "400",
  },

  flexRowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  footer: {
    width: "100%",
    backgroundColor: "#fff", // Cần có màu nền để shadow hiển thị
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng (x, y)
    shadowOpacity: 0.25, // Độ mờ của bóng (0 đến 1)
    shadowRadius: 3.84, // Bán kính làm mờ bóng
    elevation: 5, // Bóng cho Android
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingVertical: 20,
  },

  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "white",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
    borderWidth: 2,
    borderColor: "#b88e2f",
  },
  buttonText: {
    fontSize: 24,
    color: "black",
    fontWeight: "700",
  },
  cart: {
    flex: 1, // Để chiếm phần không gian còn lại
    paddingHorizontal: 20,
  },
});

export default CartScreen;
