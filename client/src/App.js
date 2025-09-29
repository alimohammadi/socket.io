import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const sendMessage = () => {
    if (message) socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
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
