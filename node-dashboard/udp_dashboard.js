/*jslint esnext: true:*/


let app = require('express')(); 
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dashboard.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

io.on('connection', function(socket) {
  socket.on('dashboard', (msg) => {
    udpServer.send(JSON.stringify(msg), 3001, "127.0.0.1");  
  });	
});

const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
  io.emit('dashboard', (JSON.parse(msg)));
});

udpServer.on('error', (err) => {
  udpServer.close();
});

udpServer.on('listening', () => {
});

udpServer.bind(3002);
