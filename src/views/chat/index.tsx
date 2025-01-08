
import { Plus, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";

const ChatApp = () => {
  const [users, setUsers] = useState([
    { name: "Alice", profileImage: "https://via.placeholder.com/50" },
    { name: "Bob", profileImage: "https://via.placeholder.com/50" },
    { name: "Charlie", profileImage: "https://via.placeholder.com/50" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUser = () => {
    const newUser = prompt("Enter the name of the new user:");
    if (newUser) {
      setUsers([
        ...users,
        { name: newUser, profileImage: "https://via.placeholder.com/50" },
      ]);
    }
  };

  const handleSendMessage = (message, attachment = null) => {
    if (!selectedUser) return;

    setMessages((prevMessages) => {
      const userMessages = prevMessages[selectedUser.name] || [];
      return {
        ...prevMessages,
        [selectedUser.name]: [
          ...userMessages,
          { text: message, sender: "You", attachment },
        ],
      };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedUser) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSendMessage(file.name, { type: "file", content: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex gap-[20px] h-[calc(100vh-80px)] p-[10px] pt-[40px]">
      <div className={`md:w-1/4 min-w-[250px] md:max-w-[400px] ${selectedUser?"hidden md:block":""} w-full bg-white border rounded-lg p-4`}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full mb-4 focus:outline-none"
          />
          <button
            onClick={handleAddUser}
            className="bg-brand-500 text-white size-12 flex items-center justify-center rounded mb-4 hover:bg-brand-300"
          >
            <Plus />
          </button>
        </div>

        <ul className="space-y-2">
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              onClick={() => setSelectedUser(user)}
              className={`p-2 cursor-pointer rounded-lg flex items-center hover:bg-brand-100 ${
                selectedUser?.name === user.name ? "bg-brand-100" : ""
              }`}
            >
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className={`flex-1  ${selectedUser?"block ":"hidden"} md:flex  flex-col bg-white md:rounded-none rounded-lg p-4 py-[20px] `}>
        {selectedUser ? (
          <>
            <div className="text-lg font-bold border-b pb-2 mb-4">
              Chat with {selectedUser.name}
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages[selectedUser.name] && messages[selectedUser.name].length > 0 ? (
                <ul className="space-y-2">
                  {messages[selectedUser.name].map((msg, index) => (
                    <li
                      key={index}
                      className={`p-2 rounded-lg  w-fit max-w-[70%] ${
                        msg.sender === "You"
                          ? "bg-blue-100 self-end ml-auto text-right"
                          : "bg-gray-200 mr-auto text-left"
                      }`}
                    >
                      <strong>{msg.sender}:</strong> {msg.text}
                      {msg.attachment && (
                        <div className="mt-2">
                          {msg.attachment.type === "file" ? (
                            <a
                              href={msg.attachment.content}
                              download={msg.text}
                              className="text-blue-500 underline"
                            >
                              {msg.text}
                            </a>
                          ) : (
                            <img
                              src={msg.attachment.content}
                              alt="attachment"
                              className="w-full h-auto rounded"
                            />
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 md:h-auto h-[calc(100vh-260px)]  flex-1">No messages found.</p>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
              >
                <GrAttachment/>
              </label>
              <input
                type="text"
                placeholder="Type a message"
                className="border p-2 flex-1 rounded-l-md focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleSendMessage(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector("input[type='text']");
                  if (input && input.value.trim() !== "") {
                    handleSendMessage(input.value.trim());
                    input.value = "";
                  }
                }}
                className=""
              >
                <SendIcon/>
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center flex-1 flex items-center justify-center">
            Select a chat to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
