import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import data from "../data/data.json";
import { useNavigationState } from "@react-navigation/native";
const Products = ({
  show,
  ShowValue,
  SortValue,
  onLengthChange,
  currentPage,
  minValue,
  maxValue,
}) => {
  const navigation = useNavigation();
  const route = useRoute(); // Lấy route hiện tại để kiểm tra màn hình
  const [data, setData] = useState([]);

  // Fetch dữ liệu sản phẩm từ Firebase
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

  // Sắp xếp sản phẩm theo giá
  let sortedProducts = [...data];
  if (SortValue === "asc") {
    sortedProducts.sort((a, b) =>
      parseFloat(
        a?.pricesale.replace(/\./g, "") - b?.pricesale.replace(/\./g, "")
      )
    );
  } else if (SortValue === "desc") {
    sortedProducts.sort((a, b) =>
      parseFloat(
        b?.pricesale.replace(/\./g, "") - a?.pricesale.replace(/\./g, "")
      )
    );
  }
  let filteredProducts = sortedProducts.filter((item) => {
    const priceSale = parseFloat(item?.pricesale.replace(/\./g, ""));
    return priceSale >= minValue && priceSale <= maxValue;
  });

  const displayItems = data.slice(0, parseInt(ShowValue));

  // Pagination
  const startIndex = (currentPage - 1) * parseInt(ShowValue, 10);
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + parseInt(ShowValue, 10)
  );

  const length = data.length;
  useEffect(() => {
    if (onLengthChange && typeof onLengthChange === "function") {
      onLengthChange(length);
    }
  }, [length, onLengthChange]);

  const gotoDetail = (item) => {
    navigation.navigate("Detail", {
      imgSrc: item.imgSrc,
      title: item.title,
      name: item.name,
      id: item.id,
      pricesale: item.pricesale,
      price: item.price,
      sale: item.sale,
    });
  };
  // Điều kiện để hiển thị paginatedProducts chỉ khi ở màn hình ProductScreen

  const isCurrentScreen = useNavigationState(
    (state) => state.routes[state.index].name === "Products"
  );
  const productsToDisplay = isCurrentScreen ? paginatedProducts : displayItems;

  return (
    <View>
      <View style={styles.productList}>
        {/* Hiển thị sản phẩm theo điều kiện */}
        {productsToDisplay.map((item) => (
          <View key={item.id} style={styles.productContainer}>
            <TouchableOpacity onPress={() => gotoDetail(item)}>
              {item.sale && (
                <Text
                  style={[
                    styles.sale,
                    {
                      backgroundColor: item.sale === "New" ? "green" : "red",
                    },
                  ]}
                >
                  {item.sale}
                </Text>
              )}
              <Image source={{ uri: item.imgSrc }} style={styles.image} />
              <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>

                <Text style={styles.price}>
                  {item.pricesale
                    ? `Rp ${item.pricesale}`
                    : "Price not available"}
                </Text>
                <Text style={styles.price2}>{item.price}</Text>
              </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    zIndex: 0,
  },
  productContainer: {
    backgroundColor: "white",
    position: "relative",
    flexBasis: "48%",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Tăng chiều cao của bóng
    shadowOpacity: 0.5, // Tăng độ rõ của bóng (gợi ý: thử giá trị từ 0.4 đến 0.7)
    shadowRadius: 6, // Tăng kích thước vùng mờ của bóng
    elevation: 10, // Tăng độ rõ của bóng trên Android
  },
  sale: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10, // Tạo độ bo cho góc trái của border trên
    borderTopRightRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    textAlign: "left",
  },
  price: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  price2: {
    fontSize: 12,
    color: "red",
    textAlign: "left",
    textDecorationLine: "line-through",
  },
});
