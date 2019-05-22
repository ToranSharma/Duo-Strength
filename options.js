var options = Object();

function getOptions()
{
	chrome.storage.sync.get(null, function (data)
	{
		if (Object.entries(data).length === 0)
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

function saveOptions()
{
	console.log("saving");
	for (element of document.getElementsByClassName("option"))
	{
		options[element.id] = element.checked;
	}
	chrome.storage.sync.set(options);
}

function changeAll(checked)
{
	for (element of document.getElementsByClassName("option"))
	{
		element.checked = checked;
	}
	// Interestingly doesn't trigger the change event so need to save manually. This does save on a repeate saves
	saveOptions();
}

window.onload = function ()
{
	for (element of document.getElementsByClassName("option"))
	{
		element.addEventListener("change", saveOptions);
	}
	document.getElementById("enableAll").onclick = () => changeAll(true);
	document.getElementById("disableAll").onclick = () => changeAll(false);
	getOptions();
}