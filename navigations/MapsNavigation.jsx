import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";

const MapsNavigation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Maps Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});

export default MapsNavigation;