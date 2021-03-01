const GOLD = "rgb(250, 217, 29)";
const RED = "rgb(244, 78, 81)";
const ORANGE = "rgb(255, 150, 0)";
const GREEN = "rgb(120, 200, 0)";
const BLUE = "rgb(28, 176, 246)";
const PURPLE = "rgb(206, 130, 255)";
const GREY = "rgb(229, 229, 229)";
const DARK_BLUE = "rgb(24, 153, 214)";
const LIGHT_BLUE = "rgb(28, 176, 246)";

const imgSrcBaseUrl = "//d35aaqx5ub95lt.cloudfront.net/images";

// Duolingo class names:
const BONUS_SKILL_DIVIDER_SELECTOR = "._3Sis0";
const TOP_OF_TREE_WITH_IN_BETA = "_1q00o _3_JLW";
const TOP_OF_TREE = "RviFd";
const TRY_PLUS_BUTTON_SELECTOR = `[data-test="try-plus-badge"], ._-7YNG`;
const IN_BETA_LABEL = "_2UV5Z"; // container of div with IN BETA textContent. Will be sibling of needsStrengtheningContainer etc.
const CROWNS_POPUP_CONTAINER_SELECTOR = "._37JAM.j1W0k"; // parent of Crown logo container and crown description container, shares one class with the lingots popout container
const CROWN_LOGO_CONTAINER = "_3KWyk";
const CROWN_DESCRIPTION_CONTAINER = "_37Yk2";
const CROWN_TOTAL_CONTAINER = "yrLrI";
const DAILY_GOAL_POPUP_CONTAINER = "_20sV-"; // parent of streak flame and description, and the 7 small flames
const DAILY_GOAL_SIDEBAR_CONTAINER = "_2O43A";
const SIDEBAR = "_1YfQ8";
const WHITE_SIDEBAR_BOX_CONTAINER = "_3ZuGY";
const ZERO_CROWNS_CONTAINER = "bAsar"; // class applied to container of crown info that makes text inside the grey crown white
const POPUP_ICON = "_1b3yx _1I4lY _2wC9B";
const GOLD_CROWN = "_2QHSw";
const LIT_FLAME = "_1DS_0";
const BLUE_FLAME = "_3Ecgs";
const GREY_FLAME = "_1S8Vz";
const TOP_BAR = "eFS_r";
const NAVIGATION_BUTTON = "tCGvL";
const QUESTION_CONTAINER = "_863KE";
const LOGIN_PAGE = "_2F5q9";
const LESSON = "iLgf- _1Xlh1";
const LESSON_MAIN_SECTION = "_3yOsW";
const LESSON_BOTTOM_SECTION = "_2Fc1K";
const QUESTION_UNCHECKED = "_399cc";
const QUESTION_CHECKED = "YQ0lZ";
const CRACKED_SKILL_OVERLAY_SELECTOR = "._1SXlx, ._1x_0f, ._2ZUHwm, ._1m7gz"; // oldest to latest, likely that only the last will match
const NEW_WORD_SELECTOR = "._1bkpY";
const LEAGUE_TABLE = "_1_p4S";
const SKILL_POPOUT_LEVEL_CONTAINER_SELECTOR = "._1m77f";
const SKILL_NAME_SELECTOR = "._2OhdT._3PSt5";
const CHECKPOINT_CONTAINER_SELECTOR = "._1lAog";
const CHECKPOINT_POPOUT_SELECTOR = `${CHECKPOINT_CONTAINER_SELECTOR} ._2EYUQ._25WXl`;
const CHECKPOINT_BLURB_SELECTOR = "._32Tdp";
const CHECKPOINT_SECTION_SELECTOR = "._2tZPV";
const LANGUAGES_LIST_SELECTOR = "._2rd3I";
const SMALL_BUTTONS_CONTAINER = "_1cv-y";
const SMALL_BUTTON = "_3nfx7 _1HSlC _2C1GY _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN _226dU _1figt";
const TEST_OUT_ICON = "_20ZkV";
const GOLDEN_OWL_CHECKPOINT_SELECTOR = ".lIg1v";
const TREE_SECTION_SELECTOR = "._3uC-w ";
const SKILL_SELECTOR = `[data-test="tree-section"] [data-test="skill"], [data-test="intro-lesson"], [data-test="tree-section"] a[href], ${TREE_SECTION_SELECTOR} [data-test="skill"]`;
const CHECKPOINT_SELECTOR = `[data-test="checkpoint-badge"]`;
const GOLDEN_OWL_MESSAGE_TROPHY_SELECTOR = `[src$="trophy.svg"]`;
const MAIN_SECTION_SELECTOR = "._33Mo9";
const TREE_OVERLAY_CONTAINER_SELECTOR = "._1fnwn";
const GLOBAL_PRACTISE_BUTTON_ANCHOR = "_3_B9a _3iVqs _2A7uO _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN _3Ev3S _1figt";
const GLOBAL_PRACTISE_BUTTON_SELECTOR = "._2TTO0.np6Tv";
const BOTTOM_NAV_SELECTOR = "._3oP45";
const CROWN_TOTAL_SELECTOR = "._1HHlZ._3F5mM, ._12yJ8._3F5mM";
const PRACTICE_TYPE_SELECT_MESSAGE_SELECTOR = ".aUkqy";
const SKILL_ROW_SELECTOR = "._3f9ou";
const SKILL_TREE_SELECTOR = "._3YEom";
const TIPS_PAGE_BODY_SELECTOR = "._1yyg2";
const LOCKED_SKILL_POPOUT_SELECTOR = "._1fMEX";
const MOBILE_TIPS_PAGE_HEADER_SELECTOR = "._36P0W";
const CARTOON_CONTAINER = "F2B9m"; // used only in styles/stylesheet.css
const HINT_SENTENCE_CONTAINER = "_1Q4WV"; // used only in styles/stylesheet.css
const HINT_SENTENCE_BUBBLE_ARROW = "_2nhmY"; // used only in styles/stylesheet.css

const flagYOffsets = {
	0:	"en", 32: "es", 64: "fr", 96: "de",
	128: "ja", 160: "it", 193: "ko", 225: "zh",
	257: "ru", 289: "pt", 321: "tr", 354: "nl",
	386: "sv", 418: "ga", 450: "el", 482: "he",
	515: "pl", 547: "no", 579: "da", 611: "hv",
	643: "vi", 676: "ro", 708: "sw", 740: "eo",
	772: "hu", 804: "cy", 837: "uk", 869: "kl",
	901: "cs", 933: "hi", 965: "id", 998: "ha",
	1030: "nv", 1062: "ar", 1094: "ca", 1126: "th",
	1159: "gn",
	// 1191: "ambassador", 1223: "duolingo",
	// 1255: "troubleshooting", 1287: "teachers",
	1320: "la", 1352: "gd", 1384: "fi",
};

let languageCode = "";
let UICode = "";
let language = "";
let languageChanged = false;
let languageChangesPending = 0;
let languageLogo;

let options = {};
let progress = [];
let mastered = [];
let username = "";
let userId = "";
let userData = {};
let requestID = 0;
let requestsPending = 0;
let usingOldData;

let rootElem;
let rootChild;
let mainBody;
let mainBodyContainer;
let topBarDiv;

let onMainPage;
let onLoginPage;
let inMobileLayout;

let lastSkill;

let questionNumber = 1;

const classNameObserver = new MutationObserver(classNameMutationHandle);
const childListObserver = new MutationObserver(childListMutationHandle);

async function retrieveDefaultOptions()
{
	return fetch(chrome.runtime.getURL("defaultOptions.json")).then(response => response.json);
}

function retrieveOptions()
{
	return new Promise(function (resolve, reject){
		chrome.storage.sync.get("options",
		async function (data)
		{
			// Set options to default settings
			options = await retrieveDefaultOptions();

			if (Object.entries(data).length === 0)
			{
				// First time using version with options so nothing is set in storage.
			}
			else
			{
				// We have loaded some options,
				// let's apply them individually in case new options have been added since last on the options page
				for (let option in data.options)
				{
					if (data.options.hasOwnProperty(option)) options[option] = data.options[option];
				}
			}
			// Now let's save the options for next time.
			chrome.storage.sync.set({"options": options});
			resolve();
		});
	});
}

function retrieveProgressHistory()
{
	return new Promise(function (resolve, reject)
	{
		chrome.storage.sync.get("progress", function (data)
		{
			const key = `${userId}:${UICode}->${languageCode}`;
			const oldFormatKey = username + languageCode + UICode;
			if (Object.entries(data).length === 0)
			{
				// No progress data
				updateProgress();
			}
			else if (data.progress.hasOwnProperty(key))
			{
				// There is some data for the current user+tree combination
				progress = data.progress[key];
			}
			else if (data.progress.hasOwnProperty(oldFormatKey))
			{
				// There is data in the old format, we will use this data but remove the old format
				progress = [...data.progress[oldFormatKey]]; // Copy the data as we are going to delete it
				data.progress[key] = progress;
				delete data.progress[oldFormatKey];
				chrome.storage.sync.set({"progress": data.progress});
			}
			else
			{
				// No data for the current user+tree combination
				updateProgress();
			}
			resolve();
		});
	});
}

function storeProgressHistory()
{
	return new Promise(function (resolve, reject)
	{
		chrome.storage.sync.get("progress", function (data)
		{
			if (Object.entries(data).length === 0)
				data.progress = {};
			// Cull inactive trees
			const trees = Object.entries(data.progress);

			const inactiveTrees = trees.filter(
				([key, progressHistory]) =>
				{
					const numEntries = progressHistory.length;
					const lastEntryTime = progressHistory[numEntries -1][0];
					const today = (new Date()).setHours(0,0,0,0);

					// A tree is inative if the last entry is from more than 3 months ago.
					return today - lastEntryTime > (3*30*24*60*60*1000);
				}
			);

			inactiveTrees.forEach(
				([key, progressHistory]) =>
				{
					delete data.progress[key];
				}
			);

			data.progress[`${userId}:${UICode}->${languageCode}`] = progress;

			chrome.storage.sync.set({"progress": data.progress});
			resolve();
		});
	});
}

function storeTreeLevel()
{
	return new Promise(
		(resolve, reject) =>
		{
			chrome.storage.sync.get("treeLevels",
				async (data)=>
				{
					if (Object.entries(data).length === 0)
					{
						data.treeLevels = {};

						// Temporarily set the tree levels based on the stored progress history
						const progressData = await new Promise(
							(resolve2, reject2) =>
							{
								chrome.storage.sync.get("progress",
									(data) =>
									{
										if (Object.entries(data).length !== 0)
										{
											resolve(
												Object.keys(data.progress).filter(
													(key) =>
													{
														return /^[0-9]+:[a-z]{2}->[a-z]{2}/.test(key);
													}
												).reduce(
													(res, key) =>
													{
														res[key] = data.progress[key];
														return res;
													}, {}
												)
											);
										}
										resolve();
									}
								);
							}
						);
						Object.entries(progressData).forEach(
							([key, value]) =>
							{
								data.treeLevels[key] = value[value.length - 1][1];
							}
						);
					}

					data.treeLevels[`${userId}:${UICode}->${languageCode}`] = currentTreeLevel();

					chrome.storage.sync.set({"treeLevels": data.treeLevels});
					resolve();
				}
			);
		}
	);
}

function storeMasteredSkills()
{
	return new Promise(
		(resolve, reject) =>
		{
			chrome.storage.sync.get("mastered",
				(data) =>
				{
					if (data.mastered === undefined)
					{
						data.mastered = {};
					}

					data.mastered[`${userId}:${UICode}->${languageCode}`] = mastered;

					chrome.storage.sync.set({"mastered": data.mastered});
					resolve();
				}
			);
		}
	);
}

function retrieveMasteredSkills()
{
	return new Promise(
		(resolve, reject) =>
		{
			chrome.storage.sync.get("mastered",
				(data) =>
				{
					if (data.mastered !== undefined)
					{
						if (data.mastered[`${userId}:${UICode}->${languageCode}`] !== undefined)
						{
							mastered = data.mastered[`${userId}:${UICode}->${languageCode}`];
						}
					}
					resolve();
				}
			);
		}
	);
}

function clearMasteredSkills()
{
	return new Promise(
		(resolve, reject) =>
		{
			chrome.storage.sync.get("mastered",
				(data) =>
				{
					if (data.mastered !== undefined)
					{
						const currentTreeKey = `${userId}:${UICode}->${languageCode}`;
						if (data.mastered[currentTreeKey] !== undefined)
						{
							delete data.mastered[currentTreeKey];
							mastered = [];
						}

						chrome.storage.sync.set({"mastered": data.mastered});
					}
					resolve();
				}
			);
		}
	);
}

function updateProgress()
{
	let entry = [(new Date()).setHours(0,0,0,0), currentTreeLevel(), currentProgress()];

	if (progress.length === 0)
	{
		progress.push(entry); // add as an inital marker for progress today;
	}
	else if (progress[progress.length-1][0] === entry[0])
	{
		// Already have an entry for today.

		// If there is a entry before that, check if we changed tree level or made 'negative' progress.

		if (progress.length === 1)
		{
			// We have just today added the first every entry.
			// If we have made any progress since then add that entry.
			if (progress[0][1] !== entry[1] || progress[0][2] !== entry[2])
			{
				progress.push(entry);
			}
		}
		// We have more than one previous entry.
		else if (progress[progress.length-1][1] !== progress[progress.length-2][1])
		{
			// The last stored entry was the first at the tree level, so let's not overwrite it
			progress.push(entry);
		}
		else if (progress[progress.length-1][2] > progress[progress.length-2][2])
		{
			// This last stored entry was the first after some negative progress on the same level.
			// We don't want to overwrite this and loose more information.
			progress.push(entry);
		}
		else
		{
			// No it was just a normal entry, let's overwrite it with this update.
			progress[progress.length-1] = entry;
		}

	}
	else
	{
		// First entry for today.
		// Check if the progress has changed since we last stored an entry.

		if (entry[1] !== progress[progress.length-1][1] || entry[2] !== progress[progress.length-1][2])
		{
			// This entry's progress or tree level data is different,
			// let's save it.
			progress.push(entry);
		} 
		else
		{
			// No change since the last entry so we will not save it.
		}
	}

	// Trim down progress to only keep 7 most recent improvements
	let numImprovements = 0;
	let index = progress.length - 1;
	let treeLevel = progress[index][1];
	let lastProgress = progress[index--][2];
	while (numImprovements < 7 && index >= 0)
	{
		if (progress[index][2] > lastProgress)
		{
			++numImprovements;
		}
		else if (progress[index][1] < treeLevel)
		{
			++numImprovements;
		}

		lastProgress = progress[index][2];
		treeLevel = progress[index][1];
		--index;
	}

	progress = progress.slice(++index);

	storeProgressHistory();
	storeTreeLevel();
	return true;
}

function retrieveLastSkill()
{
	return new Promise(
		function (resolve, reject)
		{
			chrome.storage.sync.get("lastSkill", function (data)
				{
					resolve(data.lastSkill);
				}
			);
		}
	);
}

function resetLastSkillStorage()
{
	chrome.storage.sync.remove("lastSkill");
}

function resetLanguageFlags()
{
	// reset to be called after finished successfully displaying everything.
	// need to be ready for a change so we reset them back to false.
	languageChanged = false;
	languageChangesPending = 0;
}

function removeStrengthBars()
{
	document.querySelectorAll(".strengthBarHolder").forEach(bar => bar.remove());
}

function removeNeedsStrengtheningBox()
{
	document.querySelector("#strengthenBox")?.remove();
}

function removeCrackedSkillsList()
{
	document.querySelector("#crackedBox")?.remove();
}

function removeSuggestion()
{
	document.querySelector("#skillSuggestionMessageContainer")?.remove();
}

function removeFlagBorders()
{
	const flags = document.querySelectorAll(`${LANGUAGES_LIST_SELECTOR}>div>span>span:first-child`);
	flags.forEach(
		(flag) => {
			flag.removeAttribute("style");
			flag.classList.remove("borderedFlag");
			flag.removeAttribute("tree-level");
			flag.querySelectorAll("img").forEach(img => img.remove());
		}
	);
}

function deleteElementsByClassesAndIds({classList = [], idList = []})
{
	// Delete elements that match either a class or id for deletion
	const deleteSelector =
		[
			...classList.map(className => `.${className}`),
			...idList.map(id => `#${id}`)
		].join(", ");

	document.querySelectorAll(deleteSelector).forEach(element => element.remove());
}

function removeClassesAndIds({classList = [], idList = []})
{
	// Remove classes and ids from elements that have been labeled for styling purposes.
	document.querySelectorAll(
		classList.map(className => `.${className}`).join(", ") || null
	).forEach(element => element.classList.remove(...classList));

	document.querySelectorAll(
		idList.map(id => `#${id}`).join(", ") || null
	).forEach(element => element.removeAttribute("id"));
}

function removeCrownsBreakdown()
{

	const toDeleteClassList =
	[
		"crownCountPercentage",
		"crownsGraph",
		"crownLevelBreakdownContainer",
		"checkpointPrediction",
		"treeLevelPrediction",
		"maxCrowns"
	];
	const toDeleteIdList =
	[
		"sidebarCrownsInfoContainer"
	];
	const classesToRemove = 
	[
		"crownDescriptionContainer",
		"crownCountImg"
	];
	const idsToRemove = 
	[
		"crownsPopupContainerParent",
		"crownsPopupContainer"
	];

	deleteElementsByClassesAndIds({classList: toDeleteClassList, idList: toDeleteIdList});

	removeClassesAndIds({classList: classesToRemove, idList: idsToRemove});
}

function removeXPBoxes()
{
	const toDeleteClassList =
	[
		"XPBox"
	]

	const classesToRemove =
	[
		"XPBoxOverflowContainer"
	];
	
	deleteElementsByClassesAndIds({classList: toDeleteClassList});
	removeClassesAndIds({classList: classesToRemove});
}

function removeTotalStrengthBox()
{
	document.querySelector("#totalStrengthBox")?.remove();
}

function removeLanguagesInfo()
{
	document.querySelector("#languagesBox")?.remove();
}

function removePractiseButton()
{
	document.querySelector(`[data-test="practise-button"]`)?.remove();
}

function removeGrammarSkillTestOutButton()
{
	const grammarSkillTestOutButton = document.querySelector("#grammarSkillTestOutButton");
	if (grammarSkillTestOutButton !== null)
	{
		grammarSkillTestOutButton.parentNode.setAttribute("numChildren", --grammarSkillTestOutButton.parentNode.childElementCount);
		grammarSkillTestOutButton.remove();
	}
}

function removeWordsButton()
{
	const wordsButton = document.querySelector(`[data-test="words-button"]`);
	if (wordsButton !== null)
	{
		wordsButton.parentNode.setAttribute("numChildren", --wordsButton.parentNode.childElementCount);
		wordsButton.remove();
	}
	document.querySelector(`#wordsListBubble`)?.remove();
}

function removeMasterdSkillButton()
{
	const masteredButton = document.querySelector(`[data-test="mastered-button"]`);
	if (masteredButton !== null)
	{
		masteredButton.parentNode.setAttribute("numChildren", --masteredButton.parentNode.childElementCount);
		masteredButton.remove();
	}
}

function removeCheckpointButtons()
{
	const redoTestButton = document.querySelector(`[data-test="redo-test-button"]`);
	if (redoTestButton != null)
	{
		redoTestButton.parentNode.removeAttribute("style");
		redoTestButton.remove();
	}

	document.querySelector(`[data-test="test-out-button"]`)?.remove();
}

function removeFocusModeButton()
{
	document.querySelector(`#focusModeButton`)?.remove();
}

function removeTipsPageButtons()
{
	const buttonContainersToRemove = Array.from(document.querySelectorAll(`[data-test="start-lesson"]`)).slice(1).map(elem=>elem.parentNode);
	buttonContainersToRemove.forEach(
		(container) =>
		{
			container.remove();
		}
	);

	const buttonsToRemove = Array.from(document.querySelectorAll(`[data-test="start-lesson"], [data-test="practise-button"]`))
								.slice(1);
	buttonsToRemove.forEach(
		(button) =>
		{
			button.remove();
		}
	);

}

function removeNeedsStrengtheningPopoutButton()
{
	document.querySelector(`#needsStrengtheningPopoutButton`)?.remove();
}

function removeCrackedPopoutButton()
{
	document.querySelector(`#crackedPopoutButton`)?.remove();
}

function removeSuggestionPopoutButton()
{
	document.querySelector(`#suggestionPopoutButton`)?.remove();
}

function hasMetGoal()
{
	const goal = userData.daily_goal;
	const currentDate = (new Date()).setHours(0,0,0,0);
	const lessonsToday = userData.calendar.filter(
		(entry) => {
			const day = (new Date(entry.datetime)).setHours(0,0,0,0);
			return day == currentDate;
		}
	);
	
	const XPToday = lessonsToday.reduce(
		(total, lesson) => {
			return total + lesson.improvement;
		}, 0)

	return XPToday >= goal;
}

function currentProgress()
{
	const skills = userData.language_data[languageCode].skills;
	let treeLevel = currentTreeLevel();
	let lessonsToNextTreeLevel = 0;
	for (let skill of skills)
	{
		if (skill.skill_progress.level == treeLevel)
		{
			lessonsToNextTreeLevel += skill.num_sessions_for_level - skill.level_sessions_finished;
		}
	}

	return lessonsToNextTreeLevel;
}

function nextCheckpointIndex()
{
	const checkpoints = Array.from(document.querySelectorAll(CHECKPOINT_SELECTOR));
	const firstLockedIndexReducer = (value, element, index) => {
		const locked = element.querySelectorAll(`[src$="locked.svg"]`).length != 0;
		if (value == -1 && locked)
			return index;
		else
			return value;
	}
	return checkpoints.reduce(firstLockedIndexReducer, -1);
}

function lessonsToNextCheckpoint()
{
	let index = nextCheckpointIndex();
	if (index == -1)
		return -1;
	const nextCheckpoint = document.querySelectorAll(CHECKPOINT_SELECTOR)[index];
	const skillsAndCheckpoints = Array.from(document.querySelectorAll(`${SKILL_SELECTOR}, ${CHECKPOINT_SELECTOR}`));
	
	const bonusSkillRow = document.querySelector(`${BONUS_SKILL_DIVIDER_SELECTOR} + div`);

	index = skillsAndCheckpoints.indexOf(nextCheckpoint);
	const skillsBeforeCheckpoint = skillsAndCheckpoints.filter(
		(element, idx) => {
			const type = element.getAttribute("data-test");
			if (type != "checkpoint-badge")
			{
				// element is not a checkpoint
				if (bonusSkillRow == null || !bonusSkillRow.contains(element))
					return idx < index;
			}
		}
	);
	const level0SkillsBeforeCheckpoint = skillsBeforeCheckpoint.filter(
		(element) => {
			return element.querySelectorAll(`[data-test="level-crown"]`).length == 0;
		}
	);
	return level0SkillsBeforeCheckpoint.reduce(
		(total, element) => {
			const skillTitle = element.querySelector(SKILL_NAME_SELECTOR).textContent;
			const lessons = userData.language_data[languageCode].skills.find(skill => skill.short == skillTitle).missing_lessons;
			return total + lessons;
		}
	, 0);
}

