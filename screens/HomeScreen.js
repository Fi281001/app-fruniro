import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Ranger from "../components/Ranger";
import Products from "../components/Products";
import { useNavigation, useRoute } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();

  const gotoProducts = () => {
    navigation.navigate("Products");
  };
  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Banner />
        <Ranger />
        <View>
          <Text style={styles.name}>Our Products</Text>
          <Products show={4} />
          <TouchableOpacity
            style={styles.containerButton}
            onPress={() => gotoProducts()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>See more</Text>
            </View>
          </TouchableOpacity>
        </View>
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
});
