import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Living from "../img/living.png";
import Bedroom from "../img/bedroom.png";
import Dining from "../img/dining.png";

const Slider = () => {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số ảnh hiện tại
  const flatListRef = useRef(null); // Sử dụng ref để tham chiếu tới FlatList

  const slides = [
    { id: 1, src: Living },
    { id: 2, src: Bedroom },
    { id: 3, src: Dining },
    { id: 4, src: Living },
    { id: 5, src: Bedroom },
    { id: 6, src: Dining },
  ];

  // Hàm chuyển đổi ảnh tự động sau mỗi 3 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Quay lại đầu danh sách khi đến cuối
    }, 3000); // Thay đổi sau 3 giây

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  // Sử dụng phương thức scrollToIndex để cuộn tới ảnh hiện tại
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const handleButton = () => {
    navigation.navigate("Products");
  };

  return (
    <View style={styles.sliderMain}>
      <View style={styles.sliderTitle}>
        <Text style={styles.headerText}>50+ Beautiful rooms inspiration</Text>
        <Text style={styles.subHeaderText}>
          Our designer already made a lot of beautiful prototype of rooms that
          inspire you
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Explore More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContent}>
        <FlatList
          ref={flatListRef} // Gán ref cho FlatList
          data={slides}
          horizontal={true}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.slide,
                index === currentIndex ? styles.activeSlide : null, // Làm nổi bật ảnh hiện tại
              ]}
            >
              <Image
                source={item.src}
                style={[
                  styles.image,
                  index === currentIndex ? styles.activeImage : null, // Làm nổi bật ảnh hiện tại
                ]}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={currentIndex} // Cập nhật khi currentIndex thay đổi
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderMain: {
    flex: 1,
    flexDirection: "row", // Sắp xếp các phần tử theo chiều ngang
    justifyContent: "space-between", // Căn đều các phần tử
    padding: 10,
    backgroundColor: "#fcf8f3",
  },
  sliderTitle: {
    flex: 1, // Chiếm không gian bên trái
    justifyContent: "center",
    alignItems: "flex-start", // Căn trái cho sliderTitle
    padding: 20,
  },
  headerText: {
    fontSize: 20, // Giảm kích thước chữ
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 14, // Giảm kích thước chữ
    marginVertical: 10,
    textAlign: "left", // Canh chữ trái cho phần mô tả
  },
  sliderContent: {
    flex: 1, // Chiếm không gian bên phải
    padding: 10,
    justifyContent: "center",
    alignItems: "center", // Căn giữa các ảnh trong phần này
    flexDirection: "row", // Để hiển thị ảnh nằm ngang
    gap: 10, // Tạo khoảng cách giữa các ảnh
  },
  buttonText: {
    color: "#b88e2f", // Màu chữ trắng
    fontSize: 18, // Kích thước chữ
    fontWeight: "bold",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Khoảng cách giữa các slide
  },
  image: {
    width: 160, // Điều chỉnh kích thước ảnh sao cho phù hợp
    height: 160,
    resizeMode: "cover",
  },

  activeImage: {
    opacity: 1, // Làm ảnh sáng lên khi được chọn
  },
});

export default Slider;
