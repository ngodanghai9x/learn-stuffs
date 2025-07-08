// server.ts - PeerJS + nut.js server (không dùng Electron, không stream video)

const express = require('express');
const { ExpressPeerServer } = require('peer');
const { Server } = require('http');
// const { mouse, keyboard, Button, Key } = require('@n)ut-tree/nut-js';

const app = express();
const server = new Server(app);
const peerServer = ExpressPeerServer(server, { debug: true, path: '/' });

app.use(express.json());
// Middleware để log signaling requests (ai đang signaling tới ai)
app.use('/peerjs', (req, res, next) => {
    if (req.method === 'POST' && req.body?.type === 'OFFER') {
        console.log(`[Signaling] 📡 ${req.body.src} gửi OFFER tới ${req.body.dst}`);
    }
    next();
});

app.use('/peerjs', peerServer);

const PORT = 8030;
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

// Ghi log kết nối PeerJS
peerServer.on('connection', (client) => {
    const peerId = client.getId();
    console.log(`[PeerServer] ✅ Peer connected: ${peerId}`);
});

peerServer.on('disconnect', (client) => {
    const peerId = client.getId();
    console.log(`[PeerServer] ❌ Peer disconnected: ${peerId}`);
});
