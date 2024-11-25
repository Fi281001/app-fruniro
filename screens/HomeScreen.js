import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Ranger from "../components/Ranger";
import Products from "../components/Products";
import { useNavigation, useRoute } from "@react-navigation/native";
import Slider from "../components/Slider";

const HomeScreen = () => {
  const navigation = useNavigation();

  // const gotoProducts = () => {
  //   navigation.navigate("Products");
  // };
  const [showValue, setShowValue] = useState(4);
  const handleShowValueChange = (value) => {
    setShowValue(value);
  };

  const plus4 = () => {
    setShowValue((prevItem) => prevItem + 4);
  };

  const [length, setLength] = useState(0);
  const handleLengthChange = (value) => {
    setLength(value); // Cập nhật length
  };
  const isShowMoreDisabled = showValue >= length;
  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Banner />
        <Ranger />
        <View>
          <Text style={styles.name}>Our Products</Text>
          {/* <Products
          // show={item}
          /> */}
          <Products onLengthChange={handleLengthChange} ShowValue={showValue} />
          <TouchableOpacity
            style={[
              styles.containerButton,
              isShowMoreDisabled && styles.disabledButton,
            ]}
            onPress={() => plus4()}
            disabled={isShowMoreDisabled} // Disable button khi không còn sản phẩm
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>See more</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Slider />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  containerButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%", // Đảm bảo nút chiếm toàn bộ chiều rộng
    alignItems: "center", // Căn giữa nút trong container
  },
  button: {
    borderWidth: 2,
    borderColor: "#b88e2f", // Màu vàng cho border
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Góc bo tròn
  },
  buttonText: {
    fontSize: 16,
    color: "black", // Màu chữ vàng
  },
  disabledButton: {
    opacity: 0.5, // Giảm độ mờ khi nút bị vô hiệu hóa
  },
});
