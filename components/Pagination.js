import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Pagination = () => {
  const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pageButton, styles.activePage]}>
          <Text style={[styles.pageText, styles.activeText]}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Pagination;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  item: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  pageText: {
    fontSize: 16,
    color: "#333",
  },
  activePage: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  activeText: {
    color: "#fff",
  },
});
