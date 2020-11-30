let dict = {}

let translate = {
    'ru': 'https://api.jsonbin.io/b/5fc4aad1177c556ef9b4759c/4'
}

readTextFile(translate.ru, function(text) {
    console.log('readfile');
    var data = JSON.parse(text);
    console.log(data);
    dict = data;
});

let message_actions = {
    get_dict: function() {
        return dict;
    },
}


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log(typeof message_actions[request.action]);
        if (typeof message_actions[request.action] === "function") {
            sendResponse(message_actions[request.action](request));
        } else {
            sendResponse('no such action');
        }
    }
);