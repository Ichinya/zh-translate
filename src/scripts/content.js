console.log('init')

let dict = {};

bg_request({ action: 'get_dict' }, (response) => {
    if ((response == null) || (typeof response == "undefined")) {
        return false;
    }
    dict = response;
})

function bg_request(data, callback) {
    chrome.runtime.sendMessage(data, (response) => { callback(response) });
}

let parsing;

document.addEventListener('DOMNodeInserted', handleDomChange, true);
document.addEventListener('DOMCharacterDataModified', handleDomChange, true);

function handleDomChange(e) {
    if (parsing) return;
    let targetNode = (e.relatedNode) ? e.relatedNode : e.target;
    parsing = true;
    setTimeout(function() {
        parseNode(targetNode);
        parsing = false;
        // console.log('OK');
    }, 300);

}

function parseNode(node) {
    let skipNodes = ['SCRIPT', 'STYLE', 'IMG'];
    if (node == undefined) {
        return;
    }

    let nodeName = node.nodeName.toUpperCase();

    let nodeType = node.type;

    if (nodeType != undefined) {
        while (nodeType.type != undefined) {
            nodeType = nodeType.type;
        }
        nodeType = nodeType.toString().toUpperCase();
    }
    if (skipNodes.indexOf(nodeName) != -1) {
        return;
    }
    node.childNodes.forEach(function(item) {
        parseNode(item);
    })

    if (node.nodeName != "#text") {
        return;
    }
    if (node.nodeValue in dict) {
        node.nodeValue = dict[node.nodeValue];
    } else {
        console.log(node.nodeValue);
    }


    return;
}