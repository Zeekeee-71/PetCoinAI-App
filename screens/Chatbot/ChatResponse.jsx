import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Platform } from "react-native";
import { SvgXml } from 'react-native-svg';
import { assistant } from '../../assets/icons/chatbot-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

// Initialize the Google Generative AI with your API key
const API_KEY = "AIzaSyD11keXykCo9eKq7s-c359DiXSaVRTSZqs"; // Using the updated API key
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatResponse = (props) => {
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Real Gemini API integration with improved error handling
  useEffect(() => {
    const fetchResponse = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Create a context prompt to guide the AI to respond about pets
        const contextPrompt = "You are a helpful pet assistant that provides advice and information about pet care, health, training, and other pet-related topics. Respond in a friendly, informative manner.";
        const fullPrompt = `${contextPrompt}\n\nUser question: ${props.prompt}`;
        
        // Initialize the model with explicit configuration
        // Using Gemini 1.5 Flash - most cost-effective model for pet assistant
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          apiVersion: "v1",
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        });
        
        // Generate content with more robust error handling
        const result = await model.generateContent(fullPrompt);
        
        if (!result || !result.response) {
          throw new Error("Empty response from API");
        }
        
        const response = await result.response;
        const text = await response.text();
        
        if (!text || text.trim() === "") {
          throw new Error("Empty text in response");
        }
        
        setGeneratedText(text);
        setLoading(false);
      } catch (err) {
        console.error("Error generating response:", err);
        
        // Provide more specific error messages based on the error type
        if (err.message && err.message.includes("404")) {
          setError("API Error: The Gemini model is not available. This might be due to regional restrictions or API version compatibility.");
        } else if (err.message && err.message.includes("403")) {
          setError("API Error: Access denied. Please check your API key permissions.");
        } else if (err.message && err.message.includes("429")) {
          setError("API Error: Rate limit exceeded. Please try again later.");
        } else if (err.message && err.message.includes("timeout")) {
          setError("API Error: Request timed out. Please check your internet connection.");
        } else {
          // Fallback to a generic but helpful error message
          setError(`Sorry, I couldn't generate a response. ${Platform.OS === 'ios' ? 'There might be compatibility issues with iOS simulators.' : 'Please try again later.'}`);
        }
        
        setLoading(false);
      }
    };
    
    fetchResponse();
  }, [props.prompt]);

  return (
    <View style={styles.response}>
      <View style={styles.header}>
        <View style={styles.assistantInfo}>
          <SvgXml xml={assistant} width="28" height="28" color="#FF9F45" />
          <Text style={styles.assistantName}>Pet Assistant</Text>
        </View>
        <Text style={styles.time}>
          {hours}:{minutes}
        </Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#FF9F45" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      ) : error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorHint}>
            Tip: If you're testing in a simulator, you might need to use a server-side proxy for API calls.
          </Text>
        </View>
      ) : (
        <Markdown style={markdownStyles}>{generatedText}</Markdown>
      )}
    </View>
  );
};

const markdownStyles = {
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  heading1: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: 'bold',
    color: "#333",
  },
  heading2: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: 'bold',
    color: "#333",
  },
  paragraph: {
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 20,
  },
  list_item: {
    marginBottom: 4,
  },
  bullet_list: {
    marginTop: 4,
    marginBottom: 8,
  },
  ordered_list: {
    marginTop: 4,
    marginBottom: 8,
  },
  code_block: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  code_inline: {
    backgroundColor: "#f5f5f5",
    padding: 2,
    fontFamily: 'monospace',
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: "#ddd",
    paddingLeft: 8,
    marginLeft: 8,
    fontStyle: 'italic',
  },
};

const styles = StyleSheet.create({
  response: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fafafa",
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  assistantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  assistantName: {
    fontWeight: "600",
    color: "#FF9F45",
  },
  time: {
    fontSize: 10,
    fontWeight: "600",
  },
  icon: {
    width: 28,
    height: 28,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 8,
  },
  loadingText: {
    color: "#888",
    fontSize: 14,
  },
  responseText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 8,
  },
  errorHint: {
    color: "#7f8c8d",
    fontSize: 12,
    fontStyle: "italic",
  }
});

export default ChatResponse;
