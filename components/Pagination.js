import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Pagination = ({ currentPage, totalPages, onPageChange, data }) => {
  const listRef = useRef(null); // Tạo tham chiếu tới FlatList

  const handlePageChange = (page) => {
    onPageChange(page); // Gọi hàm chuyển trang
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true }); // Cuộn lên đầu danh sách
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef} // Gắn ref cho FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === 1 && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MaterialIcons name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePage,
            ]}
            onPress={() => handlePageChange(page)}
          >
            <Text
              style={[
                styles.pageText,
                currentPage === page && styles.activeText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MaterialIcons name="navigate-next" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#red",
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
    backgroundColor: "#b88e2f",
    borderColor: "#b88e2f",
  },
  activeText: {
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
});
