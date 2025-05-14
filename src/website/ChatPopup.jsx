// src/ChatPopup.js
import React, { useState,useRef,useEffect } from 'react';

const chatData = [
  {
    question: "How may I help you?",
    response: "I'm here to assist with your marketing questions and provide support.",
  },
  {
    question: "What sport do you like?",
    response: "I enjoy discussing various sports. Tell me what you like!",
  },
  {
    question: "What is the best sport?",
    response: "The best sport depends on personal preference. Football, basketball, and cricket are quite popular!",
  },
  {
    question: "Contact With Admin?",
    response: "",
  },
];

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [selectedMessage]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index) => {
    setSelectedMessage(chatData[index].response);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={togglePopup}
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 4.5h6m-6 4.5h3m5.121-4.5L19.5 17.25M8.75 12l-1.906-1.906m8.52 8.52L15 15.75M4.5 19.5V5.25a1.5 1.5 0 011.5-1.5h12.75a1.5 1.5 0 011.5 1.5V19.5l-4.243-4.242"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat</h3>

          <div
            ref={chatContainerRef} // Set the ref for the chat container
            className="mt-2 h-48 overflow-y-auto space-y-2"
          >
            {/* Display selectable chat options */}
            {chatData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(index)}
                className="cursor-pointer bg-gray-200 px-3 py-2 rounded-lg text-left w-fit self-start"
                style={{
                  display: 'inline-block',
                  maxWidth: '80%',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '20px',
                  padding: '8px 12px',
                  marginBottom: '5px',
                  cursor: 'pointer',
                }}
              >
                <p className="text-gray-800">{item.question}</p>
              </div>
            ))}

            {/* Display response as a chat bubble on the right */}
            {selectedMessage && (
              <div
                className="bg-blue-500 text-white px-3 py-2 rounded-lg self-end w-fit"
                style={{
                  display: 'inline-block',
                  maxWidth: '80%',
                  backgroundColor: '#0078fe',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '8px 12px',
                  marginTop: '5px',
                  alignSelf: 'flex-end',
                }}
              >
                <p>{selectedMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