function progressEnds()
{
	let endIndex = progress.length - 1;
	let lastDate = progress[endIndex][0];
	const today = (new Date()).setHours(0,0,0,0);
	
	while (!hasMetGoal() && lastDate == today)
	{
		lastDate = progress[--endIndex][0];
	}

	const numDays = (lastDate  - progress[0][0]) / (1000*60*60*24) + 1; // inclusive of start and end
	
	return {
		startIndex: 0,
		endIndex: endIndex,
		numDays: numDays
	};
}

function progressMadeBetweenPoints(startIndex, endIndex)
{
	let level = progress[startIndex][1];
	let lastProgress = progress[startIndex][2];
	let progressMade = 0;

	const points = progress.slice(startIndex, endIndex + 1);
	points.forEach(
		(point) =>
		{
			// There are a few cases of what can happen between points,
			// each will need to be handled a bit differently.
			// We will split the cases based on the difference in tree level between points.

			if (point[1] === level)
			{
				// The tree level has not changed between points.
				
				if (lastProgress > point[2])
				{
					// This is the typical case where some normal progress has been made.
					progressMade += lastProgress - point[2];
				}
				else
				{
					// Progress has gone backwards between points.
					// There were probably new skills added which now need to be done.
					// It is more goal posts have been moved than backwards progress.
					// In this case we just ignore this point and look at the progress made afterwards.
				}
			}
			else if (point[1] > level)
			{
				// The user has reached the next tree level.
				// In this case we will have saved a special entry as soon as we saw this happen.
				// We just need to update the level and add all the progress that was left from the previous point,
				// as it will all have had to have been made for the user to level up.

				progressMade += lastProgress;
				level = point[1];

				// Note there is the case where the new level is not just an increment but a bigger jump.
				// In that case we have missed some significant progress but there is nothing we can do.
			}
			else if (point[1] < level)
			{
				// Outlier case where the users level has decreased.
				// This is probably from the tree being updated and new skills are added,
				// which the user has no progress on.
				// There is also the other case that the user has reset their progresson the tree.
				// We don't need to treat that any differently as the past progress changes are still relevant.

				// Here we will just update the level to the new (lower) value,
				// ignoring the change in progress as it is getting reset here.

				level = point[1];

				// We are likely to miss some progress that has been made here but it is better than nothing.
			}

			lastProgress = point[2]; // Last thing to do is update the lastProgress with this point.
		}
	);

	return progressMade;
}

function currentTreeLevel()
{
	const skills = userData.language_data[languageCode].skills.filter(skill => skill.category !== "grammar");

	const skillsByCrowns = [[],[],[],[],[],[]];

	for (let skill of skills)
	{
		skillsByCrowns[skill.skill_progress.level].push(skill);
	}

	let treeLevel = 0;
	let i = 0;
	while (skillsByCrowns[i].length == 0 && i < 6)
	{
		treeLevel++;
		i++;
	}

	return treeLevel;
}

function currentLanguageHistory()
{
	return calendar = userData.language_data[languageCode].calendar.filter(
		(lesson) => {
			return userData.language_data[languageCode].skills.find(skill => skill.id == lesson.skill_id) != null;
		}
	);
}

function daysToNextXPLevel(history, XPLeft)
{
	const currentDate = (new Date()).setHours(0,0,0,0);
	const metGoal = hasMetGoal();

	if (history.length == 0)
		return -1;

	let XPTotal = 0;
	
	const firstDate = (new Date(history[0].datetime)).setHours(0,0,0,0);
	if (firstDate == currentDate && !metGoal)
	{
		// The only data from this language is for today and the goal has yet to me met.
		return {time: -1};
	}

	let lastDate;

	for (const lesson of history)
	{
		const date = (new Date(lesson.datetime)).setHours(0,0,0,0);
		if (date != currentDate || metGoal)
		{
			// Not from today
			// or it is and the goal has been met
			XPTotal += lesson.improvement;
			lastDate = date;
		}
		else
		{
			// otherwise ignore
		}
	}
	// Note that lastDate cannot be undefined as that would mean all lessons in history were today and the goal had not been met.
	// But we would have exited before as firstDate would have then been today, and the goal was not met.

	let timePeriod = (lastDate - firstDate)/(1000*60*60*24) + 1; // number of days, inclusive of start and end.

	let XPRate = XPTotal/timePeriod; // in units of XP/day

	return {
		time: Math.ceil(XPLeft/XPRate),
		rate: XPRate
	};
}

function daysToNextTreeLevel()
{
	const {startIndex, endIndex, numDays} = progressEnds();
	
	const progressRate = progressMadeBetweenPoints(startIndex, endIndex) / numDays // in lessons per day

	const lessonsLeft = currentProgress();
	
	if (progressRate != 0)
	{
		return {
			time: Math.ceil(lessonsLeft / progressRate), // in days
			rate: progressRate,
			lessonsLeft: lessonsLeft
		}
	}
	else
	{
		return {time: -1};
	}
}

function daysToNextTreeLevelByCalendar()
{
	const lessonsToNextTreeLevel = currentProgress();

	const calendar = currentLanguageHistory();

	if (calendar.length == 0)
	{
		return {time: -1};
	}

	let currentDay = (new Date()).setHours(0,0,0,0);	

	let practiceTimes = calendar.map(
		(lesson) => {
			return (new Date(lesson.datetime)).setHours(0,0,0,0);
		}
	);
	
	if (!hasMetGoal())
	{
		// Not met the goal today so don't use data from today.
		practiceTimes = practiceTimes.filter(lessonDay => lessonDay != currentDay);
	}

	const numLessons = practiceTimes.length;
	
	if (numLessons == 0) // possible if only calendar entries for this language are from today, and we have't met our goal
	{
		return {time: -1};
	}

	const firstDay = practiceTimes[0]; // assuming sorted acending.
	let lastDay = practiceTimes[numLessons - 1];

	if (lastDay != currentDay)
	{
		// lastDay isn't today, it would only be today if we have met our goal for today
		// we therefore set the lastDay to yesterday, in case that wasn't already it and no lessons were completed yesterday.
		lastDay = currentDay - (24*60*60*1000);
	}

	const numDays = (lastDay - firstDay)/(1000*60*60*24) + 1; // in days
	const lessonRate = numLessons/numDays; // in lessons per day

	if (lessonRate <= 0)
	{
		return {time: -1};
	}
	else
	{
		return {
			time: Math.ceil(lessonsToNextTreeLevel/lessonRate), // in days
			rate: lessonRate,
			lessonsLeft: lessonsToNextTreeLevel
		}
	}
}

function daysToNextCheckpoint()
{
	const {startIndex, endIndex, numDays} = progressEnds();

	const progressRate = progressMadeBetweenPoints(startIndex, endIndex) / numDays // in lessons per day

	const lessonsLeft = lessonsToNextCheckpoint();
	
	if (progressRate != 0)
	{
		return {
			time: Math.ceil(lessonsLeft / progressRate), // in days
			rate: progressRate,
			lessonsLeft: lessonsLeft
		}
	}
	else
	{
		return {time: -1};
	}
}

function daysToNextCheckpointByCalendar()
{
	const calendar = currentLanguageHistory();
	
	if (calendar.length == 0)
	{
		return {time: -1};
	}

	const currentDay = (new Date()).setHours(0,0,0,0);

	let practiceTimes = calendar.map(
		(lesson) => {
			return (new Date(lesson.datetime)).setHours(0,0,0,0);
		}
	);

	if (!hasMetGoal())
	{
		// Not met the goal today so don't use data from today.
		practiceTimes = practiceTimes.filter(lessonDay => lessonDay != currentDay);
	}

	const numLessons = practiceTimes.length;

	const lessonsLeft = lessonsToNextCheckpoint();


	if (numLessons == 0) // possible if only calendar entries for this language are from today, and we have't met our goal
	{
		return {
			time: 0,
			rate: lessonRate,
			lessonsLeft: lessonsLeft
		};
	}

	const firstDay = practiceTimes[0];
	let lastDay = practiceTimes[numLessons - 1];

	if (lastDay != currentDay)
	{
		// if the last day isn't today, force it to yesterday
		// this ensures we count potential days without lessons
		lastDay = currentDay - (1000*60*60*24);
	}

	const numDays = (lastDay - firstDay) / (1000*60*60*24) + 1; // inclusive of start and end
	const lessonRate = numLessons/numDays;

	if (lessonRate <= 0)
	{
		return {time: -1};
	}
	else
	{
		return {
			time: Math.ceil(lessonsLeft / lessonRate), // in days
			rate: lessonRate,
			lessonsLeft: lessonsLeft
		}
	}
}

function createPredictionElement(type, {time: numDays, rate, lessonsLeft})
{
	let id = "";
	let target = "";

	const prediction = document.createElement("p");
	prediction.classList.add("prediction");

	switch (type)
	{
		case "XPLevel":
			prediction.classList.add("XPPrediction");
			target = `the next level, Level\xA0${userData.language_data[languageCode].level + 1}`;
			break;
		case "treeLevel":
			prediction.classList.add("treeLevelPrediction");
			target = `Level\xA0${currentTreeLevel() + 1}`;
			break;
		case "checkpoint":
			prediction.classList.add("checkpointPrediction");
			target = `the next checkpoint, Checkpoint\xA0${nextCheckpointIndex() + 1}`;
			break;
	}

	prediction.appendChild(
		document.createTextNode("At your ")
	);

	prediction.appendChild(
		document.createElement("span")
	);
	prediction.lastChild.textContent = "current rate";
	if (type !== "XPLevel")
	{
		prediction.lastChild.title = `${Number(rate).toFixed(2)} lessons/day with ${lessonsLeft} lesson to go`;
	}
	else
	{
		prediction.lastChild.title = `${Number(rate).toFixed(2)} XP/day`;
	}

	prediction.appendChild(
		document.createTextNode(` ${(type != "treeLevel") ? "you" : "your tree"} will reach ${target}, in about `)
	);
	prediction.appendChild(document.createElement("span"));
	prediction.lastChild.textContent = numDays;
	prediction.appendChild(
		document.createTextNode(` days, on `)
	);
	prediction.appendChild(document.createElement("span"));
	prediction.lastChild.textContent = new Date((new Date()).setHours(0,0,0,0) + numDays*24*60*60*1000).toLocaleDateString();

	return prediction;
}

function graphSVG(data, ratio=1.5)
{
	// Generates an svg of a graph with the data passed in.
	// ratio controls the aspect ratio of the graph
	
	// max is the next multiple of 4 equal to or above the largest value
	// in data, with a minimum value of 4.
	let max = Math.max(4, Math.ceil(Math.max(...data)/4) * 4);
	let height = 100/ratio;
	
	let svgns = "http://www.w3.org/2000/svg";
	let xmlns = "http://www.w3.org/2000/xmlns/";
	let graph = document.createElementNS(svgns,"svg");
	graph.setAttributeNS(xmlns, "xmlns", svgns);
	graph.setAttributeNS(null, "id", "graph");
	graph.setAttributeNS(null, "width", "100%");
	graph.setAttributeNS(null, "viewBox", "0 0 100 " + String(height));
	
	// Visible area is a rect of width 100 and aspect ratio specified in ratio
	
	// We leave a 5% gap above and to the right of the graph.
	// The graph area iself starts 15% from the left and bottom edges.
	// So the graph itself is a rect of width 80 in the same aspect ratio.

	/* Draw horizontal grid lines */

	let gridLines = document.createElementNS(svgns, "g");
	gridLines.setAttributeNS(null, "id", "gridLines");
	gridLines.setAttributeNS(null, "stroke", "lightgrey");
	gridLines.setAttributeNS(null, "stroke-width", "0.5");

	for (let i = 0; i < 5; i++)
	{
		let y = String(i*(height*0.80)/4 + 0.05*height);
		let line = document.createElementNS(svgns, "line");
		line.setAttributeNS(null, "x1", "15");
		line.setAttributeNS(null, "y1", y);
		line.setAttributeNS(null, "x2", "95");
		line.setAttributeNS(null, "y2", y);

		gridLines.appendChild(line);
	}
	graph.appendChild(gridLines);

	/* Draw Axis labels */

	let labels = document.createElementNS(svgns, "g");
	labels.setAttributeNS(null, "id", "labels");
	const fontSize = String(Math.min(6,0.1*height));
	labels.setAttributeNS(null, "font-size", fontSize);
	labels.setAttributeNS(null, "font-family", "sans-serif");
	
	let yLabels = document.createElementNS(svgns, "g");
	yLabels.setAttributeNS(null, "id", "yLabels");
	yLabels.setAttributeNS(null, "text-anchor", "end");

	let xLabels = document.createElementNS(svgns, "g");
	xLabels.setAttributeNS(null, "id", "xLabels");
	xLabels.setAttributeNS(null, "text-anchor", "middle");


	for (let i = 0; i < 5; i++)
	{
		let y = String(i*(height*0.8)/4 + 0.05*height);

		let label = document.createElementNS(svgns, "text");
		label.textContent = max - i*max/4;
		label.setAttributeNS(null, "x", "10");
		label.setAttributeNS(null, "y", y);
		label.setAttributeNS(null, "alignment-baseline", "middle");

		yLabels.appendChild(label);
	}

	let yTitle = document.createElementNS(svgns, "text");
	yTitle.textContent = "# Lessons Towards Next Level";
	yTitle.setAttributeNS(null, "id", "yTitle");
	yTitle.setAttributeNS(null, "x", "0");
	yTitle.setAttributeNS(null, "y", `0`);
	yTitle.setAttributeNS(null, "text-anchor", "middle");
	yTitle.setAttributeNS(null, "transform", `translate(${fontSize}, ${0.5*height}) rotate(-90)`);
	yTitle.setAttributeNS(null, "font-size", 0.068*height);
	labels.appendChild(yTitle);

	for (let i = 0; i < 7; i++)
	{
		let x = String(i*(100-20)/6 + 15);

		let label = document.createElementNS(svgns, "text");
		label.textContent = 
			(new Date(
					(new Date()).getTime() - (6-i)*1000*60*60*24
				)
			 )
			.toLocaleDateString(undefined,
				{
					weekday: "narrow"
				});

		label.setAttributeNS(null, "x", x);
		label.setAttributeNS(null, "y", String(height));

		xLabels.appendChild(label);
	}
	labels.appendChild(yLabels);	
	labels.appendChild(xLabels);

	graph.appendChild(labels);

	/* Draw area under points */

	let area = document.createElementNS(svgns, "polygon");
	area.setAttributeNS(null, "id", "area");
	area.setAttributeNS(null, "fill", "orange");
	area.setAttributeNS(null, "fill-opacity", "0.1");
	area.setAttributeNS(null, "stoke", "none");

	let pointCoords = "";

	for (let i = 0; i < 7; i++)
	{	
		let x = String(i*(100-20)/6 + 15);
		let y = String((height*0.8)*(1 - data[i]/max) + 0.05*height);
		pointCoords += `${x},${y} `;
	}
	area.setAttributeNS(null, "points", `${pointCoords} 95,${0.85*height} 15,${0.85*height}`);

	graph.appendChild(area);

	/* Draw line between points*/

	let line = document.createElementNS(svgns, "polyline");
	line.setAttributeNS(null, "id", "line");
	line.setAttributeNS(null, "stroke", "orange");
	line.setAttributeNS(null, "stroke-width", "0.5");
	line.setAttributeNS(null, "stroke-opacity", "0.8");
	line.setAttributeNS(null, "fill", "none");
	line.setAttributeNS(null, "points", pointCoords);

	graph.appendChild(line);

	/* Plot Points */

	let points = document.createElementNS(svgns, "g");
	points.setAttributeNS(null, "id", "points");
	points.setAttributeNS(null, "stroke", "orange");
	points.setAttributeNS(null, "stroke-width", "0.75");
	points.setAttributeNS(null, "fill", "orange");

	for (let i = 0; i < 7; i++)
	{
		let coords = pointCoords.split(" ")[i].split(",");

		let point = document.createElementNS(svgns, "circle");
		point.setAttributeNS(null, "cx", coords[0]);
		point.setAttributeNS(null, "cy", coords[1]);
		point.setAttributeNS(null, "r", "1.25");
		
		let title = document.createElementNS(svgns, "title");
		title.textContent = `${data[i]} tree level contributing lesson${data[i]!=1?"s":""}`;

		if (data[i] == 0)
			point.setAttributeNS(null, "fill", "white");

		point.appendChild(title);
		points.appendChild(point);
	}
	
	graph.appendChild(points);

	return graph;
}

async function openLastSkillPopout()
{
	if (lastSkill === undefined)
		return false;

	const skillName = lastSkill.skillName;
	const checkpointNumber = lastSkill.checkpointNumber;

	if (skillName != null)
	{
		const skillNameElement = Array.from(document.querySelectorAll(SKILL_NAME_SELECTOR)).find(elem => elem.textContent == skillName);
		if (skillNameElement == null)
			return false;

		skillNameElement.click();
	}
	else if (checkpointNumber != null)
	{
		const checkpointElements = Array.from(document.querySelectorAll(CHECKPOINT_SELECTOR));
		if (checkpointNumber < checkpointElements.length)
		{
			checkpointElements[checkpointNumber].click();
		}
		else
		{
			const goldenOwlCheckpoint = document.querySelector(GOLDEN_OWL_CHECKPOINT_SELECTOR);
			if (goldenOwlCheckpoint == null)
				return false;

			goldenOwlCheckpoint.click();
		}
	}

	resetLastSkillStorage();
	lastSkill = undefined;

	return true;
}

function addFlagBorders()
{
	// Get the tree levels of all the users trees
	chrome.storage.sync.get("treeLevels",
		(data) => {
			// Go through each row in the language change list, if it is still there.
			if (document.querySelector(LANGUAGES_LIST_SELECTOR) !== null && userId !== undefined)
			{
				Array.from(document.querySelectorAll(`${LANGUAGES_LIST_SELECTOR}>div>span`)).forEach(
					(container) => {
						// There are two flags for each language, the first is the target language, the second is the base language.
						if (!document.contains(container))
						{
							// Have managed to move away from the languages list while we are adding the borders
							return false;
						}
						const flag1 = container.firstChild;
						const flag2 = flag1.nextElementSibling;

						if (
							flag1.getAttribute("style") !== null
							|| flag1.classList.contains("borderedFlag")
						)
						{
							// In the unlikely case where we have already added the borders and are trying to again
							return false;
						}
						
						// As the flags are all stored in one sprite sheet we determine which is displayed by the background positions.
						const backgroundPosition1 = window.getComputedStyle(flag1).backgroundPosition.split(" ");
						const backgroundPosition2 = window.getComputedStyle(flag2).backgroundPosition.split(" ");
						

						// Background offsets in px as strings
						const x1 = backgroundPosition1[0];
						const y1 = backgroundPosition1[1];

						const y2 = backgroundPosition2[1];
						
						// trim off px and make positive
						const yOffset1 = Math.abs(parseInt(y1.slice(0,-2), 10));
						const yOffset2 = Math.abs(parseInt(y2.slice(0,-2), 10));

						// find the language code associated with those offsets
						const code1 = flagYOffsets[yOffset1];
						const code2 = flagYOffsets[yOffset2];

						// height and width will need to be adjusted to account for the border that is to be added, so we save the original values
						const height1 = window.getComputedStyle(flag1).height.slice(0,-2);
						const width1 = window.getComputedStyle(flag1).width.slice(0,-2);
				
						let treeLevel = (data.treeLevels !== undefined) ? data.treeLevels[`${userId}:${code2}->${code1}`]: undefined;

						if (treeLevel === undefined)
						{
							treeLevel = 0;
						}


						flag1.classList.add("borderedFlag");
						flag1.setAttribute("tree-level", treeLevel);
						flag1.style =
						`
							--bgPosX: ${parseFloat(x1) - 2}px;
							--bgPosY: ${parseFloat(y1) - 2}px;
							--height: ${+height1 + 4}px;
							--width: ${+width1 + 4}px;
						`;
						if (treeLevel == 5)
						{
							const crown = document.createElement("IMG");
							crown.src = imgSrcBaseUrl+"/juicy-crown.svg";
							flag1.appendChild(crown);
						}
					}
				);
			}
		}
	);
}

