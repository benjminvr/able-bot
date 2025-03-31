import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ChatBotUI = ({ messages, botTyping, userInput, setUserInput, sendMessage, botIcon, userIcon, sendIcon }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col max-w-md h-[80vh] mx-auto mt-10 bg-muted rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-black text-white shadow-md rounded-t-2xl">
        <h1 className="text-lg font-semibold">AbleBot</h1>
      </div>

      <div id="messages" className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === 'bot' ? 'items-start' : 'items-end justify-end'}`}
          >
            {/* Bot's Message */}
            {message.from === 'bot' && (
              <>
                <img
                  src={botIcon}
                  alt="bot"
                  className="w-8 h-8 rounded-full object-cover mr-2" 
                />
                <div className="rounded-2xl px-4 py-2 max-w-xs text-sm text-left shadow-md bg-gray-200 text-gray-700">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </>
            )}

            {/* User's Message */}
            {message.from === 'user' && (
              <>
                <div className="rounded-2xl px-4 py-2 max-w-xs text-sm text-left shadow-md bg-blue-500 text-white">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                <img
                  src={userIcon}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover ml-2 shadow"
                />
              </>
            )}
          </div>
        ))}
        {/* Scroll to latest message */}
        <div ref={messagesEndRef} />
      </div>

      {botTyping && (
        <div className="flex justify-center items-center p-2">
          <img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="typing..." className="w-12" />
        </div>
      )}

      <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userInput.trim()) {
                sendMessage();
                e.preventDefault();
              }
            }}
            className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
          <button
            onClick={sendMessage}
            className="absolute right-3 p-2 bg-transparent hover:bg-gray-200 rounded-full"
          >
            <img src={sendIcon} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
