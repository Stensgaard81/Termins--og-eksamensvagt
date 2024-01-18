document.addEventListener('DOMContentLoaded', function() {
    const highlightedDomains = [
        // Chat-applikationer
        "whatsapp.com",
        "messenger.com",
        "telegram.org",
        // ... Flere Chat Domains
        // Generative AI-værktøjer
        "openai.com",
        "deeplearning.ai",
        // ... Flere AI Domains
    ];

    let table = document.getElementById('pagesTable');
    chrome.storage.local.get({pages: []}, function(data) {
        data.pages.forEach(function(page) {
            let row = table.insertRow();

            row.insertCell(0).textContent = page.time;
            row.insertCell(1).textContent = page.action;
            row.insertCell(2).textContent = page.url;
            row.insertCell(3).textContent = page.text;

            const urlDomain = new URL(page.url).hostname.replace('www.', '');

            if (highlightedDomains.some(domain => urlDomain.includes(domain)) || 
                page.action === "copy" || page.action === "paste") {
                row.style.backgroundColor = 'orange';
            } else {
                row.style.backgroundColor = 'lightgray';
            }
        });
    });
});
