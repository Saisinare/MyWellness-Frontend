import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaUser, FaRobot } from 'react-icons/fa';
import { marked } from 'marked';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: '', loading: true }]);
      setInput('');
      setLoading(true);

      try {
        const response = await axios.post(`http://192.168.1.2:8000/api/chatbot/`, { message: input.trim() });
        const responseMessage = response.data.response.response;
        const markedMessage = marked(responseMessage);
        setLoading(false);
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) => {
            if (index === prevMessages.length - 1) {
              return { sender: 'bot', text: markedMessage };
            }
            return msg;
          })
        );
      } catch (error) {
        setLoading(false);
        console.error('Error sending message:', error);
      }
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col px-10 pt-20 border rounded-lg overflow-hidden w-screen pb-10 h-screen">
      <div className="flex flex-col items-center p-3 overflow-y-scroll bg-gray-100 font-madefor justify-center h-full gap-2" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-1 w-2/3 shadow flex p-5 relative bg-gray-200 fade-in font-madefor`}
          >
            <div className="top-1 left-0 mt-2 mr-2">
              {msg.sender === 'user' ? (
                <FaUser size={13} className="text-gray-700 -mt-1" />
              ) : (
                <FaRobot size={13} className="text-gray-700" />
              )}
            </div>
            {msg.loading ? (
              <div className="dot-flashing left-3 top-3 relative"></div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex h-1/6 p-3 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border-none shadow rounded-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Me Anything"
        />
        <button onClick={handleSend} className="ml-3 right-11 mt-2 absolute px-4 p-4 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none">
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
