document.getElementById('clickme').addEventListener('click', () => {
    alert('Button clicked!');
});

document.getElementById('btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'changeColor' });
});
