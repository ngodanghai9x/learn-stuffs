import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    sendKey: (text: string) => ipcRenderer.invoke('send-key', text),
    testAction: (type: string) => ipcRenderer.invoke('test-action', type),
});
