export {};

declare global {
    interface Window {
        electronAPI: {
            sendKey: (text: string) => void;
        };
    }
}

document.getElementById('send-key')?.addEventListener('click', () => {
    window.electronAPI.sendKey('hello');
});
