try {
    chrome.runtime.onInstalled.addListener(() => {
        console.log('Extension installed.');
    });

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.action === 'changeColor') {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs
                        .sendMessage(tabs[0].id, { bgAction: 'changeColor' })
                        .catch((err) => console.warn('No receiver: ', err));
                }
            });
        }
    });
} catch (error) {
    console.log('🚀 background~ error:', error);
}
