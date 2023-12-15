const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket.io
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("user-message", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("client-message", (data) => {
    io.emit("server-message", data);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFIle("/public/index.html");
});

server.listen(9000, () => {
  console.log("Server is listening on port 9000");
});
