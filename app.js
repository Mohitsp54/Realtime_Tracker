const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const port = 3000;
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

io.on('connection', function(socket){
    socket.on('sendLocation', (coords) => {
        io.emit('receiveLocation', {id: socket.id, ...coords});
    });
    socket.on('disconnect', () => {
        io.emit('user-disconnect', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});