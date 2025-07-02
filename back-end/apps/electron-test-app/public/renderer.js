document.getElementById('send-key')?.addEventListener('click', () => {
    window.electronAPI.sendKey('hello');
});

document.getElementById('test-notepad')?.addEventListener('click', () => {
    window.electronAPI.testAction('notepad');
});

document.getElementById('test-url')?.addEventListener('click', () => {
    window.electronAPI.testAction('url');
});

document.getElementById('test-fake-shutdown')?.addEventListener('click', () => {
    window.electronAPI.testAction('fake-shutdown');
});

document.getElementById('test-terminal')?.addEventListener('click', () => {
    window.electronAPI.testAction('terminal');
});

document.getElementById('get-info')?.addEventListener('click', async () => {
    const info = await window.electronAPI.getSystemInfo();
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(info, null, 2);
});
