import { contextBridge, ipcRenderer } from 'electron';

let peer: any | null = null;

contextBridge.exposeInMainWorld('electronAPI', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

    send: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
    },
    on: (channel: string, callback: (...args: any[]) => void) => {
        ipcRenderer.on(channel, (_event, ...args) => callback(...args));
    },
    invoke: (channel: string, data?: any) => {
        return ipcRenderer.invoke(channel, data);
    },

    sendKey: (text: string) => ipcRenderer.invoke('send-key', text),
    testAction: (type: string) => ipcRenderer.invoke('test-action', type),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    calling: (peerId: string) => ipcRenderer.invoke('calling', peerId),
});

console.log('[Preload] contextBridge loaded');
