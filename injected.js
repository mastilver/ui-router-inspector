var documentReadyFn = document.ready || function noop(){};


document.ready = function(){
    documentReadyFn();

    // Angular module initialization
    var $inject, $state, $rootScope;
    try{
        $inject = angular.element('html').injector().get;

        $state = $inject('$state');
        $rootScope = $inject('$rootScope');
    }
    catch(e){
        return;
    }


    $rootScope.$watch(function(){
        return $state.get();
    }, function(states){
        sendMessage('allState', states);
    }, true);

    $rootScope.$on('$stateChangeSuccess', function(){
        sendMessage('currentState', $state.current);
    });
};



// Messaging

var eventProxyElement = document.getElementById('__UiRouterInspector');

var customEvent = document.createEvent('Event');
customEvent.initEvent('uiRouterInspectorData', true, true);

function sendMessage (type, obj) {
    eventProxyElement.innerText = JSON.stringify({
        type: type,
        data: obj,
    });
    eventProxyElement.dispatchEvent(customEvent);
}
