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

// Do PeerJS server không xử lý data channel, cần Agent đăng ký làm Peer Client để nhận data
const { Peer } = require('peerjs');

const agentId = 'agent-1234';
const peer = new Peer(agentId, {
    host: 'localhost', // đổi nếu deploy
    port: 8030,
    path: '/peerjs',
});

peer.on('open', (id) => {
    console.log(`[agent] Peer client opened with ID: ${id}`);
});

peer.on('connection', (conn) => {
    console.log(`[agent] Data connection established with: ${conn.peer}`);

    conn.on('data', async (raw) => {
        try {
            const data = JSON.parse(raw);
            if (data.type === 'mouse_click') {
                // await mouse.click(Button.LEFT);
                console.log('Mouse clicked');
            } else if (data.type === 'key_press') {
                const key = data.key.toUpperCase();
                console.log('Key pressed:', key);
                // if (key in Key) {
                //     // await keyboard.type(Key[key]);
                // } else {
                //     console.warn('Unsupported key:', key);
                // }
            }
        } catch (err) {
            console.error('Invalid message or action:', err);
        }
    });
});
