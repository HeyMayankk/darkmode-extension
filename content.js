let isDarkMode = false;

// Get the current dark mode setting from storage
chrome.storage.sync.get("darkMode", (data) => {
    isDarkMode = data.darkMode || false; // Default to false if not set
    applyDarkMode(isDarkMode); // Apply the current mode
});

// Function to apply dark mode styles
function applyDarkMode(dark) {
    if (dark) {
        document.body.style.backgroundColor = "#121212"; // Dark background
        document.body.style.color = "#ffffff"; // Light text color
    } else {
        document.body.style.backgroundColor = ""; // Reset background
        document.body.style.color = ""; // Reset text color
    }
}

// Listen for messages from the popup to toggle dark mode
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.toggle !== undefined) {  // Check if toggle is defined in request
        isDarkMode = !isDarkMode; // Toggle the mode
        chrome.storage.sync.set({ darkMode: isDarkMode }); // Save the new setting
        applyDarkMode(isDarkMode); // Apply the new mode
        sendResponse({ status: isDarkMode }); // Send back the new status
    } else {
        sendResponse({ status: null }); // Send a null response if toggle is not defined
    }
});