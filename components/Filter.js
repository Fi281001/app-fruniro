import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

// Lấy chiều rộng và chiều cao màn hình
const { width, height } = Dimensions.get("window");

const Filter = ({
  onHandleShowValueChange,
  onHandleSortValueChange,
  onOpenDrawer,
}) => {
  const [showOpen, setShowOpen] = useState(false); // State to control visibility of 'Show' dropdown
  const [sortOpen, setSortOpen] = useState(false); // State to control visibility of 'Sort' dropdown
  const [showValue, setShowValue] = useState("12"); // Selected value for 'Show'

  const handleValueChange = (value) => {
    setShowValue(value);
    onHandleShowValueChange(value); // Truyền giá trị mới về Shop
  };
  const [sortValue, setSortValue] = useState("asc"); // Selected value for 'Sort'
  const handleSortValueChange = (value) => {
    setSortValue(value);
    onHandleSortValueChange(value); // Truyền giá trị mới về Shop
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container2}>
        {/* Nút mở Drawer */}
        <View style={styles.content}>
          <Ionicons
            // onPress={openDrawer}
            onPress={onOpenDrawer}
            name="filter"
            size={30}
            color="black"
            style={{ marginRight: 10, paddingLeft: 10 }}
          />
          <Text style={{ fontSize: 24, marginRight: 10 }}>|</Text>
          <Text style={{ fontSize: 20 }}>
            Showing 1 - {showValue} of results
          </Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          <View style={[styles.pickerContainer, { zIndex: 99999 }]}>
            <Text style={{ fontSize: 15 }}>Show</Text>
            <DropDownPicker
              open={showOpen}
              value={showValue}
              items={[
                { label: "6", value: "6" },
                { label: "8", value: "8" },
                { label: "12", value: "12" },
              ]}
              setOpen={setShowOpen}
              setValue={handleValueChange}
              setItems={() => {}}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              zIndex={1000} // Đặt thứ tự trên các thành phần khác
            />
          </View>

          <View style={[styles.pickerContainer, { zIndex: 9999 }]}>
            <Text style={{ fontSize: 15 }}>Sort</Text>
            <DropDownPicker
              open={sortOpen}
              value={sortValue}
              items={[
                { label: "Price ASC", value: "asc" },
                { label: "Price DESC", value: "desc" },
              ]}
              setOpen={setSortOpen}
              setValue={handleSortValueChange}
              setItems={() => {}}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              zIndex={99999} // Đặt thấp hơn dropdown trên
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    width: "100%",
    height: 120,
    backgroundColor: "#f9f1e7",
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "flex-start",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    position: "relative",
  },
  dropdownContainer: {
    height: 10,
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 99999,
    elevation: 10,
  },
  dropdownList: {
    backgroundColor: "#fff",
    zIndex: 99999,
  },
  drawer: {
    position: "absolute",
    top: -50,
    left: -10,
    width: width,
    height: height,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    zIndex: 100000,
  },
  drawerContent: {
    flex: 1,
  },
});
