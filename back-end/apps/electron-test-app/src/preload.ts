import { contextBridge, ipcRenderer } from 'electron';

let peer: any | null = null;

contextBridge.exposeInMainWorld('electronAPI', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,

    sendKey: (text: string) => ipcRenderer.invoke('send-key', text),
    testAction: (type: string) => ipcRenderer.invoke('test-action', type),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
});

console.log('[Preload] contextBridge loaded');
