import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Ranger = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.nametitle}>Browse The Range</Text>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Text>
        <View style={styles.content}>
          <View style={styles.img}>
            <Image source={require("../img/dining.png")} style={styles.image} />
            <Text style={styles.imgtitle}>Dining</Text>
          </View>
          <View style={styles.img}>
            <Image source={require("../img/living.png")} style={styles.image} />
            <Text style={styles.imgtitle}>Living</Text>
          </View>
          <View style={styles.img}>
            <Image
              source={require("../img/bedroom.png")}
              style={styles.image}
            />
            <Text style={styles.imgtitle}>Bedroom</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Ranger;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  },
  nametitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "700",
  },
  title: {
    fontSize: 14,
  },
  content: {
    flexDirection: "column", // Để hiển thị hình ảnh ngang
    justifyContent: "center", // Căn giữa tất cả các phần tử con trong content
    alignItems: "center", // Căn giữa theo chiều dọc
    marginTop: 20,
    width: "100%",
  },
  img: {
    alignItems: "center", // Căn giữa ảnh và văn bản
    padding: 10,
    width: "70%",
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    objectFit: "cover",
  },
  imgtitle: {
    fontSize: 20,
    fontWeight: "400",
  },
});
