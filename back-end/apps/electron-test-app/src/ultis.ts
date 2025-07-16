// main.ts hoặc preload.ts
import { desktopCapturer } from 'electron';
// import sharp from 'sharp'; // để encode PNG/JPEG dễ

import { IpcMainEvent } from 'electron';
import Peer from 'peerjs';
import { mouse, keyboard, Button, Key, Point } from '@nut-tree-fork/nut-js';
import { exec, spawn } from 'child_process';
import os from 'os';

/**
 * @deprecated
 */
export const connectPeer = (event?: IpcMainEvent, agentId = 'agent-1234') => {
    console.log('🚀 ~ connectPeer ~ event:', event);
    const PORT = 8030;

    const peer = new Peer(agentId, {
        host: '172.16.13.231',
        port: PORT,
        path: '/peerjs',
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: 'turn:your.turnserver.com:3478',
                    username: 'user',
                    credential: 'pass',
                },
            ],
        },
        secure: false,
    });
    peer.on('open', (id) => {
        console.log('[Agent] Peer ID:', id);
    });

    peer.on('connection', (conn) => {
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

        conn.on('data', async (data: any) => {
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
    peer.on('call', async (call) => {
        console.log('[Agent] Incoming call...');

        // Capture màn hình
        // const stream = await navigator.mediaDevices.getDisplayMedia({
        //     video: { frameRate: 15, cursor: 'always' } as any,
        //     audio: false,
        // });
        const { stream, screen } = await captureScreen();

        call.answer(stream); // Gửi stream màn hình

        call.on('close', () => {
            console.log('[Agent] Viewer disconnected');
            stream?.getTracks()?.forEach((t) => t.stop());
        });
    });

    return peer;
};

// export async function captureScreen(): MediaStream |Promise<Buffer> {
export async function captureScreen() {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });

    const screen = sources[0]; // lấy màn hình chính

    const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: screen.id,
                // chromeMediaSourceId: 'screen:0:0',
                // minWidth: (screenWidth / screenHeight) * 1080,
                // maxWidth: (screenWidth / screenHeight) * 1080,
                minHeight: 1080,
                maxHeight: 1080,
            },
        } as any,
    });

    return { stream, screen };
    // const track = stream.getVideoTracks()[0];
    // const imageCapture = new (window as any).ImageCapture(track);
    // const bitmap = await imageCapture.grabFrame();
    // track.stop();

    // // Chuyển bitmap sang PNG buffer
    // const canvas = document.createElement('canvas');
    // canvas.width = bitmap.width;
    // canvas.height = bitmap.height;
    // const ctx = canvas.getContext('2d')!;
    // ctx.drawImage(bitmap, 0, 0);
    // const blob = await new Promise<Blob>((r) => canvas.toBlob(r as any, 'image/jpeg', 0.6));
    // const arrayBuffer = await blob.arrayBuffer();

    // return Buffer.from(arrayBuffer);
}

export function getSystemInfo() {
    const osType = os.type(); // 'Linux', 'Windows_NT', 'Darwin'
    const hostname = os.hostname(); // Tên máy
    const nets = os.networkInterfaces();

    const allInterfaces = Object.values(nets).flat();

    const found = allInterfaces.find(
        (net) =>
            net &&
            net.family === 'IPv4' &&
            !net.internal &&
            net.mac &&
            net.mac !== '00:00:00:00:00:00',
    );

    const macAddress = found?.mac ?? 'unknown';

    return {
        osType,
        hostname,
        macAddress,
    };
}

export async function handleInputMessage(msg: any) {
    if (msg.type === 'mouse_move') {
        await mouse.move([new Point(msg.x, msg.y)]);
    }

    if (msg.type === 'mouse_click') {
        const button =
            msg.button === 'left'
                ? Button.LEFT
                : msg.button === 'right'
                ? Button.RIGHT
                : Button.MIDDLE;
        await mouse.click(button);
    }

    if (msg.type === 'key_down') {
        const key = Key[msg.key.toUpperCase()];
        if (key) {
            await keyboard.type(key);
        } else {
            console.warn(`Unknown key: ${msg.key}`);
        }
    }
}

export const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));
