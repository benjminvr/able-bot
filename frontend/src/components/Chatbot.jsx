import React, { useReducer, useState } from "react";
import ChatBotUI from "./ChatbotUI";
import { fetchChatbotResponse } from "../api/chatApi"; 
import { ICONS } from "../constants"; 


const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
};

const ChatBot = () => {
  const [messages, dispatch] = useReducer(messageReducer, [
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const addMessage = (from, text) => {
    dispatch({ type: "ADD_MESSAGE", payload: { from, text } });
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    addMessage("user", userInput);
    setUserInput("");
    setBotTyping(true);

    try {
      const botResponse = await fetchChatbotResponse(userInput);
      addMessage("bot", botResponse);
    } catch {
      addMessage("bot", "Oops! Something went wrong.");
    }

    setBotTyping(false);
  };

  return (
    <ChatBotUI
      messages={messages}
      botTyping={botTyping}
      userInput={userInput}
      setUserInput={setUserInput}
      sendMessage={sendMessage}
      botIcon={ICONS.bot}
      userIcon={ICONS.user}
      sendIcon={ICONS.send}
    />
  );
};

export default ChatBot;
