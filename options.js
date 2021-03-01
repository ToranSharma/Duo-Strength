let oldOptions = {};
let options = {};
let tabs = [];
let optionsLoaded;

let priorOptions = {};

const ordinalLabels = {
	"0": "Primary",
	"1": "Secondary",
	"2": "Tertiary"
};

window.onload = () =>
{
	chrome.runtime.sendMessage({type: "tabsRequest"},
		(response) =>
		{
			tabs = response.openedTabs;
			if (tabs.length === 0)
			{
				document.querySelector("#clearMasteredSkills").disabled = true;
			}
		}
	);
	init();
}

async function init()
{
	document.querySelectorAll(".subsection > label").forEach(
		(subsection) =>
		{
			const childPage = subsection.parentNode.querySelector(".childPage");
			subsection.addEventListener("click", () => goToChildPage(childPage));
		}
	);
	document.querySelectorAll("button.back").forEach(
		(backButton) =>
		{
			const childPage = backButton.parentNode.parentNode;
			backButton.addEventListener("click", () => goBackFromChildPage(childPage));
		}
	);
	document.querySelector("#clearMasteredSkills").addEventListener("click", clearMasteredSkills);
	document.querySelector("#darkOptions").addEventListener("change",
		(event) =>
		{
			options["darkOptions"] = event.target.checked;
			applyDarkMode();
			saveOptions(false);
		}
	);
	document.querySelector("#disableAll").addEventListener("click", modifyOptionsButtonHandler);
	document.querySelector("#resetDefault").addEventListener("click", modifyOptionsButtonHandler);

	await (optionsLoaded = getOptions());
	applyDarkMode();
	applyOptions(true);
	saveOptions();
	setupChangeHandlers();
}

async function getOptions()
{
	return new Promise(
		(resolve, reject) =>
		{
			chrome.storage.sync.get("options",
				async (data)=>
				{
					if (data.options === undefined)
					{
						// No options saved, get the default options
						await getDefaultOptions();
						oldOptions = {...options};
						resolve();
					}
					else
					{
						options = {...data.options};
						oldOptions = {...options};
						resolve();
					}
				}
			);
		}
	);
}

async function getDefaultOptions()
{
	const defaultOptions = await import("./defaultOptions.js").then(module => module.default);
	const cmp = compareOptions(defaultOptions, options);
	options = {...defaultOptions};
	return cmp;

}

async function disableAllFeatures()
{
	const disabledOptions = await import("./disabledOptions.js").then(module => module.default);
	const enabledOptions = {...options};
	options = {...options, ...disabledOptions};
	return compareOptions(enabledOptions, options);
}

function applyOptions(hideTransitions = false)
{
	// May collapse some options, but don't really want the transitions.
	if (hideTransitions)
	{
		document.querySelectorAll("*").forEach(element => element.style = "transition: all 0s");
	}
	for (const option in options)
	{
		const optionElement = document.querySelector(`#${option}`);
		if (optionElement === null)
		{
			// Option not found in page, might be an old option, let's remove it and save the options at the end
			delete options[option];
		}
		else if (option !== "needsStrengtheningListSortOrder")
		{
			switch (typeof options[option])
			{
				case "boolean":
					optionElement.checked = options[option];
					applyControlledOptionCollapsing(optionElement, optionElement.checked);
					break;
				case "string":
					optionElement.value = options[option];
					applyControlledOptionCollapsing(optionElement, optionElement.value);
					break;
			}
		}
		else
		{
			// needsStrengtheningListOrder is a multi part option, encoded in one string with comma seperated values
			const sortingCriteria = options[option].split(",");
			const addButton = optionElement.querySelector(".addSortList");

			addButton.removeEventListener("click", addSortListButtonClickHandler);
			addButton.addEventListener("click", addSortListButtonClickHandler);

			// Make sure there is only one part initially
			removePartsAfter(document.querySelector(`#${option} .option`));
			sortingCriteria.forEach(
				(criterion, index) =>
				{
					const selectElement = document.querySelector(`#${option+index}`);
					selectElement.value = criterion;

					if (criterion > "4")
					{
						// some further sorting can be done
						if (index !== sortingCriteria.length - 1)
						{
							// not the last criterion
							// need to add another list
							const listItem = selectElement.parentNode;
							const newList = newSortList(listItem);
							listItem.parentNode.insertBefore(newList, listItem.nextSibling);
						}
						else if (index == 2)
						{
							// last saved criterion and last possible criterion
							// no more ambiguity in the list
							// hide the button to add another drop down list
							addButton.parentNode.classList.add("hidden");
						}

					}
					else
					{
						// no further sorting can be done
						// hide the button to add another drop down list
						addButton.parentNode.classList.add("hidden");
					}
				}
			);
		}
	}
	if (hideTransitions)
	{
		// Allow transitions again
		setTimeout(() => document.querySelectorAll("*").forEach(element => element.removeAttribute("style")), 10);
	}
}

