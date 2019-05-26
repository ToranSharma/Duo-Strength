var options = Object();

function getOptions()
{
	chrome.storage.sync.get("options", function (data)
	{
		items = data.options
		if (Object.entries(items).length === 0)
		{
			saveOptions();
			return false;
		}
		options = items;
		for (option in options)
		{
			switch (typeof options[option])
			{
				case "boolean":
					document.getElementById(option).checked = options[option];
					break;
				case "string":
					document.getElementById(option).value = options[option];
					break;
			}
		}
	})
}

function saveOptions()
{
	for (element of document.getElementsByClassName("option"))
	{
		switch (element.type)
		{
			case 'checkbox':
				options[element.id] = element.checked;
				break;
			case 'number':
				options[element.id] = element.value;
				break;
		}
		
	}
	chrome.storage.sync.set({"options": options});
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
		if (element.type == "number")
			element.addEventListener("change", function ()
				{
					if (this.value < this.min)
						this.value = this.defautValue;
					saveOptions();
				});
		else	
			element.addEventListener("change", saveOptions);
	}
	document.getElementById("enableAll").onclick = () => changeAll(true);
	document.getElementById("disableAll").onclick = () => changeAll(false);
	getOptions();
}