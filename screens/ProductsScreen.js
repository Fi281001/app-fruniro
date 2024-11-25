import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Rectangle from "../components/Rectangle";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import { useState, useEffect, useRef } from "react";
const ProductsScreen = () => {
  const [showValue, setShowValue] = useState("12");
  const handleShowValueChange = (value) => {
    setShowValue(value);
  };
  const [sortvalue, setSortvalue] = useState("asc");
  const handleSortValueChange = (value) => {
    setSortvalue(value);
  };
  const [length, setLength] = useState(0);
  const handleLengthChange = (value) => {
    setLength(value); // Cập nhật length
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(length / showValue); // Tính tổng số trang
  const scrollRef = useRef(null);
  const handlePageChange = (page) => {
    setCurrentPage(page); // Thay đổi trang hiện tại
    if (scrollRef.current) {
      // Cuộn lên đầu khi đổi trang
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  return (
    <View>
      <Header />
      <ScrollView ref={scrollRef}>
        <Rectangle title="Shop" />
        <Filter
          onHandleShowValueChange={handleShowValueChange}
          onHandleSortValueChange={handleSortValueChange}
        />
        <View>
          <Text style={styles.name}>Products</Text>
          <Products
            onLengthChange={handleLengthChange}
            ShowValue={showValue}
            SortValue={sortvalue}
            currentPage={currentPage}
          />
        </View>
        <View>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
