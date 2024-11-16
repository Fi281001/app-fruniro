import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import BlogScreen from "./screens/BlogScreen";
import SettingScreen from "./screens/SettingScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import DetailProductScreen from "./screens/DetailProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginAndRegister from "./screens/LoginAndRegister";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#b88e2f",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: true,
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
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-bag" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Blog"
          component={BlogScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Detail"
          component={DetailProductScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="detail" size={size} color={color} />
            ),
            tabBarStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="detail" size={size} color={color} />
            ),
            tabBarStyle: { display: "none" },
          }}
        /> */}
        {/* <Tab.Screen
          name="Login"
          component={LoginAndRegister}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="detail" size={size} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
