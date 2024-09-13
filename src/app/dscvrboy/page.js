'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft, Sparkle } from 'lucide-react';
import { useChat } from 'ai/react';

const DscvrBoy = () => {
  // const [messages, setMessages] = useState([]);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col max-h-[500px] text-white">

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className='text-white'>
        <h3>DscvrBoy <Sparkle className='inline'/></h3>
        <p>Generate an artwork and mint it to your wallet. You must like and follow me before you can interact!</p>
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-3 ${
              message.role === 'user' ? 'bg-gray-400' : 'bg-gray-700'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-black/25">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 bg-blue-50 p-3 focus:outline-none"
          />
          <button
            type='submit'
            className="p-3"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default DscvrBoy;