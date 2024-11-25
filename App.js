import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import MyStack from "./MyStack";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}

const styles = StyleSheet.create({});
