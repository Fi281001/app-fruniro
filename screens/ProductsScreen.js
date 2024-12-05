import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import Rectangle from "../components/Rectangle";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";

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
  const [drawerVisible, setDrawerVisible] = useState(false);
  // model
  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const handleOverlayPress = () => {
    // Đóng modal khi nhấp vào lớp phủ mờ
    setDrawerVisible(false);
  };

  const [minValue, setMinValue] = useState(150000);
  const [maxValue, setMaxValue] = useState(8000000);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const colors = ["red", "blue", "green", "yellow"]; // Danh sách màu mẫu

  const circleStyle = (color) => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color,
    margin: 5,
    borderWidth: selectedColor.includes(color) ? 2 : 0,
    borderColor: "#000",
  });

  const handleCircleClick = (color) => {
    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter((c) => c !== color)); // Bỏ chọn màu
    } else {
      setSelectedColor([...selectedColor, color]); // Thêm màu đã chọn
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const [filteredMinValue, setFilteredMinValue] = useState(minValue);
  const [filteredMaxValue, setFilteredMaxValue] = useState(maxValue);
  const toggleDrawer = () => {
    // Khi nhấn Apply, lưu giá trị min và max để truyền xuống Products
    setFilteredMinValue(minValue);
    setFilteredMaxValue(maxValue);
    handleCloseDrawer();
  };
  const handleCancel = () => {
    setMinValue(150000);
    setMaxValue(8000000);
  };
  return (
    <View>
      <Header />
      {/*  Modal cho Drawer và lớp phủ mờ */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={drawerVisible}
        onRequestClose={handleCloseDrawer}
      >
        {/* Lớp phủ mờ */}
        <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress}>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        <View style={styles.drawerContainer}>
          {/* Nội dung Drawer */}
          <TouchableOpacity onPress={handleCloseDrawer}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.textModel}>
            Price: {minValue} Rp - {maxValue} Rp
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={maxValue - 1} // Giới hạn Min để không vượt Max
              value={minValue}
              step={1}
              onValueChange={(value) => setMinValue(value)}
              minimumTrackTintColor="#b88e2f"
              maximumTrackTintColor="#ecf0f1"
            />
            <Slider
              style={styles.slider}
              minimumValue={minValue + 1} // Giới hạn Max để không nhỏ hơn Min
              maximumValue={100}
              value={maxValue}
              step={1}
              onValueChange={(value) => setMaxValue(value)}
              minimumTrackTintColor="#b88e2f"
              maximumTrackTintColor="#ecf0f1"
            />
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.title}>Colors</Text>
            <View style={styles.checkboxMain}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => handleCircleClick(color)}
                  style={circleStyle(color)}
                />
              ))}
            </View>
          </View>

          {/* Bộ lọc kích thước */}
          <View style={styles.filterSection}>
            <Text style={styles.title}>Size</Text>
            <View style={styles.sizeFilter}>
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => handleSizeClick(size)}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    Size {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Nút Apply */}
          <View style={styles.action}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView ref={scrollRef}>
        <Rectangle title="Shop" />
        <View style={{ zIndex: 1 }}>
          <Filter
            onHandleShowValueChange={handleShowValueChange}
            onHandleSortValueChange={handleSortValueChange}
            onOpenDrawer={handleOpenDrawer} // Truyền hàm mở Drawer vào Filter
          />
        </View>

        <View style={{ zIndex: 0 }}>
          <Text style={styles.name}>Products</Text>
          {(minValue !== 150000 || maxValue !== 8000000) && ( // Kiểm tra nếu min và max không phải giá trị mặc định
            <View style={styles.chip}>
              <View style={styles.chipContainer}>
                <Text>
                  {minValue} Rp - {maxValue} Rp
                </Text>
                <Text onPress={handleCancel} style={styles.chipx}>
                  x
                </Text>
              </View>
            </View>
          )}
          <Products
            onLengthChange={handleLengthChange}
            ShowValue={showValue}
            SortValue={sortvalue}
            currentPage={currentPage}
            minValue={filteredMinValue} // Truyền minValue đã được áp dụng
            maxValue={filteredMaxValue} // Truyền maxValue đã được áp dụng
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Lớp phủ mờ
    zIndex: 1, // Đảm bảo lớp phủ mờ nằm trên các thành phần khác
  },
  drawerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    zIndex: 2, // Đảm bảo Drawer nằm trên lớp phủ mờ
    padding: 20,
    borderRadius: 40,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    top: 20,
    right: 20,
    padding: 20,
  },
  containerModel: { flex: 1, justifyContent: "center", alignItems: "center" },
  slider: {
    width: 150, // Mỗi thanh trượt chiếm nửa chiều dài
    height: 40,
  },
  textModel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 50,
  },
  filterSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxMain: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeFilter: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedSizeButton: {
    backgroundColor: "#b88e2f",
    borderColor: "black",
  },
  sizeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedSizeText: {
    color: "#fff",
  },
  action: {
    marginTop: 20,
    alignItems: "center",
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#b88e2f",
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  chip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chipContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#f9f1e7",
    borderRadius: 10,
    width: "60%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#d3a87c",
    borderStyle: "solid",
  },
  chipx: {
    color: "red",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
