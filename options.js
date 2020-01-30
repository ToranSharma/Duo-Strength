var options = Object();

function init()
{
	for (element of document.getElementsByClassName("option"))
	{
		// Go through all the option elements
		if (element.parentNode.getElementsByTagName("ul").length !== 0)
		{
			// If there are sub-options
			if (element.id != "showTranslationText" && element.id != "practiceType")
			{
				// Disabled means turn off subfeatures
				if (!element.checked)
				{
					Array.from(element.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option")).forEach(
						(option) => {
							option.disabled = true;
							option.parentNode.classList.add("off");
						}
					);
				}
				element.addEventListener("change", function ()
					{
						Array.from(this.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option")).forEach(
							(option) => {
								option.disabled = !this.checked;
								if (!this.checked)
									option.parentNode.classList.add("off");
								else
									option.parentNode.classList.remove("off");
							}
						);
					});
			}
			else if (element.id == "showTranslationText")
			{
				// Enabled means turn off subfeatures
				if (element.checked)
				{
					element.parentNode.querySelectorAll(":scope>ul>li>input.option").forEach(
						(option) => {
							option.disabled = true;
							option.parentNode.classList.add("off")
						}
					);
				}
				element.addEventListener("change", function ()
					{
						this.parentNode.querySelectorAll(":scope>ul>li>input.option").forEach(
							(option) => {
								option.disabled = this.checked;
								if (this.checked)
									option.parentNode.classList.add("off");
								else
									option.parentNode.classList.remove("off");
							}
						);
					});

			}
			else if (element.id == "practiceType")
			{
				// Subfeatures only on if third option is selected
				if (element.value != "2")
				{
					Array.from(element.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option")).forEach(
						(option) => {
							option.disabled = true;
							option.parentNode.classList.add("off");
						}
					);
				}
				element.addEventListener("change", function ()
					{
						Array.from(this.parentNode.getElementsByTagName("ul")[0].getElementsByClassName("option")).forEach(
							(option) => {
								option.disabled = (this.value != "2");
								if (this.value != "2")
									option.parentNode.classList.add("off");
								else
									option.parentNode.classList.remove("off");
							}
						);
					});
			}
		}
		if (element.type == "number")
			element.addEventListener("change", function ()
				{
					if (this.value < this.min)
						this.value = this.defautValue;
					saveOptions();
				});
		else if (element.type == "text")
		{
			element.addEventListener("keydown", function (e)
				{
					e.preventDefault();
					console.log(e.code);
					console.log(e.key);

					if (this.value[this.value.length-1] != "+")
						this.value="";
					if (e.code.includes("Control"))
					{
						this.value = "Ctrl+"+this.value
					}
					else if (e.code.includes("Shift"))
					{
						if (!e.ctrlKey)
							this.value = "Shift+" + this.value;
						else
							this.value += "Shift+";
					}
					else if (e.code.includes("Meta"))
					{
						if (!e.ctrlKey && e.shiftKey)
							this.value = "Meta+" + this.value;
						else
							this.value += "Meta+";
					}
					else if (e.code.includes("Alt"))
					{	
						if (!e.ctrlKey && !e.shiftKey && !e.metaKey)
							this.value = "Alt+" + this.value
						else
							this.value += "Alt+";
					}
					else if (e.code == "Space")
						this.value += "Space"
					else
						this.value += e.key.toUpperCase();

					if (this.value[this.value.length-1] != "+")
					{
						if (
							!this.value.includes("Ctrl") &&
							!this.value.includes("Alt") &&
							!this.value.includes("Meta")
						)
						{
							// Hotkey is a single key, which should not be allowed
							this.value = options[this.id];
						}
						else
						{
							this.blur();
							saveOptions();
						}
					}
				});
			element.addEventListener("keyup", function (e)
				{
					if (this.value[this.value.length-1] == "+" || this.value == options[this.id])
						this.value = options[this.id];
					else
					{
						saveOptions();
					}
				});
		}
		else
			element.addEventListener("change", saveOptions);
	}
	document.getElementById("enableAll").onclick = () => changeAll(true);
	document.getElementById("disableAll").onclick = () => changeAll(false);
}

function getOptions(firstLoad=false)
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
				case "text":
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
			case "text":
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

window.onload = () => getOptions(true);
