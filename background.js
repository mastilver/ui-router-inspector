var buffer = [];
function addToBuffer(message) {
    buffer.push(message);
}
chrome.runtime.onMessage.addListener(addToBuffer);

chrome.runtime.onConnect.addListener(function(devToolsPort){

    chrome.runtime.onMessage.removeListener(addToBuffer);
    buffer.forEach(function(msg){
        devToolsPort.postMessage(msg);
    });

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        devToolsPort.postMessage(msg);
    });

});
