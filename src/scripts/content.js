console.log('init')

let parsing;

let replace = [
	{
		'selector': "#js-repo-pjax-container > div.container-xl.clearfix.new-discussion-timeline.px-3.px-md-4.px-lg-5 > div > div > div > div.zh-app__workspace.zh-app__workspace--is-wide-screen.zh-app__workspace--full-width > div > div.zhc-workflows__content > div.zhc-workflows-workspace.zhc-workflows-workspace--main > div:nth-child(3) > button",
		'text': 'новая задача'
	},
	{
		'selector': "#js-repo-pjax-container > div.container-xl.clearfix.new-discussion-timeline.px-3.px-md-4.px-lg-5 > div > div > div > div.zh-app__workspace.zh-app__workspace--is-wide-screen.zh-app__workspace--full-width > div > div.zhc-workflows__content > div.zhc-workflows-workspace.zhc-workflows-workspace--main > div.zhc-workflows-pipeline.zhc-workflows-pipeline--highlighted > button",
		'text': "выполнены"
	},
	{
		'selector': "#app > div.zh-workspace.zhu-flex--row.zh-workspace--fixed-layout.zh-workspace > div.zh-workspace__container.zhu-flex--column > div.zh-workspace__content > div > div.zhc-workflows__content > div.zhc-workflows-workspace.zhc-workflows-workspace--main > div:nth-child(3) > button",
		'text': 'Новая задача'
	},
	{
		'selector': "#app > div.zh-workspace.zhu-flex--row.zh-workspace--fixed-layout.zh-workspace > div.zh-workspace__container.zhu-flex--column > div.zh-workspace__content > div > div.zhc-workflows__content > div.zhc-workflows-workspace.zhc-workflows-workspace--main > div.zhc-tooltip-wrapper.zhc-workflows-pipeline.zhc-workflows-pipeline--disabled-without-styles > div > button",
		'text': 'Закрыты'
	},
	{
		'selector': "body > div.js-tooltip > div > div > span",
		'text': "Все закрытые задачи идут сюда"
	}
]
document.addEventListener('DOMNodeInserted', handleDomChange, true);
document.addEventListener('DOMCharacterDataModified', handleDomChange, true);

function handleDomChange(e)
	{
	if (parsing) return;
	let targetNode = (e.relatedNode) ? e.relatedNode : e.target;
	parsing = true;
	setTimeout(function ()
	{
		parseNode(targetNode);
		parsing = false;
		// console.log('OK');
	}, 300);

	}

function parseNode(node)
	{
	let skipNodes = ['SCRIPT', 'STYLE', 'IMG'];
	if (node == undefined)
		{
		return;
		}

	let nodeName = node.nodeName.toUpperCase();

	let nodeType = node.type;

	if (nodeType != undefined)
		{
		while (nodeType.type != undefined)
			{
			nodeType = nodeType.type;
			}
		nodeType = nodeType.toString().toUpperCase();
		}
	if (skipNodes.indexOf(nodeName) != -1)
		{
		return;
		}
	node.childNodes.forEach(function (item)
	{
		parseNode(item);
	})

	if (node.nodeName != "#text")
		{
		return;
		}

	if (node.nodeValue == "Issues")
		{
		console.log('Задачи');
		node.nodeValue = 'Задачи'
		}

	// console.log(typeof node.nodeName, node.nodeName, node, typeof node.nodeValue, node.nodeValue);
	return;
	}

