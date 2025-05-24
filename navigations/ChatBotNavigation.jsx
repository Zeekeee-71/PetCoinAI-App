import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";

const ChatBotNavigation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChatBot Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});

export default ChatBotNavigation;