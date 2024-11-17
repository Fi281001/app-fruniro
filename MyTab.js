import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsScreen from "./screens/ProductsScreen";
import SettingScreen from "./screens/SettingScreen";
import BlogScreen from "./screens/BlogScreen";
import HomeScreen from "./screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#b88e2f",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarLabelStyle: { fontSize: 18 },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 2,
          borderTopColor: "#fff",
          height: 85,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTab;

const styles = StyleSheet.create({});
