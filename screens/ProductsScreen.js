import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Rectangle from "../components/Rectangle";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Pagination from "../components/Pagination";

const ProductsScreen = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <Rectangle title="Shop" />
        <Filter />
        <View>
          <Text style={styles.name}>Products</Text>
          <Products />
        </View>
        <View>
          <Pagination />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  name: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
});
