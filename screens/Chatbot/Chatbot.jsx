import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import ChatMessage from "./ChatMessage";
import ChatResponse from "./ChatResponse";
import { SvgXml } from 'react-native-svg';
import { send } from '../../assets/icons/chatbot-icons';

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);

  const handleSend = () => {
    if (inputText.trim() === "") return;
    
    setListData((prevList) => [...prevList, inputText]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      <FlatList
        style={styles.chatList}
        data={listData}
        renderItem={({ item }) => (
          <View>
            <ChatMessage message={item} />
            <ChatResponse prompt={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Ask your pet assistant..."
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          selectionColor={"#323232"}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <SvgXml xml={send} width="24" height="24" color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatList: {
    paddingHorizontal: 16,
    marginBottom: 80,
  },
  inputBar: {
    backgroundColor: "#ffffff",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#FF9F45", // Using a color that matches pawpaw theme
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});

export default Chatbot;
