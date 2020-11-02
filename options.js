var options = Object();
var tabs = [];
const ordinalLabels = {
	"0": "Primary",
	"1": "Secondary",
	"2": "Tertiary"
};
let addButtonListItem;

function subOptionsActive(option)
{
	return (
		(!option.className.includes("negative") && option.checked) ||
		(option.className.includes("negative") && !option.checked) ||
		(option.className.includes("selective") && option.getAttribute("subOptionsEnabled").includes(option.value))
	);
}

function setSubOptionsDisabled(option, disabled)
{
	option.parentNode.querySelectorAll(":scope>ul .option").forEach(
		(subOption) => {
			subOption.disabled = disabled;
			if (disabled) subOption.parentNode.classList.add("off");
			else subOption.parentNode.classList.remove("off");
		}
	);
}

function enableSubOptions(option)
{
	setSubOptionsDisabled(option, false);
	directSubOptions = option.parentNode.querySelectorAll(":scope>ul>li>.option");
	directSubOptions.forEach(
		(subOption) => {
			if (!subOptionsActive(subOption))
				setSubOptionsDisabled(subOption, true);
			else
				enableSubOptions(subOption);
		}
	);
}

function init()
{
	for (element of document.getElementsByClassName("option"))
	{
		// Go through all the option elements
		if (element.parentNode.querySelectorAll("ul").length !== 0)
		{
			// There are sub-options
			if (!subOptionsActive(element))
			{
				// Sub options should be disabled.
				setSubOptionsDisabled(element, true);
			}
			element.addEventListener("change", function ()
				{
					if (!subOptionsActive(this))
					{
						setSubOptionsDisabled(this, true);
					}
					else
					{
						enableSubOptions(this);
					}
				}
			);
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
			element.addEventListener("keyup", function(e)
				{
					if (this.value[this.value.length-1] == "+" || this.value == options[this.id])
						this.value = options[this.id];
					else
					{
						saveOptions();
					}
				});
		}
		else if (element.parentNode.parentNode.className.includes(`multiPart`))
		{
			if (element.parentNode.parentNode.querySelector(`.option`) == element)
			{
				// multi part option
				let selectElements = element.parentNode.parentNode.querySelectorAll(`.option`);
				selectElements.forEach(
					(select, index) => {
						select.addEventListener("change", multiPartChangeHandler);
					}
				);
			}
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
		options = {...items};
		for (option in options)
		{
			if (document.querySelector(`#${option}`) === null)
			{
				// Option not found in page, might be an old option, let's remove it and save the options at the end
				delete options[option];
			}
			if (option != "needsStrengtheningListSortOrder")
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
			else
			{
				// needsStrengtheningList order is a multi part option, encoded in one string with comma seperated values
				let sortingCriteria = options[option].split(",");
				const addButton = document.querySelector(`#needsStrengtheningListSortOrder .addSortList`);
				addButtonListItem = addButton.parentNode.cloneNode(true); // save for adding later

				addButton.addEventListener("click", addSortListButtonClickHandler);
				addButtonListItem.querySelector(`.addSortList`).addEventListener("click", addSortListButtonClickHandler); // has to be added seperating as cloning doesn't copy event listeners


				sortingCriteria.forEach(
					(criterion, index) => {

						const element = document.getElementById(option+index);
						element.value = criterion;

						if (criterion > "4")
						{
							// some further sorting can be done
							if (index+1 != sortingCriteria.length)
							{
								// not the last criterion
								// need to add another list
								const previousList = element.parentNode;
								const newList = newSortList(previousList);
								previousList.parentNode.insertBefore(newList, previousList.nextSibling);
							}
							else if (index == 2)
							{
								// last saved criterion and last possible criterion
								// no more ambiguity in the list
								// remove the button to add another drop down list
								addButton.parentNode.removeChild(addButton);
							}
	
						}
						else
						{
							// no further sorting can be done
							// remove the button to add another drop down list
							addButton.parentNode.parentNode.removeChild(addButton.parentNode);
						}
					}
				);
			}
		}

		if (Object.entries(options).length !== Object.entries(items))
		{
			// Some options must have been removed, let's save that change
			saveOptions();
		}
		
		if (firstLoad)
		{
			init();
		}
	});
}