async function saveOptions(sendToTabs = true)
{
	await (optionsLoaded ?? getOptions());

	if (compareOptions(oldOptions, options) === false)
	{
		chrome.storage.sync.set({"options": options});
		oldOptions = {...options};
		if (sendToTabs)
		{
			tabs.forEach(
				(id) => {
					chrome.tabs.sendMessage(id, {type: "optionsChanged"});
				}
			);
		}
	}
}

async function modifyOptionsButtonHandler(event)
{
	if (event.target.textContent !== "Undo")
	{
		priorOptions = {...options};

		if (
			(event.target.id === "disableAll" && await disableAllFeatures() === false)
			|| (event.target.id === "resetDefault" && await getDefaultOptions() === false)
		)
		{
			applyDarkMode();
			applyOptions();
			saveOptions();

			event.target.textContent = "Undo";
			setTimeout(
				() =>
				{
					event.target.textContent = event.target.id === "disableAll" ? "Disable All" : "Reset to Defaults";
					priorOptions = {};
				}
				, 5000
			);
		}
		else
		{
			priorOptions = {};
		}
	}
	else
	{
		options = {...priorOptions};
		priorOptions = {};

		applyDarkMode();
		applyOptions();
		saveOptions();
		event.target.textContent = event.target.id === "disableAll" ? "Disable All" : "Reset to Defaults";
	}
}

function setupChangeHandlers()
{
	document.querySelectorAll(".checkboxOption .option").forEach(
		(checkboxOption) =>
		{
			checkboxOption.addEventListener("change", checkboxChangeHander);
		}
	);
	document.querySelectorAll(".numberOption .option").forEach(
		(numberOption) =>
		{
			numberOption.addEventListener("change", numberChangeHandler);
		}
	);
	document.querySelectorAll(":not(.multiPart) > .selectOption .option").forEach(
		(selectOption) =>
		{
			selectOption.addEventListener("change", selectChangeHandler);
		}
	);
	document.querySelectorAll(".hotkeyOption .option").forEach(
		(hotkeyOption) =>
		{
			hotkeyOption.addEventListener("keydown", hotkeyKeydownHandler);
			hotkeyOption.addEventListener("keyup", hotkeyKeyupHandler);
		}
	);
	document.querySelectorAll(".multiPart .option").forEach(
		(multiPartOption) =>
		{
			multiPartOption.addEventListener("change", multiPartChangeHandler);
		}
	);
}

function checkboxChangeHander()
{
	const option = this.id;
	if (this.classList.contains("negative"))
	{
		options[option] = !this.checked;
	}
	else
	{
		options[option] = this.checked;
	}

	applyControlledOptionCollapsing(this, this.checked);
	saveOptions();
}


function numberChangeHandler()
{
	if (this.value < this.min)
	{
		this.value = this.min;
	}
	const option = this.id;
	options[option] = this.value;

	saveOptions();
}

