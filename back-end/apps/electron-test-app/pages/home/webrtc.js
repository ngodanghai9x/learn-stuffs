// const { ipcRenderer } = require('electron');

let callActive = null;
let peerAgent = null;

function toast(msg) {
    const el = document.getElementById('status');
    el.textContent += msg + '\n';
}

document.getElementById('connectBtn').addEventListener('click', async () => {
    const agentId = 'agent-1234';
    peerAgent = new Peer(agentId, {
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

    peerAgent.on('open', (id) => {
        console.log('[Agent] Connected with ID:', id);
        toast(`[Agent] Connected with ID: ${id}`);
    });

    peerAgent.on('error', (err) => {
        console.error('[Peer Error]', err);
        toast(`[Peer Error] ${err.message}`);
    });

    peerAgent.on('connection', (conn) => {
        console.log('[Agent] Web client connected:', conn.peer);

        conn.on('data', async (data) => {
            console.log('[Agent] Nhận data:', data);

            if (data.peerId) {
                console.log('[Agent] Sẽ gọi ngược lại viewer:', data.peerId);
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: 'screen:1:0', // screen.id,
                            },
                        },
                        audio: false,
                    });
                    const call = peerAgent.call(data.peerId, stream);
                    console.log('🚀 ~ conn.on ~ call:', call);

                    call.on('close', () => {
                        console.log('[Agent] Viewer đã ngắt kết nối');
                        stream.getTracks().forEach((t) => t.stop());
                    });
                } catch (err) {
                    console.error('[Agent] Lỗi khi lấy màn hình:', err);
                }
            }
        });

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

        // conn.on('data', async (data) => {
        //     console.log('[Agent] Received data:', data);

        //     try {
        //         const msg = JSON.parse(data);
        //         console.log('🚀 ~ conn.on ~ msg:', msg);

        //         if (msg.type === 'mouse_click') {
        //             await fetch('/action', {
        //                 method: 'POST',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: JSON.stringify({
        //                     action: 'mouse_click',
        //                     button: msg.button || 'left',
        //                 }),
        //             });
        //         } else if (msg.type === 'key_press') {
        //             await fetch('/action', {
        //                 method: 'POST',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: JSON.stringify({ action: 'key_press', key: msg.key }),
        //             });
        //         }
        //     } catch (err) {
        //         console.error('Invalid message:', err);
        //     }
        // });
    });

    // Đợi viewer gọi tới
    // peerAgent.on('call', async (call) => {
    //     console.log('[Agent] Incoming call from', call.peer);
    //     try {
    //         // const sources = await desktopCapturer.getSources({ types: ['screen'] });
    //         // const screen = sources[0];
    //         // const stream = await navigator.mediaDevices.getUserMedia({
    //         //     audio: false,
    //         //     video: {
    //         //         mandatory: {
    //         //             chromeMediaSource: 'desktop',
    //         //             chromeMediaSourceId: screen.id,
    //         //         },
    //         //     },
    //         // });
    //         const stream = await navigator.mediaDevices.getUserMedia({
    //             audio: false,
    //             video: {
    //                 mandatory: {
    //                     chromeMediaSource: 'desktop',
    //                     chromeMediaSourceId: 'screen:1:0', // screen.id,
    //                 },
    //             },
    //         });
    //         // const stream = await window.electronAPI.calling(call.peer);
    //         console.log('🚀 ~ peerClient.on ~ stream:', stream);

    //         call.answer(stream); // 🔥 nếu stream null hoặc fail thì call trả về undefined bên web
    //         callActive = call;

    //         call.on('close', () => {
    //             console.log('[Agent] Viewer disconnected');
    //             stream?.getTracks()?.forEach((t) => t.stop());
    //         });
    //     } catch (err) {
    //         console.error('[Agent] Error while handling incoming call:', err);
    //     }
    // });
});

ipcRenderer = window.electronAPI;

ipcRenderer.on('start-capture', async (event, peerId) => {
    console.log('[Renderer] Start capture for peer:', peerId);

    try {
        // const sources = await window.desktopCapturer.getSources({ types: ['screen'] });
        // const screen = sources[0];

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: 'screen:1:0', // screen.id,
                },
            },
        });
        console.log('🚀 ~ ipcRenderer.on ~ stream:', stream);

        // Dùng stream trực tiếp tại đây: truyền cho peer.call().answer(stream)
        const call = peerAgent.call(peerId, stream);
        console.log('🚀 ~ ipcRenderer.on ~ call:', call);

        call.on('close', () => {
            stream?.getTracks()?.forEach((t) => t.stop());
        });
    } catch (err) {
        console.error('[Renderer] Capture failed:', err);
    }
});
