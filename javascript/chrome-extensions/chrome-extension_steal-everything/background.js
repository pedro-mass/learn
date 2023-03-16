
// page traffic
chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.requestBody) {
        // Capture requestBody data
      }
    },
    {
      urls: ["<all_urls>"],
    },
    ["requestBody"]
);