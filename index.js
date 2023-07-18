const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var engine = require('consolidate');
const { Server } = require('socket.io');
const { Console } = require('console');

//set view engine:
app.set('views', __dirname + '/pages');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

//create io server
const sio = new Server(server);

//sio events
sio.on("connection", (stream) => {
    console.log('someone connected!');

    //sending a massage
    stream.broadcast.emit('hi');

    //recieved request to connect to a code block
    stream.on('connect-to-room', (msg) => {
        console.log('got connection request to ', msg);
    });
  });

 
//static routes:
app.use("/socketio",express.static("./node_modules/socket.io/client-dist"));
app.use("/bootstrap",express.static("./node_modules/bootstrap/dist"));
app.use("/css",express.static("./static/css"));
app.use("/img",express.static("./static/img"));
app.use("/js",express.static("./static/js"));

app.get('/', (req, res) => {
    res.render("lobby.html")
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
