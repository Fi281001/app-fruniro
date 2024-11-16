import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Banner = () => {
  return (
    <View>
      <Image source={require("../img/banner2.png")} style={styles.image} />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  image: {
    width: "auto",
    height: 200,
    borderWidth: 2, // Độ dày của viền
    borderColor: "#b88e2f", // Màu sắc của viền
    marginTop: 85,
  },
});
