var options = Object();

function getOptions ()
{
	chrome.storage.sync.get(null, function (data)
	{
		if (Object.entries(data).length === 0 )
		{
			saveOptions();
			return false;
		}
		options = data;
		for (option in options)
		{
			document.getElementById(option).checked = options[option];
		}
	})
}

function saveOptions ()
{
	for (element of document.getElementsByClassName("option"))
	{
		options[element.id] = element.checked;
	}
	chrome.storage.sync.set(options);
}

window.onload = function ()
{
	for (element of document.getElementsByClassName("option"))
	{
		element.addEventListener("change", saveOptions);
	}
	getOptions();
}