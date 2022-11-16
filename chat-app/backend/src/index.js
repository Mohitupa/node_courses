const path = require("path");
const http = require("http");
const Filter = require("bad-words");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

// app.use(express.json())
const publicDirPath = path.join(__dirname, "./../public");
app.use(express.static(publicDirPath));

// let count = 0;
let msg = "Welcome!";

io.on("connection", (socket) => {
  // console.log("New Connection.....");
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count);
  //   io.emit("countUpdated",count);
  // });

  socket.emit("message", msg);
  socket.broadcast.emit("message", "A new user Join");

  socket.on("sendMessage", (msg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(msg)) {
      return callback("Profanity is not allowed!");
    }
    io.emit("message", msg);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    if(!coords.lat || !coords.lng) {
        return callback("Something went Wrong on lat and lng");
    }
    io.emit("message", `https://google.com/maps?q=${coords.lat},${coords.lng}`);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log("server is listening at " + port);
});
