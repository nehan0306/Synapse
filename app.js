// Creating the Express App
const express = require('express');
const app = express();

// Creating Server
const http = require('http');
const server = http.createServer(app);

// Socket Connection for Chatting
const { Server } = require("socket.io");
const io = new Server(server);

// Setting views
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

// Middleware for Form Posting
app.use(express.urlencoded({extended : true}));

// End-Points
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/channels', (req, res)=>{
    res.render('channels');
})

app.get('/resources', (req, res)=>{
    res.render('resources');
})

app.get('/hirings', (req, res)=>{
    res.render('hirings');
})

app.get('/development', (req, res)=>{
    res.render('development_channel');
})

app.get('/robotics', (req, res)=>{
    res.render('robotics-channel');
})

// SOCKETS-FOR-CHATTING PART

const users = {};
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})


// MAKE THE SERVER LISTEN ON PORT-3000
const port = 3000;
server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})