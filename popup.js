document.getElementById("toggle").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Check if there are any tabs available
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { toggle: true }, (response) => {
                // Check if response is undefined or if there's an error
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else {
                    console.log('Dark mode is now', response.status ? 'enabled' : 'disabled');
                }
            });
        }
    });
});