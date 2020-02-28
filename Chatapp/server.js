var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var users = [];
var connections = [];

// port = "http://fe80::dccf:2bd2:9ace:48f6%19";
port = 8000;
server.listen(process.env.PORT || port);
console.log("server running....");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/main.html");
});

app.get("/privatechat", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//open connection with socketio

io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log("connected: %s sockets connected", connections.length);
  //disconnect
  socket.on("disconnect", function(data) {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on("new user", function(data, callback) {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames() {
    io.sockets.emit("get users", users);
  }

  //send message
  //listening for message
  socket.on("send message", function(data) {
    console.log(data);
    io.sockets.emit("new message", {
      msg: data,
      user: socket.username
    });
  });
});
