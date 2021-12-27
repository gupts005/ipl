const express = require("express");
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 8080;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ipl2022/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../ipl2022/build', 'index.html'));
});

io.on('connection',(socket)=>{
  console.log('new client connected');

  socket.on('sendMsg', (message) => {

    io.emit('message', message);
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});