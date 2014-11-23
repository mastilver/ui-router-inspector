var port = chrome.extension.connect();
port.onMessage.addListener(function(msg) {

    msg = JSON.parse(msg);

    var data = msg.data;
    var type = msg.type;

    for(var i = 0, len = callbacks.length; i < len; i++){
        if(type === callbacks[i].type){
            callbacks[i].fn(data);
        }
    }
});

var callbacks = [];
function onMessage(type, fn){
    callbacks.push({
        type: type,
        fn: fn,
    });
}
