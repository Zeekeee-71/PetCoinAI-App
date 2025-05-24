import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SvgXml } from 'react-native-svg';
import { pet } from '../../assets/icons/chatbot-icons';

const ChatMessage = (props) => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <View style={styles.message}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <SvgXml xml={pet} width="28" height="28" />
          <Text style={styles.username}>You</Text>
        </View>
        <Text style={styles.time}>
          {hours}:{minutes}
        </Text>
      </View>
      <Text style={styles.messageText}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#f1f2f3",
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontWeight: "500",
  },
  time: {
    fontSize: 10,
    fontWeight: "600",
  },
  messageText: {
    fontSize: 14,
    width: "100%",
    marginTop: 8,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default ChatMessage;
