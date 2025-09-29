import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const joinRoom = () => {
    if (room) socket.emit("join_room", room);
  };

  const sendMessage = () => {
    if (message) socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room number..."
        />

        <button onClick={joinRoom}>Join Room</button>
      </div>

      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
      />

      <button onClick={sendMessage}>Send Message</button>

      <h1>Recieved message: {messageRecieved}</h1>
    </div>
  );
}

export default App;
