import React from "react";
import { View, StyleSheet } from "react-native";

const HorizontalRule = () => {
  return <View style={styles.hr} />;
};

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "lightgray", // Or any color you prefer
    borderBottomWidth: StyleSheet.hairlineWidth, // For a thin line
    marginVertical: 10, // Adjust vertical spacing as needed
  },
});

export default HorizontalRule;
