const pages = {
	openedTabs: []
};

chrome.runtime.onMessage.addListener(
	(message, sender, sendResponse) => {
		if (message.type == "showPageAction")
		{
			chrome.pageAction.show(sender.tab.id);
			if (!pages.openedTabs.includes(sender.tab.id))
				pages.openedTabs.push(sender.tab.id);
		}
		if (message.type == "pageClosed")
		{
			const index = pages.openedTabs.indexOf(sender.tab.id);
			if (index != -1)
				pages.openedTabs.splice(index, 1);
		}
		if (message.type == "tabsRequest")
		{
			sendResponse(pages);
		}
	}
);