function saveOptions()
{
	const oldOptions = Object.assign({}, options);
	for (element of document.getElementsByClassName("option"))
	{
		if (!element.parentNode.parentNode.className.includes("multiPart"))
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
		else
		{
			// saving a multi part option
			if (element.parentNode.parentNode.querySelector(`.option`) == element)
			{
				// first of this multi part
				const option = element.parentNode.parentNode.id;
				const parts = element.parentNode.parentNode.querySelectorAll(`select.option`);
				let value = parts[0].value;
				for (let i = 1; i<parts.length; ++i)
				{
					value += `,${parts[i].value}`;
				}
			
				options[option] = value;
			}
			else
			{
				// not first element so will have already saved this multi part option
			}
		}
	}
	chrome.storage.sync.set({"options": options});
	if (JSON.stringify(oldOptions) !== JSON.stringify(options))
	{
		tabs.forEach(
			(id) => {
				chrome.tabs.sendMessage(id, {type: "optionsChanged"})
			}
		);
	}
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

function multiPartChangeHandler()
{
	const parts = Array.from(this.parentNode.parentNode.querySelectorAll(`.option`));
	const partIndex = parts.indexOf(this);

	const removeFurtherCriteria = () => parts.slice(partIndex + 1).forEach(
			(part) => {
				part.parentNode.parentNode.removeChild(part.parentNode);
			}
		);

	if (this.value <= 4)
	{
		// no more sorting can be done
		if (partIndex + 1 != parts.length)
		{
			// there are some further criteria that we need to remove
			removeFurtherCriteria();
		}
		else
		{
			// this is the last criterion
			// remove the add further criterion button
			const button = this.parentNode.parentNode.querySelector(`.addSortList`);
			if (button != null)
			{
				button.parentNode.parentNode.removeChild(button.parentNode);
			}
		}
	}
	else if (partIndex < 2)
	{
		// can sort further
		// first remove further criteria as they may be invalid
		removeFurtherCriteria();

		// now add link to add further criterion
		this.parentNode.parentNode.appendChild(addButtonListItem)
	}
	else
	{
		// nothing to do
	}

	saveOptions();
}

function addSortListButtonClickHandler()
{
	const lastList = this.parentNode.previousElementSibling;
	const newList = newSortList(lastList);
	lastList.parentNode.insertBefore(newList, lastList.nextSibling);
	this.parentNode.parentNode.removeChild(this.parentNode);
	saveOptions();
}

function newSortList(previousListItem)
{
	const previousListSelect = previousListItem.querySelector(`select.option`);
	const criterion = previousListSelect.value;
	const invalidValues = [criterion, (criterion %2) ? (`${1 + +criterion}`) : (`${-1 + +criterion}`)];
	const newList = previousListItem.cloneNode(true);
	newList.querySelector(`select.option`).value = "0";

	invalidValues.forEach(
		(value) => {
			newList.querySelectorAll(`option[value="${value}"]`).forEach((invalidOption) => invalidOption.remove());
		}
	);
	
	const previousIndex = previousListSelect.id.slice(-1);
	const optionId = previousListSelect.id.slice(0,-1);
	const currentIndex = 1 + +previousIndex;
	newList.querySelector(`label`).textContent = ordinalLabels[currentIndex];
	newList.querySelector(`.option`).id = `${optionId}${currentIndex}`;

	newList.querySelector(`.option`).addEventListener("change", multiPartChangeHandler);

	newList.querySelectorAll(".removeSortCriterion").forEach((cross) => cross.remove());

	const removeButton = document.createElement("DIV");
	removeButton.className = "removeSortCriterion";
	removeButton.textContent = "\u00d7";
	removeButton.addEventListener("click",
		(e) => {
			for (let i = currentIndex; i < 3; ++i)
			{
				const selectToBeRemoved = document.getElementById(`${optionId}${i}`);
				if (selectToBeRemoved == null)
					continue;
				const liToBeRemoved = selectToBeRemoved.parentNode;
				liToBeRemoved.parentNode.removeChild(liToBeRemoved);
			}
			previousListItem.parentNode.appendChild(addButtonListItem);
			saveOptions();
		}
	);
	newList.appendChild(removeButton);

	return newList;
}

window.onload = () => {
	chrome.runtime.sendMessage({type: "tabsRequest"},
		(response) => {
			tabs = response.openedTabs;
		}
	);
	getOptions(true);

}
