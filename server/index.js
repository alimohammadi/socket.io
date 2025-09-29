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

server.listen(3001, () => {
  console.log("Server is running...");
});
