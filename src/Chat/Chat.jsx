// import React, { useEffect, useState } from 'react';
// import axios from '../axios';

// function Chat({ receiverId, currentUser }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   // Fetch messages initially and then poll every 3 seconds
//   useEffect(() => {
//     const fetchMessages = () => {
//       axios
//         .get(`/messages/${receiverId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         })
//         .then((res) => setMessages(res.data));
//     };

//     fetchMessages(); // Initial fetch
//     const interval = setInterval(fetchMessages, 3000); // Poll every 3s

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [receiverId]);

//   // Send message
//   const handleSend = async () => {
//     if (input.trim() === '') return;

//     await axios.post(
//       '/send-message',
//       {
//         receiver_id: receiverId,
//         message: input,
//       },
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       }
//     );

//     setInput('');
//   };

//   return (
//     <div className="chat-box" style={{ border: '1px solid gray', padding: 20, width: 400 }}>
//       <div style={{ height: 300, overflowY: 'scroll', marginBottom: 10 }}>
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: msg.sender_id === currentUser ? 'right' : 'left',
//               marginBottom: 5,
//             }}
//           >
//             <span
//               style={{
//                 padding: 8,
//                 borderRadius: 10,
//                 backgroundColor: msg.sender_id === currentUser ? '#aef' : '#eee',
//                 display: 'inline-block',
//               }}
//             >
//               {msg.message}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type message..."
//           style={{ width: '80%' }}
//         />
//         <button onClick={handleSend} style={{ width: '18%', marginLeft: '2%' }}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;




// Chat.js
import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../axios';

const Chat = ({ receiverId, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const chatContainerRef = useRef(null);

useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]); 

  const handleChatToggle = () => {
    setOpen((prev) => !prev);
  };

  // Fetch messages and poll every 3 seconds
  useEffect(() => {
    if (!open) return;

    const fetchMessages = () => {
      axios
        .get(`/messages/${receiverId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => setMessages(res.data));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, [receiverId, open]);

  // Send message
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    await axios.post(
      '/send-message',
      {
        receiver_id: receiverId,
        message: inputValue,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    setInputValue('');
  };


  const handleSendLinkMessage = async () => {
    const linkMessage = 'http://localhost:5173/checkoutform';
  
    await axios.post(
      '/send-message',
      {
        receiver_id: receiverId,
        message: linkMessage,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };
  

  return (
    <div className="relative">
      {/* Chat Icon */}
      <IconButton
        onClick={handleChatToggle}
        className="fixed bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <ChatIcon className="w-6 h-6" />
      </IconButton>

      {/* Chat Popup */}
      {open && (
        <div
  className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-[9999] transition-opacity duration-300 ease-in-out opacity-100"
>
  <div className="flex justify-between items-center mb-4">
    <Typography variant="h6">Chat</Typography>
    <IconButton onClick={handleChatToggle}>
      <CloseIcon />
    </IconButton>
  </div>

  <div
  ref={chatContainerRef}
  className="h-40 overflow-y-auto flex flex-col space-y-2 px-4"
>
  {messages.map((msg, i) => {
    const isSender = msg.sender_id === currentUser;
    return (
      <div
        key={i}
        className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`p-2 rounded-lg max-w-xs break-words ${
            isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {msg.message.startsWith('http') ? (
            <a
              href={msg.message}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline ${isSender ? 'text-white' : 'text-blue-700'}`}
            >
              {msg.message}
            </a>
          ) : (
            msg.message
          )}
        </div>
      </div>
    );
  })}
</div>



  <div className="flex mt-4">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Type a message..."
      className="border rounded-l-lg p-2 w-full focus:outline-none"
    />
    <button
      onClick={handleSendMessage}
      className="bg-blue-500 text-white rounded-sm p-2 ml-1 hover:bg-blue-600"
    >
      Send
    </button>
    {role === 'coach' && (
      <button
        onClick={handleSendLinkMessage}
        className="bg-green-500 text-white rounded-lg hover:bg-green-600"
        style={{ width: '90px', height: '40px' }}
      >
        Form
      </button>
    )}
  </div>
</div>

        )}

    </div>
  );
};

const role = localStorage.getItem('role');

export default Chat;
