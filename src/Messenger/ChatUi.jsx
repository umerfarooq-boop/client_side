import Nav from "../website/Nav";
import React, { useEffect, useState, useRef } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios";
import { useParams } from "react-router-dom";
function ChatUi() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const getsidedata = async () => {
    const response = await axios.get(`/get_sidebar/${id}`);
    if (response && Array.isArray(response.data.sidebar)) {
      setData(response.data.sidebar);
    } else if (response.data && response.data.sidebar) {
      setData([response.data.sidebar]);
    }
  };

  useEffect(() => {
    getsidedata();
  }, [id]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role");
  const handleSelectContact = (data) => {
    localStorage.setItem("reciever", data);
    // alert(data);
    setSelectedContact(data);
  };

  const reciever = localStorage.getItem("reciever");

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    let coach_id = "";
    let player_id = "";

    if (role === 'coach') {
        coach_id = localStorage.getItem('coach_id');
        player_id = reciever;
    } else if (role === 'player') {
        player_id = localStorage.getItem('player_id');
        coach_id = reciever; // Fix: receiver is the coach
    }

    try {
        await axios.post("/send-message", {
            sender_id: id,
            receiver_id: reciever,
            message: inputValue,
            coach_id: coach_id,
            player_id: player_id,
            role:role
        });

        setMessages((prev) => [...prev, { sender: "user", text: inputValue }]);
        setInputValue("");
    } catch (error) {
        console.error("Sending failed", error);
    }
};


  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // const role = localStorage
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact) return;
      try {
        const response = await axios.get(`/messages/${selectedContact}/${id}`);
        if (response.data) {
          // Convert to frontend-friendly format
          const formatted = response.data.map((msg) => ({
            sender: msg.sender_id === parseInt(id) ? "user" : "other",
            text: msg.message,
            created_at: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        }));
          setMessages(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
   
    
    
// 
    fetchMessages(); // initial call
    const interval = setInterval(fetchMessages, 3000); // poll every 3s

    return () => clearInterval(interval);
  }, [selectedContact, id]);




  return (
    <>
      <Nav />

      <div className="flex h-screen bg-indigo-600">
        {/* Chat Sidebar */}
        {isSidebarOpen ? (
          <div className="bg-indigo-800 text-white w-64 flex flex-col">
            {/*  */}
            <div className="flex items-center justify-between p-4 shadow-md">
              <h1 className="text-2xl font-semibold">Chats</h1>
              <IconButton onClick={toggleSidebar}>
                <CloseIcon className="text-white" />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div>
{role === "player" ? (
  <div>
    <div
      key={index}
      className={`flex items-center p-3 cursor-pointer transition duration-200 ${
        selectedContact === item.coach?.id
          ? "bg-indigo-700"
          : "hover:bg-indigo-700"
      }`}
      onClick={() => handleSelectContact(item.coach?.id)}
    >
      <img
        src={`http://127.0.0.1:8000/uploads/coach_image/${item.coach?.image || "default.jpg"}`}
        alt={item.coach?.name || "Coach"}
        className="w-10 h-10 rounded-full mr-3"
      />
      <span>{item.coach?.name || "Unnamed Coach"}</span>
    </div>
  </div>
) 

                    
                    : role === "coach" ? (
                      <div>
                        <div
                          key={index}
                          className={`flex items-center p-3 cursor-pointer transition duration-200 ${
                            selectedContact === item.player?.id
                              ? "bg-indigo-700"
                              : "hover:bg-indigo-700"
                          }`}
                          onClick={() => handleSelectContact(item.player?.id)}
                        >
                          <img
                            src={`http://127.0.0.1:8000/uploads/player_image/${item.player?.image || "default.jpg"}`}
                            alt={item.player?.player_name || "Player"}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span>
                            {item.player?.player_name || "Unnamed Coach"}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No records found.</p>
              )}
            </div>
            {/*  */}
          </div>
        ) : (
          <div className="bg-indigo-800 text-white w-16 flex flex-col items-center justify-center shadow-md">
            <IconButton onClick={toggleSidebar} className="mb-2">
              <ChatIcon className="text-white" />
            </IconButton>

            

            {/* {data ? (
              <div className="flex flex-col items-center">
                {role === "player" ? (
                  <>
                    <img
                      src={`http://127.0.0.1:8000/uploads/coach_image/${data.coach?.image || "default.jpg"}`}
                      alt={data.coach?.name || "Coach"}
                      className="w-10 h-10 rounded-full border-2 border-white mb-1"
                    />
                    <div className="text-sm text-center">
                      {data.coach?.name || "Coach"}
                    </div>
                  </>
                ) : role === "coach" ? (
                  <div>
                    <img
                      src={`http://127.0.0.1:8000/uploads/player_image/${data.player?.image}`}
                      alt={data.player?.player_name || "Coach"}
                      className="w-10 h-10 rounded-full border-2 border-white mb-1"
                    />
                    <div className="text-xs text-center">
                      {data.player?.player_name || "Coach"}
                    </div>
                  </div>
                ) : null}
              </div>
             ) : (
              <div className="text-xs text-center">Profile</div>
            )} */}
          </div>
        )}

        {/* Chat Window */}
        <div className="flex-1 flex flex-col p-4 bg-white">
          {selectedContact ? (
            <>
              <div className="flex items-center mb-4">
                <div className="grid grid-cols-12 gap-8">
                  {" "}
                  {data.map((item, index) => (
                    <div key={index} className="text-center">
                      {role === "player" ? (
                        <div>
                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_image/${item.coach?.image || "default.jpg"}`}
                            alt={item.coach?.name || "Unnamed Coach"}
                            className="w-12 h-12 rounded-full mx-auto"
                          />
                          <p className="text-sm font-light mt-2">
                            {item.coach?.name?.substring(0, 4) + "..." ||
                              "Unnamed Coach"}
                          </p>
                        </div>
                      ) : role === "coach" ? (
                        <div>
                          <img
                            src={`http://127.0.0.1:8000/uploads/player_image/${item.player?.image || "default.jpg"}`}
                            alt={item.player?.player_name || "Unnamed Coach"}
                            className="w-12 h-12 rounded-full mx-auto"
                          />
                          <p className="text-sm font-light mt-2">
                            {item.player?.player_name?.substring(0, 4) + "...." ||
                              "Unnamed Coach"}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 border rounded bg-gray-100">
  {messages.map((msg, index) => (
    <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
      <div className={`inline-block px-3 py-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-300 text-black"}`}>
        {msg.text}
      </div>
      <div className="text-xs text-gray-500">{msg.created_at}</div>
    </div>
  ))}
  <div ref={messagesEndRef} /> {/* 👈 Scroll anchor */}
</div>

              <div className="flex mt-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="border rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white rounded-r-lg px-4 transition duration-300 hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <h1 className="text-xl font-semibold">
              Select a contact to start chatting
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatUi;
