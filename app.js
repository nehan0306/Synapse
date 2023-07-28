// Creating the Express App
const express = require('express');
const app = express();

// Creating Server
const http = require('http');
const server = http.createServer(app);

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

app.get('/tools', (req, res)=>{
    res.render('tools');
})

const port = 3000;
server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})