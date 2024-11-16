import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Rectangle = ({ title }) => {
  return (
    <View style={styles.rectangleContainer}>
      <Image
        source={require("../img/Rectangle1.png")}
        style={styles.image}
        alt="ERROR"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.nav}>
          <Text style={styles.home}>Home</Text>
          <Text style={styles.separator}> &gt; </Text>
          <Text style={styles.shop}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Rectangle;

const styles = StyleSheet.create({
  rectangleContainer: {
    marginTop: 80,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  home: {
    fontSize: 16,
    color: "#000",
  },
  separator: {
    fontSize: 16,
    color: "#000",
    marginHorizontal: 5,
  },
  shop: {
    fontSize: 14,
    color: "#000",
  },
});