function selectChangeHandler()
{
	const option = this.id;
	options[option] = this.value;

	applyControlledOptionCollapsing(this, this.value);
	saveOptions();
}


function hotkeyKeydownHandler(e)
{
	e.preventDefault();

	if (this.value[this.value.length-1] != "+")
	{
		this.value = "";
	}
	if (e.code.includes("Control"))
	{
		this.value = "Ctrl+" + this.value;
	}
	else if (e.code.includes("Shift"))
	{
		if (!e.ctrlKey) this.value = "Shift+" + this.value;
		else this.value += "Shift+";
	}
	else if (e.code.includes("Meta"))
	{
		if (!e.ctrlKey && e.shiftKey) this.value = "Meta+" + this.value;
		else this.value += "Meta+";
	}
	else if (e.code.includes("Alt"))
	{	
		if (!e.ctrlKey && !e.shiftKey && !e.metaKey) this.value = "Alt+" + this.value;
		else this.value += "Alt+";
	}
	else if (e.code == "Space")
	{
		this.value += "Space";
	}
	else
	{
		this.value += e.key.toUpperCase();
	}

	if (
		this.value[this.value.length-1] !== "+"
		&& !this.value.includes("Ctrl")
		&& !this.value.includes("Alt")
		&& !this.value.includes("Meta")
	)
	{
		// Hotkey is a single key, which should not be allowed.
		// Reset to saved value.
		this.value = options[this.id];
	}
	else
	{
		this.blur();
		options[this.id] = this.value;
		saveOptions();
	}
}

function hotkeyKeyupHandler()
{
	if (
		this.value[this.value.length-1] === "+"
		|| this.value == options[this.id]
	)
	{
		// Hotkey not finished, reset to saved value.
		this.value = options[this.id];
	}
	else
	{
		options[this.id] = this.value;
		saveOptions();
	}
}

function removePartsAfter(lastWantedPart)
{
	const parts = Array.from(lastWantedPart.parentNode.parentNode.querySelectorAll(".option"));
	const partIndex = parts.indexOf(lastWantedPart);
	parts.slice(partIndex + 1).forEach(
		(part) =>
		{
			part.parentNode.remove();
		}
	);
}

function multiPartChangeHandler()
{
	const partIndex = this.id.slice(-1)[0];

	// Any existing subsequent parts are no longer valid.
	removePartsAfter(this);
	
	if (partIndex < 2 && this.value > 4)
	{
		// Can sort further.
		// make button to add further criterion visible
		this.parentNode.parentNode.querySelector(".addSortList").parentNode.classList.remove("hidden");
	}
	else
	{
		// Can't sort further.
		// remove the add further criterion button
		this.parentNode.parentNode.querySelector(".addSortList").parentNode.classList.add("hidden");
	}


	const option = this.parentNode.parentNode.id;
	options[option] = Array.from(this.parentNode.parentNode.querySelectorAll(".option")).map(part => part.value).join(",");
	saveOptions();
}

function applyControlledOptionCollapsing(optionElement, optionState)
{
	let [displayStates, controlledSelectors] = optionElement.getAttribute("controlling")?.split(":").map(str => JSON.parse(str)) ?? [null, []];
	if (displayStates !== null)
	{
		const controlledSelector = controlledSelectors.join(", ")
		if (displayStates.includes(optionState))
		{
			document.querySelectorAll(controlledSelector).forEach(
				(controlledOption) =>
				{
					controlledOption.parentNode.classList.add("collapsed");
				}
			);
		}
		else
		{
			document.querySelectorAll(controlledSelector).forEach(
				(controlledOption) =>
				{
					controlledOption.parentNode.classList.remove("collapsed");
				}
			);
		}
	}
}

