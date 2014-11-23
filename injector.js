// Injecting script on the page

var html = document.getElementsByTagName('html')[0];

var script = window.document.createElement('script');
script.src = chrome.extension.getURL('injected.js');

html.appendChild(script);


// Handle messages

var eventProxyElement = document.createElement('div');
eventProxyElement.id = '__UiRouterInspector';
eventProxyElement.style.display = 'none';

html.appendChild(eventProxyElement);

eventProxyElement.addEventListener('uiRouterInspectorData', function () {
  var eventData = eventProxyElement.innerText;
  chrome.extension.sendMessage(eventData);
});
