import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
const Filter = () => {
  const [showOpen, setShowOpen] = useState(false); // State to control visibility of 'Show' dropdown
  const [sortOpen, setSortOpen] = useState(false); // State to control visibility of 'Sort' dropdown
  const [showValue, setShowValue] = useState("12"); // Selected value for 'Show'
  const [sortValue, setSortValue] = useState("asc"); // Selected value for 'Sort'

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Ionicons name="filter" size={30} color="black" marginRight={10} />
        <Text style={{ fontSize: 24, marginRight: 10 }}>|</Text>
        <Text style={{ fontSize: 20 }}>Showing 1 - {showValue} of results</Text>
      </View>
      <View style={styles.options}>
        <View style={styles.pickerContainer}>
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
            setValue={setShowValue}
            setItems={() => {}}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={{ fontSize: 15 }}>Sort</Text>
          <DropDownPicker
            open={sortOpen}
            value={sortValue}
            items={[
              { label: "ASC", value: "asc" },
              { label: "DESC", value: "desc" },
            ]}
            setOpen={setSortOpen}
            setValue={setSortValue}
            setItems={() => {}}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownList}
          />
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: "#f9f1e7",
    padding: 10,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  dropdownContainer: {
    height: 10,
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  dropdownList: {
    backgroundColor: "#fff",
  },
});
