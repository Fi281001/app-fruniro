import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Rectangle from "../components/Rectangle";

const BlogScreen = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <Rectangle title="Blog" />
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../img/blogs/img-blog-1.png")}
          />
          <View style={styles.iconcontainer}>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="person" size={14} />
              <Text style={styles.iconText}>Admin</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="calendar" size={14} />
              <Text style={styles.iconText}>14 Oct 2022</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="create" size={14} />
              <Text style={styles.iconText}>Wood</Text>
            </View>
          </View>
          <Text style={styles.title}>Going all-in with millennial design</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read More</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../img/blogs/img-blog-2.png")}
          />
          <View style={styles.iconcontainer}>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="person" size={14} />
              <Text style={styles.iconText}>Admin</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="calendar" size={14} />
              <Text style={styles.iconText}>14 Oct 2022</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="create" size={14} />
              <Text style={styles.iconText}>Wood</Text>
            </View>
          </View>
          <Text style={styles.title}>Exploring new ways of decorating</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read More</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../img/blogs/img-blog-1.png")}
          />
          <View style={styles.iconcontainer}>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="person" size={14} />
              <Text style={styles.iconText}>Admin</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="calendar" size={14} />
              <Text style={styles.iconText}>14 Oct 2022</Text>
            </View>
            <View style={styles.icon}>
              <Icon style={styles.iconname} name="create" size={14} />
              <Text style={styles.iconText}>Wood</Text>
            </View>
          </View>
          <Text style={styles.title}>Going all-in with millennial design</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Read More</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
  iconcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  iconname: {
    paddingRight: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 23,
    fontWeight: "500",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    fontWeight: "200",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "400",
  },
  underline: {
    width: "25%",
    height: 1,
    marginTop: 10,
    backgroundColor: "#aca8a8",
  },
});
