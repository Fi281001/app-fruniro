import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Products from "../components/Products";
import { useNavigation, useRoute } from "@react-navigation/native";
const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];
const DetailProductScreen = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");

  const nav = useNavigation();
  const gotoProducts = () => {
    nav.navigate("Products");
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.imagecontainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => nav.goBack()}>
                <MaterialIcons name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.icon}>
              <MaterialIcons name="shopping-cart" size={26} color="black" />
            </View>
          </View>
          <Image
            source={require("../img/products/image1.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.containercontent}>
          {/* Title and Price in the same row */}
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Leviosa</Text>
            <Text style={styles.price}>2.500.000</Text>
          </View>

          {/* Star Rating */}
          <View style={styles.starContainer}>
            <MaterialIcons name="star" size={20} color="black" />
            <MaterialIcons name="star" size={20} color="black" />
            <MaterialIcons name="star" size={20} color="black" />
            <MaterialIcons name="star" size={20} color="black" />
            <MaterialIcons name="star" size={20} color="black" />
          </View>

          {/* Share section */}
          <View style={styles.shareContainer}>
            <Text style={styles.share}>Share: </Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="facebook"
                size={20}
                color="black"
                style={styles.shareIcon}
              />
              <FontAwesome
                name="linkedin"
                size={20}
                color="black"
                style={styles.shareIcon}
              />
              <FontAwesome
                name="twitter"
                size={20}
                color="black"
                style={styles.shareIcon}
              />
            </View>
          </View>

          {/* Product Description */}
          <Text style={styles.description}>
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </Text>
          <Text style={[styles.fontText, styles.sizeText]}>Size</Text>
          <View style={styles.sizeContainer}>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("S")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "S" && styles.selectedText,
                ]}
              >
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("M")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "M" && styles.selectedText,
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("L")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "L" && styles.selectedText,
                ]}
              >
                L
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sizeValueContainer}
              onPress={() => setSelectedSize("XL")}
            >
              <Text
                style={[
                  styles.sizeValueText,
                  selectedSize === "XL" && styles.selectedText,
                ]}
              >
                XL
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.fontText, styles.sizeText]}>Colors</Text>
          <View style={styles.colorContainer}>
            {colorsArray.map((color, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(color)}
                >
                  <View
                    style={[
                      styles.borderColorCircle,
                      selectedColor === color && {
                        borderColor: color,
                        borderWidth: 2,
                        borderRadius: 24,
                      },
                    ]}
                  >
                    <View
                      style={[styles.colorCircle, { backgroundColor: color }]}
                    ></View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* button */}
          <View style={styles.actionsContainer}>
            {/* Nút Cập nhật số lượng */}
            <View style={styles.updateQuantityContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="remove" size={20} color="#b88e2f" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="add" size={20} color="#b88e2f" />
              </TouchableOpacity>
            </View>
            {/* Nút Add to Cart */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            {/* Nút So sánh */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Compare</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <Text style={styles.description_title}>Description</Text>
            <Text>
              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
              portable active stereo speaker takes the unmistakable look and
              sound of Marshall, unplugs the chords, and takes the show on the
              road.
            </Text>
            {""}
            <Text>
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of
              vintage styled engineering. Setting the bar as one of the loudest
              speakers in its class, the Kilburn is a compact,stout-hearted hero
              with a well-balanced audio which boasts a clear midrange and
              extended highs for a sound that is both articulate and pronounced.
              The analogue knobs allow you to fine tune the controls to your
              personal preferences while the guitar-influenced leather strap
              enables easy and stylish travel.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../img/single-product/Image1.png")}
                style={styles.image2}
              />
              <Image
                source={require("../img/single-product/Image2.png")}
                style={styles.image2}
              />
            </View>
          </View>
          {/* Related Products */}
        </View>
        {/* Related Products */}

        <View style={styles.product}>
          <Products show={6} />
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

export default DetailProductScreen;

const styles = StyleSheet.create({
  imagecontainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginTop: 30,
    position: "absolute", // Để các icon nổi lên trên hình ảnh
    top: 10, // Cách cạnh trên của ảnh một chút
    left: 10, // Cách cạnh trái một chút
    right: 10, // Cách cạnh phải một chút
    flexDirection: "row",
    justifyContent: "space-between", // Đặt các icon ra hai bên
    width: "100%", // Để các icon trải rộng ngang
    zIndex: 10, // Đảm bảo các icon hiển thị lên trên ảnh
  },
  icon: {
    padding: 10, // Thêm khoảng cách xung quanh icon
    backgroundColor: "transparent",
    borderRadius: 20, // Để icon có hình tròn
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  containercontent: {
    paddingHorizontal: 20,
  },
  share: {
    fontSize: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "",
    alignItems: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  shareIcon: {
    marginHorizontal: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  fontText: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "400",
    color: "#444444",
    color: "#444444",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  // btutton
  actionsContainer: {
    flexDirection: "row", // Đặt các nút nằm ngang
    justifyContent: "space-between", // Tạo khoảng cách đều giữa các nút
    alignItems: "center", // Căn giữa các nút theo chiều dọc
    marginTop: 20,
  },
  updateQuantityContainer: {
    flexDirection: "row", // Đặt các nút cộng, trừ, và số lượng theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    borderRadius: 10, // Viền bo tròn
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#b88e2f",
  },
  iconButton: {
    padding: 5,
    borderRadius: 5, // Viền bo tròn cho nút cộng, trừ
  },
  quantityText: {
    fontSize: 18,
    color: "black", // Màu chữ số lượng
    marginHorizontal: 10, // Khoảng cách giữa nút cộng, trừ và số
  },
  button: {
    flexDirection: "row", // Đảm bảo biểu tượng và văn bản nằm ngang
    alignItems: "center", // Căn giữa biểu tượng và văn bản theo chiều dọc
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10, // Viền bo tròn
    borderWidth: 2,
  },
  buttonText: {
    marginLeft: 5, // Khoảng cách giữa biểu tượng và văn bản
    color: "black", // Màu chữ
    fontSize: 14,
  },
  description: {
    marginTop: 30,
  },
  description_title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row", // Sắp xếp theo chiều ngang
    justifyContent: "space-between", // Đẩy hai ảnh ra hai bên
    alignItems: "center", // Căn giữa theo trục dọc
  },
  image2: {
    width: 190, // Đặt kích thước ảnh phù hợp
    height: 180,
    resizeMode: "contain", // Đảm bảo ảnh không bị méo
  },
  product: {
    paddingHorizontal: -100,
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