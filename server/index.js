const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const con = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ipl2022/build')));

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../ipl2022/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('new client connected');

  socket.on('sendMsg', (message) => {
    io.emit('message', message);
  });
});

getUserByUsernamePassword = (username, password, callBack) => {
  con.query(
      `select username,password,userid from user where username = ?`, [username, password],
      (error, results, fields) => {
          if (error) {
              callBack(error);
          }
          return callBack(null, results[0]);
      }
  );
};

app.post('/login', async (req, res, next) => {
  try{
    const body = req.body;
    getUserByUsernamePassword(body.username, body.password, (err, results) => {
      if (err) {
          console.log(err);
      }
      if (!results) {
          return res.json({
              success: 0,
              data: "invalid username or password"
          });
      }
      
      if (body.password === results.password) {
          return res.json({
              userId: results.userid,
              username: results.username,
          });
      } else {
          return res.json({
              status: 400,
              data: "invalid username or password"
            });
          }
          
  });
  } catch{
      res.send("Internal server error");
  }
});


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
