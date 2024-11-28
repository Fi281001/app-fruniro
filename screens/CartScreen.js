import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CartForm from "../components/CartForm";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, getCartAsync, clearCartAsync } from "../redux/CartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const nav = useNavigation();

  const handleBack = () => {
    nav.goBack();
  };

  // display cart

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  useEffect(() => {
    dispatch(getCartAsync()); // Lấy giỏ hàng khi component được render
  }, [dispatch]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce((total, item) => {
    // Lấy giá trị từ pricesale
    const priceString = item.pricesale;

    // Kiểm tra nếu giá trị pricesale hợp lệ
    if (priceString && typeof priceString === "string") {
      // Làm sạch giá trị pricesale (xóa dấu chấm và thay dấu phẩy bằng dấu chấm)
      const cleanedPrice = priceString.replace(/\./g, "").replace(",", ".");
      const priceNumber = parseFloat(cleanedPrice);

      // Kiểm tra nếu giá trị priceNumber hợp lệ (không phải NaN)
      if (!isNaN(priceNumber)) {
        return total + priceNumber * item.quantity;
      } else {
        console.error(
          `Invalid price value for item with ID ${item.id}:`,
          priceString
        );
        return total; // Nếu giá trị không hợp lệ, bỏ qua item này
      }
    } else {
      console.error(`Price is missing or invalid for item with ID ${item.id}`);
      return total; // Nếu giá trị pricesale không hợp lệ, bỏ qua item này
    }
  }, 0);
  // Hiển thị tổng giá trị với định dạng tiền tệ
  const formattedTotalPrice = totalPrice.toLocaleString();

  // check out
  const handleCheckOut = async () => {
    try {
      // Kiểm tra nếu userData có trong AsyncStorage
      const userData = await AsyncStorage.getItem("userData");
      console.log("token_setting", userData); // In ra token để kiểm tra
      if (userData) {
        // Nếu userData tồn tại, thông báo checkout thành công
        alert("checkOut thành công");
        dispatch(clearCartAsync());
      } else {
        // Nếu không có userData, chuyển qua trang login
        Alert.alert(
          "Chưa đăng nhập",
          "Bạn chưa đăng nhập. Bạn có muốn chuyển đến trang login?",
          [
            {
              text: "Hủy",
              onPress: () => console.log("Đã hủy chuyển đến login"),
              style: "cancel", // Nếu người dùng chọn hủy
            },
            {
              text: "OK",
              onPress: () => {
                console.log("Chuyển đến trang login");
                nav.navigate("Login"); // Điều hướng đến trang login
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra userData: ", error);
    }
  };
  return (
    <View style={styles.cartcontainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          s
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headertext}>My Cart</Text>
        <View></View>
      </View>

      {/* cart list */}
      <View style={styles.cart}>
        <FlatList
          data={cart}
          renderItem={({ item }) => {
            return <CartForm item={item} />;
          }}
          keyExtractor={(item) => item.id} // Chắc chắn rằng mỗi phần tử có một key duy nhất
        />
      </View>

      {/* footer cart check out */}
      <View style={styles.footer}>
        <View style={styles.bottomContentContainer}>
          {/* <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Total Price:</Text>
            <Text style={styles.priceText}>{formattedTotalPrice}</Text>
          </View> */}
          <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Total Quantity:</Text>
            <Text style={styles.priceText}>{totalQuantity}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.flexRowContainer}>
            <Text style={styles.titleText}>Total Price:</Text>
            <Text style={[styles.priceText, styles.grandPriceText]}>
              {formattedTotalPrice}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleCheckOut();
          }}
        >
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
