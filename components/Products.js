import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import data from "../data/data.json";
import { useNavigation, useRoute } from "@react-navigation/native";
const Products = ({ show }) => {
  const [products, useProducts] = useState(data.products);
  const limitedProducts = products.slice(0, show);

  const navigation = useNavigation();

  const gotoDetail = (item) => {
    navigation.navigate("detail", {
      image: item.image,
      title: item.title,
      id: item.id,
      price: item.price,
    });
  };
  return (
    <View>
      <View style={styles.productList}>
        {limitedProducts.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <TouchableOpacity onPress={() => gotoDetail(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>
                {item.price ? `$${item.price}` : "Price not available"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productList: {
    flexDirection: "row", // Sử dụng flexbox để căn 2 cột
    flexWrap: "wrap", // Đảm bảo sản phẩm xuống hàng khi không đủ chỗ
    justifyContent: "space-between", // Căn đều các sản phẩm
    paddingHorizontal: 30,
  },
  productContainer: {
    flexBasis: "48%", // Chiếm 48% chiều rộng để có 2 cột
    marginBottom: 20, // Khoảng cách giữa các sản phẩm theo chiều dọc
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 167, // Đảm bảo ảnh chiếm toàn bộ chiều rộng của container
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  price: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
});
