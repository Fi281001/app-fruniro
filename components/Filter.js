import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Filter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>icon</Text>
        <Text>|</Text>
        <Text>Showing 1 - 12 of results</Text>
      </View>
      <View style={styles.options}>
        <View>
          <Text>Show</Text>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#f9f1e7",
  },
});
