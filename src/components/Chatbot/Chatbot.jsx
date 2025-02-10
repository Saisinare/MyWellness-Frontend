"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import { marked } from "marked";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input.trim() };
    const botPlaceholder = { sender: "bot", text: "", loading: true };
    setMessages((prev) => [...prev, userMessage, botPlaceholder]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post('http://192.168.1.4:8000/api/chatbot/', {
        message: userMessage.text,});
      // Adjust this depending on your API response structure
      const responseMessage = response.data.response.response;
      // Convert markdown to HTML
      const markedMessage = marked.parse ? marked.parse(responseMessage) : marked(responseMessage);
      // Replace the placeholder bot message with the actual response
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.loading) {
            return { sender: "bot", text: markedMessage, loading: false };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Replace the placeholder with an error message
      setMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.loading) {
            return { sender: "bot", text: "Sorry, an error occurred.", loading: false };
          }
          return msg;
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container fills the available height and creates a gap for the fixed navbar.
    // 'relative' is needed so that the sticky input is positioned correctly.
    <div className="flex flex-col px-10 pt-20 border rounded-lg w-full min-h-screen mt-21 relative">
      
      {/* Title between navbar and chatbot */}
      <header className="mb-4">
        <h1 className="text-center text-3xl font-bold">
          MyWellness Buddy
        </h1>
      </header>
      
      {/* Scrollable Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex flex-col flex-grow overflow-y-auto bg-gray-100 p-3 gap-2"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            // Use mx-auto to center the message bubble
            className="my-1 w-2/3 mx-auto shadow flex p-5 relative bg-gray-200 fade-in"
          >
            <div className="mr-2 flex items-start">
              {msg.sender === "user" ? (
                <FaUser size={20} className="text-gray-700" />
              ) : (
                <FaRobot size={20} className="text-gray-700" />
              )}
            </div>
            <div className="flex-1">
              {msg.loading ? (
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Chat Input (stays at the bottom) */}
      <div className="sticky bottom-0 bg-gray-50 p-3 z-10">
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 shadow rounded-md focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-3 px-4 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>

      {/* Fade-in animation style */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;