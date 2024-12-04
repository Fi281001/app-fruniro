import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Rectangle from "../components/Rectangle";
import Products from "../components/Products";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
const CompareScreen = () => {
  const nav = useNavigation();
  const redirectCart = () => {
    nav.navigate("Cart");
  };
  const handleBack = () => {
    nav.goBack();
  };

  const route = useRoute();
  const { imgSrc, title, id, price, pricesale, name, sale } = route.params;
  console.log("sss", route.params);

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://furino-app-default-rtdb.asia-southeast1.firebasedatabase.app/product.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (data) {
          // Firebase trả về object, chuyển đổi thành array
          const productArray = Object.values(data).filter(
            (item) => item !== null
          );
          setData(productArray); // Lấy số lượng sản phẩm giới hạn
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const [items, setItems] = useState([]);
  // push product router
  const addItem = () => {
    const newItem = { imgSrc, title, id, price, pricesale, name, sale };
    setItems((prevItems) => [...prevItems, newItem]); // Tạo một mảng mới và thêm `newItem`
  };
  // push model
  const handleProductSelect = (product) => {
    setItems((prevItems) => [...prevItems, product]);
    toggleModal();
  };
  useEffect(() => {
    addItem();
  }, []);
  console.log("item", items);
  // delete
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems); // Cập nhật lại danh sách
  };
  // list products
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
    <ScrollView>
      <View style={{ flex: 1, marginTop: 30 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.appDrawerContainer}
            onPress={handleBack}
          >
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.headertext}>Compare</Text>

          <TouchableOpacity onPress={redirectCart}>
            <MaterialIcons name="shopping-cart" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: -80 }}>
          <Rectangle title="Compare" />
        </View>

        <View>
          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose a Product</Text>
                <View
                  style={{
                    maxHeight: 300,
                    width: 200,
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  {/* Giới hạn chiều cao */}
                  <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.productItem}
                        onPress={() => handleProductSelect(item)}
                      >
                        <View style={styles.itemContainer}>
                          <Image
                            source={{ uri: item.imgSrc }}
                            style={styles.productImage}
                          />
                          <Text style={styles.productText}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {/* Scrollable Table */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Compare</Text>
        </View>
        <View style={styles.tableContainer}>
          {/* Fixed Column */}
          <View style={styles.fixedColumn}>
            {/* Header for Fixed Column */}
            <Text style={[styles.cell, styles.headerCell, { height: 160 }]}>
              Image
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Title</Text>
            <Text style={[styles.cell, styles.headerCell]}>Rating</Text>
            <Text style={[styles.cell, styles.headerCell]}>Status</Text>
            <Text style={[styles.cell, styles.headerCell]}>Price</Text>
            <Text style={[styles.cell, styles.headerCell]}>Original Price</Text>
          </View>

          {/* Scrollable Columns */}
          <ScrollView horizontal style={styles.scrollableContent}>
            <View style={styles.table}>
              {/* Data Columns */}
              {items.map((item, index) => (
                <View key={item.id} style={styles.column}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imgSrc }} style={styles.image} />
                    {index !== 0 && ( // Kiểm tra nếu không phải là phần tử đầu tiên
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.id)} // Thêm logic để xóa item
                      >
                        <Text style={styles.deleteButtonText}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.title}</Text>
                  <Text style={styles.cell}>{item.rating}</Text>
                  <Text style={styles.cell}>{item.sale ?? ""}</Text>
                  <Text style={styles.cell}>{item.price}</Text>
                  <Text style={styles.cell}>{item.pricesale}</Text>
                </View>
              ))}

              {/* Add Button Column */}
              <View style={styles.column}>
                <View style={styles.addColumn}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={toggleModal}
                  >
                    <View style={styles.addbuttonimg}>
                      <AntDesign
                        name="pluscircleo"
                        size={50}
                        color="#b88e2f"
                        textAlign="center"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {/* product */}
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text style={styles.title}>List Product</Text>
          </View>
          <Products onLengthChange={handleLengthChange} ShowValue={showValue} />{" "}
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
      </View>
    </ScrollView>
  );
};
export default CompareScreen;
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 2, // Tạo hiệu ứng đổ bóng
  },
  fixedColumn: {
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderColor: "#ddd",
    minWidth: 120,
    borderRadius: 8,
    overflow: "hidden", // Giữ các góc bo tròn
  },
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  table: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 5,
  },
  cell: {
    padding: 10,
    minWidth: 120,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    fontSize: 14,
    color: "#333",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderColor: "#ddd",
    fontSize: 15,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,

    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 3, // Đổ bóng cho header
  },
  appDrawerContainer: {
    backgroundColor: "#f0f0f0",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1, // Hiệu ứng nổi nhẹ
  },
  appBackIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  headertext: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  addColumn: {
    flex: 1, // Chiếm toàn bộ chiều cao cột
    justifyContent: "flex-end", // Căn dưới cùng
    alignItems: "center",
    paddingVertical: 10,
  },

  addbuttonimg: {
    width: 100,
    height: "100%",
    backgroundColor: "#83c0e5",
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 5,
  },
  imageContainer: {
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image1: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginVertical: 5,
  },
  //modal
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    width: "100%",
    justifyContent: "space-between",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10, // Khoảng cách giữa ảnh và văn bản
    borderRadius: 5, // Bo góc cho ảnh (nếu cần)
  },
  productText: {
    fontSize: 16,
    color: "#000",
    flex: 1, // Để văn bản chiếm không gian còn lại nếu cần
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  productText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#E53935",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
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
