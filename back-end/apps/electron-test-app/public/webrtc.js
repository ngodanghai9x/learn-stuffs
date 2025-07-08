let callActive = null;

function toast(msg) {
    const el = document.getElementById('status');
    el.textContent += msg + '\n';
}

document.getElementById('connectBtn').addEventListener('click', async () => {
    const agentId = 'agent-1234';
    const peerClient = new Peer(agentId, {
        host: '172.16.13.231', // hoặc domain
        port: 8030,
        path: '/peerjs',
        secure: false, // nếu server chạy HTTP
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                // { urls: 'turn:...', credential: '', username: '' }
            ],
        },
    });

    peerClient.on('open', (id) => {
        console.log('[Agent] Connected with ID:', id);
        toast(`[Agent] Connected with ID: ${id}`);
    });

    peerClient.on('error', (err) => {
        console.error('[Peer Error]', err);
        toast(`[Peer Error] ${err.message}`);
    });

    peerClient.on('connection', (conn) => {
        console.log('[Agent] Web client connected:', conn.peer);

        // thêm vào đây:
        const pc = conn.peerConnection;

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('[Agent][ICE Candidate]', event.candidate.candidate);
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log('[Agent][ICE State]', pc.iceConnectionState);
        };

        setTimeout(() => {
            pc.getStats(null).then((stats) => {
                stats.forEach((report) => {
                    if (
                        report.type === 'candidate-pair' &&
                        report.state === 'succeeded' &&
                        report.nominated
                    ) {
                        console.log('[✅ ICE] Candidate pair selected:', {
                            local: report.localCandidateId,
                            remote: report.remoteCandidateId,
                        });
                    }

                    if (report.type === 'local-candidate') {
                        console.log(
                            `[LOCAL] type=${report.candidateType}, ip=${report.ip}, port=${report.port}`,
                        );
                        if (report.candidateType === 'relay') {
                            console.log('🟠 Using TURN server for connection');
                        } else if (report.candidateType === 'srflx') {
                            console.log('🔵 Using STUN (reflexive) for connection');
                        } else if (report.candidateType === 'host') {
                            console.log('🟢 Using direct/local network (host candidate)');
                        }
                    }

                    if (report.type === 'remote-candidate') {
                        console.log(
                            `[REMOTE] type=${report.candidateType}, ip=${report.ip}, port=${report.port}`,
                        );
                    }
                });
            });
        }, 3500); // đủ thời gian để ICE hoàn thành

        conn.on('data', async (data) => {
            console.log('[Agent] Received data:', data);

            try {
                const msg = JSON.parse(data);
                console.log('🚀 ~ conn.on ~ msg:', msg);

                if (msg.type === 'mouse_click') {
                    await fetch('/action', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'mouse_click',
                            button: msg.button || 'left',
                        }),
                    });
                } else if (msg.type === 'key_press') {
                    await fetch('/action', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'key_press', key: msg.key }),
                    });
                }
            } catch (err) {
                console.error('Invalid message:', err);
            }
        });
    });

    // Đợi viewer gọi tới
    peerClient.on('call', async (call) => {
        console.log('[Agent] Incoming call...');

        // Capture màn hình
        // const stream = await navigator.mediaDevices.getDisplayMedia({
        //     video: { frameRate: 15, cursor: 'always' } as any,
        //     audio: false,
        // });
        const sources = await desktopCapturer.getSources({ types: ['screen'] });
        const screen = sources[0]; // lấy màn hình chính
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: screen.id,
                },
            },
        });

        call.answer(stream); // Gửi stream màn hình

        call.on('close', () => {
            console.log('[Agent] Viewer disconnected');
            stream.getTracks().forEach((t) => t.stop());
        });
    });
});
