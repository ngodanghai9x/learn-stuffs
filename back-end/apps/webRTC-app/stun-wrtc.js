const { RTCPeerConnection } = require('wrtc');

async function getPublicIPFromStun() {
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
        ],
    });

    pc.createDataChannel('dummy');

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    pc.onicecandidate = (event) => {
        if (!event.candidate) return;

        const cand = event.candidate;
        const candStr = cand.candidate;
        console.log('🚀 ~ RAW:', candStr);

        const ipMatch = candStr.match(/candidate:\S+ \d+ udp \d+ ([\d.:]+) (\d+) typ (\S+)/);
        if (!ipMatch) return;

        const ip = ipMatch[1];
        const port = ipMatch[2];
        const type = ipMatch[3];

        console.log(`✅ ${type.toUpperCase()} Candidate - IP: ${ip}, Port: ${port}`);

        if (type === 'srflx') {
            console.log('🌐 --> Đây là IP Public từ STUN server!');
            pc.close();
        }
    };
}

getPublicIPFromStun();
