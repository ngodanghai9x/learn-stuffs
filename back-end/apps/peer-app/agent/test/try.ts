// peer.ts
import Peer, { DataConnection, MediaConnection } from 'peerjs';

// Tạo peer với cấu hình STUN/TURN server
const peer = new Peer({
    host: 'your-peerjs-server.com', // hoặc dùng "0.peerjs.com" nếu public
    port: 443,
    secure: true,
    config: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }, // STUN server miễn phí
            {
                urls: 'turn:your-turn-server.com:3478',
                username: 'your-username',
                credential: 'your-password',
            },
        ],
    },
});

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
});

// Kết nối dữ liệu đến một peer khác
function connectToPeer(remoteId: string): DataConnection {
    const conn = peer.connect(remoteId);
    conn.on('open', () => {
        console.log('Connected to peer');
        conn.send('Hello from ' + peer.id);
    });
    conn.on('data', (data) => {
        console.log('Received:', data);
    });
    return conn;
}

// Nhận kết nối từ peer khác
peer.on('connection', (conn) => {
    conn.on('data', (data) => {
        console.log('Received from remote:', data);
        conn.send('Ack: ' + data);
    });
});
