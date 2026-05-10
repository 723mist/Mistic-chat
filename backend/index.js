const express = require('express');
const https = require('https');
const fs = require('fs');
const { Server } = require('socket.io');
const path = require('path');

const app = express();

const server = https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem')
}, app);

const io = new Server(server);

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/chat/index.html"));
});

app.get('/404', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/404/index.html"));
});

app.use((req, res) => {
    res.redirect("/404");
});

server.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
});



