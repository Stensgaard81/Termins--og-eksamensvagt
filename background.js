let pages = [];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        savePageData(changeInfo.url);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "copy" || request.type === "paste") {
        savePageData(sender.tab ? sender.tab.url : "Unknown", request.type, request.text);
    }
});

function savePageData(url, action = "visit", text = "") {
    const currentTime = new Date().getTime();
    pages = pages.filter(page => currentTime - new Date(page.time).getTime() < 8 * 3600 * 1000);
    pages.push({url: url, time: new Date().toISOString(), action: action, text: text});
    chrome.storage.local.set({pages: pages});
}