function addStrengthBars(strengths)
{
	// Adds strength bars and percentages under each skill in the tree.

	let skillElements = Array.from(document.querySelectorAll(SKILL_SELECTOR));
	
	let skills = Array();
	/*
		Each element of skills array will be an array with the following information:
		0:	skill icon element (unused currently).
		1:	skill name element.
		2:	skill strength between 0 and 1.0.
		3:	display boolean - false if skill at crown 0, true otherwise.
		4:	skill url_title - used to uniquely give an id to each strength bar
	*/
	let bonusElementsCount = 0;
	
	const bonusSkillRow = document.querySelector(`${BONUS_SKILL_DIVIDER_SELECTOR} + div`);

	for (let i=0; i<skillElements.length; i++)
	{
		const isBonusSkill = strengths[1].length !== 0 && bonusSkillRow !== null && bonusSkillRow.contains(skillElements[i]);
		// strengths[1].length !== 0 is a back up to make sure that a skillElement is not considered a bonus skill when it is impossible

		let elementContents;

		if (
			skillElements[i].getAttribute("data-test") == "skill" ||
			skillElements[i].getAttribute("data-test") == "intro-lesson"
		)
		{
			elementContents = [
				skillElements[i].querySelector(`[data-test="skill-icon"]`),
				skillElements[i].firstChild.firstChild.lastChild
			];
		}
		else
		{
			// This is bonus skill that has not been purchased so is missing on of the inner containers.
			elementContents = [
				skillElements[i].querySelector(`[data-test="skill-icon"]`),
				skillElements[i].firstChild.lastChild
			];
		}
		/* old way of finding name element before new containers

		// name is a span element, normally it is the last element but if the skill is clicked then a new div is created with the start lesson button etc below the name plate. So need to find the correct span element.
		for (let spanElement of Array.from(skillElements[i].childNodes[0].getElementsByTagName('span')))
		{
			if (spanElement.parentNode == elementContents[0].parentNode)
			{
				elementContents.push(spanElement);
			}
		}
		*/

		// Check if this skill is in the bonus skill section.
		// In the bonus skill section if the row is sandwiched between two divs with class _32Q0j, that contain an hr.
		if (isBonusSkill)
		{
			// this skill is in the bonus skill section.
			if (bonusSkillRow.childElementCount != strengths[1].length)
			{
				// One of the bonus skills is missing, this is a duolingo bug that is caused by the page being loaded on a tree that does not have bonus skills,
				// then switching to a tree that has only one skill purchased.
				// In this case the unpurchased skill that is normally greyed out and links to the shop to buy it, is not added for some reason.
				// We then have to work out which skill this is that we are displaying and choose the appropriate strength value.
				//
				// Given we know that the missing skill has not been purchased, it is therefore going to be at L0, and therefore have strength 0.
				// The skill that is displayed will be the other one then.
				//
				// Note this all assumes every tree that has bonus skills, has two.
				
				const bonusIndex = (strengths[1][0][0] == 0)? 1 : 0;
				elementContents = elementContents.concat(strengths[1][bonusIndex]);
				bonusElementsCount = 1;
			}
			else
			{
				elementContents = elementContents.concat(strengths[1][bonusElementsCount ++]);
			}

		}
		else
		{
			// Normal skill
			elementContents = elementContents.concat(strengths[0][i - bonusElementsCount]);
		}
		
		skills.push(elementContents);
	}
	
	let numBarsAdded = 0;

	const strengthBarBackground = document.createElement("div");
	strengthBarBackground.className = "strengthBarBackground";
	
	for (let i = 0; i< skills.length; i++)
	{
		const iconElement = skills[i][0];
		const nameElement = skills[i][1];
		const strength = skills[i][2]*100;
		const display = (skills[i][3]) ? "" : "none";
		const name = skills[i][4];
		
		if(document.getElementsByClassName("strengthBarHolder").length == numBarsAdded) // if we have only the number of bars added this time round, keep adding new ones.
		{
			const strengthBarHolder = document.createElement("div");
			strengthBarHolder.classList.add("strengthBarHolder")
			strengthBarHolder.setAttribute("display", display);

			nameElement.parentNode.classList.add("fullWidth");
			nameElement.parentNode.insertBefore(strengthBarHolder, nameElement);

			const strengthBar = document.createElement("div");
			strengthBar.classList.add("strengthBar");
			strengthBar.setAttribute("strength", strength);
			strengthBar.id = name + "StrengthBar";

			
			const strengthValue = document.createElement("div");
			strengthValue.className = "strengthValue";
			strengthValue.id = name + "StrengthValue";
			strengthValue.textContent = strength + "%";
			
			if (options.strengthBarBackgrounds)
			{
				strengthBarHolder.appendChild(strengthBarBackground.cloneNode());
			}

			strengthBarHolder.appendChild(strengthBar);
			strengthBarHolder.appendChild(strengthValue);
			
			numBarsAdded++; // added a bar so increment counter.
		}
		else // we already have the elements made previously, just update their values.
		{
			const strengthBar = document.getElementById(name + "StrengthBar");
			strengthBar.setAttribute("strength", strength);
			
			const strengthValue = document.getElementById(name + "StrengthValue");
			strengthValue.textContent = strength + "%";

			strengthBar.parentNode.setAttribute("display", display);
			
			const background = strengthBar.parentNode.querySelector(`.strengthBarBackground`);
			if (options.strengthBarBackgrounds && background === null)
			{
				strengthBar.parentNode.insertBefore(strengthBarBackground.cloneNode(), strengthBar);
			}
			else if (!options.strengthBarBackgrounds && background !== null)
			{
				background.remove();
			}
		}
	}
}

