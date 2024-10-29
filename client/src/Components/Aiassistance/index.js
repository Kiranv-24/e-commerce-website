import React, { useState } from 'react';
import axios from 'axios';
import { postData } from '../../api';

const AIassistance = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const newMessage = { user: 'You', content: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await postData('/api/chat', { prompt: input });
      const reply = response.data.reply || "Sorry, I didn't get that.";
      setMessages((prev) => [...prev, { user: 'Chatbot', content: reply }]);
    } catch (error) {
      console.error("Chatbot error", error);
    }

    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.user}: </strong>{msg.content}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default AIassistance;
