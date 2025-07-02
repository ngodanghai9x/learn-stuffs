const { Peer } = require('peerjs');
const { desktopCapturer } = require('electron');

const peer = new Peer('agent-peer-id', {
    host: 'your-server-ip',
    port: 3000,
    path: '/peerjs',
    secure: false,
    config: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }, // STUN public
            {
                urls: 'turn:your.turn.server:3478',
                username: 'your-username',
                credential: 'your-password',
            },
        ],
    },
});

peer.on('open', async (id) => {
    console.log('Agent ID: ', id);
    // Có thể gửi ID này lên Web API để client biết
});

// Khi client kết nối điều khiển (DataChannel)
peer.on('connection', (conn) => {
    conn.on('data', (data) => {
        handleInputMessage(data); // dùng robotjs hoặc nut.js
    });
});

// Khi client yêu cầu xem màn hình
peer.on('call', async (call) => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
            },
        },
    });

    call.answer(stream);
});
