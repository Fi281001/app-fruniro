import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
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
  const { imgSrc, title, id, price, pricesale, name } = route.params;

  return (
    <View style={styles.comparecontainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headertext}>Compare</Text>
        <View>
          <TouchableOpacity onPress={() => redirectCart()}>
            <MaterialIcons name="shopping-cart" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgcontainer}>
            <View>
              <Image source={{ uri: imgSrc }} style={styles.image} />
              <Text style={styles.name}>{name}</Text>
              <View style={styles.starContainer}>
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
              </View>
            </View>

            <View>
              {/* <Image
                source={require("../img/banner2.png")}
                style={styles.image}
              /> */}

              <View style={styles.iconContainer}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="black"
                  textAlign="center"
                />
              </View>

              <Text style={styles.name}>Name</Text>
              <View style={styles.starContainer}>
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
                <MaterialIcons name="star" size={20} color="black" />
              </View>
            </View>
          </View>
          <View style={styles.content}></View>
        </ScrollView>
      </View>
    </View>
  );
};
export default CompareScreen;
const styles = StyleSheet.create({
  comparecontainer: {
    marginTop: 50,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appBackIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  headertext: {
    fontSize: 28,
    fontWeight: "400",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginVertical: 10,
  },
  imgcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 150,
    resizeMode: "cover",
    borderRadius: 25,
  },
  iconContainer: {
    width: 180,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  name: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: "600",
  },
});
