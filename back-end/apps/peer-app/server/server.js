// server.ts - PeerJS + nut.js server (không dùng Electron, không stream video)

const express = require('express');
const { ExpressPeerServer } = require('peer');
const { Server } = require('http');
// const { mouse, keyboard, Button, Key } = require('@n)ut-tree/nut-js';

const app = express();
const server = new Server(app);
const peerServer = ExpressPeerServer(server, { debug: true, path: '/' });

app.use('/peerjs', peerServer);

const PORT = 8030;
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

// Ghi log kết nối PeerJS
peerServer.on('connection', (client) => {
    console.log(`[peerjs] Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`[peerjs] Peer disconnected: ${client.getId()}`);
});
