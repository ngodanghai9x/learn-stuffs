try {
    console.log('✅ Content script loaded!');

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        console.log(
            '🚀 ~ chrome.runtime.onMessage.addListener ~ msg, sender, sendResponse:',
            msg,
            sender,
            sendResponse,
        );
        if (msg.bgAction === 'changeColor') {
            document.body.style.backgroundColor = 'lightgreen';
        }
    });
} catch (error) {
    console.log('🚀 content~ error:', error);
}
