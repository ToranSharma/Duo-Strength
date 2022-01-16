let oldOptions = {};
let options = {};
let tabs = [];
let optionsLoaded = null;

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
	saveOptions();
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
    document.querySelector("#debugInfoButton").addEventListener("click", saveDebugInfo);
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
	const defaultOptions = await fetch("defaultOptions.json").then(response => response.json());
	const cmp = compareOptions(defaultOptions, options);
	options = {...defaultOptions};
	return cmp;

}

async function disableAllFeatures()
{
	const disabledOptions = await fetch("disabledOptions.json").then(response => response.json());
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
		else if (!optionElement.classList.contains("multiPart"))
		{
			let optionState;
			switch (typeof options[option])
			{
				case "boolean":
					optionElement.checked = optionElement.classList.contains("negative") ? !options[option] : options[option];
					optionState = optionElement.checked;
					break;
				case "string":
					optionElement.value = options[option];
					optionState = optionElement.value;
					break;
			}

			if (!optionElement.parentElement.classList.contains("collapsed"))
			{
				// If not already collapsed, then apply collapsing to the controlled options.
				applyControlledOptionCollapsing(optionElement, optionState);
			}
		}
		else
		{
			// Multi part option, encoded in one string with comma seperated values
			const parts = options[option].split(",");
			const addButton = optionElement.querySelector(".addPart");

			addButton.removeEventListener("click", addPartButtonClickHandler);
			addButton.addEventListener("click", addPartButtonClickHandler);

			// Make sure there is only one part initially
			removePartsAfter(document.querySelector(`#${option} .option`));

			parts.forEach(
				(partValue, index) =>
				{
					const selectElement = document.querySelector(`#${option+index}`);
					selectElement.value = partValue;

					const furtherItemCutoffIndex = Array.from(selectElement.children).indexOf(selectElement.querySelector(`option[value="${optionElement.getAttribute("data-furtherItemCutoff")}"]`));

					if (selectElement.selectedIndex > furtherItemCutoffIndex)
					{
						// some further parts can be added
						if (index !== parts.length - 1)
						{
							// not the last part
							// need to add another list
							const listItem = selectElement.parentNode;
							const newList = newSortList(listItem);
							listItem.parentNode.insertBefore(newList, addButton.parentNode);
						}
						else if (index === Number(optionElement.getAttribute("data-maxParts")) - 1)
						{
							// last saved part and last possible part
							// nothing more left tha can be added
							// hide the button to add another drop down list
							addButton.parentNode.classList.add("hidden");
						}

					}
					else
					{
						// no further parts can be added
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
	if ((await optionsLoaded) === null)
	{
		await getOptions();
	}

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
	else if (e.code.includes("Meta") || e.code.includes("OS"))
	{
		if (!e.ctrlKey && e.shiftKey) this.value = "Meta+" + this.value;
		else this.value += "Meta+";
	}
	else if (e.code.includes("Alt"))
	{	
		if (!e.ctrlKey && !e.shiftKey && !e.metaKey) this.value = "Alt+" + this.value;
		else this.value += "Alt+";
	}
	else if (e.key.length !== 1 || e.key === " ")
	{
		this.value += e.code;
	}
	else
	{
		this.value += e.key.toUpperCase();
	}

	if (this.value[this.value.length-1] !== "+")
	{
		// Cannot compose any more keys.
		if (
			!this.value.includes("Ctrl")
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
			// Seems to be valid, exit to box and save the hotkey.
			this.blur();
			options[this.id] = this.value;
			saveOptions();
		}
	}
}

function hotkeyKeyupHandler()
{
	if (
		this.value[this.value.length-1] === "+"
		|| this.value === options[this.id]
	)
	{
		// Hotkey not finished, reset to saved value.
		this.value = options[this.id];
	}
	else
	{
		// Finished hotkey, save it, though we should have already done this.
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
	const optionElement = this.parentNode.parentNode;
	const partIndex = this.id.slice(-1)[0];

	// Any existing subsequent parts are no longer valid.
	removePartsAfter(this);
	
	const furtherItemCutoffIndex = Array.from(this.children).indexOf(this.querySelector(`option[value="${optionElement.getAttribute("data-furtherItemCutoff")}"]`));
	const maxParts = Number(this.parentNode.parentNode.getAttribute("data-maxParts"));
	if (partIndex < maxParts -1  && this.selectedIndex > furtherItemCutoffIndex)
	{
		// Can sort further.
		// make button to add further criterion visible
		optionElement.querySelector(".addPart").parentNode.classList.remove("hidden");
	}
	else
	{
		// Can't sort further.
		// remove the add further criterion button
		optionElement.querySelector(".addPart").parentNode.classList.add("hidden");
	}


	const option = optionElement.id;
	options[option] = Array.from(optionElement.querySelectorAll(".option")).map(part => part.value).join(",");
	saveOptions();
}

function applyControlledOptionCollapsing(optionElement, optionState, forceCollapse = false)
{
	const controllingAttr = optionElement.getAttribute("data-controlling");
	let [collapseStates, controlledSelectors] = [null, []];
	if (controllingAttr !== null)
	{
		[collapseStates, controlledSelectors] = controllingAttr.split(":").map(str => JSON.parse(str));

		const controlledSelector = controlledSelectors.join(", ")
		document.querySelectorAll(controlledSelector).forEach(
			(controlledOption) =>
			{
				const controlledOptionState = controlledOption.type === "checkbox" ? controlledOption.checked : controlledOption.value;

				if (collapseStates.includes(optionState) || forceCollapse)
				{
					// In a state listed in the controlling attr, so we collapse this option.
					controlledOption.parentNode.classList.add("collapsed");
					applyControlledOptionCollapsing(controlledOption, controlledOptionState, true);
				}
				else
				{
					controlledOption.parentNode.classList.remove("collapsed");
					applyControlledOptionCollapsing(controlledOption, controlledOptionState);
				}

			}
		);
	}
}

function addPartButtonClickHandler()
{
	const lastListItem = this.parentNode.previousElementSibling;
	const newListItem = newSortList(lastListItem);
	lastListItem.parentNode.insertBefore(newListItem, lastListItem.nextSibling);

	const newSelect = newListItem.querySelector(".option");

	const furtherItemCutoffIndex = Array.from(newSelect.children).indexOf(newSelect.querySelector(`option[value="${newListItem.parentNode.getAttribute("data-furtherItemCutoff")}"]`));
	if (newSelect.selectedIndex < furtherItemCutoffIndex)
	{
		this.parentNode.classList.add("hidden");
	}

	const option = lastListItem.parentNode.id;
	options[option] = Array.from(document.querySelectorAll(`#${option} .option`)).map(option => option.value).join(",");

	saveOptions();
}

function newSortList(previousListItem)
{
	const previousListSelect = previousListItem.querySelector("select.option");
	const partValue = previousListSelect.value;
	const previousListSelectOption = previousListSelect.querySelector(`option[value="${partValue}"]`);
	const invalidValues =
		[
			partValue,
			...(
				previousListSelectOption.getAttribute("data-invalidNextValues") !== null
				? previousListSelectOption.getAttribute("data-invalidNextValues").split(",")
				: []
			)
		];
	const newListItem = previousListItem.cloneNode(true);

	invalidValues.forEach(
		(value) => {
			newListItem.querySelectorAll(`option[value="${value}"]`).forEach((invalidOption) => invalidOption.remove());
		}
	);
	
	const previousIndex = previousListSelect.id.match(/[0-9]+$/);
	const optionId = previousListSelect.id.match(/^[A-Za-z]+/);
	const newIndex = 1 + +previousIndex;

	if (optionId === "needsStrengtheningListSortOrder")
	{
		newListItem.querySelector("label").textContent = ordinalLabels[newIndex];
	}
	else
	{
		newListItem.querySelector("label").textContent = `${newIndex+1}${newIndex < 3 ? ((["st","nd","rd"])[newIndex]): "th"}`;

	}

	newListItem.querySelector(".option").id = `${optionId}${newIndex}`;
	newListItem.querySelector(".option").value = newListItem.querySelector(".option").firstElementChild.value;
	newListItem.querySelector(".option").addEventListener("change", multiPartChangeHandler);

	const existingRemoveButton = newListItem.querySelector(".removeSortCriterion");
	if (existingRemoveButton !== null)
	{
		existingRemoveButton.remove();
	}

	const removeButton = document.createElement("div");
	removeButton.className = "removeSortCriterion";
	removeButton.textContent = "\u00d7";
	removeButton.addEventListener("click",
		(e) =>
		{

			Array.from(document.querySelectorAll(`#${optionId} .option`))
				.slice(newIndex)
				.forEach(
				(selectToBeRemoved) =>
				{
					selectToBeRemoved.parentNode.remove();
				}
			);

			previousListItem.parentNode.querySelector(".addPart").parentNode.classList.remove("hidden");

			options[optionId] = Array.from(document.querySelectorAll(`#${optionId} .option`)).map(option => option.value).join(",");
			saveOptions();
		}
	);
	newListItem.appendChild(removeButton);

	return newListItem;
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
					(response) =>
                    {
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
						setTimeout(
                            () =>
							{
								event.target.disabled = false;
								event.target.textContent = "Clear Mastered List for Current Tree"
							}, 3000
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

async function getDebugInfo()
{
    const responses = tabs.map(
        (tabId) =>
        {
            return new Promise(
                (resolve, reject) =>
                {
                    chrome.tabs.sendMessage(tabId, {type: "getDebugInfo"},
                        (debugInfo) =>
                        {
                            const tabDebugObject = {};
                            tabDebugObject[`Debug Info from Tab ${tabId}`] = debugInfo;
                            resolve(tabDebugObject);
                        }
                    );
                }
            );
        }
    );
    return await Promise.all(responses)
        .then(
            (infoArray) =>
            {
                return Object.assign({}, ...infoArray);
            }
        );
}

function saveDebugInfo(event)
{
    getDebugInfo().then(
        (debugInfo) =>
        {
            const debugString = JSON.stringify(debugInfo, null, 4);
            navigator.clipboard.writeText(debugString).then(
                () =>
                {
                    event.target.textContent = "Debug Info Copied to Clipboard";
                },
                () =>
                {
                    event.target.textContent = "Info could not be copied to clipboard";
                }
            );
        }
    );
}
