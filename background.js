const pages = {
	openedTabs: []
};

chrome.runtime.onMessage.addListener(
	(message, sender, sendResponse) =>
    {
		if (message.type === "showPageAction")
		{
			chrome.pageAction.show(sender.tab.id);
			if (!pages.openedTabs.includes(sender.tab.id))
            {
				pages.openedTabs.push(sender.tab.id);
            }
		}
		if (message.type === "pageClosed")
		{
            let closedTabId = -1;
            pages.openedTabs.forEach(
                (tabId) =>
                {
                    chrome.tabs.sendMessage(tabId, {type: "ping"},
                        (reply) =>
                        {
                            if (!reply)
                            {
                                pages.openedTabs = pages.openedTabs.filter(id => id !== tabId);
                            }
                        }
                    );
                }
            );
		}
		if (message.type === "tabsRequest")
		{
			sendResponse(pages);
		}
	}
);
