import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import {
  selectCart,
  removeFromCartAsync,
  getCartAsync,
  updateCartAsync,
} from "../redux/CartSlice";
const CartForm = ({ item }) => {
  const [quantity, setQuantity] = useState();
  // redux
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const handleIncrease = () => {
    dispatch(updateCartAsync(item.id, item.quantity + 1));
  };

  const handleDecrease = () => {
    dispatch(updateCartAsync(item.id, item.quantity - 1));
  };

  const handleDelete = (id) => {
    const cartItemId = id;

    // Hiển thị hộp thoại xác nhận xóa
    Alert.alert(
      "Xác nhận xóa", // Tiêu đề
      "Bạn có chắc muốn xóa sản phẩm này?", // Nội dung
      [
        {
          text: "Hủy", // Nút Hủy
          onPress: () => console.log("Hủy xóa"),
          style: "cancel",
        },
        {
          text: "Đồng ý", // Nút Đồng ý
          onPress: () => {
            dispatch(removeFromCartAsync(cartItemId)); // Gọi hành động xóa
            alert("Sản phẩm đã được xóa.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imgSrc }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.pricesale} Rp</Text>
        <View style={styles.textCircleContainer}>
          <View
            style={[styles.circle, { backgroundColor: item.selectedColor }]}
          ></View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.selectedSize}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Image
            source={require("../img/delete.png")}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrease}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrease}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartForm;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 15,
    position: "relative",
  },
  image: {
    height: 125,
    width: "30%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    fontSize: 18,
    color: "#797979",
    marginVertical: 7,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 5,
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  sizeContainer: {
    backgroundColor: "#FFFFFF",
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "700",
  },
  textCircleContainer: {
    flexDirection: "row",
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIcon: {
    height: 30,
    width: 20,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#b88e2f",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: "700",
    color: "#b88e2f",
  },
  snackbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000000000000,
  },
});
