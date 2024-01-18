document.addEventListener('copy', function() {
    let copiedText = window.getSelection().toString();
    chrome.runtime.sendMessage({type: "copy", text: copiedText});
});

document.addEventListener('paste', function(e) {
    e.clipboardData = e.clipboardData || window.clipboardData;
    let pastedText = e.clipboardData.getData('Text');
    chrome.runtime.sendMessage({type: "paste", text: pastedText});
});
