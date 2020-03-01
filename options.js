var options = Object();

function init()
{
	for (element of document.getElementsByClassName("option"))
	{
		if (element.parentNode.getElementsByTagName("ul").length !== 0)
		{
			if (!element.checked)
			{
				for (option of element.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option"))
						option.disabled = true;
			}
			element.addEventListener("change", function ()
				{
					for (option of this.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option"))
						option.disabled = !this.checked;
				});
		}
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
}

function getOptions({firstLoad=false}={})
{
	chrome.storage.sync.get("options", function (data)
	{
		items = data.options
		if (Object.entries(data).length === 0 || Object.entries(items).length === 0)
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
		if (firstLoad)
			init();
	});
}

function saveOptions()
{
	for (element of document.getElementsByClassName("option"))
	{
		if (element.tagName = "INPUT")
		{
			switch (element.type)
			{
				case "checkbox":
					options[element.id] = element.checked;
					break;
				case "number":
					options[element.id] = element.value;
					break;
				case "select-one":
					options[element.id] = element.value;
					break;
			}
		}
	}
	chrome.storage.sync.set({"options": options});
}

function changeAll(checked)
{
	for (element of document.getElementsByClassName("option"))
	{
		switch (element.type)
		{
			case "checkbox":
				element.checked = checked;
				break;
			case "number":
				break;
			case "select-one":
				break;
		}
		if (element.parentNode.parentNode.parentNode.tagName == "LI")
			element.disabled = !checked;
	}
	// Interestingly doesn't trigger the change event so need to save manually. This does save on a repeat saves.
	saveOptions();
}

window.onload = () => getOptions({firstLoad:true});