function displayNeedsStrengthening(needsStrengthening, cracked = false, needsSorting = true)
{
	// Adds clickable list of skills that need strengthening to top of the tree.
	
	let topOfTree;
	if (
		document.querySelector(`[data-test="skill-tree"]`) !== null
		&& document.querySelector(`[data-test="tree-section"]`) != null
		&& (
			document.getElementsByClassName(TOP_OF_TREE).length !== 0
			|| document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length !== 0
		)
	) // Has the tree loaded from a page change
	{
		topOfTree = document.querySelector(`[data-test="skill-tree"]>div`);
	}
	else
	{
		// body hasn't loaded yet so element not there, let's try again after a small wait, but only if we are still on the main page.
		if (onMainPage)
		{
			setTimeout(function () {displayNeedsStrengthening(needsStrengthening, cracked, needsSorting);}, 500);
		}
		else
		{
			// swtiched away before we got a chance to try again.
		}
		return false;
	}

	/*
		Sort the list based on the option saved:
		0: Tree order - no need to sort
		1: Reverse Tree order - just reverse both arrays
		2: Alphabetical
		3: Reverse Aphabetical
		4: Random
		5: Strength Ascending
		6: Strength Descending
		7: Crown Level Ascending
		8: Crown Level Descending


		The option needsStrengtheningListSortOrder is a string with comma seperated criteria.
		There are a maxium of 3 levels of sorting, after which no ambigutity should be left in the order of the skills.
		The first criterion is the Primary sorting criterion.
		The second is the Secondary sorting criterion, which gives the order to items that are the same when sorted by the Primary sorting criterion.
		The thrid is the Tertiay sorting criterion, which sort out any items that are still the same after the first two rounds of sorting.

		Note that criteria [0-4] leave no ambiguity in the sorting order, so no further sorting is needed after using one of these.

		While it is not guaranteed by the ECMAscript standard, if a sorting function returns 0 that should leave the two items being compared unchanged relative to each other.

		Assuming this behaviour, we will sort by the criteria in reverse order, so that this order is left intact when the higher level sorting puts items on the same level.

		Tested on Chrome, Firefox and Opera, all seem to sort correctly as of 2020-02-16

	*/
	function sortSkillsAlphabetical(a, b)
	{
		return (a.short < b.short) ? -1 : 1;
	}

	function shuffle(array)
	{
		let numUnshuffled = array.length;
		while (numUnshuffled > 0)
		{
			let randomIndex = Math.floor(Math.random() * numUnshuffled--);
			let endElem = array[numUnshuffled];
			array[numUnshuffled] = array[randomIndex];
			array[randomIndex] = endElem;
		}
	}

	function sortSkillsByStrength(a, b)
	{
		if (a.strength === b.strength)
			return 0;
		
		return (a.strength < b.strength) ? -1 : 1;
	}

	function sortSkillsByCrownLevel(a, b)
	{
		if (a.skill_progress.level === b.skill_progress.level)
			return 0;
		
		return (a.skill_progress.level < b.skill_progress.level) ? -1 : 1;
	}


	const sortingCriteria = (
		(!cracked) ? options.needsStrengtheningListSortOrder : options.crackedSkillsListSortOrder
	).split(",");

	if (needsSorting)
	{
		for (criterion of sortingCriteria.reverse())
		{
			switch (criterion)
			{
				case "0":
					break;
				case "1":
					needsStrengthening[0].reverse();
					needsStrengthening[1].reverse();
					break;
				case "2":
					needsStrengthening[0].sort(sortSkillsAlphabetical);
					needsStrengthening[1].sort(sortSkillsAlphabetical);
					break;
				case "3":
					needsStrengthening[0].sort(sortSkillsAlphabetical);
					needsStrengthening[1].sort(sortSkillsAlphabetical);
					needsStrengthening[0].reverse();
					needsStrengthening[1].reverse();
					break;
				case "4":
					shuffle(needsStrengthening[0]);
					shuffle(needsStrengthening[1]);
					break;
				case "5":
					needsStrengthening[0].sort(sortSkillsByStrength);
					needsStrengthening[1].sort(sortSkillsByStrength);
					break;
				case "6":
					needsStrengthening[0].sort(
						(a, b) => -1 * sortSkillsByStrength(a, b)
					);
					needsStrengthening[1].sort(
						(a, b) => -1 * sortSkillsByStrength(a, b)
					);
					break;
				case "7":
					needsStrengthening[0].sort(sortSkillsByCrownLevel);
					needsStrengthening[1].sort(sortSkillsByCrownLevel);
					break
				case "8":
					needsStrengthening[0].sort(
						(a, b) => -1 * sortSkillsByCrownLevel(a, b)
					);
					needsStrengthening[1].sort(
						(a, b) => -1 * sortSkillsByCrownLevel(a, b)
					);
					break;
			}
		}
	}
	
	topOfTree.classList.add("topOfTree");

	let strengthenBox = document.getElementById((!cracked)?"strengthenBox":"crackedBox"); // will be a div to hold list of skills that need strengthenening
	let needToAddBox = false;

	if (strengthenBox === null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = (!cracked) ? "strengthenBox" : "crackedBox";
		strengthenBox.classList.add("topOfTreeList");

		if (topOfTree.getElementsByClassName(IN_BETA_LABEL).length !== 0)
		{
			topOfTree.classList.add("hasInBetaLabel");
		}

		if (document.querySelector(TRY_PLUS_BUTTON_SELECTOR) !== null)
		{
			// There is a TRY PLUS button on the right which we have to make room for.
			const boxRightEdge = topOfTree.getBoundingClientRect().right;
			const buttonLeftEdge = document.querySelector(TRY_PLUS_BUTTON_SELECTOR).getBoundingClientRect().left;
			if (buttonLeftEdge !== 0)
			{
				// Is zero if element has been hidden e.g by an adblocker
				const offset = boxRightEdge - buttonLeftEdge;
				if (inMobileLayout)
				{
					strengthenBox.style.width = `calc(100% - ${offset}px - 1.5em)`;
				}
				else
				{
					strengthenBox.style.width = `calc(100% - ${offset}px - 0.5em)`;
				}
			}
		}
	}

	let numSkillsToBeStrengthened = needsStrengthening[0].length;
	
	if (
		(!cracked && options.showBonusSkillsInNeedsStrengtheningList) ||
		(cracked && options.showBonusSkillsInCrackedSkillsList)
	)
	{
		numSkillsToBeStrengthened += needsStrengthening[1].length;
	}

	strengthenBox.textContent = `Your tree has ${numSkillsToBeStrengthened}`;

	if (!cracked)
	{
		strengthenBox.textContent +=
		`
			${(numSkillsToBeStrengthened != 1) ? " skills that need": " skill that needs"}
			strengthening:
		`;
	}
	else
	{
		strengthenBox.textContent +=
		`
			${(numSkillsToBeStrengthened != 1) ? " skills that are": " skill that is"}
			cracked:
		`;
	}

	strengthenBox.appendChild(document.createElement("br"));

	const focus = (event) =>
	{
		(cracked) ? removeCrackedPopoutButton() : removeNeedsStrengtheningPopoutButton();

		if (event.target.getAttribute("href") !== "#")
		{

			const urlTitle = event.target.href.match(new RegExp(`/${languageCode}/([^/]*)`))[1];
			const button = createOpenPopoutButton(urlTitle);
			button.id = (cracked) ? "crackedPopoutButton" : "needsStrengtheningPopoutButton";

			if (
				!cracked && options.needsStrengtheningPopoutButton
				|| cracked && options.crackedPopoutButton
			)
			{
				event.target.parentNode.insertBefore(button, event.target.nextSibling);
			}
		}
	};

	let numSkillsToShow = Math.min(numSkillsToBeStrengthened, (!cracked)?options.needsStrengtheningListLength:options.crackedSkillsListLength);
	for (let i = 0; i < numSkillsToShow - 1; i++)
	{
		let skillLink = document.createElement("a");
		skillLink.addEventListener("focus", focus);
		skillLink.addEventListener("mouseenter", focus);

		if (i < needsStrengthening[0].length)
		{
			// index is in normal skill range
			const skill = needsStrengthening[0][i];

			const toPractise =
				skill.skill_progress.level === 5
				|| options.practiceType === "1"
				|| ( options.practice === "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
				|| (skill.category === "grammar" && skill.skill_progress.level === 2);

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${toPractise ? "/practice" : ""}`;
			skillLink.textContent = skill.short;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = i - needsStrengthening[0].length;
			const skill = needsStrengthening[1][bonusSkillIndex];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.short;
		}

		strengthenBox.appendChild(skillLink);
		strengthenBox.appendChild(document.createTextNode(", "));
	}
	strengthenBox.removeChild(strengthenBox.lastChild);
	
	const listEndText = document.createTextNode("");
	if (numSkillsToShow == 1)
		listEndText.textContent = ""; // If there is only one skill in the list, don't put anything before it.
	else if (numSkillsToShow == numSkillsToBeStrengthened)
		listEndText.textContent = " & "; // Add & if we have put some stuff and showing every skill in list so the next one is the very last.
	else
		listEndText.textContent = ", "; // Otherwise we have put some stuff and there is more coming after so just put a comma.

	strengthenBox.appendChild(listEndText);

	if (numSkillsToShow == numSkillsToBeStrengthened)
	{
		const skillLink = document.createElement("a");
		skillLink.addEventListener("focus", focus);
		skillLink.addEventListener("mouseenter", focus);

		// we are showing every skill that needs to be stregnthened.
		if (needsStrengthening[1].length > 0 && 
			(
				(!cracked && options.showBonusSkillsInNeedsStrengtheningList) ||
				(cracked && options.showBonusSkillsInCrackedSkillsList)
			)
		)
		{
			// last skill to be displayed is a bonus skill
			const skill = needsStrengthening[1][needsStrengthening[1].length -1];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.short;
		} else
		{
			// last skill to be displayed is a normal skill
			const skill = needsStrengthening[0][needsStrengthening[0].length -1];

			const toPractise =
				skill.skill_progress.level === 5
				|| options.practiceType === "1"
				|| ( options.practice === "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
				|| (skill.category === "grammar" && skill.skill_progress.level === 2);

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${toPractise ? "/practice" : ""}`;
			skillLink.textContent = skill.short;
		}
		
		strengthenBox.appendChild(skillLink);
	}
	else
	{
		// some skills that need to be strengthened are not being shown, so the last one we are showing is just the next one in the order we have
		const skillLink = document.createElement("a");
		skillLink.addEventListener("focus", focus);
		skillLink.addEventListener("mouseenter", focus);

		let lastIndexToBeShown = numSkillsToShow - 1; // the last for loop ended with i = numSkillsToShow - 2
		if (lastIndexToBeShown < needsStrengthening[0].length)
		{
			// index is in normal skill range
			const skill = needsStrengthening[0][lastIndexToBeShown];

			const toPractise =
				skill.skill_progress.level === 5
				|| options.practiceType === "1"
				|| ( options.practice === "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
				|| (skill.category === "grammar" && skill.skill_progress.level === 2);

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${toPractise ? "/practice" : ""}`;
			skillLink.textContent = skill.short;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = lastIndexToBeShown - needsStrengthening[0].length;
			const skill = needsStrengthening[1][bonusSkillIndex];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.short;
		}
		strengthenBox.appendChild(skillLink);
		strengthenBox.appendChild(document.createTextNode(", "));
		
		let numSkillsLeft = numSkillsToBeStrengthened - numSkillsToShow;

		// Add a clickable element to show more skills in the list.
		// We are going to add on another needsStrengtheningListLength number of skills to the list, but as we are going to change this amount to lengthen the list, we need to original saved in storage.
	 	chrome.storage.sync.get("options", function (data)
	 	{
			let numExtraSkillsOnShowMore = Math.min(numSkillsLeft, (!cracked)?data.options.needsStrengtheningListLength:data.options.crackedSkillsListLength);
			
			let showMore = document.getElementById(`showMore${(!cracked)?"ToStrengthen":"ToRepair"}`);
			if (showMore != null)
			{
				showMore.previousSibling.remove();
				showMore.remove(); // could have updated the list before we got the data back, so if there is an existing showMore button then remove it and replace it with a newer one
			}

			showMore = document.createElement("a");
			showMore.id = `showMore${(!cracked)?"ToStrengthen":"ToRepair"}`;
			showMore.textContent = numSkillsLeft + " more...";
			showMore.href = "#";
			showMore.addEventListener("focus", focus);
			showMore.addEventListener("mouseenter", focus);

			if (!cracked)
			{
				showMore.onclick = function () {
					options.needsStrengtheningListLength = String(+options.needsStrengtheningListLength + +numExtraSkillsOnShowMore);
					displayNeedsStrengthening(needsStrengthening, cracked, false);
					return false;
				};
			}
			else
			{
				showMore.onclick = function () {
					options.crackedSkillsListLength = String(+options.crackedSkillsListLength + +numExtraSkillsOnShowMore);
					displayNeedsStrengthening(needsStrengthening, cracked, false);
					return false;
				};
			}
			
			showMore.title = `Click to show ${numExtraSkillsOnShowMore} more skill${(numExtraSkillsOnShowMore != 1)? "s": ""}`;

			strengthenBox.appendChild(document.createTextNode(" and "));
			strengthenBox.appendChild(showMore);
		});
	}

	
	if(needToAddBox)
	{
		topOfTree.appendChild(strengthenBox);
	}

	const firstSkillLink = strengthenBox.querySelector("a");

	const firstSkillUrlTitle = firstSkillLink.href.match(new RegExp(`/${languageCode}/([^/]*)`))[1];

	const button = createOpenPopoutButton(firstSkillUrlTitle);
	button.id = (cracked) ? "crackedPopoutButton" : "needsStrengtheningPopoutButton";

	if (
		!cracked && options.needsStrengtheningPopoutButton
		|| cracked && options.crackedPopoutButton
	)
	{
		firstSkillLink.parentNode.insertBefore(button, firstSkillLink.nextSibling);
	}
	else
	{
		cracked ? removeCrackedPopoutButton() : removeNeedsStrengtheningPopoutButton();
	}
}

function focusFirstSkill()
{
	Array.from(options.focusPriorities).map(
		(abrv) =>
		{
			if (abrv === "n") return "strengthenBox";
			if (abrv === "c") return "crackedBox";
			if (abrv === "s") return "skillSuggestionMessageContainer";
		}
	).map(id => document.querySelector(`#${id} a`))
	.filter(elem => elem !== null)
	.slice(0, 1)
	.forEach(link => link.focus());
}

function getSkillFromPopout(skillPopout)
{
	const skillTitle = skillPopout.parentNode.querySelector(SKILL_NAME_SELECTOR).textContent;
	const allSkills = [...userData.language_data[languageCode].skills, ...userData.language_data[languageCode].bonus_skills];
	return allSkills.find(skill => skill.short == skillTitle);
}

function addSmallButtonsConatiner(skillPopout)
{
	const smallButtonsContainer = document.createElement("div");
	smallButtonsContainer.classList.add(SMALL_BUTTONS_CONTAINER);

	const mainPopoutContainer = skillPopout.firstChild.firstChild;
	mainPopoutContainer.insertBefore(smallButtonsContainer, mainPopoutContainer.firstChild);

	return smallButtonsContainer;
}

function addGrammarSkillTestOutButton(skillPopout)
{
	if (skillPopout === null) return false;

	const skillData = getSkillFromPopout(skillPopout);

	if (
		skillData.category !== "grammar"
		|| skillData.locked === true
		|| skillPopout.querySelector(`[data-test="test-out-button"]`) !== null
	)
	{
		return false;
	}

	// Skill popout is a grammar skill and there isn't a test out button

	if (skillData.skill_progress.level === skillData.num_levels) return false;

	// Not at max level so can test out.

	const testOutButton = addSmallButtonToPopout(skillPopout, true);
	testOutButton.setAttribute("data-test", "test-out-button");
	testOutButton.id = "grammarSkillTestOutButton";

	const testOutIcon = document.createElement("img");
	testOutIcon.src = `${imgSrcBaseUrl}/key.svg`;
	testOutIcon.classList.add(TEST_OUT_ICON);
	testOutButton.appendChild(testOutIcon);

	testOutButton.addEventListener("click",
		(event) =>
		{
			const skillName = skillPopout.parentNode.querySelector(SKILL_NAME_SELECTOR).textContent;
			const lastSkill = {
				skillName: skillName,
				urlTitle: skillData.url_title
			};

			chrome.storage.sync.set({lastSkill: lastSkill});

			window.location = `/skill/${languageCode}/${skillData.url_title}/test`;
		}
	);
}

function addWordsButton(skillPopout)
{
	if (skillPopout === null) return false;

	skillPopout.classList.add("skillPopout");

	const skillData = getSkillFromPopout(skillPopout);

	// Grammar skills words list are not currently helpful, so don't add the button.
	if (skillData.category === "grammar") return false;
	
	const words = skillData.words;
	const isLocked = skillData.locked;

	let wordsButton = addSmallButtonToPopout(skillPopout);
	const smallButtonsContainer = skillPopout.querySelector(`.${SMALL_BUTTONS_CONTAINER}`)
	
	wordsButton.setAttribute("data-test", "words-button");
	wordsButton.textContent = "words";

	if (isLocked)
	{
		wordsButton.style.backgroundColor = "darkgrey";
		smallButtonsContainer.nextElementSibling.style.textAlign = "start";
	}

	wordsButton.addEventListener("click",
		(event) => {
			const smallButtonsContainer = event.target.parentNode;
			const wordsListBubble = smallButtonsContainer.querySelector("#wordsListBubble");
			if (wordsListBubble == null)
				smallButtonsContainer.appendChild(createWordsListBubble(words, wordsButton, smallButtonsContainer, isLocked));
			else
				wordsListBubble.remove();
			event.stopPropagation();
		}
	);
	skillPopout.firstChild.addEventListener("click",
		(event) =>
		{
			const wordsListBubble = document.querySelector(`#wordsListBubble`);
			if (wordsListBubble != null)
				wordsListBubble.remove();
		}
	);
}

function createWordsListBubble(words, button, container, isLocked)
{
	const bubble = document.createElement("div");
	bubble.id = "wordsListBubble";
	const backgroundColor = isLocked ? "darkgrey" : "white";
	const textColor = isLocked ? "white" : window.getComputedStyle(container.parentNode).backgroundColor;
	
	bubble.style.color = textColor;

	bubble.addEventListener("click", (event) => {event.stopPropagation();})

	const arrow = document.createElement("div");
	const arrowOffset = button.offsetLeft + 0.5*button.offsetWidth;
	arrow.style.transform = `translateX(calc(-50% + ${arrowOffset}px)) rotate(45deg)`;
	bubble.appendChild(arrow);

	const list = document.createElement("ul");
	bubble.appendChild(list);

	words.forEach(
		(word, index, words) => {
			const li = document.createElement("li");
			li.textContent = word + ((index +1 != words.length)?" \u00b7 ":"");
			list.appendChild(li);
		}
	);

	return bubble;
}

function addSmallButtonToPopout(skillPopout, div = false)
{
	// Adds a new small button in the top right of a skill popout, will add it to the front of the buttons.

	let newButton;
	let smallButtonsContainer = skillPopout.querySelector(`.${SMALL_BUTTONS_CONTAINER}`);

	if (smallButtonsContainer === null)
	{
		smallButtonsContainer = addSmallButtonsConatiner(skillPopout);
	}

	smallButtonsContainer.classList.add("smallButtonsContainer");
	
	newButton = document.createElement(div ? "div" : "button");
	newButton.classList.add(...SMALL_BUTTON.split(" "));
	smallButtonsContainer.insertBefore(newButton, smallButtonsContainer.firstChild);

	smallButtonsContainer.setAttribute("numChildren", `${smallButtonsContainer.childElementCount}`);

	return newButton;
}

function addMasteredSkillButton(skillPopout)
{
	const skillData = getSkillFromPopout(skillPopout);
	if (skillData.locked)
	{
		return false;
	}

	const masteredButton = addSmallButtonToPopout(skillPopout);

	let skillIsMastered = mastered.includes(skillData.id);

	masteredButton.textContent = (skillIsMastered) ? "\u2718" : "\u2714"; // cross or tick
	masteredButton.setAttribute("data-test", "mastered-button");
	masteredButton.title = `${(skillIsMastered) ? "Unm" : "M"}ark Skill as Mastered`;

	masteredButton.addEventListener("click",
		(event) =>
		{
			if (skillIsMastered)
			{
				mastered = mastered.filter(id => id !== skillData.id);
			}
			else
			{
				mastered.push(skillData.id);
			}
			skillIsMastered = !skillIsMastered;

			masteredButton.textContent = (skillIsMastered) ? "\u2718" : "\u2714";
			masteredButton.title = `${(skillIsMastered) ? "Unm" : "M"}ark Skill as Mastered`;
			storeMasteredSkills();


			addFeatures();
		}
	);
}

function addPractiseButton(skillPopout)
{
	if (skillPopout == null)
		return false;
	
	const levelContainer = document.querySelector(SKILL_POPOUT_LEVEL_CONTAINER_SELECTOR);
	if (levelContainer == null)
		return false; // Locked skill so don't do anything

	const skillLevel = levelContainer.textContent.slice(-3,-2);
	const maxLevel = levelContainer.textContent.slice(-1);
	if (skillLevel === maxLevel || (skillLevel === "0" && !options.crownZeroPractiseButton))
		return false; // Skill is at max level so only practising is possible

	const startButton = document.querySelector(`[data-test="start-button"]`);
	startButton.textContent = "START LESSON";

	const practiseButton = startButton.cloneNode(true);
	practiseButton.textContent = "Practise";
	practiseButton.title = "Practising this skill will strengthen it, but will not contribute any progress towards earning the next crown.";
	practiseButton.setAttribute("data-test", "practise-button");

	const urlTitle = getSkillFromPopout(skillPopout).url_title;
	practiseButton.addEventListener("click", (event) => {
		const skillName = skillPopout.parentNode.querySelector(SKILL_NAME_SELECTOR).textContent;
		const lastSkill = {
			skillName: skillName,
			urlTitle: urlTitle
		};

		chrome.storage.sync.set({lastSkill: lastSkill});

		window.location = `/skill/${languageCode}/${urlTitle}/practice`;
	});

	startButton.parentNode.insertBefore(practiseButton, startButton.nextSibling);

	skillPopout.scrollIntoView({block: "center"});
}

function addCheckpointButtons(checkpointPopout, completedMessage = false)
{
	// Check popout is still there
	if (checkpointPopout === null)
	{
		return false;
	}

	// Check that this popout is for a finished checkpoint
	if (!completedMessage && checkpointPopout.parentNode.querySelector(`img[src$="unlocked.svg"]`) !== null) // ...unlocked.svg -> uncompleted, ...complete.svg -> completed
	{
		return false; // This is an uncompleted checkpoint, we won't add anything to this.
	}

	let checkpointNumber;
	let popoutContent;
	if (!completedMessage)
	{
		checkpointNumber = Array.from(document.querySelectorAll(CHECKPOINT_CONTAINER_SELECTOR)).indexOf(checkpointPopout.parentNode);
		popoutContent = checkpointPopout.firstChild.firstChild;
	}
	else
	{
		// CHECKPOINT_CONTAINER_SELECTOR only selects completed checkpoint castles and not the golden owl
		// so the last checkpoint in this case is one more than last checkpoint.
		checkpointNumber = document.querySelectorAll(CHECKPOINT_CONTAINER_SELECTOR).length;
		popoutContent = checkpointPopout;
	}

	const storeCheckpointSource = () =>
	{
		const lastSkill = {checkpointNumber: checkpointNumber}
		chrome.storage.sync.set({lastSkill: lastSkill});
	};

	const practiceCheckpointButton = checkpointPopout.querySelector(`[data-test="checkpoint-start-button"]`);
	if (practiceCheckpointButton !== null)
	{
		// Practice button exists that we can copy for the buttons
		const redoTestButton = practiceCheckpointButton.cloneNode(true);
		redoTestButton.textContent = "RETRY CHECKPOINT CHALLENGE";
		redoTestButton.setAttribute("data-test", "redo-test-button");

		popoutContent.appendChild(redoTestButton);
		redoTestButton.addEventListener("click",
			(event) =>
			{
				storeCheckpointSource();
				window.location = `/checkpoint/${languageCode}/${checkpointNumber}/`;
			}
		);

		const testOutButton = practiceCheckpointButton.cloneNode(true);
		testOutButton.textContent = "RETRY CROWN 1 TEST OUT";
		testOutButton.setAttribute("data-test", "test-out-button");

		popoutContent.appendChild(testOutButton);
		testOutButton.addEventListener("click",
			(event) =>
			{
				storeCheckpointSource();
				window.location = `/checkpoint/${languageCode}/${checkpointNumber}/bigtest`
			}
		);
	}
	else
	{
		// No buttons so we have to made them both
		const redoTestButton = document.createElement("BUTTON");
		redoTestButton.setAttribute("data-test", "redo-test-button");
		redoTestButton.classList.add("checkpointButton");
		redoTestButton.textContent = "RETRY CHECKPOINT CHALLENGE";
		redoTestButton.style.color = window.getComputedStyle(popoutContent).getPropertyValue("background-color"); // Make this Same as background colour of box

		if (completedMessage)
		{
			redoTestButton.removeAttribute("style");
		}
		else if (checkpointPopout.querySelector(CHECKPOINT_BLURB_SELECTOR) === null)
		{
			popoutContent.classList.add("noBlurb");
		}

		redoTestButton.addEventListener("click",
			(event) =>
			{
				storeCheckpointSource();
				window.location = `/checkpoint/${languageCode}/${checkpointNumber}/`;
			}
		);

		const testOutButton = redoTestButton.cloneNode(true);
		testOutButton.textContent = "RETRY CROWN LEVEL 1 TEST OUT";
		testOutButton.setAttribute("data-test", "test-out-button");

		testOutButton.addEventListener("click",
			(event) =>
			{
				storeCheckpointSource();
				window.location = `/checkpoint/${languageCode}/${checkpointNumber}/bigtest`
			}
		);
				
		if (completedMessage)
		{
			// Adding buttons to the golden owl message.
			// Duolingo does't add their PRACTICE +10 XP button,
			// so we will.
			// We will use their spelling to be consistent with the other checkpoints.
			const practiseButton = redoTestButton.cloneNode(true);
			practiseButton.textContent = "PRACTICE +10 XP";
			practiseButton.setAttribute("data-test", "practise-button");

			practiseButton.addEventListener("click",
				(event) =>
				{
					storeCheckpointSource();
					window.location = `/checkpoint/${languageCode}/${checkpointNumber}/practice`
				}
			);
			popoutContent.appendChild(practiseButton);

		}

		popoutContent.appendChild(redoTestButton);
		popoutContent.appendChild(testOutButton);
	}

	popoutContent.scrollIntoView({block: "center"});
}

function addButtonsToTipsPage()
{
	if ((new RegExp("/tips/?")).test(window.location.pathname))
	{
		const desiredNumButtons = (1 + options.addTipsPagePractiseButton) * (options.addTipsPageBottomButtons? 2 : 1 )

		const startLessonButtons = document.querySelectorAll(`[data-test="start-lesson"]`);
		const practiseButtons = document.querySelectorAll(`[data-test="practise-button"]`);

		if (desiredNumButtons !== startLessonButtons.length + practiseButtons.length)
		{
			// We have the wrong number of buttons, so we need to do something.
			// Start off by removing all the extra buttons.
			removeTipsPageButtons();

			// Find the skill for the current tips page
			const skillUrlTitle = window.location.pathname.match(new RegExp(`/${languageCode}/(.*)/tips`))[1];

			const skillObject = [...userData.language_data[languageCode].skills, ...userData.language_data[languageCode].bonus_skills]
								.find(skill => skill.url_title === skillUrlTitle);

			// See if this skill is at max crown level so the start-lesson button will be point to a practice sesison.
			const toPractise = skillObject.skill_progress.level === 5
							|| (
								skillObject.category === "grammar"
								&& skillObject.skill_progress.level === 2
							)
							|| (
								skillObject.bonus && skillObject.skill_progress.level === 1
							);

			const startLessonButton = startLessonButtons[0];
			startLessonButton.parentNode.classList.add("tipsPageButtonContainer");
			startLessonButton.parentNode.id = "tipsPageTopContainer";
			// Add the practise button at the top if it is wanted.
			if (options.addTipsPagePractiseButton && !toPractise)
			{
				const practiseButton = startLessonButton.cloneNode(true);
				practiseButton.setAttribute("data-test", "practise-button");
				practiseButton.textContent = "practise";

				startLessonButton.parentNode.insertBefore(practiseButton, startLessonButton.nextElementSibling);
			}

			// Now copy all the top buttons to the bottom of the page if wanted.
			if (options.addTipsPageBottomButtons)
			{
				const buttons = [startLessonButton, ...document.querySelectorAll(`[data-test="practise-button"]`)];

				const bottomButtonsContainer = startLessonButton.parentNode.cloneNode(false);
				bottomButtonsContainer.id = "tipsPageBottomContainer";
				document.querySelector(TIPS_PAGE_BODY_SELECTOR).parentNode.appendChild(bottomButtonsContainer);

				buttons.forEach(
					(button) =>
					{
						bottomButtonsContainer.appendChild(button.cloneNode(true));
					}
				);
			}

			// Add click handler to practise buttons
			document.querySelectorAll(`[data-test="practise-button"]`).forEach(
				(practiseButton) =>
				{
					practiseButton.addEventListener("click",
						(event) =>
						{
							window.location.pathname = `/skill/${languageCode}/${skillUrlTitle}/practice`;
						}
					);
				}
			);

			// click handler to second start-lesson button
			Array.from(document.querySelectorAll(`[data-test="start-lesson"]`)).slice(1).forEach(
				(startButton) =>
				{
					startButton.addEventListener("click",
						(event)=>
						{
							window.location.pathname = `/skill/${languageCode}/${skillUrlTitle}${toPractise ? "/practice" : ""}`;
						}
					);
				}
			);
		}
	}
	else
	{
		// Not on a tips page.
		return false;
	}
}

function applyFocusMode()
{
	// Hide the sidebar if in focus mode.
	if (options.focusMode)
	{
		rootElem.classList.add("focusMode");
	}
	else
	{
		rootElem.classList.remove("focusMode");
	}

	removeFocusModeButton();

	let globalPractiseButtonContainer = document.querySelector(GLOBAL_PRACTISE_BUTTON_SELECTOR);
	if (globalPractiseButtonContainer === null)
	{
		globalPractiseButtonContainer = document.createElement("div");
		globalPractiseButtonContainer.classList.add(...GLOBAL_PRACTISE_BUTTON_SELECTOR.split(".").slice(1));
		const button = document.createElement("a");
		button.classList.add(...GLOBAL_PRACTISE_BUTTON_ANCHOR.split(" "));
		globalPractiseButtonContainer.appendChild(button);
		button.appendChild(document.createElement("img"));
		document.querySelector(TREE_OVERLAY_CONTAINER_SELECTOR)?.appendChild(globalPractiseButtonContainer) ?? (globalPractiseButtonContainer = null);
	}
	// Add button to toggle the focus mode, if is wanted
	if (
		options.focusModeButton
		&& !inMobileLayout
		&& globalPractiseButtonContainer !== null 
	)
	{

		const focusModeButton = globalPractiseButtonContainer.cloneNode(true);
		focusModeButton.id = "focusModeButton";

		focusModeButton.firstChild.setAttribute("data-test", "focusModeButton");
		focusModeButton.firstChild.title = `${(options.focusMode) ? "Disable" : "Enable"} Focus Mode`;
		focusModeButton.firstChild.removeAttribute("href");
		focusModeButton.addEventListener("click",
			(event) =>
			{
				event.preventDefault();
				// Toggle mode
				options.focusMode = !options.focusMode;
				// Save changed Setting
				chrome.storage.sync.set({"options": options});
				// Re apply the focus mode
				applyFocusMode();
			}
		);

		focusModeButton.querySelector(`img`).src = (options.focusMode) ? chrome.runtime.getURL("images/defocus.svg") : chrome.runtime.getURL("images/focus.svg");

		globalPractiseButtonContainer.parentNode.appendChild(focusModeButton);

		if (globalPractiseButtonContainer.firstChild.getAttribute("data-test") === null)
		{
			// We made this button above, let's delete it now.
			globalPractiseButtonContainer.remove();
		}
	}
}

function applyFixedSidebar()
{
	const sidebar = document.querySelector(`.${SIDEBAR}`);

	if (sidebar === null)
	{
		return false;
	}

	if (options.fixedSidebar)
	{
		sidebar.classList.add("fixedSidebar");
	}
	else
	{
		sidebar.classList.remove("fixedSidebar");
	}
}

function getCrackedSkills()
{
	const crackedSkillElements = Array.from(document.querySelectorAll(CRACKED_SKILL_OVERLAY_SELECTOR));
	const crackedSkills = Object.fromEntries(
		crackedSkillElements.map(
			(crackedSkill) => {
				const skillIcon = crackedSkill.parentNode.parentNode;
				const skillContainer = skillIcon.parentNode.parentNode.parentNode;
				const skillNameElement = skillContainer.querySelector(SKILL_NAME_SELECTOR);
				const skillName = skillNameElement.textContent;

				// displayed name under skill is the short name
				// for some trees there can be multiple skills with the same short name
				// we need to look for how many instances of a skill with this name there are
				// in order to select the correct skill from the userData skills

				const skillElements = Array.from(document.querySelectorAll(SKILL_SELECTOR));
				const sameNamedSkills = skillElements.filter(elem => elem.querySelector(SKILL_NAME_SELECTOR).textContent === skillName);

				const instance = sameNamedSkills.findIndex(nameElement => nameElement.querySelector(SKILL_NAME_SELECTOR).isSameNode(skillNameElement));

				return [skillName, instance];
			}
		)
	);



	let crackedSkillObjects = [[], []];

	Object.keys(crackedSkills).forEach(
		(skillName) =>
		{
			let userDataObjects = userData.language_data[languageCode].skills.filter(skill => skill.short === skillName);
			if (userDataObjects.length !== 0)
			{
				// At least 1 normal skill matched the short name
				crackedSkillObjects[0].push(userDataObjects[crackedSkills[skillName]]);
			}
			else
			{
				userDataObjects = userDataObjects.language_data[languageCode].bonus_skills.filter(bonusSkill => bonusSkill.short === skillName);
				crackedSkillObjects[1].push(userDataObjects[crackedSkills[skillName]]);
			}
			
		}
	);

	crackedSkillElements.forEach(
		(crackedSkillOverlay) => {
			const parentElement = crackedSkillOverlay.parentNode;
			childListObserver.observe(parentElement, {childList: true});
		}
	);

	return crackedSkillObjects;
}

function getLanguagesInfo()
{
	let languages = userData.languages;
	if (languages === undefined)
		return [];
	
	languages = languages.filter(language => language.learning) // Only select languages that are being learnt.
		.filter(language => language.points != 0); // Remove languages that have 0 XP as they aren't really being learnt.
	
	const languagesInfo = languages.map(language => [
		language.language_string,
		language.level,
		language.points,
		(language.level != 25) ? language.to_next_level: "-"
	]);

	/*
		Sort the list based on the option saved:
		0: Alphabetical
		1: Reverse Alphabetical
		2: XP - Descending
		3: XP - Ascending
		4: XP to Next Level - Descending
		5: XP to Next Level - Ascending
	*/
	function sortAlphabetical(a, b)
	{
		return (a[0] < b[0]) ? -1 : 1;
	}

	function sortXPDescending(a, b)
	{
		return (a[2] < b[2]) ? 1 : -1;
	}

	function sortXPToNextLevelDescending(a, b)
	{
		return (a[3] < b[3]) ? 1 : -1;
	}

	switch (options.languagesInfoSortOrder)
	{
		case "0":
			languagesInfo.sort(sortAlphabetical);
			break;
		case "1":
			languagesInfo.sort(sortAlphabetical).reverse();
			break;
		case "2":
			languagesInfo.sort(sortXPDescending);
			break;
		case "3":
			languagesInfo.sort(sortXPDescending).reverse();
			break;
		case "4":
			languagesInfo.sort(sortXPToNextLevelDescending);
			break;
		case "5":
			languagesInfo.sort(sortXPToNextLevelDescending).reverse();
			break;
	}

	return languagesInfo;
}

function createOpenPopoutButton(skillUrlTitle)
{
	let skillElement;
	let skillName;

	if (/checkpoint/.test(skillUrlTitle))
	{
		const checkpointNumber = Number(skillUrlTitle.split('/')[1]);
		skillName = `Checkpoint ${1 + checkpointNumber}`;
		skillElement = document.querySelectorAll(CHECKPOINT_SELECTOR)[checkpointNumber];
	}
	else
	{
		const allSkills = [...userData.language_data[languageCode].skills,...userData.language_data[languageCode].bonus_skills];
		const skill = allSkills.find(
			(skillObject) =>
			{
				return skillObject.url_title === skillUrlTitle;
			}
		);

		skillName = skill.short;

		const nameIndex = allSkills.filter(skillObject => skillObject.short === skillName).findIndex(skillObject => skillObject === skill);

		const sameNamedSkills = Array.from(document.querySelectorAll(`${SKILL_SELECTOR}`)).filter(
			(skillElement) =>
			{
				return skillElement.querySelector(SKILL_NAME_SELECTOR).textContent === skillName;
			}
		);

		skillElement = sameNamedSkills[nameIndex];
	}
	const button = document.createElement("button");
	button.classList.add("openPopoutButton");
	button.title = `Open popout for ${skillName}`;
	button.addEventListener("click",
		(event) =>
		{
			event.stopPropagation();
			skillElement.firstChild.click();
		}
	);

	button.appendChild(document.createElement("img"));
	button.lastChild.src = chrome.runtime.getURL("images/popout.svg");

	return button;
}

function displayCrownsBreakdown()
{
	if (Object.entries(userData).length === 0)
	{
		return false;
	}

	removeCrownsBreakdown(); // Remove if there is anything, in case it is still visible when we call
	
	const isSidebar = document.querySelector(`.${SIDEBAR}`) !== null;
	const isPopupContainer = document.querySelector(CROWNS_POPUP_CONTAINER_SELECTOR) !== null;

	const somethingToDo = (
		(options.crownsInfoInSidebar && isSidebar)
		||
		((inMobileLayout || options.crownsInfoInPopup) && isPopupContainer)
	);
	
	if (!somethingToDo)
	{
		return false;
	}

	let skills = userData.language_data[languageCode].skills;
	skills = skills.filter(skill => skill.category !== "grammar");
	const bonusSkills = userData.language_data[languageCode].bonus_skills;
	const grammarSkills = userData.language_data[languageCode].skills.filter(skill => skill.category === "grammar");

	let crownLevelCount = [Array(6).fill(0),Array(2).fill(0),Array(3).fill(0)]; // will hold number skills at each crown level, index 0 : crown 0 (not finished), index 1 : crown 1, etc.
	// crownLevelCount[0] normal skills
	// crownLevelCount[1] bonus skills
	// crownLevelCount[2] grammar skills

	for (const skill of skills)
	{
		crownLevelCount[0][skill.skill_progress.level]++;
	}

	for (const bonusSkill of bonusSkills)
	{
		crownLevelCount[1][bonusSkill.skill_progress.level]++;
	}

	for (const grammarSkill of grammarSkills)
	{
		crownLevelCount[2][grammarSkill.skill_progress.level]++;
	}

	const maxCrownCount = 5*skills.length + 2*grammarSkills.length + bonusSkills.length;

	const treeLevel = currentTreeLevel();

	const placesToAdd = [];

	if ((inMobileLayout || options.crownsInfoInPopup) && isPopupContainer)
	{
		const crownsPopupContainer = document.querySelector(CROWNS_POPUP_CONTAINER_SELECTOR);
		crownsPopupContainer.id = "crownsPopupContainer";
		crownsPopupContainer.parentNode.id = "crownsPopupContainerParent";

		placesToAdd.push(crownsPopupContainer);
	}

	if (options.crownsInfoInSidebar && isSidebar)
	{
		const sidebarCrownsInfoContainer = document.createElement("div");
		sidebarCrownsInfoContainer.classList.add(WHITE_SIDEBAR_BOX_CONTAINER);
		sidebarCrownsInfoContainer.id = "sidebarCrownsInfoContainer";

		let elementToInsertCrownsInfoBefore = document.querySelector(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`).nextElementSibling;
		if (document.querySelector(`#languagesBox`) != null)
		{
			elementToInsertCrownsInfoBefore = document.querySelector(`#languagesBox`).nextElementSibling;
		}
		document.querySelector(`.${SIDEBAR}`).insertBefore(sidebarCrownsInfoContainer, elementToInsertCrownsInfoBefore);

		placesToAdd.push(sidebarCrownsInfoContainer);

		// Add crowns icon and count
		const crownLogoContainer = document.createElement("div");
		crownLogoContainer.classList.add(CROWN_LOGO_CONTAINER);

		sidebarCrownsInfoContainer.appendChild(crownLogoContainer);

		const crownImg = document.createElement("img");
		const crownCount = document.querySelector(CROWN_TOTAL_SELECTOR).textContent;

		if (crownCount === "0")
		{
			crownImg.src = `${imgSrcBaseUrl}/juicy-crown-empty.svg`;
			sidebarCrownsInfoContainer.classList.add(ZERO_CROWNS_CONTAINER);
		}
		else
		{
			crownImg.src = `${imgSrcBaseUrl}/juicy-crown.svg`;
		}
		crownImg.classList.add(GOLD_CROWN);
		crownLogoContainer.appendChild(crownImg);

		const crownTotalContainer = document.createElement("span");
		crownTotalContainer.classList.add(CROWN_TOTAL_CONTAINER);
		crownTotalContainer.textContent = crownCount;
		crownLogoContainer.appendChild(crownTotalContainer);

		// Add Crowns Header and Text
		const crownDescriptionContainer = document.createElement("div");
		crownDescriptionContainer.classList.add(CROWN_DESCRIPTION_CONTAINER);
		crownDescriptionContainer.classList.add("crownDescriptionContainer");
		sidebarCrownsInfoContainer.appendChild(crownDescriptionContainer);

		crownDescriptionContainer.appendChild(document.createElement("h2"));
		crownDescriptionContainer.lastChild.textContent = "Crowns";
		crownDescriptionContainer.appendChild(document.createElement("p"));
		crownDescriptionContainer.lastChild.textContent = "Level up your skills to earn crowns!";
	}

	placesToAdd.forEach(
		(place) => 
		{
			crownsInfoContainer = place;

			const crownLogoContainer = crownsInfoContainer.querySelector(`.${CROWN_LOGO_CONTAINER}`);
			const crownCountImg = crownLogoContainer.querySelector(`:scope > img`);
			crownCountImg.classList.add("crownCountImg");

			const crownDescriptionContainer = crownsInfoContainer.querySelector(`.${CROWN_DESCRIPTION_CONTAINER}`);
			if (crownDescriptionContainer !== null)
			{
				crownDescriptionContainer.classList.add("crownDescriptionContainer");
			}

			// Add max crowns and crowns precentage
			const crownTotalContainer = crownsInfoContainer.querySelector(`.${CROWN_TOTAL_CONTAINER}`);

			if (options.crownsMaximum)
			{
				const maximumCrownCountContainer = document.createElement("span");
				maximumCrownCountContainer.classList.add("maxCrowns");
				maximumCrownCountContainer.textContent = "/" + maxCrownCount;
				
				crownTotalContainer.appendChild(maximumCrownCountContainer);

				if (options.crownsPercentage)
				{
					const crownCountPercentage = document.createElement("span");
					crownCountPercentage.classList.add("crownCountPercentage");
					crownCountPercentage.textContent = `(${(100*document.querySelector(CROWN_TOTAL_SELECTOR).textContent/maxCrownCount).toFixed(1)}%)`;

					crownTotalContainer.parentNode.appendChild(crownCountPercentage);
				}
			}

			// Add crowns progress graph
			if (options.crownsGraph && currentTreeLevel() != 5)
			{
				let treeLevelProgressInWeek = [];
				// will hold number of tree level progressing lessons done each day for seven days
				// treeLevelProgressInWeek[0] : week ago;
				// treeLevelProgressInWeek[6] : today;

				const dateToday = (new Date()).setHours(0,0,0,0);
				const msInDay = 24*60*60*1000;
				
				let day = dateToday;
				let i = progress.length - 1; // used to index into progress
				while (day > dateToday - 7*msInDay && i > 0)
				{
					// day loops through the last week backwards.
					// Also stop if we run out of progress entries to use.

					if (progress[i][0] !== day)
					{
						// The progress entry isn't for the day we are testing,
						// so no tree level contributing lessons were earned on that day.

						treeLevelProgressInWeek.unshift(0);

						// Note we don't decrement i as we haven't used the info in this
						// progress entry.
					}
					else
					{
						// There is at least one prrogress entry for the day we are currently looking at.

						let progressAddedFromCurrentDay = false;
						while (progress[i][0] === day)
						{
							/*
							This progress entry is from the the day we are looking at.
							We are looping through progress entries that are on the current day as there may be multiple.
							Multiple entries are added for the same day when either:
							- The user has completed the current level
							- The user resets their progress on the tree
							- The tree was updated and it appears that negative progress was made
							- It is the day that entires were stored

							If there is progress for the day we are testing
							prepend the array with the change in number of lessons left
							compared to the previous progress entry.

							We should only do this if the progress is positive though.
							Negative progress happens if the tree was reset by the user or updated by duolingo,
							or if the tree level has just increased.

							*/

								
							if (i === 0)
							{
								// This is the first ever entry, so we can't do anything more.
								break;
							}
							else if (progress[i][1] === progress[i-1][1])
							{
								// This entry has the same tree level as before.
								
								if (progress[i-1][2] > progress[i][2])
								{
									// Normal positive progress has been made.
									const progressFromThisEntry = progress[i-1][2] - progress[i][2];

									if (progressAddedFromCurrentDay)
									{
										// Already added some progress from this day,
										// so lets just add the extra to the existing.
										treeLevelProgressInWeek[0] = treeLevelProgressInWeek[0] + progressFromThisEntry;
									}
									else
									{
										treeLevelProgressInWeek.unshift(progressFromThisEntry);
										progressAddedFromCurrentDay = true;
									}
								}
								else
								{
									// There has been negative compared to the previous entry.
									// Nothing to do here as this is just to mark the change and track relative changes afterwards.
								}
							}
							else
							{
								// This entry has from a different tree level than the entry before it.
								if (progress[i][1] > progress[i-1][1])
								{
									// The tree level has increased.
									// This entry is the the first after this change,
									// so we should add the remaining progress from the previous entry
									// as this will have needed to have been done to level up.
									if (progressAddedFromCurrentDay)
									{
										// Already added some progress from this day,
										// so lets just add the extra to the existing.
										treeLevelProgressInWeek[0] = treeLevelProgressInWeek[0] + progress[i-1][2];
									}
									else
									{
										// Not added anything from this current day yet so lets add this now

										treeLevelProgressInWeek.unshift(progress[i-1][2]);
										progressAddedFromCurrentDay = true;
									}
								}
								else if (progress[i][1] < progress[i-1][1])
								{
									// Tree level has decreased, this is either a tree change or a tree reset,
									// We don't need to do anything then.
								}
							}

							--i;
						}
					}
					// decrement the timestamp by a day
					day = day - msInDay;
				}

				while (treeLevelProgressInWeek.length != 7)
				{
					// If we ran out of progress entries for a whole week
					// we will fill the rest with zeros.

					treeLevelProgressInWeek.unshift(0);
				}


				// Generate a graph for the data.
				const graph = graphSVG(treeLevelProgressInWeek);
				graph.classList.add("crownsGraph");

				crownsInfoContainer.appendChild(graph);
			}

			// Add breakdown table

			const breakdownContainer = document.createElement("div");
			breakdownContainer.classList.add("crownLevelBreakdownContainer");


			const treeLevelContainer = document.createElement("div");
			treeLevelContainer.classList.add("treeLevel");
			treeLevelContainer.textContent = treeLevel;

			const treeLevelSentence = document.createElement("p");
			treeLevelSentence.classList.add("treeLevelSentence");
			treeLevelSentence.textContent = "Your tree is at Level\xA0";
			treeLevelSentence.appendChild(treeLevelContainer);

			breakdownContainer.appendChild(treeLevelSentence);


			const breakdownList = document.createElement("ul");
			breakdownList.classList.add("breakdownList");
			
			const imgContainer = document.createElement("div");
			imgContainer.classList.add("crownImgContainer");
			
			const levelContainer = document.createElement("div");

			const crownImg = document.createElement("img");
			crownImg.alt = "crown";
			crownImg.src = `${imgSrcBaseUrl}/juicy-crown.svg`;

			imgContainer.appendChild(crownImg);
			imgContainer.appendChild(levelContainer);


			if (!options.bonusSkillsBreakdown || crownLevelCount[1][0] + crownLevelCount[1][1] === 0)
			{
				// Don't show bonus skills breakdown.
				crownLevelCount[1].length = 0;
			}

			if (!options.separateGrammarSkillsInBreakdown)
			{
				// Include the grammar skills with the normal skills.
				crownLevelCount[0][0] += crownLevelCount[2][0];
				crownLevelCount[0][1] += crownLevelCount[2][1];
				crownLevelCount[0][2] += crownLevelCount[2][2];

				// Remove the grammar skills count as it is not needed now.
				crownLevelCount[2].length = 0;
			}

			if (!options.grammarSkillsBreakdown)
			{
				// Remove the grammar skills count as we don't want to display it
				crownLevelCount[2].length = 0;
			}

			for (let skillType = 0; skillType < crownLevelCount.length; ++skillType)
			{
				// Loop through the skills types and make a breakdown table for each.
				// skillType 0 : normal
				// skillType 1 : bonus
				// skillType 2 : grammar, if being shown, else included in normal


				if (skillType !== 0 && crownLevelCount[skillType].length !== 0)
				{
					const breakdownHeader = document.createElement("h3");
					breakdownHeader.classList.add("breakdownHeader");
					breakdownHeader.textContent = (skillType === 1) ? "Bonus Skills" : "Grammar Skills";
					breakdownList.appendChild(breakdownHeader);
				}

				for (let crownLevel = 0; crownLevel < crownLevelCount[skillType].length; ++crownLevel)
				{
					const skillCount = crownLevelCount[skillType][crownLevel];

					if (!options.crownsBreakdownShowZerosRows && skillCount == 0)
					{
						continue;
					}

					const crownCount = skillCount * crownLevel;
				
					imgContainer.lastChild.classList.add("crownLevel" + crownLevel + "Count");
					imgContainer.lastChild.textContent = crownLevel;

					let breakdownListItem = document.createElement("li");
					breakdownListItem.classList.add("crownLevelItem");
					
					const skillCountSpan = document.createElement("span");
					skillCountSpan.textContent = skillCount;
					breakdownListItem.appendChild(skillCountSpan);

					const skillsAtSpan = document.createElement("span");
					skillsAtSpan.classList.add("skillsAtSpan");
					skillsAtSpan.textContent = `skill${skillCount == 1 ? "" : "s"} at`;
					breakdownListItem.appendChild(skillsAtSpan);

					breakdownListItem.appendChild(imgContainer.cloneNode(true));

					breakdownListItem.appendChild(document.createTextNode("="));
					
					const crownCountSpan = document.createElement("span");
					crownCountSpan.textContent = crownCount;
					breakdownListItem.appendChild(crownCountSpan);

					const crownsSpan = document.createElement("span");
					crownsSpan.textContent = `crown${(crownCount == 1 )?"":"s"}`;
					breakdownListItem.appendChild(crownsSpan);

					breakdownList.appendChild(breakdownListItem);
				}
			}

			breakdownContainer.appendChild(breakdownList);

			if (options.crownsBreakdown) crownsInfoContainer.appendChild(breakdownContainer);

			// Checkpoint Prediction
			if (treeLevel == 0 && options.checkpointPrediction)
			{
				const predictionData = (progress.length > 5) ? daysToNextCheckpoint() : daysToNextCheckpointByCalendar();

				if (predictionData.time >= 0)
				{
					const prediction = createPredictionElement("checkpoint", predictionData);
					crownsInfoContainer.appendChild(prediction);

				}
			}

			// Tree Level prediction
			if (treeLevel != 5 && options.treeLevelPrediction)
			{
				const predictionData = (progress.length > 5) ? daysToNextTreeLevel() : daysToNextTreeLevelByCalendar();

				if (predictionData.time >= 0)
				{
					const prediction = createPredictionElement("treeLevel", predictionData);
					crownsInfoContainer.appendChild(prediction);
				}
			}
			
			if (treeLevel === 5)
			{
				const maxLevelMessage = document.createElement("p");
				maxLevelMessage.classList.add("treeLevelPrediction");
				maxLevelMessage.textContent = "You have reached the maximum tree level!";
				crownsInfoContainer.appendChild(maxLevelMessage);
			}
		}
	);
}

function displayXPBreakdown()
{
	if (Object.entries(userData).length === 0)
	{
		return false;
	}

	// First remove any existing XP Boxes
	removeXPBoxes();

	const isSidebarContainer = document.querySelector(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`) !== null;
	const isPopupContainer = document.querySelector(`.${DAILY_GOAL_POPUP_CONTAINER}`) !== null;

	const somethingToDo = (
		(options.XPInfoInSidebar && isSidebarContainer)
		||
		((inMobileLayout || options.XPInfoInPopup) && isPopupContainer)
	);
	
	if (!somethingToDo)
	{
		return false;
	}

	let data =
		{
			'language_string':	userData.language_data[languageCode].language_string,
			'level_progress':	userData.language_data[languageCode].level_progress,
			'level':			userData.language_data[languageCode].level,
			'level_points':		userData.language_data[languageCode].level_points,
			'points':			userData.language_data[languageCode].points,
			'history':			currentLanguageHistory(),
			//'timezone':			userData.timezone_offset seems to not be available for every users, maybe depends on platform use.
		};

	let levelProgressPercentage = (data.level_progress*100)/(data.level_points);

	let XPBox = document.createElement("div");
	XPBox.classList.add("XPBox");

	let languageLevelContainer = document.createElement("div");
	languageLevelContainer.classList.add("XPBreakdown");

	let XPHeader = document.createElement("h2");
	XPHeader.textContent = data.language_string+ " XP";

	languageLevelContainer.appendChild(XPHeader);

	let languageLevelElement = document.createElement("p");
	languageLevelElement.classList.add("XPTotalAndLevel");
	languageLevelElement.textContent = "Level " + data.level;

	let languageXPElement = document.createElement("span");
	languageXPElement.textContent = data.points + " XP - ";
	
	languageLevelElement.insertBefore(languageXPElement, languageLevelElement.childNodes[0]);
	languageLevelContainer.appendChild(languageLevelElement);
	if (options.XPBreakdown) XPBox.appendChild(languageLevelContainer);
	
	if (data.level != 25)
	{
		let nextLevelProgressElement = document.createElement("p");
		nextLevelProgressElement.classList.add("nextLevelProgress");
		nextLevelProgressElement.textContent = `${data.level_points - data.level_progress} XP till Level ${data.level+1}`;

		let languageLevelProgressBarContainer = document.createElement("div");
		languageLevelProgressBarContainer.className = "languageLevelProgressBarContainer";

		let languageLevelProgressBar = document.createElement("div");
		languageLevelProgressBar.className = "languageLevelProgressBar";
		languageLevelProgressBar.style.width = `${levelProgressPercentage}%`;

		languageLevelProgressBarContainer.appendChild(languageLevelProgressBar);

		let currentLevelProgressElement = document.createElement("p");
		currentLevelProgressElement.textContent = `(${data.level_progress}/${data.level_points} XP - ${Number(levelProgressPercentage).toFixed(1)}%)`;

		languageLevelContainer.appendChild(nextLevelProgressElement);
		languageLevelContainer.appendChild(languageLevelProgressBarContainer);
		languageLevelContainer.appendChild(currentLevelProgressElement);


		const predictionData = daysToNextXPLevel(data.history, data.level_points-data.level_progress);
		
		if (predictionData.time >= 0 && options.XPPrediction)
		{
			const prediction = createPredictionElement("XPLevel", predictionData);

			XPBox.appendChild(prediction);
		}
	}
	else
	{
		// Reached max level
		let maxLevelMessage = document.createElement("p");
		maxLevelMessage.textContent = "You have reached the maximum level!";
		languageLevelContainer.appendChild(maxLevelMessage);
	}
	
	// Add the XPBoxes in the chosen places

	if (options.XPInfoInSidebar && isSidebarContainer)
	{
		document.querySelector(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`).appendChild(XPBox.cloneNode(true));
	}

	if ((inMobileLayout || options.XPInfoInPopup) && isPopupContainer)
	{
		document.querySelector(`.${DAILY_GOAL_POPUP_CONTAINER}`).appendChild(XPBox);
		
		if(!inMobileLayout)
		{
			XPBox.parentNode.classList.add("XPBoxOverflowContainer");
		}
		else
		{
			XPBox.parentNode.parentNode.classList.add("XPBoxOverflowContainer");
		}
	}
}

function displayTotalStrenthBox()
{
	const sidebar = document.querySelector(`.${SIDEBAR}`);
	if (sidebar == null) return false;

	const skills = userData.language_data[languageCode].skills.filter(skill => skill.skill_progress.level !== 0);
	if (skills.length === 0) return false;

	const strengths = skills.map(skill => skill.strength);
	const strengthSplit = [0,0.25,0.5,0.75,1].map(strength => strengths.filter(s=>s===strength).length);

	const totalStrength = 100*strengthSplit.reduce((total, count, strengthx4) => total + count*strengthx4/4, 0)/strengths.length;

	const totalStrengthBox = document.createElement("DIV");
	totalStrengthBox.id = "totalStrengthBox";
	totalStrengthBox.className = WHITE_SIDEBAR_BOX_CONTAINER;
	totalStrengthBox.style = `--totalStrength: ${totalStrength}%`;
	
	const heading = document.createElement("H2");
	heading.textContent = "Total Strength: ";
	totalStrengthBox.appendChild(heading);

	const totalStrengthSpan = document.createElement("span");
	totalStrengthSpan.textContent = `${Math.floor(totalStrength)}%`;

	heading.appendChild(totalStrengthSpan);

	const barBg = document.createElement("div");
	const barFg = document.createElement("div");

	barBg.appendChild(barFg);
	totalStrengthBox.appendChild(barBg);

	const breakdown = document.createElement("p");
	breakdown.textContent = strengthSplit.map(
			(numSkills, strengthx4) =>
			{
				return (numSkills > 0) ? `${numSkills}@${100*strengthx4/4}%`: "";
			}
		).filter(str => str !== "")
		.reverse()
		.join(" + ");

	totalStrengthBox.appendChild(breakdown);

	if (document.querySelector("#totalStrengthBox") === null)
	{
		if (sidebar.querySelector(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`) === null) return false;

		const insertAfterTarget =
		[
			...Array.from(sidebar.querySelectorAll("#languagesBox")),
			...Array.from(sidebar.querySelectorAll(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`))
		][0];
		sidebar.insertBefore(totalStrengthBox, insertAfterTarget.nextSibling);
	}
	else
	{
		document.querySelector("#totalStrengthBox").replaceWith(totalStrengthBox);
	}
}

function displayLanguagesInfo(languages)
{
	const sidebar = document.querySelector(`.${SIDEBAR}`);
	if (sidebar == null) return false;

	if (languages.length == 0)
	{
		removeLanguagesInfo();
		return false;
	}

	const languagesBox = document.createElement("DIV");
	languagesBox.id = "languagesBox";
	languagesBox.className = WHITE_SIDEBAR_BOX_CONTAINER;
	
	const heading = document.createElement("H2");
	heading.textContent = `Languages Info`;
	languagesBox.appendChild(heading);

	const subHeading = document.createElement("H3");
	subHeading.textContent = `From ${UICode[0].toUpperCase() + UICode[1]}`;
	languagesBox.appendChild(subHeading);

	const table = document.createElement("TABLE");
	table.id = "languagesTable";
	languagesBox.appendChild(table);

	const tableHead = document.createElement("THEAD");
	table.appendChild(tableHead);
	const tableHeadRow = document.createElement("TR");
	tableHead.appendChild(tableHeadRow);
	
	const tableHeading = document.createElement("TH");

	tableHeading.textContent = "Language";
	tableHeadRow.appendChild(tableHeading.cloneNode(true));
	
	tableHeading.textContent = "Level";
	tableHeadRow.appendChild(tableHeading.cloneNode(true));

	tableHeading.textContent = "Total XP";
	tableHeadRow.appendChild(tableHeading.cloneNode(true));

	tableHeading.textContent = "XP to Next Level";
	tableHeadRow.appendChild(tableHeading.cloneNode(true));

	languages.forEach(
		(languageInfo, index) => {
			const tableRow = document.createElement("TR");
			tableRow.id = `${languageInfo[0]}Row`;
			table.appendChild(tableRow);

			languageInfo.forEach(
				(data) => {
					const tableData = document.createElement("TD");
					tableData.textContent = data;
					tableRow.appendChild(tableData);
				}
			);
		}
	);

	// Add the new side bar box to the page
	const dailyGoalBox = sidebar.querySelector(`.${DAILY_GOAL_SIDEBAR_CONTAINER}`);
	if (dailyGoalBox == null)
	{
		return false;
	}

	if (document.querySelector("#languagesBox") === null)
	{
		sidebar.insertBefore(languagesBox, dailyGoalBox.nextSibling);
	}
	else
	{
		document.querySelector("#languagesBox").replaceWith(languagesBox);
	}
}

function displaySuggestion(fullyStrengthened, noCrackedSkills)
{
	if (usingOldData)
		return false; // If we haven't just got some new data the suggestion might be invalid so we won't

	let topOfTree;
	if (
		document.querySelector(`[data-test="skill-tree"]`) !== null
		&& document.querySelector(`[data-test="tree-section"]`) != null
		&& (
			document.getElementsByClassName(TOP_OF_TREE).length !== 0
			|| document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length !== 0
		)
	) // Has the tree loaded from a page change
	{
		topOfTree = document.querySelector(`[data-test="skill-tree"]>div`);
	}
	else
	{
		// body hasn't loaded yet so element not there, let's try again after a small wait, but only if we are still on the main page.
		if(onMainPage && document.querySelector(`[data-test="intro-lesson"]`) == null)
		{
			setTimeout(function(){displaySuggestion(fullyStrengthened, noCrackedSkills);}, 50);
		}
		else
		{
			// swtiched away before we got a chance to try again.
		}
		return false;
	}

	topOfTree.classList.add("topOfTree");

	let container = document.getElementById("skillSuggestionMessageContainer");

	if (container === null)
	{
		container = document.createElement("div");
		container.id = "skillSuggestionMessageContainer";
		container.classList.add("topOfTreeList");

		if (topOfTree.getElementsByClassName(IN_BETA_LABEL).length !== 0)
		{
			// If there is the IN BETA label, make it relative, not absolute.
			topOfTree.classList.add("hasInBetaLabel");
		}

		if (document.querySelector(TRY_PLUS_BUTTON_SELECTOR) !== null)
		{
			// There is a TRY PLUS button on the right which we have to make room for.
			const boxRightEdge = topOfTree.getBoundingClientRect().right;
			const buttonLeftEdge = document.querySelector(TRY_PLUS_BUTTON_SELECTOR).getBoundingClientRect().left;
			const offset = boxRightEdge - buttonLeftEdge;
			if (buttonLeftEdge !== 0)
			{
				// Is zero if element has been hidden e.g by an adblocker
				if (inMobileLayout)
				{
					container.style.width = `calc(100% - ${offset}px - 1.5em)`;
				}
				else
				{
					container.style.width = `calc(100% - ${offset}px - 0.5em)`;
				}
			}
		}

		const suggestedSkill = getSuggestion();

		const link = document.createElement("a");

		const treeLevel = currentTreeLevel();

		if (suggestedSkill !== null)
		{
			const toPractise = treeLevel === 5 || (suggestedSkill.category === "grammar" && suggestedSkill.skill_progress.level === 2);

			link.href = `/skill/${languageCode}/${suggestedSkill.url_title}${toPractise ? "/practice/" : "/"}`;
			link.textContent = suggestedSkill.short;
		}

		const focus = (event) =>
		{
			removeSuggestionPopoutButton();

			if (event.target.getAttribute("href") !== "/practice")
			{
				const isCheckpoint = /checkpoint/.test(event.target.href);
				const urlTitle = event.target.href.match(new RegExp(`/${languageCode}/([^/]*)`))[1];
				const button = createOpenPopoutButton(isCheckpoint ? `checkpoint/${urlTitle}`: urlTitle);
				button.id = "suggestionPopoutButton";

				if (options.suggestionPopoutButton)
				{
					event.target.parentNode.insertBefore(button, event.target.nextSibling);
				}
			}
		}

		link.addEventListener("focus", focus);
		link.addEventListener("mouseenter", focus);
		
		const suggestionMessage = document.createElement("p");
		if (treeLevel === 5)
		{
			let messageText = `Your ${language} tree is `;
			if (fullyStrengthened)
				messageText += "fully strengthened and ";
			
			messageText += "at Level 5";

			if (noCrackedSkills)
				messageText += " with no cracked skills";

			messageText += "! Why not do a ";

			suggestionMessage.textContent = messageText;

			const generalPracticeLink = document.createElement("a");
			generalPracticeLink.href = "/practice";
			generalPracticeLink.textContent = "general practice";
			generalPracticeLink.addEventListener("focus", focus);
			generalPracticeLink.addEventListener("mouseenter", focus);

			suggestionMessage.appendChild(generalPracticeLink);
		}
		else if (treeLevel === 0)
		{
			// Tree not finished, so the suggestion is the next skill that is not yet been completed.
			
			if (fullyStrengthened && noCrackedSkills)
				suggestionMessage.textContent = `All the skills that you have learnt so far are fully strengthened, and none are cracked. `;
			else if (fullyStrengthened)
				suggestionMessage.textContent = `All the skills that you have learnt so far are fully strengthened. `;
			else if (noCrackedSkills)
				suggestionMessage.textContent = `None of the skills that you have learnt so far are cracked. `

			if (suggestedSkill.locked)
			{
				// The next skill is locked, so a checkpoint test is needed.
				let checkpointNumber;
				const checkpoints = document.querySelectorAll(CHECKPOINT_SELECTOR);
				checkpoints.forEach(
					(checkpoint, index) => {
						if (checkpointNumber == null && checkpoint.querySelector(`img`).src.includes(`unlocked`))
							checkpointNumber = index;
					}
				);
				link.href = `/checkpoint/${languageCode}/${checkpointNumber}/`;
				link.textContent = `Checkpoint ${checkpointNumber +1}`;

				suggestionMessage.textContent += "To unlock more skills you need to complete: ";
			}
			else
			{
				// The next skil is unlocked so let's just suggest it.
				suggestionMessage.textContent += "The next skill to learn is: ";
			}

			suggestionMessage.appendChild(link);
		}
		else
		{
			// Not level 5 or level 0 so we will use the suggestion based on the users options.
			if (fullyStrengthened && noCrackedSkills)
				suggestionMessage.textContent = `Your ${language} tree is fully strengthened, and there are no cracked cracked skills. `;
			else if (fullyStrengthened)
				suggestionMessage.textContent = `Your ${language} tree is fully strengthened. `;
			else if (noCrackedSkills)
				suggestionMessage.textContent = `None of the skills in your ${language} tree are cracked. `
			
			suggestionMessage.textContent += `Why not practise this skill to work towards getting your tree to Level\xA0${treeLevel + 1}: `;
			suggestionMessage.appendChild(link);
		}

		container.appendChild(suggestionMessage);
	}
	else
	{
		// Already made the box.
		// And we don't want to do anything otherwise the suggestion, if using the random option, will keep changing and might look a bit strange.
	}

	// Skill Suggestion Popout Button
	removeSuggestionPopoutButton(); // Remove if already exists.

	const suggestionLink = container.querySelector("a");
	const suggestionName = suggestionLink.textContent;

	if (options.suggestionPopoutButton && suggestionName !== "general practice")
	{
		// Add button that opens up the suggested skill's popout
		const isCheckpoint = /checkpoint/.test(suggestionLink.href);
		const suggestionUrlTitle = suggestionLink.href.match(new RegExp(`/${languageCode}/([^/]*)`))[1];
		const button = createOpenPopoutButton(isCheckpoint ? `checkpoint/${suggestionUrlTitle}` : suggestionUrlTitle);
		button.id = "suggestionPopoutButton";
		container.querySelector(`p`).appendChild(button);
	}

	// Add the message if it isn't already there
	if (!document.body.contains(container))
	{
		topOfTree.appendChild(container);
	}
}

function showOnlyNeededSkills()
{
	// Remove existing reveal button
	document.querySelectorAll(`#revealHiddenSkillsButton`).forEach(button => button.remove());

	if (!options.showOnlyNeededSkills)
	{
		// Make sure all the skills are displayed;
		document.querySelectorAll(`${SKILL_SELECTOR}, ${SKILL_ROW_SELECTOR}, ${BONUS_SKILL_DIVIDER_SELECTOR}, ${TREE_SECTION_SELECTOR}, ${CHECKPOINT_SECTION_SELECTOR}`).forEach(
			(element) =>
			{
				element.classList.remove("outOfView", "outOfViewSkill", "inView");
			}
		);

		document.querySelector(`[data-test="skill-tree"]`).classList.remove("hasOutOfViewSkills");

		return false;
	}
	
	document.querySelector(`[data-test="skill-tree"]`).classList.add("hasOutOfViewSkills");

	const needsStrengthening = getNeedsStrengthening();
	const crackedSkills = getCrackedSkills();

	const needsAttention = [...needsStrengthening.flat(), ...crackedSkills.flat()];

	const showSuggestion =
		needsAttention.length === 0
		|| (needsStrengthening.flat().length !== 0 && options.hideSuggestionNonStrengthened === false)
		|| (crackedSkills.flat().length !== 0 && options.hideSuggestionWithCrackedSkills === false);

	const elementsToShow = [];

	const skillElements = Array.from(document.querySelectorAll(SKILL_SELECTOR));
	const allSkills = userData.language_data[languageCode].skills.concat(userData.language_data[languageCode].bonus_skills);


	if (showSuggestion)
	{
		// Nothing needs strengthening or is cracked, so a suggest something to give attention to.
		let suggestedSkill = document.querySelector(`#skillSuggestionMessageContainer a`);
		if (suggestedSkill !== null && suggestedSkill.getAttribute("href") !== "/practice")
		{
			if (suggestedSkill.getAttribute("href").includes("checkpoint"))
			{
				// Checkpoint is being suggested
				const suggestedCheckpointNumber = parseInt(suggestedSkill.getAttribute("href").split("/")[3]);
				const suggestedCheckpoint = document.querySelectorAll(CHECKPOINT_SECTION_SELECTOR)[suggestedCheckpointNumber];
				elementsToShow.push(suggestedCheckpoint);
				suggestedSkill = null;
			}
			else
			{
				// Suggested Skill is a normal skill
				const suggestionUrlTitle = suggestedSkill.getAttribute("href").split("/")[3];
				suggestedSkill = allSkills.find(skill => skill.url_title === suggestionUrlTitle);
			}
		}
		else
		{
			suggestedSkill = getSuggestion();
		}

		if (suggestedSkill === null)
		{
			// All skills at max level, nothing to suggest but a general practice.
			// We won't add anything to needsAttention or elementsToShow,
			// so everything other than that which otherwise needsAttention and the golden owl trophy will be hidden.
		}
		else if (suggestedSkill.locked)
		{
			// This happens if there is no existing suggestion message, so we are using the raw getSuggestion response.
			// Next skill is locked so we need to do the checkpoint before it.
			// We will keep the needsAttention empty, but manually add the checkpoint element and section to elementsToShow.
			const nextCheckpoint = Array.from(document.querySelectorAll(CHECKPOINT_SELECTOR)).find(
				(checkpoint) => 
				{
					return checkpoint.querySelector(`img`).src.includes(`unlocked`);
				}
			);
			const nextCheckpointSection = Array.from(document.querySelectorAll(CHECKPOINT_SECTION_SELECTOR)).find(section => section.contains(nextCheckpoint));
			elementsToShow.push(nextCheckpoint);
		}
		else
		{
			// Normal suggestion
			needsAttention.push(suggestedSkill);
		}
	}

	let numHiddenSkills = skillElements.length;
	needsAttention.forEach(
		(skill) =>
		{
			const sameNamedSkills = skillElements.filter(element => element.querySelector(SKILL_NAME_SELECTOR).textContent === skill.short);
			let index = 0;
			if (sameNamedSkills.length !== 1)
			{
				index = allSkills.filter(skillObject => skillObject.short === skill.short).findIndex(skillObject => skillObject.url_title === skill.url_title);
			}

			const skillToShow = sameNamedSkills[index];

			const containers = Array.from(document.querySelectorAll(`${SKILL_ROW_SELECTOR}, ${TREE_SECTION_SELECTOR}`)).filter(
				(container) =>
				{
					return container.contains(skillToShow);
				}
			);

			if (!elementsToShow.includes(skillToShow))
			{
				--numHiddenSkills;
			}

			elementsToShow.push(skillToShow, ...containers);

			if (skill.isBonusSkill)
			{
				// Show the bonus skill divding borders.
				// Note that if both bonus skills need to be addressed then we will add these twice but it doesn't matter.
				const borderRows = document.querySelectorAll(BONUS_SKILL_DIVIDER_SELECTOR);
				elementsToShow.push(...borderRows);
			}
		}
	);

	// Now we hide everything.
	document.querySelectorAll(`${SKILL_ROW_SELECTOR}, ${TREE_SECTION_SELECTOR}, ${CHECKPOINT_SECTION_SELECTOR}, ${BONUS_SKILL_DIVIDER_SELECTOR}`).forEach(
		(element) =>
		{
			element.classList.add("outOfView");
			element.classList.remove("inView");
		}
	);
	document.querySelectorAll(SKILL_SELECTOR).forEach(
		(element) =>
		{
			element.classList.add("outOfViewSkill");
			element.classList.remove("inView");
		}
	);

	// Now we unhide the things we want to show.
	elementsToShow.forEach(
		(element) =>
		{
			element.classList.remove("outOfView", "outOfViewSkill");
			element.classList.add("inView");
		}
	);

	// Add button to reveal hidden skills
	const revealButton = document.createElement("button");
	revealButton.addEventListener("click",
		(event) =>
		{
			options.showOnlyNeededSkills = false;
			showOnlyNeededSkills();
			options.showOnlyNeededSkills = true;
		}
	);
	revealButton.id = "revealHiddenSkillsButton";

	revealButton.textContent = `Reveal ${numHiddenSkills} Hidden Skill${numHiddenSkills === 1 ? "" : "s"}`;
	if (numHiddenSkills === 0)
	{
		revealButton.textContent = "Reveal Hidden Checkpoints";
	}

	document.querySelector(SKILL_TREE_SELECTOR).appendChild(revealButton);
}

function fixPopoutAlignment(skillPopout)
{
	// In mobile layout showing only skills that need attention.
	// The horizontal alignment of a skill's popout can be wrong if the other skills on its row are hidden.
	const skill = skillPopout.parentNode;
	const skillRow = skill.parentNode;
	const displayedSkillsInRow = Array.from(skillRow.querySelectorAll(".inView"));
	const skillIndex = displayedSkillsInRow.findIndex(element => element === skill);

	// For every skill that is displayed to the left of the skill with the popout we need to shift the popout right by 140px.
	// For every skill displayed to the right we do the opposite.

	const numDisplayedSkillsBefore = displayedSkillsInRow.slice(0,skillIndex).length;
	const numDisplayedSkillsAfter = displayedSkillsInRow.slice(skillIndex+1).length;

	skill.setAttribute("right-bias", numDisplayedSkillsAfter - numDisplayedSkillsBefore);
	// Remove Duolingo's own fudging for centring as it won't know we have hidden some skills in the row.
	skillPopout.firstChild.removeAttribute("style");
	skillPopout.firstChild.lastChild.removeAttribute("style");
}

function getStrengths()
{
	const strengths = [[],[]]; // first array holds strengths for normal skills, second for bonus skills
	
	// Each in each section in strengths will be array containing the following:
	// [strength, display bool, skill's url_title]

	const skills = userData.language_data[languageCode].skills;
	const bonusSkills = userData.language_data[languageCode].bonus_skills;

	for (const skill of skills)
	{
		strengths[0].push(
			[
				skill.strength,
				Boolean(skill.skill_progress.level), // If level is 0 then we won't add a strength bar as it is meaningless.
				skill.url_title
			]
		);
	}

	for (const bonusSkill of bonusSkills)
	{
		strengths[1].push(
			[
				bonusSkill.strength,
				Boolean(bonusSkill.skill_progress.level),
				bonusSkill.url_title
			]
		);
	}
	
	return strengths;
}

function getNeedsStrengthening()
{
	const needsStrengthening = [[],[]]; // first array holds skills that need strengthening, second holds bonus skills that need strengthening

	const skills = userData.language_data[languageCode].skills;
	const bonusSkills = userData.language_data[languageCode].bonus_skills;

	for (const skill of skills)
	{
		if (skill.strength != 1 && skill.strength != 0 && skill.skill_progress.level != 0)
		{
			// Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started.
			needsStrengthening[0].push(skill);
		}
	}

	for (const bonusSkill of bonusSkills)
	{
		if (bonusSkill.strength != 1 && bonusSkill.strength != 0 && bonusSkill.skill_progress.level != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}
	}

	return needsStrengthening;
}

function getSuggestion()
{
	let suggestedSkill;

	const skills = userData.language_data[languageCode].skills;
	const treeLevel = currentTreeLevel();
	let skillsByCrowns = [[],[],[],[],[],[]];

	for (let skill of skills)
	{
		skillsByCrowns[skill.skill_progress.level].push(skill);
	}

	/*
		0: Random
		1: First
		2: Last
	*/

	if (treeLevel === 0)
	{
		// Tree isn't finished, so we will just suggest the first skill
		suggestedSkill = skillsByCrowns[0][0];
	}
	else if (treeLevel === 5)
	{
		suggestedSkill = null;
	}
	else
	{
		if (treeLevel === 2)
		{
			// Remove crown 2 grammar skills as these are at max level,
			// so practising them will not contribute to getting to tree level 3.
			skillsByCrowns[treeLevel].filter(skill => skill.category !== "grammar");
		}
		const numSkillsAtTreeLevel = skillsByCrowns[treeLevel].length;
		switch (options.skillSuggestionMethod)
		{
			case "0":
				suggestedSkill = skillsByCrowns[treeLevel][Math.floor(Math.random()*numSkillsAtTreeLevel)];
				break;
			case "1":
				suggestedSkill = skillsByCrowns[treeLevel][0];
				break;
			case "2":
				suggestedSkill = skillsByCrowns[treeLevel][numSkillsAtTreeLevel-1];
				break;
		}
	}

	return suggestedSkill;
}

function processUserData()
{
	// Process the information from duolingo.com/users/USERNAME, stored in userData, before use
	/*
		Data comes formatted as such:
		{
			'language_data': {
				'es': { // languageCode
					...
					skills			: [...],
					bonus_skills	: [...],
					...
				}
			}
		}
		each skill in either skills or bonus_skills has a number of properties including 'strength', 'title', 'url_title', 'coords_x', 'coords_y'.
	*/

	// Skills appear to be inconsistently ordered so need sorting for ease of use.

	const skills = userData.language_data[languageCode].skills; 
	const bonusSkills = userData.language_data[languageCode].bonus_skills;

	// New grammar skills have incorrect y coordinate, making them seem like they are embedded in the row above.
	const grammarSkills = skills.filter(skill => skill.category === "grammar");
	grammarSkills.forEach(
		(grammarSkill) =>
		{
			grammarSkill.coords_x = 999
		}
	);

	const sortByTreePosition = (skill1,skill2) =>
	{
		if (skill1.coords_y < skill2.coords_y) // x above y give x
		{
			return -1;
		} else if (skill1.coords_y > skill2.coords_y)// x below y give y
		{
			return 1;
		} else // x and y on same level
		{
			if (skill1.coords_x < skill2.coords_x) // x to left of y give x
			{
				return -1;
			} else // x to right of y give y
			{
				return 1;
			}
		}
	};

	skills.sort(sortByTreePosition);
	bonusSkills.sort(sortByTreePosition);

	[...skills, ...bonusSkills].forEach(
		(skill) =>
		{
			if (skill.originalStrength === undefined)
			{
				skill.originalStrength = skill.strength;
			}

			if (options.ignoreMasteredSkills)
			{
				// We will force all the skills that are marked as mastered to have strength 1.0.
				if (mastered.includes(skill.id))
				{
					skill.strength = 1.0;
				}
				else
				{
					skill.strength = skill.originalStrength;
				}
			}
			else
			{
				skill.strength = skill.originalStrength;
			}
		}
	);

}

function addFeatures()
{
	// Main function that calls all the subfunctions responsible for adding features to the page.
	
	// First we need to prepare the retrieved userData for use.
	processUserData();

	// Strength Bars
	{
		const strengths = getStrengths();

		if (options.strengthBars)
			addStrengthBars(strengths);
		else
			removeStrengthBars();
	}

	// XP Info
	{
		if (options.XPInfo)
			displayXPBreakdown();
		else
			removeXPBoxes();
	}

	// Crowns Info
	{
		if (options.crownsInfo)
			displayCrownsBreakdown();
		else
			removeCrownsBreakdown();
	}

	// Total Strength Box
	{
		if (options.totalStrengthBox)
		{
			displayTotalStrenthBox();
		}
		else
		{
			removeTotalStrengthBox();
		}
	}

	// Languages Info
	{
		if (options.languagesInfo)
		{
			displayLanguagesInfo(getLanguagesInfo());
		}
		else
		{
			removeLanguagesInfo();
		}
	}

	// Lists of skills that need attention next
	{
		const needsStrengthening = getNeedsStrengthening();
		const crackedSkills = getCrackedSkills();

		const fullyStrengthened = (
			needsStrengthening[0].length +
			((options.showBonusSkillsInNeedsStrengtheningList) ? needsStrengthening[1].length : 0)
		) == 0;

		const noCrackedSkills = (
			crackedSkills[0].length +
			((options.showBonusSkillsInCrackedSkillsList) ? crackedSkills[1].length : 0)
		) == 0;

		if (options.needsStrengtheningList && !fullyStrengthened)
		{
			displayNeedsStrengthening(needsStrengthening); // Not fully strengthened and the list is enabled.
		}
		else
		{
			removeNeedsStrengtheningBox(); // Remove if there happens to be one.
		}

		if (options.crackedSkillsList && !noCrackedSkills)
		{
			displayNeedsStrengthening(crackedSkills, true); // There are cracked skills and the list is enabled.
		}
		else
			removeCrackedSkillsList(); // Remove if there happens to be one.

		if (
			(fullyStrengthened && noCrackedSkills) ||
			(!fullyStrengthened && !options.hideSuggestionNonStrengthened) ||
			(!noCrackedSkills && !options.hideSuggestionWithCrackedSkills)
		)
		{
			// Either a fully strengthened tree, or
			// Not fully strengthened but still show suggestion, or
			// There are cracked skills but still show suggestion
			
			if (options.skillSuggestion)
				displaySuggestion(fullyStrengthened, noCrackedSkills);
			else
				removeSuggestion(); // if there happens to be one
		}
		else
		{
			// Should not be displaying a suggestion.
			removeSuggestion() // if there happens to be one
		}
		
		// Focus the fist skill of one of the lists based on the priority options
		if (options.focusFirstSkill)
		{
			focusFirstSkill();
		}
	}

	// Show only skills that need attention in the tree
	{
		showOnlyNeededSkills();
	}

	// Practise, Words and Mastered Buttons in skill popouts
	{
		const skillPopout = document.querySelector(`[data-test="skill-popout"]`);

		if (skillPopout !== null)
		{
			// Clear Popup Buttons.
			removePractiseButton();
			removeGrammarSkillTestOutButton();
			removeWordsButton();
			removeMasterdSkillButton();

			if (options.practiseButton)
			{
				// Want practise button and there isn't one.
				const introLesson = document.querySelector(`[data-test="intro-lesson"]`);
				if (introLesson === null || !introLesson.contains(skillPopout))
				{
					// No introduction lesson, or if there is this skillPopout isn't from that skill
					addPractiseButton(skillPopout);
				}
			}

			if (options.grammarSkillsTestButton) addGrammarSkillTestOutButton(skillPopout);

			if (options.wordsButton) addWordsButton(skillPopout);

			if (options.masteredButton) addMasteredSkillButton(skillPopout);

			if (inMobileLayout && document.querySelector("#revealHiddenSkillsButton") !== null)
			{
				// Hiding stuff while in mobile layout so need to fix the aligment of the popout.
				fixPopoutAlignment(skillPopout);
			}
		}

		// Add each skill to childListObserver so we catch popout being added and removed.
		document.querySelectorAll(SKILL_SELECTOR).forEach(
			(skill) => {
				childListObserver.observe(skill, {childList: true});
			}
		);
	}

	// Redo checkpoint buttons on checkpoint popouts
	{
		if (options.checkpointButtons)
		{
			if (document.querySelector(`[data-test="redo-test-button"]`) === null)
			{
				// Want checkpoint buttons and don't have any.
				const checkpointPopout = document.querySelector(CHECKPOINT_POPOUT_SELECTOR);
				const goldenOwlTrophy = document.querySelector(GOLDEN_OWL_MESSAGE_TROPHY_SELECTOR);
				if (checkpointPopout !== null)
				{
					// There is a normal checkpoint popout displayed, let's add the buttons to it.
					addCheckpointButtons(checkpointPopout);
				}
				else if (goldenOwlTrophy !== null)
				{
					// The golden owl trophy congratulation message is displayed, let's add the buttons after the message.
					const messageContainer = goldenOwlTrophy.nextElementSibling;
					addCheckpointButtons(messageContainer, true);
				}
			}

			
			// Add each checkpoint to childListObserver.
			document.querySelectorAll(CHECKPOINT_CONTAINER_SELECTOR).forEach(
				(checkpoint) => {
					childListObserver.observe(checkpoint, {childList: true});
				}
			);

			// Add overlays to childListObserver to detect Golden Owl message.
			childListObserver.observe(document.querySelector("#overlays"), {childList: true});
		}
		else
		{
			// Don't want the checkpoint point buttons, let's remove any that might exists
			removeCheckpointButtons();
		}
	}

	// Centre the view on any skill or checkpoint popout
	{
		const popout = document.querySelector(`[data-test="skill-popout"], ${CHECKPOINT_POPOUT_SELECTOR}`);
		if (popout != null)
			popout.scrollIntoView({block: "center"});
	}

	// Flag Borders in Language List
	{
		if (options.treeLevelBorder && document.querySelector(LANGUAGES_LIST_SELECTOR) != null)
		{
			addFlagBorders();
		}
		else
		{
			removeFlagBorders();
		}
	}

	// Focus Mode
	{
		applyFocusMode();
	}

	// Fixed Sidebar
	{
		applyFixedSidebar();
	}

	// Tips Page Buttons
	{
		addButtonsToTipsPage();
	}
}

function httpGetAsync(url, responseHandler)
{
	/* firefox incompatible due to sameSite lax jwt_token to being sent with request...
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
	{ 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            responseHandler(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.send(null);
	*/

	// Horrible hack but works...
	// We insert the xhr code into the body so that it excecutes there.
	// The response text is then inserted into another element in the body.
	// Back in content script we wait until the data has been written to the body.
	// We then send it off for processing and remove the inserted elements from the body.


	let code = 
		`(function ()
		{
			let xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function()
			{
				if (xmlHttp.readyState == 4)
				{
					if (xmlHttp.status == 200)
					{
						document.getElementById('userData${requestID}').textContent = "//" + xmlHttp.responseText;		
					}
					else
					{
						// The request had an error, or possibly some unexpected accepted code.
						document.getElementById('userData${requestID}').textContent = "//ERROR " + xmlHttp.status;
					}
				}
			};
			xmlHttp.open('GET', '${url+'&DuoStrengthRequestId='+requestID}', true);
			xmlHttp.send(null);
		})()`;

	const requestResponseHelper = (mutationsList) => requestResponseMutationHandle(mutationsList, url, responseHandler);

	let requestResponseObserver = new MutationObserver(requestResponseHelper);
	let data = document.createElement('script');
	data.id = 'userData' + requestID;

	let xhrScript = document.createElement("script");
	xhrScript.id = 'xhrScript' + requestID;
	xhrScript.textContent = code;

	document.body.appendChild(data);
	requestResponseObserver.observe(data, {childList: true});
	document.body.appendChild(xhrScript);
	++requestsPending;
	++requestID;
}

function requestResponseMutationHandle(mutationsList, url, responseHandler)
{
	for (let mutation of mutationsList)
	{
		const dataElem = mutation.target;
		const id = dataElem.id.slice("userData".length);

		--requestsPending; // We have recieved some sort of response for this request.

		if (dataElem.textContent.slice(0,7) == "//ERROR")
		{
			// The request had an error, lets clear the scripts and try again after a short wait.
			const code = dataElem.textContent.slice(8);
			console.error(`Request ID${id} failed, HTTP response code ${code}`);
			document.body.removeChild(dataElem);
			document.body.removeChild(document.getElementById('xhrScript' + id));

			setTimeout(() => httpGetAsync(url, responseHandler), 250);
		}
		else
		{
			let newData  = dataElem.textContent.slice(2);
			document.body.removeChild(dataElem);
			document.body.removeChild(document.getElementById('xhrScript' + id));
			responseHandler(newData, id);
		}
	}
}

async function handleDataResponse(responseText)
{
	const newUserData = JSON.parse(responseText); // store response text as JSON object.
	const newDataLanguageCode = newUserData.learning_language;
	const newDataUICode = newUserData.ui_language;
	const newDataLanguageString = newUserData.language_data[newDataLanguageCode].language_string;

	username = newUserData.username;

	if (language === "" && !languageChanged)
	{
		// No lanuage set, then this must be the first load
		// language hasn't changed so we can set the lanuage info now.
		language = newDataLanguageString;
		languageCode = newDataLanguageCode;
		UICode = newDataUICode;
	}

	// Note if languageChanged on before the processing of the first data we won't set the language info.
	if (languageChangesPending > 1 || language === "")
	{
		// Either multiple language changes or we changed before getting the first set of data.
		//
		// If multiple language changes happened, we may have eneded up back where we started...
		// In this case, we set the language to unknown and request the data once more.
		// This next set of data will be processed and added to the tree.
		// There is a chance that this data still won't be up to date but the chances are low, hopefully...

		language = 'unknown';
		languageCode = 'unknown';
		UICode = 'unknown';
		requestData(); // async
		languageChangesPending = 1;
		return false;
	}
	if (languageChanged)
	{
		// The language change hasn't been resolved yet.
		if (newDataLanguageCode + newDataUICode == languageCode + UICode)
		{
			// language change has happened but the data isn't up to date yet as it is not matching the current active language
			// so request the data, but only if still on the main page. Safe to not wait as the httpRequest will take some time.
			if (onMainPage)
			{
				requestData();
			}
			return false;
		}
		else
		{
			// The code pair has updated so let's accept this as the data for the new language.
			userData = newUserData;

			languageCode = newDataLanguageCode;
			UICode = newDataUICode;
			language = newDataLanguageString;

			resetLanguageFlags();

			await retrieveProgressHistory();
			updateProgress();

			await retrieveMasteredSkills();

			usingOldData = false;
			addFeatures(); // actual processing of the data.
		}
	}
	else
	{
		// No language change
		if (newDataLanguageCode + newDataUICode != languageCode + UICode)
		{
			// But the language string data has changed, this may be a response from an older but slower request
			if (requestsPending === 0)
				requestData(); // Something isn't quite right so let's get some more data and see

			return false;
		}
		else
		{
			// Not a language change and the data is for the current language, just process it.
			userData = newUserData;

			await retrieveProgressHistory();
			updateProgress();

			await retrieveMasteredSkills();
			usingOldData = false;
			addFeatures();
		}
	}
}

function requestData()
{
	// requests data for actively logged in user.
	return new Promise(function (resolve, reject)
	{
		if (!(Object.keys(userData).length === 0 && userData.constructor === Object) && (!languageChanged))
		{
			// If there is already userData and not changing language, display current data while requesting new data.
			usingOldData = true;
			addFeatures();
		}

		httpGetAsync( // asks for data and async calls handle function when ready.
			encodeURI(window.location.origin+"/api/1/users/show?id="+userId),
			function (responseText, responseID)
			{
				if (responseID != requestID - 1)
				{
					// More than one changes took place before we could handle the data.
					// Ordering of responses is not always the same as the ordering of the request,
					// so we check that the id of the response is to that of the most recent request we have made.
					// We will clean up the languageChangesPending when we have sucessfully processed a request.
					resolve();
				}
				else
				{
					handleDataResponse(responseText);
					resolve();
				}
			}
		);
	});
}

function revealNewWord()
{
	const questionContainer = document.querySelector(`.${QUESTION_CONTAINER}`);
	// There are two question containers when chaning question, the first is the new one, which is selected above.
	if (questionContainer === null)
	{
		return false;
	}

	const newWord = questionContainer.querySelector(NEW_WORD_SELECTOR);
	if (options.revealNewWordTranslation && newWord !== null)
	{
		const muteScript = document.createElement("script");
		muteScript.id = "muteScript";
		muteScript.textContent =
		`
			{
				const numCallsExpected = ${(questionNumber === 1) ? 2 : 1};
				let howlCallCount = 0;
				const originalHowlPlay = window.Howl.prototype.play;
				const howlCalls = [];
				let newWordAudioSrc;
				let newWordPopover = null;

				const reset = () =>
				{
					window.Howl.prototype.play = originalHowlPlay;
					document.querySelector("#muteScript").remove();
				};

				const overlaysObserver = new MutationObserver(
					(mutationList, observer) =>
					{
						for (let mutationRecord of mutationList)
						{
							if (Array.from(mutationRecord.removedNodes).includes(newWordPopover))
							{
								reset();
							}
						}
					}
				);

				window.Howl.prototype.play =
				function (id)
				{
					howlCalls.push([this,id]);
					if (newWordAudioSrc === undefined)
					{
						if (howlCalls.length === numCallsExpected)
						{
							newWordAudioSrc = howlCalls[0][0]._src;
							let ret = false;

							if (numCallsExpected === 2)
							{
								const longestDurationIndex = (howlCalls[0][0]._duration > howlCalls[1][0]._duration)? 0 : 1;

								let sentence = howlCalls[longestDurationIndex];
								newWordaudioSrc = howlCalls[longestDurationIndex ^ 1][0]._src;

								ret = originalHowlPlay.call(...sentence);
							}

							newWordPopover = document.querySelector("[data-test='hint-popover']");
							overlaysObserver.observe(newWordPopover.parentNode, {childList: true});

							howlCalls.length = 0;

							return ret;
						}
					}
					else if (newWordAudioSrc !== undefined)
					{
						howlCalls.length = 0;
						if (this._src === newWordAudioSrc)
						{
							return false;
						}
						else
						{
							return originalHowlPlay.call(this, id);
						}
					}
					else
					{
						return null;
					}
				};
			}
		`;
		document.body.appendChild(muteScript);
		newWord.click();
	}
}

function hideTranslationText(reveal = false, setupObserver = true)
{
	if (document.getElementsByClassName(QUESTION_CONTAINER).length == 0)
		return false;
	
	const questionContainer = document.querySelector(`.${QUESTION_CONTAINER}`);

	if (questionContainer.firstChild == null)
		return false; // Duo ecouragement message, no question box, do nothing.

	const questionTypeString = questionContainer.firstChild.getAttribute("data-test");

	if (questionTypeString !== null && questionTypeString.includes("translate"))
	{
		// Translate type question
		const challengeTranslatePrompt = questionContainer.querySelector('[data-test="challenge-translate-prompt"]');
		
		if (challengeTranslatePrompt.querySelectorAll("BUTTON").length !== 0)
		{
			// There is an svg in the question sentence which is the speaker button so we are translating from the target to the native language
			const questionArea = questionContainer.firstChild.firstChild;
			if (setupObserver) childListObserver.observe(questionArea, {childList: true});
			
			const hintSentence = challengeTranslatePrompt.querySelector('[data-test="hint-sentence"]');
			
			if (options.showNewWords && hintSentence.querySelectorAll(NEW_WORD_SELECTOR).length !== 0)
			{
				// There is a new word, so we don't want to be hiding this sentence.
				document.body.classList.remove("blurringSentence");
				hintSentence.title = "";
				const enableDisableButton = questionContainer.querySelector(`.hideTextEnableDisable`);
				if (enableDisableButton !== null)
				{
					// Remove the enable disable button
					const headerContainer = questionContainer.querySelector(`.hideTextEnableDisable`).parentNode;
					const header = headerContainer.firstChild;
					headerContainer.parentNode.insertBefore(header, headerContainer); // Move the header back to where it should be;
					headerContainer.remove();
				}

				return false;
			}

			if (options.showTranslationText === false && reveal === false)
			{
				document.body.classList.add("blurringSentence");
				hintSentence.title = "Click to Show Sentence";
				hintSentence.onclick = () =>
				{
					hideTranslationText(true, false);
				};

				if (options.revealHotkey)
				{
					hintSentence.tile += " or Press " + options.revealHotkeyCode;
					document.onkeydown = (e) =>
					{
						const hotkeyList = options.revealHotkeyCode.split("+");
						const numKeys = hotkeyList.length;
						if (
							e.key.toUpperCase() == hotkeyList[numKeys-1]
							&& ( (hotkeyList.includes("Ctrl") && e.ctrlKey) || !hotkeyList.includes("Ctrl") )
							&& ( (hotkeyList.includes("Shift") && e.shiftKey) || !hotkeyList.includes("Shift") )
							&& ( (hotkeyList.includes("Meta") && e.metaKey) || !hotkeyList.includes("Meta") )
							&& ( (hotkeyList.includes("Alt") && e.altKey) || !hotkeyList.includes("Alt") )
						)
						{
							// Reveal hokey has been hit,
							// show the question text
							hideTranslationText(true, false);
						}
					};
				}
			}
			else
			{
				document.body.classList.remove("blurringSentence");
				hintSentence.title = "";
			}

			let enableDisableButton = questionContainer.getElementsByClassName("hideTextEnableDisable");

			if (enableDisableButton.length === 0)
			{
				// No enableDisableButton so make one and add it next to the question header if the option is enabled.
				if (options.showToggleHidingTextButton)
				{
					const headerContainer = document.createElement("div");
					headerContainer.classList.add("questionHeaderContainer");

					const questionHeader = questionContainer.querySelector(`[data-test="challenge-header"]`);
					questionHeader.parentNode.insertBefore(headerContainer, questionHeader);
					headerContainer.appendChild(questionHeader);

					enableDisableButton = document.createElement("button");
					enableDisableButton.className = "hideTextEnableDisable";
					enableDisableButton.textContent = options.showTranslationText ? "Enable text hiding" : "Disable text hiding";
					enableDisableButton.addEventListener("click",
						() =>
						{
							options.showTranslationText = !options.showTranslationText;
							chrome.storage.sync.set({"options": options});
							hideTranslationText(undefined, false);
						}
					);

					headerContainer.appendChild(enableDisableButton);
				}
			}
			else
			{
				// There is already an enableDisableButton.
				if (options.showToggleHidingTextButton)
				{
					// And it should be there, so just update the text and function

					enableDisableButton = enableDisableButton[0];
					enableDisableButton.textContent = options.showTranslationText ? "Enable text hiding" : "Disable text hiding";
				}
				else
				{
					// But we don't want it anymore
					
					const headerContainer = questionContainer.querySelector(`.hideTextEnableDisable`).parentNode;
					const header = headerContainer.firstChild;
					headerContainer.parentNode.insertBefore(header, headerContainer); // Move the header back to where it should be;
					headerContainer.remove();

				}
				
			}
			return true;
		}
		else
		{
			// No speaker button so we are translating from native to target language
		}
	}
	return false;
}

function addStyleSheet()
{
	if (document.head.querySelector("#duoStrengthStylesheet") === null)
	{
		// We haven't previously added the stylesheet

		const linkElem = document.createElement("link");
		linkElem.type = "text/css";
		linkElem.rel = "stylesheet";
		linkElem.href = chrome.runtime.getURL("styles/stylesheet.css");

		linkElem.id = "duoStrengthStylesheet";

		document.head.append(linkElem);
	}
}

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
function childListMutationHandle(mutationsList, observer)
{
	let rootChildReplaced = false;
	let goldenOwlMessageAdded = false;
	let rootChildContentsReplaced = false;
	let rootChildRemovedNodes = [];
	let mainBodyReplaced = false
	let bottomNavToggled = false;
	let popupChanged = false;
	let popupIcon;
	let lessonMainSectionContentsReplaced = false;
	let lessonQuestionChanged = false;
	let skillRepaired = false;
	let skillPopoutAdded = false;
	let skillPopout;
	let checkpointPopoutAdded = false;
	let checkpointPopout;
	
	for (let mutation of mutationsList)
	{
		if (
			mutation.target === rootElem
			&&
			(
				(
					mutation.addedNodes.length === 1
					&& mutation.target.childElementCount === 1
				)
				|| onLoginPage
			)
		)
		{
			rootChildReplaced = true;
		}
		else if (
			mutation.target.id === "overlays"
			&& mutation.target.querySelector(GOLDEN_OWL_MESSAGE_TROPHY_SELECTOR) !== null
		)
		{
			goldenOwlMessageAdded = true;
		}
		else if (mutation.target == rootChild)
		{
			rootChildContentsReplaced = true;
			rootChildRemovedNodes = rootChildRemovedNodes.concat(Array.from(mutation.removedNodes));
		}
		else if (mutation.target == mainBodyContainer)
		{
			mainBodyReplaced = true;
		}
		else if (
			(
				[
					...Array.from(mutation.addedNodes),
					...Array.from(mutation.removedNodes)
				].some(
					(addedNode) => addedNode.className.includes(BOTTOM_NAV_SELECTOR.substring(1))
				) // The bottom nav was added or removed
			)
		)
		{
			bottomNavToggled = true;
		}
		else if (
			mutation.target.className == POPUP_ICON &&
			mutation.addedNodes.length != 0
		)
		{
			popupChanged = true;
			popupIcon = mutation.target;
		}
		else if (
			mutation.target.className.includes(LESSON_MAIN_SECTION)
			&& Array.from(mutation.removedNodes).some(node => `.${node.className}` === PRACTICE_TYPE_SELECT_MESSAGE_SELECTOR)
		)
		{
			lessonMainSectionContentsReplaced = true;
		}
		else if (mutation.target.parentNode.className.includes(LESSON_MAIN_SECTION) && mutation.addedNodes.length != 0)
		{
			lessonQuestionChanged = true;
		}
		else if (
			mutation.target.attributes.hasOwnProperty("data-test") &&
			mutation.target.attributes["data-test"].value == "skill-icon" &&
			mutation.removedNodes.length == 1 &&
			`.${mutation.removedNodes[0].className}` == CRACKED_SKILL_OVERLAY_SELECTOR
		)
		{
			skillRepaired = true;
		}
		else if (
			mutation.target.getAttribute("data-test") == "skill" &&
			mutation.addedNodes.length != 0 &&
			mutation.target.querySelectorAll(`[data-test="skill-popout"]`).length !== 0
		)
		{
			skillPopoutAdded = true;
			skillPopout = mutation.target.querySelector(`[data-test="skill-popout"]`);
		}
		else if (
			`.${mutation.target.className}` == CHECKPOINT_CONTAINER_SELECTOR &&
			mutation.addedNodes.length != 0 &&
			mutation.target.querySelector(CHECKPOINT_POPOUT_SELECTOR) != null
		)
		{
			checkpointPopoutAdded = true;
			checkpointPopout = mutation.target.querySelector(CHECKPOINT_POPOUT_SELECTOR);
		}
	}

	if (rootChildReplaced)
	{
		// root child list has changed so rootChild has probably been replaced, let's start again.
		init();
	}
	else if (rootChildContentsReplaced)
	{
		// Check if there is both the topbar and the main page elem.
		if (rootChild.childElementCount == 2)
		{
			// not just changed into a lesson
			languageChanged = false;
			init();
		}
		else if (rootChild.childElementCount == 1)
		{
			// Entered a lesson in the normal way, through the skill tree.
			// Don't need to do anything here as when the lesson will be loading first.
			// When it has finished loading the mainBody is replaced with the lesson sections.
			// We are already observing for that change and will handle it.
		}
	}
	else if (mainBodyReplaced)
	{
		// mainBodyContainer childlist changed, so the mainBody element must have been replaced.
		mainBody = mainBodyContainer.firstChild;


		// This mainBody element being replaced happens on some page changes, so let's also trigger some page change checks.
		// But also make sure that this page hasn't removed to top bar, if it has let's run init again to see what is going on.
		if (document.body.contains(topBarDiv))
			classNameMutationHandle(mutationsList, null);
		else
			init();
	}

	if (goldenOwlMessageAdded)
	{
		const overlays = document.querySelector("#overlays");
		const trophy = overlays.querySelector(GOLDEN_OWL_MESSAGE_TROPHY_SELECTOR);
		if (trophy != null)
		{
			// The golden owl has been clicked and the congratulation message is being displayed
			const messageContainer = trophy.nextElementSibling;
			// If the message is shown after coming out of a checkpoint redo
			// then the languageCode may not be known yet.
			if (languageCode != "")
			{
				// It is known so add the buttons.
				addCheckpointButtons(messageContainer, true);
			}
			else
			{
				// It isn't known yet so we do nothing until it is loaded and the buttons will be added in addFeatures
			}
		}
	}

	if (bottomNavToggled)
	{
		// Switched between mobile and desktop layouts.
		if (document.querySelector(BOTTOM_NAV_SELECTOR) !== null)
		{
			// There is the bottom navigation bar so we are in the mobile layout.
			inMobileLayout = true;
			rootElem.classList.add("mobileLayout");
			rootElem.classList.remove("desktopLayout");
		}
		else
		{
			// There is not a bottom navigation bar so we are in normal desktop layout.
			inMobileLayout = false;
			rootElem.classList.add("desktopLayout");
			rootElem.classList.remove("mobileLayout");
		}

		// Set appropriate styling to need strengthing list or skill suggestion
		let mobileWidth = "auto";
		let desktopWidth = "auto";
		if (document.querySelector(TRY_PLUS_BUTTON_SELECTOR) !== null)
		{
			const boxRightEdge = document.querySelector(`[data-test="skill-tree"]>div`).getBoundingClientRect().right;
			const buttonLeftEdge = document.querySelector(TRY_PLUS_BUTTON_SELECTOR).getBoundingClientRect().left;
			if (buttonLeftEdge !== 0)
			{
				// Is zero if element has been hidden e.g by an adblocker
				const offset = boxRightEdge - buttonLeftEdge;
				desktopWidth = `calc(100% - ${offset}px - 0.5em)`;
				mobileWidth = `calc(100% - ${offset}px - 1.5em)`;
			}
		}

		document.querySelectorAll(`.topOfTreeList`).forEach(
			(list) =>
			{
				list.style.width = (inMobileLayout) ? mobileWidth : desktopWidth;
			}
		);

		if (document.querySelector(MOBILE_TIPS_PAGE_HEADER_SELECTOR) === null)
		{
			// Re set up the observers as topBarDiv will have been replaced and there might be a bottomNav
			setUpObservers();
		}

		// Try to re apply focus mode option
		applyFocusMode();

		// Try to re apply the fixed sidebar option
		applyFixedSidebar();

		// Try and add the Crowns and XP info in case the popups are there.
		if (options.XPInfo) displayXPBreakdown();
		if (options.crownsInfo) displayCrownsBreakdown();

		if (options.totalStrengthBox) displayTotalStrenthBox();

		// Try to add the languages info incase the sidebar has been added back.
		if (options.languagesInfo) displayLanguagesInfo(getLanguagesInfo());
	}

	if (popupChanged)
	{
		// Crown or streak pop up box has appeared or dissapeared.

		if (languageChanged)
		{
			// Language change has still yet to be resolved, let's not display the info as it is likely not for this language.
			return false;
		}

		if (popupIcon.getElementsByClassName(GOLD_CROWN).length != 0) // Grey crown doesn't seem to have its own class now, it has the same as gold.
		{
			// Crowns has had the change.
			if (options.crownsInfo && popupIcon.lastChild.nodeName == 'DIV')
			{
				// Pop-up box, which is a div, has just appeared as the last child, let's display the Crown breakdown.
				displayCrownsBreakdown();
			}
			else
			{
				// Pop-up box disappeared
			}
		}

		if (
			popupIcon.getElementsByClassName(LIT_FLAME).length
			+ popupIcon.getElementsByClassName(GREY_FLAME).length
			+ popupIcon.getElementsByClassName(BLUE_FLAME).length
			!= 0
		) // Lit flame for streak extended today, grey for not, blue possibly for frozen with duolingo plus?
		{
			// Streak/XP has had the change.
			if (options.XPInfo && popupIcon.lastChild.nodeName == 'DIV')
			{
				// Pop-up box, which is a div, has just appeared as the last child, let's display the XP breakdown.
				displayXPBreakdown();
			}
			else
			{
				// Pop-up box disappeared
			}
		}

		if (popupIcon.querySelector(LANGUAGES_LIST_SELECTOR) != null && options.treeLevelBorder)
		{
			// Language list added, add the flag borders
			addFlagBorders();
		}
	}

	if (lessonMainSectionContentsReplaced)
	{
		// Practice type selection as been made, we should now be on the first question,
		// let's run init again to get everything set up for future question.
		init();
	}

	if (lessonQuestionChanged)
	{
		// Run check for translation type question
		++questionNumber;
		hideTranslationText();
		revealNewWord();
	}
	
	if (skillRepaired)
	{
		removeCrackedSkillsList();
		requestData();
	}
	
	if (skillPopoutAdded)
	{
		const introLesson = document.querySelector(`[data-test="intro-lesson"]`);
		if (introLesson == null || !introLesson.contains(skillPopout))
		{
			// No introduction lesson, or if there is this skillPopout isn't from that skill
			if (options.practiseButton) addPractiseButton(skillPopout);
		}

		if (options.grammarSkillsTestButton) addGrammarSkillTestOutButton(skillPopout);

		if (options.wordsButton) addWordsButton(skillPopout);

		if (options.masteredButton) addMasteredSkillButton(skillPopout);

		if (inMobileLayout && document.querySelector("#revealHiddenSkillsButton") !== null) fixPopoutAlignment(skillPopout);
	}
	
	if (checkpointPopoutAdded)
	{
		if (options.checkpointButtons) addCheckpointButtons(checkpointPopout);
	}
};

function classNameMutationHandle(mutationsList, observer)
{
	/*
		First we go through all the mutations to check if any of them are a language change.
		If there has been a language change, then we will just deal with that.
		This is the deal with the case that the script loaded on a page other than the main page, where when a language changes then happens,
		we are also changed to the main page, triggering the page change mutation.
	*/
	let pageChanged = false;
	let isLanguageChange = false;
	let questionCheckStatusChange = false;
	for (let mutation of mutationsList)
	{
		if (mutation.target.parentNode.parentNode == languageLogo)
		{
			// it was a language change
			isLanguageChange = true;
		}
		else if (mutation.target.parentNode.className == LESSON_BOTTOM_SECTION)
		{
			// The question check status changed
			questionCheckStatusChange = true;
		}
		else
		{
			// this mutation is not a language change or a question check, so it must be a page change.
			pageChanged = true;
		}
	}
	if (isLanguageChange)
	{
		// Now we deal with the language change.
		// As the language has just changed, need to wipe the slate clean so no old data is shown after change.
		languageChanged = true;
		languageChangesPending++;
		
		removeStrengthBars();
		removeNeedsStrengtheningBox();
		removeCrackedSkillsList();
		removeCrownsBreakdown();
		removeXPBoxes();
		removeSuggestion();
		progress = [];

		// now get the new data
		requestData();
	}
	if (pageChanged)
	{
		// There has been a page change, either to or from the main page.


		// check if we are now on the main page
		if (window.location.pathname == "/learn")
		{
			// on main page
			onMainPage = true;
			
			applyFocusMode();
			applyFixedSidebar();

			// check if language has been previously set as we only set it in init if we were on the main page
			if (language != "")
			{
				// language has previously been set so not first time on main page, let's just get some new data.
				requestData();

				if (inMobileLayout)
				{
					setUpObservers(); // topBarDiv gets replaced when changing to the shop in mobile layout;
				}
			}
			else
			{
				// language was not set so first time on home page, let's run init again
				init();
			}
		}
		else
		{
			// not on main page, so need to set the flag
			onMainPage = false;
			
			// We may be on a tips page so try to add the buttons.
			addButtonsToTipsPage();
		}
	}
	if (questionCheckStatusChange)
	{
		for (let mutation of mutationsList)
		{
			if (mutation.target.className.includes(QUESTION_UNCHECKED))
			{
				// The current question has not been checked yet,
				// don't need to do anything.
			}
			else if (mutation.target.className.includes(QUESTION_CHECKED))
			{
				// The current question has just been checked,
				// lets unhide the question text if it was hidden.
				hideTranslationText(true);
			}
			else
			{
				// something else, maybe not on a question, just ignore it
			}
		}
	}
};

function setUpObservers()
{

	// topBar Div is the direct container holding the navigation butons
	// Safer to use class name, which may also change...
	topBarDiv = rootChild.querySelector(`.${TOP_BAR}`);
	const bottomNav = rootChild.querySelector(BOTTOM_NAV_SELECTOR);

	// Declare nav buttons that we will need to observe

	let homeNav;
	let storiesNav;
	// let discussionNav;
	let shopNav;
	// languageLogo declared globally for use outside init;
	let crownNav;
	let streakNav;

	if (!inMobileLayout)
	{
		// In normal layout, with everything in the top bar.

		let numNavButtons = topBarDiv.querySelectorAll(`.${NAVIGATION_BUTTON}`).length;
		// if numNavButtons = 4 then there is no stories button.
		// if numNavButtons = 5 then there is a stories button and that goes after the homeNav.

		homeNav = topBarDiv.childNodes[0];

		if (numNavButtons == 5)
		{
			storiesNav = topBarDiv.childNodes[2];
			/* unused/unusable
			discussionNav = topBarDiv.childNodes[4];
			*/
			shopNav = topBarDiv.childNodes[6];
			languageLogo = topBarDiv.childNodes[10];
			crownNav = topBarDiv.childNodes[11];
			streakNav = topBarDiv.childNodes[12];
		}
		else
		{
			/* unused/unusable
			discussionNav = topBarDiv.childNodes[2];
			*/
			shopNav = topBarDiv.childNodes[4];
			languageLogo = topBarDiv.childNodes[8];
			crownNav = topBarDiv.childNodes[9];
			streakNav = topBarDiv.childNodes[10];
		}

		// set up observers for page changes
		classNameObserver.observe(homeNav,{attributes: true}); // Observing to see if class of homeNav changes to tell if we have switched to or from main page.
		/* unused/unusable
		classNameObserver.observe(discussionNav,{attributes: true}); // Observing to see if class of discussionNav changes to tell if we have switched to or from discussion page. Though the extension does not handle this domain due to forums subdomain prefix.
		*/
		classNameObserver.observe(shopNav,{attributes: true}); // Observing to see if class of shopNav changes to tell if we have switched to or from the shop.
	}
	else
	{
		// In mobile layout with the bottom nav bar.
		// topBarDiv contains langageLogo, crownNav, streakNav
		// bottomNav contains homeNav, storiesNav, discussionNav, shopNav, profileNav,

		homeNav = bottomNav.childNodes[1];
		storiesNav = bottomNav.childNodes[2]; // Always a stories button in mobile layout.
		/* unused/unusable
		discussionNav = bottomNav.childNodes[3];
		*/
		shopNav = bottomNav.childNodes[4];

		languageLogo = topBarDiv.childNodes[0];
		crownNav = topBarDiv.childNodes[1];
		streakNav = topBarDiv.childNodes[2];
		
		const homeImg = homeNav.querySelector(`img`);
		const shopImg = shopNav.querySelector(`img`);
		
		classNameObserver.observe(homeImg, {attributes: true});
		classNameObserver.observe(shopImg, {attributes: true});
	}
	

	// set up observer for language logo popup
	childListObserver.observe(languageLogo.lastChild, {childList: true});

	// set up observers for crown and streak nav hovers
	childListObserver.observe(crownNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing crown data.
	childListObserver.observe(streakNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing streak and XP data.

	// need to set up Observer on language logo for language change detection
	// The element that changes on language change is the first grandchild of languageLogo. Note that on over or click this granchild gets a sibling which is the dropdown box.
	classNameObserver.observe(languageLogo.childNodes[0].childNodes[0],{attributes: true});

	// set up the observer to check for layout changes where the bottomNav might be added or removed
	childListObserver.observe(topBarDiv.parentNode.parentNode, {childList: true});
}

async function init()
{
	// Load options
	let optionsLoaded = retrieveOptions();

	// Add external stylesheet
	addStyleSheet();

	rootElem = document.getElementById("root"); // When logging in child list is changed.
	childListObserver.observe(rootElem,{childList: true}); // Observing for changes to its children to detect logging in and out?

	if (rootElem.childElementCount == 0)
		return false;

	rootChild = rootElem.childNodes[0];
	childListObserver.observe(rootChild,{childList: true}); // Observing for changes to its children to detect entering and leaving a lesson.
	
	if (rootChild.querySelector(`:scope > [data-focus-guard]`) != null)
	{
		// The golden owl message is being displayed.
		// This means that the mainBodyCointainer is just before these new elements as the second child of rootChild
		mainBodyCointainer = rootChild.querySelector(`:scope > [data-focus-guard]`).previousElementSibling;
	}
	else if((/^\/courses/).test(window.location.pathname))
	{
		// On the courses page, here the main body container is the first child of rootChild for some reason.
		mainBodyContainer = rootChild.firstChild;
		if (mainBodyContainer == null)
			return false;
	}
	else
	{
		mainBodyContainer = rootChild.lastChild;
		if (mainBodyContainer == null)
			return false;

	}

	childListObserver.observe(mainBodyContainer, {childList:true}); // Observing for changes to its children to detect if the mainBody element has been replaced.


	mainBody = mainBodyContainer.firstChild;
	if (mainBody == null)
		return false;
	
	if (document.querySelector(BOTTOM_NAV_SELECTOR) !== null || document.querySelector(MOBILE_TIPS_PAGE_HEADER_SELECTOR) !== null)
	{
		inMobileLayout = true;
		rootElem.classList.add("mobileLayout");
		rootElem.classList.remove("desktopLayout");
	}
	else
	{
		inMobileLayout = false;
		rootElem.classList.add("desktopLayout");
		rootElem.classList.remove("mobileLayout");
	}
	
	if (rootChild.firstChild.className === LOGIN_PAGE)
	{
		// On login page so cannot continue to run rest of init process.
		onMainPage = false;
		onLoginPage = true;
		return false;
	}
	else
	{
		// should be logged in
		onLoginPage = false;

		// now test to see if we are in a lesson or not

		if (rootChild.firstChild.className == LESSON)
		{
			// in a lesson
			// we probably got here from a link in the needs strengthening list or from a practiseButton

			onMainPage = false;

			// On first load there is loading animation as the mainBody,
			// we are already observing for if this is replaced,
			// so on first call nothing will happen, but init will be called again when the lesson sections are loaded.
			//
			// We still do need to add the observer to the lesson main section when it has loaded in order to detect question changes

			const lessonMainSection = document.querySelector(`.${LESSON_MAIN_SECTION}`);

			if (lessonMainSection !== null)
			{
				// We have a main section.

				// We are into the questions so let's observe the lessonMainSection's first child's children to watch for when the question changes.

				childListObserver.observe(lessonMainSection.firstChild, {childList: true});

				// Set up mutation observer for question checked status change.
				const lessonBottomSection = document.querySelector(`.${LESSON_BOTTOM_SECTION}`);
				classNameObserver.observe(lessonBottomSection.firstChild, {attributes: true});
			}
			else
			{
				// No main section, so not in the question yet, we will possibly need to set up another observer for when we enter the questions

				// Now check if we are on the selection practice type selection screen
				const practiceTypeSelectMessage = document.querySelector(PRACTICE_TYPE_SELECT_MESSAGE_SELECTOR); // Would be first (and only) child if exists

				if (practiceTypeSelectMessage !== null)
				{
					// On timed/untimed practice selection screen.
					// We need to observe lessonMainSection as its children get replaced when the practice type is selected.
					
					childListObserver.observe(practiceTypeSelectMessage.parentNode, {childList: true});
				}
			}

			await optionsLoaded;
			hideTranslationText(undefined, true); // hide text if appropriate and set up the observer on the question area
			revealNewWord();

			if (options.hideCartoons)
			{
				document.body.classList.add("hideCartoons");
			}
			else
			{
				document.body.classList.remove("hideCartoons");
			}

			lastSkill = await retrieveLastSkill();
			const pageUrl = window.location.href;
			let currentUrlNotStored = true;
			{
				const somethingIsStored = lastSkill != null;
				if (somethingIsStored && lastSkill.urlTitle != null)
				{
					// Stored last skill was a practice session or a grammar test out.
					if (
						pageUrl.includes(`/${lastSkill.urlTitle}/practice`)
						|| pageUrl.includes(`/${lastSkill.urlTitle}/test`)
					)
					{
						// The current url matches up with the practice session stored.
						currentUrlNotStored = false;
					}
				}

				if (somethingIsStored && lastSkill.checkpointNumber != null)
				{
					// Stored last skill was a checkpoint
					if (pageUrl.includes(`/${lastSkill.checkpointNumber}`))
					{
						// The current url matched up with the checkpoint stored.
						currentUrlNotStored = false;
					}
				}
			}

			if (currentUrlNotStored)
			{
				// The lesson we have just entered does not match the lastSkill that was stored.
				// We must have closed duolingo before it could be cleared properly after the lesson
				// Let's clear this up now.
				chrome.storage.sync.remove("lastSkill");
				lastSkill = undefined;
			}

		}
		else
		{
			// not in a lesson
			/*
				Main body container element has class _3MLiB.
				If it is the first child, there is no topBarDiv and it is the only child of rootChild,
				if it is second place, then the first child should be a topBarDiv and there are two children of rootChild.
				So it is enough to just test for the number of children of rootChild to check for a topBarDiv.
			*/

			questionNumber = 1;
			if (rootChild.childElementCount === 1 || document.querySelector(MOBILE_TIPS_PAGE_HEADER_SELECTOR) !== null)
			{
				// no topBarDiv
				onMainPage = false;
				return false;
			}
			else
			{
				// there is a topBarDiv so we can continue to process the page to workout what to do


				// Get user id from the pages cookies, it is stored under the key logged_out_uuid
				userId = document.cookie.split("; ")
										.find(cookie => cookie.startsWith("logged_out_uuid"))
										.split("=")[1];

				setUpObservers();

				onMainPage = window.location.pathname === "/learn"

				/*
					language seems to be quite difficult to set on first load, the language as a string is only available embedded in sentences, which may change if the user is using a different language.
					We could use the whole sentence in its place as we really only care about the changes in the lanuage on the whole. However, I don't know how if the language is always embedded in these senteces for all languages.
					

					Instead we will not set it initially and wait for the data to be loaded the first time and take the language string from that.
				*/

				await optionsLoaded;

				// League hiding
				if (options.showLeagues)
				{
					rootChild.classList.remove("hideLeagueTable");
				}
				else
				{
					rootChild.classList.add("hideLeagueTable");
				}

				// Focus mode - sidebar hiding
				applyFocusMode();

				// Fixed sidebar
				applyFixedSidebar();

				await openLastSkillPopout();

				const popout = document.querySelector(`[data-test="skill-popout"], ${CHECKPOINT_POPOUT_SELECTOR}`);

				if (popout != null)
					popout.scrollIntoView({block: "center"});

				// Done all the prep we need, let's get some data to process
				requestData();
			}
		}
	}
}


function start()
{
	chrome.runtime.sendMessage({type: "showPageAction"});
	chrome.runtime.onMessage.addListener(
		(message, sender, sendResponse) => {
			if (message.type === "optionsChanged")
			{
				init();
			}
			if (message.type === "clearMasteredSkills")
			{
				if (userId !== "" && UICode !== "" && languageCode !== "")
				{
					clearMasteredSkills()
					.then(() => 
						{
							sendResponse({"cleared": true});
							addFeatures();
						}
					);
					return true; // needs to return tru as response is asynchronous
				}
				else
				{
					sendResponse({"cleared": false});
				}
			}
		}
	);
	init();
}; // call function to start display sequence on first load

window.onunload = function()
{
	chrome.runtime.sendMessage({type: "pageClosed"});
}

if (document.readyState === "complete" || document.readyState === "interactive")
{
	start();
}
else
{
	document.addEventListener("DOMContentLoaded", start);
}

//observer.disconnet(); can't disconnect as always needed while page is loaded.

/*
The structure of page is as follows:
<body>
	...
	<div id="root" onclick="">                                                                                                <-- rootElem
		<div>                                                                                                                 <-- rootChild
			<div>
				<div class="_2ofx2" style="opacity: 0; width: 100%;"></div>
				<div class="_14fD_" style="z-index: 210;"></div>
				<div class="_3qbk_ _1K9ZC" style="z-index: 210;">
					<div class="_3HW_7 _14fD_" style="z-index: 210101;"></div>
					<div class="_3TwVI">...</div>                                                                            <-- topBarDiv
				</div>
			</div>
			<div class="_3W86r _1Xlh1">                                                                                      <-- mainBodyContainer
				<div>                                                                                                        <-- mainBody
					<div class="_2Rpqh _36g-h _1VSis _1xa0a"></div>
					<div class="_1YfQ8">...</div>                                                                            <-- sidebar
					<div>                                                                                                    <-- main section
						<div class="_33Mo9">
							<div class="_2PVaI">
								<div data-test="skill-tree" class="_3ZJK8">
									<div class="_2joxc" style="height: auto; width: 100%; z-index: 1;">
										################################                                                     <-- lists go here
									</div>
									<div class="_3YEom">                                                                     <-- Skill Tree
										<div class="_3uC-w _2PUpL" data-test="tree-section">                                 <-- Tree Section
											<div class="AjBUV">                                                              <-- Rows container
												<div class="_3f9ou">                                                         <-- Skill row
													<div class="_9O-0s _1888P" data-test="skill">                            <-- Skill container
														<div class="_2eeKH" tabindex="0">
															<div class="_3TK8W" style="width: 100%;">
																<div class="_6lk-i">                                         <-- skill graphcis container
																	<div class="_15U-t">
																		<div class="_2rKNN">...</div>                        <-- Contains progress ring
																		<div class="_3Sv-w" data-test="skill-icon">...</div> <-- Skill icon container
																		<div class="_17NNA">.../div>                         <-- Skill crown count container
																	</div>
																</div>
																#######################################                      <-- Strength Bar inserted here
																<div class="Mr3if _2OhdT _1V15X _3PSt5">SKILL NAME</div>     <-- Skill name element
															</div>
														</div>
													######## Only after clicking a skill ###################################################################
													#	<div class="_33-99" data-test="skill-popout">                        <-- Popout container
													#		<div class="_3tWnW _3_Gei _1W3aa _1kf1N">
													#			<div class="_1b8Ja _1GJUD _3lagd SSzTP _1JPPG">
													#				<div class="_1cv-y">                                     <-- Small buttons container
													#					######################################               <-- Words list button goes here
													#					<button>...</button>                                 <-- Test out button
													#				</div>
													#				<div class="_1cv-y"></div>
													#				<div class="QowCP">
													#					<div class="_1m77f">Level x/5</div>
													#					<div class="_3L5UX">Lesson y / z</div>
													#				</div>
													#				<div class="_2I_Id">
													#					<button class="_2aoiN _1HSlC _2C1GY _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN _226dU _1figt" data-test="tips-button">Tips</button>
													#					<button class="twkSI _25Mqa whuSQ _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN UCrz7 yTpGk" data-test="start-button">Start Lesson</button>
													#				</div>
													#				#####################################                    <-- Practise Button goes here
													#			</div>
													#			<div class="_37dAC">...</div>                                <-- Popout bubble arrow
													#		</div>
													#	</div>
													########################################################################################################
													</div>
													<div class="_9O-0s _1888P" data-test="skill">...</div>                   <-- Skill container
												</div>
												<div class="_3f9ou">                                                         <-- Skill row
												<div class="_3f9ou">                                                         <-- Skill row
												<div class="_3Sis0">                                                         <-- Bonus Skill row seperator
													<hr class="_3snoK">
												</div>
												<div class="_3f9ou">                                                         <-- Skill row
												<div class="_3Sis0">                                                         <-- Bonus Skill row seperator
													<hr class="_3snoK">
												</div>
												<div class="_3f9ou">                                                         <-- Skill row
												<div class="_3f9ou">                                                         <-- Skill row
												.
												.
												.
											</div>
											.
											.
											.
										</div>
										<div class="_2tZPV">                                                                 <-- Checkpoint row
											<div class="_1dj9x">
												<div class="_3lFil">                                                         <-- Checkpoint hr container
													<hr class="_3snoK">
												</div>
												<div>
													<div class="_1lAog">                                                     <-- Checkpoint container
														<div class="_2eeKH _2siHl _17vI2 Dsx7N" tabindex="0">
															<div class="_2dJxv _3suMX" data-test="checkpoint-badge">         <-- Checkpoint
																<img ... />
																<div class="qU_Uq">...</div>                                 <-- Checkpoint number container
															</div>
														</div>
													########################## Only Added if checkpoint is clicked on #######################################
													#	<div class="_2WTbQ _3woYR">                                          <-- Checkpoint popout container
													#		<div class="_3tWnW _3_Gei _1W3aa _2ShHS">
													#			<div class="_1b8Ja BnUip _3Gx6D">                            <-- Checkpoint popout content
													#				<div class="_1peXy">Checkpoint Complete!</div>
													#				<div class="_32Tdp">DESCRIPTION</div>                    <-- Checkpoint blurb
													#				<button 
													#					class="_1yruo _25Mqa whuSQ _2gwtT _1nlVc _2fOC9 t5wFJ _3dtSu _25Cnc _3yAjN UCrz7 yTpGk"
													#					data-test="checkpoint-start-button"
													#				>
													#					Practice +10 XP
													#				</button>
													#				############################################             <-- Retry Crown 1 Test Out Button added here
													#			</div>
													#			<div class="_37dAC">
													#				<div class="_2j-Sn _3Gx6D"></div>
													#			</div>
													#		</div>
													#	</div>
													########################################################################################################
													</div>
												</div>
											</div>
										</div>
										<div class="_3uC-w _2PUpL" data-test="tree-section">...</div>                        <-- Tree Section
										<div class="_2tZPV">...</div>                                                        <-- Checkpoint row
										<div class="_3uC-w _2PUpL" data-test="tree-section">...</div>                        <-- Tree Section
										<div class="_2tZPV">...</div>                                                        <-- Checkpoint row
										.
										.
										.
										<div class="_3uC-w">                                                                 <-- Locked tree section
											<div class="GVcJz _1jKFt"></div>
											<div class="AjBUV _3M0r3">...</div>                                              <-- Grey rows container
										</div>
										<div class="_2tZPV">...</div>                                                        <-- Checkpoint row
										<div class="_3uC-w">...</div>                                                        <-- Locked tree section
										.
										.
										.
										<div class="lIg1v _1TSHz _1G1lu _1MrEd"></div>                                       <-- Golden Owl Tophy would replace last checkpoint row
									</div>
									<div class="_1fnwn">                                                                     <-- Overlayed buttons container
										<div class="_3yqw1 np6Tv">...</div>                                                  <-- Try Plus Button Container
										<div class="_3NYLT"></div>
										<div class="_2TTO0 np6Tv">...</div>                                                  <-- Global Practice Button Container
									</div>
								</div>
							</div>
							<div class="_3ky4c">...</div>                                                                    <-- Footer Container
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>...</script>
	<script>...</script>
	.
	.
	.
	####################                                                                                                     <-- XHR scripts appended here
</body>
*/
