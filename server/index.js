const express = require("express");
const app = express();
const http = require("http");
const cores = require("cors");
const { Server } = require("socket.io");

app.use(cores());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("recieved message", data.message);
    socket.broadcast.emit("recieve_message", data)
  });
});

server.listen(3001, () => {
  console.log("Server is running...");
});