function addSortListButtonClickHandler()
{
	const lastList = this.parentNode.previousElementSibling;
	const newList = newSortList(lastList);
	lastList.parentNode.insertBefore(newList, lastList.nextSibling);
	this.parentNode.classList.add("hidden");

	const option = lastList.parentNode.id;
	options[option] = Array.from(document.querySelectorAll(`#${option} .option`)).map(option => option.value).join(",");

	saveOptions();
}

function newSortList(previousListItem)
{
	const previousListSelect = previousListItem.querySelector("select.option");
	const criterion = previousListSelect.value;
	const invalidValues = [criterion, (criterion %2) ? (`${1 + +criterion}`) : (`${-1 + +criterion}`)];
	const newList = previousListItem.cloneNode(true);
	newList.querySelector("select.option").value = "0";

	invalidValues.forEach(
		(value) => {
			newList.querySelectorAll(`option[value="${value}"]`).forEach((invalidOption) => invalidOption.remove());
		}
	);
	
	const previousIndex = previousListSelect.id.slice(-1);
	const optionId = previousListSelect.id.slice(0,-1);
	const currentIndex = 1 + +previousIndex;
	newList.querySelector("label").textContent = ordinalLabels[currentIndex];
	newList.querySelector(".option").id = `${optionId}${currentIndex}`;

	newList.querySelector(".option").addEventListener("change", multiPartChangeHandler);

	newList.querySelectorAll(".removeSortCriterion").forEach((cross) => cross.remove());

	const removeButton = document.createElement("div");
	removeButton.className = "removeSortCriterion";
	removeButton.textContent = "\u00d7";
	removeButton.addEventListener("click",
		(e) =>
		{
			for (let i = currentIndex; i < 3; ++i)
			{
				const selectToBeRemoved = document.querySelector(`#${optionId}${i}`)?.parentNode.remove();
			}

			previousListItem.parentNode.querySelector(".addSortList").parentNode.classList.remove("hidden");

			options[optionId] = Array.from(document.querySelectorAll(`#${optionId} .option`)).map(option => option.value).join(",");
			saveOptions();
		}
	);
	newList.appendChild(removeButton);

	return newList;
}

function clearMasteredSkills(event)
{
	if (tabs.length === 0)
	{
		event.target.disabled = true;
	}
	else
	{
		event.target.textContent = "...";
		tabs.forEach(
			(id) =>
			{
				chrome.tabs.sendMessage(id, {type: "clearMasteredSkills"},
					(response) => {
						if (response.cleared)
						{
							event.target.disabled = true;
							event.target.textContent = "List Cleared";
						}
						else
						{
							event.target.disabled = true;
							event.target.textContent = "Error Clearing, Try Again";
						}
						setTimeout(() =>
							{
								event.target.disabled = false;
								event.target.textContent = "Clear Mastered List for Current Tree"
							}
							, 3000
						);
					}
				);
			}
		);
	}
}

function goToChildPage(childPage)
{
	childPage.classList.add("visible");
	document.body.setAttribute("page",
		+document.body.getAttribute("page") + 1
	);
}

function goBackFromChildPage(childPage)
{
	document.body.setAttribute("page",
		String(+document.body.getAttribute("page") - 1)
	);
	setTimeout(() => childPage.classList.remove("visible"), 500);
}

function applyDarkMode()
{
	const darkOptions = options["darkOptions"];
	document.querySelector("#darkOptions").checked = darkOptions;
	document.documentElement.classList.add(darkOptions ? "dark" : "light");
	document.documentElement.classList.remove(darkOptions ? "light" : "dark");
}

function compareOptions(optionsA, optionsB)
{
	const sortObject = (obj) =>
	{
		return Object.fromEntries(Object.entries(obj).sort(
			(a, b) => a[0] < b[0] ? -1 : 1
		))
	};
	aSorted = sortObject({...optionsA});
	bSorted = sortObject({...optionsB});

	return JSON.stringify(aSorted) === JSON.stringify(bSorted)
}

