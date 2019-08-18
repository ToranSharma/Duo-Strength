const GOLD = "rgb(250, 217, 29)";
const RED = "rgb(244, 78, 81)";
const ORANGE = "rgb(255, 150, 0)";
const GREY = "rgb(229, 229, 229)";

// Duolingo class names:
const SKILL_CONTAINER = "Af4up";
const SKILL_NAME = "_33VdW";
const BONUS_SKILL_DIVIDER = "_32Q0j";
const TREE_CONTAINER = "i12-l";
const TOP_OF_TREE_WITH_IN_BETA = "w8Lxd";
const TOP_OF_TREE = "_3rABk";
const SKILL_ROW = "_2GJb6";
const SKILL_COLUMN = "QmbDT";
const IN_BETA_LABEL = "_27CnM";
const CROWN_POPUP_CONTAINER = "NugKJ _55Inr";
const CROWN_TOTAL_CONTAINER = "_2boWj";
const DAILY_GOAL_POPUP_CONTAINER = "yRM09";
const DAILY_GOAL_SIDEBAR_CONATINER = "_1Ygk_";
const XP_GRAPH_CONTAINER = "_3qiOl TTBxS w341j";
const SIDEBAR = "_2_lzu";
const POPUP_ICON = "_3gtu3 _1-Eux iDKFi";
const GOLD_CROWN = "WZkQ9";
const GREY_CROWN = "_3FM63";
const COLOURED_FLAME = "_2ctH6";
const GREY_FLAME = "_27oya";
const ACTIVE_TAB = "_2lkuX";
const TOP_BAR = "_3F_8q";
const NAVIGATION_BUTTON = "_3MT82";

let languageCode = "";
let language = "";
let languageChanged = false;
let languageChangesPending = 0;
let languageLogo;

let options = Object();
let progress = Array();
let username = "";
let userData = Object();
let requestID = 0;

let rootElem;
let rootChild;
let mainBody;
let topBarDiv;
let mobileTopBarDiv;

let onMainPage;
let inMobileLayout;

function retrieveOptions()
{
	return new Promise(function (resolve, reject)
	{
		chrome.storage.sync.get("options", function (data)
		{
			// Set options to default settings
			options =
				{
					"strengthBars":						true,
					"strengthBarBackgrounds":			true, 
					"needsStrengtheningList":			true,
					"needsStrengtheningListLength":		"10",
					"needsStrengtheningListSortOrder":	"0",
					"skillSuggestion":					true,
					"skillSuggestionMethod":			"0",
					"crownsInfo":						true,
					"crownsMaximum":					true,
					"crownsBreakdown":					true,
					"crownsBreakdownShowZerosRows":		true,
					"crownsPrediction":					true,
					"XPInfo":							true,
					"XPBreakdown":						true,
					"XPPrediction":						true
				};
			if (Object.entries(data).length === 0)
			{
				// First time using version with options so nothing is set in storage.
			}
			else
			{
				// We have loaded some options,
				// let's apply them individually in case new options have been added since last on the options page
				for (option in data.options)
				{
					options[option] = data.options[option];
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
	return new Promise(function (resolve,reject)
	{
		chrome.storage.sync.get("progress", function (data)
		{
			if (Object.entries(data).length === 0 || !data.progress.hasOwnProperty(username + languageCode))
			{
				// No progress data or none for this user+lang combination
				updateProgress();
			}
			else
			{
				// We have some progress data saved.
				progress = data.progress[username+languageCode];
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
				data['progress'] = {};
			data.progress[username+languageCode] = progress;
			chrome.storage.sync.set({"progress": data.progress});
			resolve();
		});
	});
}

function updateProgress()
{
	let entry = [(new Date()).setHours(0,0,0,0),crownTreeLevel(),currentProgress()]

	if (progress.length == 0)
	{
		progress.push(entry);
	}
	else if (progress[progress.length-1][0] == entry[0])
	{
		// Already have an entry for today.
		// If there is a entry before that, check if we went up a crown level then.
		if (progress.length > 1 && progress[progress.length-1][1] != progress[progress.length-2][1])
		{
			// The last stored entry was the first at the crown level, so let's not overwrite it
			progress.push(entry)
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
		// Check if any progress has been made since we last stored a entry.

		if (entry[1] != progress[progress.length-1][1] || entry[2] != progress[progress.length-1][2])
		{
			// This entry's progress or crown data is different so some progress has been made,
			// Let's save it.
			progress.push(entry);
		} 
		else
		{
			// No change since the laste entry so we will no save it.
			return false;
		}
	}

	storeProgressHistory();
	return true;
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
	let bars = document.getElementsByClassName("strengthBarHolder");
	for (let bar of bars)
	{
		bar.parentNode.removeChild(bar);
	}
}

function removeNeedsStrengtheningBox()
{
	let strengthenBox = document.getElementById("strengthenBox");
	if(strengthenBox != null) // could be null if changed from old to new UI and the topOfTree div gets removed.
	{
		strengthenBox.parentNode.removeChild(strengthenBox);
	}
}

function removeCrownsBreakdown()
{
	let maxCrowns = document.getElementById("maxCrowns");
	if(maxCrowns != null) // is null after some language changes.
	{
		maxCrowns.parentNode.removeAttribute("style"); // may need to do this another way for cases where the element is null.
		maxCrowns.parentNode.removeChild(maxCrowns);
	}

	let crownLevelBreakdownContainer = document.getElementById("crownLevelBreakdownContainer");
	if (crownLevelBreakdownContainer != null) crownLevelBreakdownContainer.parentNode.removeChild(crownLevelBreakdownContainer);

	let treeCrownLevelPrediction = document.getElementById("treeCrownLevelPrediction");
	if (treeCrownLevelPrediction != null) treeCrownLevelPrediction.parentNode.removeChild(treeCrownLevelPrediction);
}

function removeXPBox()
{
	let xpBox = document.getElementById("XPBox");
	if (xpBox != null)
	{
		xpBox.parentNode.removeChild(xpBox);	
	}
}

function removeSuggestion()
{
	let suggestionContainer = document.getElementById("fullStrengthMessageContainer");
	if (suggestionContainer != null)
	{
		suggestionContainer.parentNode.removeChild(suggestionContainer);
	}
}

function hasMetGoal()
{
	return userData['streak_extended_today'];
}

function currentProgress()
{
	let skills = userData['language_data'][languageCode]['skills'];
	let treeLevel = crownTreeLevel();
	let lessonsToNextCrownLevel = 0;
	for (let skill of skills)
	{
		//if (skill['locked']) continue;
		
		if (skill['skill_progress']['level'] == treeLevel)
		{
			lessonsToNextCrownLevel += skill['num_sessions_for_level'] - skill['level_sessions_finished'];
		}
	}

	return lessonsToNextCrownLevel;
}

function crownTreeLevel()
{
	let skills = userData['language_data'][languageCode]['skills'];

	let skillsByCrowns = [[],[],[],[],[],[]];

	for (let skill of skills)
	{
		skillsByCrowns[skill['skill_progress']['level']].push(skill);
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

function daysToNextXPLevel(history, xpLeft /*, timezone*/)
{
	if (history.length == 0)
	{
		return -1;
	}
	let xpTotal = 0;
	
	let firstDate = (new Date(history[0].datetime)).setHours(0,0,0,0);
	let lastDate;

	for (let lesson of history)
	{
		xpTotal += lesson.improvement;
		let date = (new Date(lesson.datetime)).setHours(0,0,0,0);
		lastDate = date;
	}

	let currentDate = (new Date()).setHours(0,0,0,0);

	if (lastDate != currentDate || !hasMetGoal())
	{
		// lastDate isn't today or it is and the goal hasn't been met, so we don't include today in the calculation, use yesterday
		lastDate = currentDate - (24*60*60*1000);
	}

	let timePeriod = (lastDate - firstDate)/(1000*60*60*24) + 1; // number of days, inclusive of start and end.

	let xpRate = xpTotal/timePeriod // in units of xp/day

	return Math.ceil(xpLeft/xpRate);
}

function daysToNextCrownLevel()
{
	let endIndex = progress.length - 1;
	let lastDate = progress[endIndex][0];
	let today = (new Date()).setHours(0,0,0,0);
	
	while (!hasMetGoal() && lastDate == today)
	{
		lastDate = progress[--endIndex][0];
	}

	let numPointsToUse = 7;
	let startIndex = Math.max(endIndex - numPointsToUse + 1, 0);
	let firstDate = progress[startIndex][0];
	
	let level = progress[startIndex][1];
	let lastProgress = progress[startIndex][2];
	let progressMade = 0;

	for (let point of progress.slice(startIndex + 1, endIndex + 1))
	{
		if (point[1] != level)
		{
			// this point is from another level
			progressMade += lastProgress;
			lastProgress = point[2];
			level = point[1];
		}
		else
		{
			// point from the same level so look at the change in progress
			progressMade += lastProgress - point[2];
			lastProgress = point[2];
		}
	}

	let timePeriod = lastDate-firstDate; // in milliseconds
	timePeriod /= 1000*60*60*24; // in days
	let progressRate = progressMade / timePeriod; // in lessons per day

	if (progressRate != 0)
		return Math.ceil(lastProgress / progressRate); // in days
	else
		return -1;
}

function daysToNextCrownLevelByCalendar()
{
	let skills = userData['language_data'][languageCode]['skills'];
	let treeLevel = crownTreeLevel();
	let lessonsToNextCrownLevel = 0;

	for (let skill of skills)
	{
		if (skill['skill_progress']['level'] == treeLevel)
		{
			lessonsToNextCrownLevel += skill['num_sessions_for_level'] - skill['level_sessions_finished'];
		}
	}

	let calendar = userData['language_data'][languageCode]['calendar'];
	if (calendar.length == 0)
		return -1;

	let practiceTimes = Array();

	let currentDate = (new Date()).setHours(0,0,0,0);	

	for (let lesson of calendar)
	{	
		let date = (new Date(lesson['datetime'])).setHours(0,0,0,0);
		if (date == currentDate && !hasMetGoal)
		{
			// if the lesson is from today and the goal hasn't been met, then let's not include it
			continue;
		}
		else
		{
			practiceTimes.push(date);
		}
	}

	let numLessons = practiceTimes.length;
	let firstDate = practiceTimes[0]; // assuming sorted acending.
	let lastDate = practiceTimes[numLessons-1];

	if (lastDate != currentDate)
	{
		// lastDate isn't today, it would only be today if we have met our goal for today
		// we therefore set the lastDate to yesterday, in case that wasn't already it and no lessons were completed yesterday.
		lastDate = currentDate - (24*60*60*1000);
	}

	let timePeriod = (lastDate - firstDate)/(1000*60*60*24) + 1; // in days
	let lessonRate = numLessons/timePeriod; // in lessons per day

	return Math.ceil(lessonsToNextCrownLevel/lessonRate);
}

function addStrengths(strengths)
{
	// Adds strength bars and percentages under each skill in the tree.
	/*
		The structure of skill tree is as follows:
		<div class="_2GJb6"> 												<-- container for row of skills, has classes _1H-7I and _1--zr if bonus skill row
			<a class="Af4up" href="javascript:;"> 							<-- container for individual skill
				<div class="_2albn">
					<div>														<-- possibly new container as of 2019-03-01 holds skill icon and progress ring
						<div class="_3zkuO _39IKr">     						<-- progress ring container
							<div class="_2xGPj">								<-- progress ring container
								<svg>...</svg>          						<-- progress ring svg
							</div>
						</div>
						<span class="_1z_vo _3hKMG ewiWc _2vstG">				<-- skill icon background
							<span class="..."></span>							<-- skill icon
							<div clas ="_26l3y">...</div>						<-- skill crowns logo and number
						</span>
					</div>
					<div>														<-- another possibly new container as of 2019-03-01 holds skill name
						####################################################	<-- Strength Bar to be inserted here
						<span class="_378Tf _3qO9M _33VdW">Skill Name</span>	<-- Skill name
					</div>

					####### when skill clicked on new div below is appended ##########
					<div class="_2EYQL _2HujR _1ZY-H gqrCU ewiWc">				<-- popup box backgorund
						<div>...</div>											<-- popup box info container
						::after													<-- popup box 'speach bubble' style arrow at top
					</div>
				</div>
			</a>
		</div>
	*/

	let skillElements = document.getElementsByClassName(SKILL_CONTAINER); // Af4up is class of skill containing element, may change.
	let skills = Array();
	/*
		Each element of skills array will be an array with the following information:
		0:	skill icon element (unused currently).
		1:	skill name element.
		2:	skill strength between 0 and 1.0.
		3:	display boolean - false if skill at crown 0, true otherwise.
	*/
	let bonusElementsCount = 0;
	for (let i=0; i<skillElements.length; i++)
	{
		let elementContents = [
		 	skillElements[i].childNodes[0].childNodes[0],
		 	skillElements[i].childNodes[0].childNodes[1].getElementsByClassName(SKILL_NAME)[0]
		 ];

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
		if (skillElements[i].parentNode.parentNode.previousSibling != null && skillElements[i].parentNode.parentNode.nextSibling != null
			&& skillElements[i].parentNode.parentNode.previousSibling.className == BONUS_SKILL_DIVIDER && skillElements[i].parentNode.parentNode.nextSibling.className == BONUS_SKILL_DIVIDER)
		{
			// these skill elements are in the bonus skill section.
			elementContents.push(strengths[1][bonusElementsCount][0]);
			elementContents.push(strengths[1][bonusElementsCount][1]);
			bonusElementsCount ++;

			skills.push(elementContents);
		} else
		{
			// Normal skill
			elementContents.push(strengths[0][i - bonusElementsCount][0]);
			elementContents.push(strengths[0][i - bonusElementsCount][1]);
			
			skills.push(elementContents);
		}
	}
	
	let numBarsAdded = 0;
	
	for (let i = 0; i< skills.length; i++)
	{
		let iconElement = skills[i][0];
		let nameElement = skills[i][1];
		let name = nameElement.innerHTML;
		let strength = skills[i][2]*1.0;
		let display = (skills[i][3])? "" : "none";
		
		if(document.getElementsByClassName("strengthBarHolder").length == numBarsAdded) // if we have only the number of bars added this time round, keep adding new ones.
		{
			let strengthBarHolder = document.createElement("div");
			strengthBarHolder.className = "strengthBarHolder";
			strengthBarHolder.style = 
			`
				width: 100%;
				height: 1.4em;
				position: relative;
				// left: -10%;
				transform: translate (0, 10%);
				display: ${display};
			`;
			
			nameElement.parentNode.style['width'] = "100%";
			nameElement.parentNode.insertBefore(strengthBarHolder, nameElement);

			let strengthBarBackground = document.createElement("div");
			strengthBarBackground.className = "strengthBarBackground";
			strengthBarBackground.style =
			`
				position: absolute;
				display: inline-block;
				width: 100%;
				height: 1em;
				left: 0;
				transform: inherit;
				background-color: #e5e5e5;
				border-radius: 0.5em;
				z-index: 1;
			`;

			let strengthBar = document.createElement("div");
			strengthBar.className = "strengthBar";
			strengthBar.id = name + "StrengthBar";
			strengthBar.style = 
			`
				display: inline-block;
				position: absolute;
				left: 0;
				transform: inherit;
				width: ${strength*100}%;
				height: 1em;
				background-color: ${strength == 1.0 ? GOLD : RED};
				border-radius: 0.5em;
				z-index: 2;
			`;
			
			let strengthValue = document.createElement("div");
			strengthValue.className = "strengthValue";
			strengthValue.id = name + "StrengthValue";
			strengthValue.style = 
			`
				display: inline-block;
				position: inherit;
				text-align: center;
				transform: inherit;
				z-index: 3;
			`;
			strengthValue.innerHTML = strength*100 + "%";
			
			if (options.strengthBarBackgrounds) strengthBarHolder.appendChild(strengthBarBackground);
			strengthBarHolder.appendChild(strengthBar);
			strengthBarHolder.appendChild(strengthValue);
			
			numBarsAdded ++; // added a bar so increment counter.
			
		} else // we already have the elements made previously, just update their values.
		{
			let strengthBar = document.getElementById(name + "StrengthBar");
			strengthBar.style['width'] = (strength*100)+"%";
			strengthBar.style['backgroundColor'] = (strength == 1.0 ? GOLD : RED);
			
			let strengthValue = document.getElementById(name + "StrengthValue");
			strengthValue.innerHTML = strength*100 + "%";

			strengthBar.parentNode.style['display'] = display;
		}
	}
}

function displayNeedsStrengthening(needsStrengthening, needsSorting = true)
{
	// adds clickable list of skills that need strengthening to top of the tree.
	
	// let skillTree;
	// let firstSkillRow;
	let topOfTree;
	if(
			document.getElementsByClassName(TREE_CONTAINER).length != 0 &&
			document.getElementsByClassName(SKILL_ROW).length != 0 &&
			(
				document.getElementsByClassName(TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length != 0
			)

		) // Has the tree loaded from a page change
	{
		/* currently unused
		skillTree = document.getElementsByClassName(TREE_CONTAINER)[0];
		firstSkillRow = document.getElementsByClassName(SKILL_ROW)[0];
		*/
		topOfTree = document.getElementsByClassName(TREE_CONTAINER)[0].childNodes[0];
	}
	else
	{
		// body hasn't loaded yet so element not there, let's try again after a small wait, but only if we are still on the main page.
		if(onMainPage)
		{
			setTimeout(function () {displayNeedsStrengthening(needsStrengthening);}, 500);
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
	*/
	function sortSkillsAlphabetical(a, b)
	{
		return (a['title'] < b['title']) ? -1 : 1;
	};

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

	if (needsSorting)
		switch (options.needsStrengtheningListSortOrder)
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
		}

	topOfTree.style['height'] = "auto";
	topOfTree.style['width'] = "100%";

	let strengthenBox; // will be a div to hold list of skills that need strengthenening
	let needToAddBox = false;

	if (document.getElementById("strengthenBox") == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = "strengthenBox";
		strengthenBox.style =
		`
			text-align: left;
			margin: 0 0 2em 0;
			min-height: 3em
		`;
		if (inMobileLayout)
			strengthenBox.style['margin'] = "0.5em 1em 0.5em 1em";

		if (topOfTree.getElementsByClassName(IN_BETA_LABEL).length != 0)
		{
			// If there is the IN BETA label, make it relative, not aboslute.
			topOfTree.getElementsByClassName(IN_BETA_LABEL)[0].style['position'] = 'relative';
			if (inMobileLayout)
				strengthenBox.style['margin-top'] = "1.5em";
			else
				strengthenBox.style['margin-top'] = "0.5em";
		}
		else
		{
			// Not being pushed down by the IN BETA label,
			if (inMobileLayout)
			{
				// In mobile layout so we don't need to make room for the try plus button.
			}
			else
			{
				// In desktop layout so let's make room for the TRY PLUS button to the right.
				strengthenBox.style['width'] = "calc(100% - 119px)";	
			}
		}
	}
	else
	{
		strengthenBox = document.getElementById("strengthenBox");
	}

	let numSkillsToBeStrengthened = needsStrengthening[0].length + needsStrengthening[1].length;

	strengthenBox.innerHTML = "";

	strengthenBox.innerHTML +=
	`
		Your tree has ${numSkillsToBeStrengthened} 
		${(needsStrengthening[0].length + needsStrengthening[1].length != 1) ? " skills that need": " skill that needs"} strengthening: <br/>
	`;

	let numSkillsToShow = Math.min(numSkillsToBeStrengthened, options.needsStrengtheningListLength);
	for (let i = 0; i < numSkillsToShow - 1; i++)
	{
		if (i < needsStrengthening[0].length)
		{
			// index is in normal skill range
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[0][i]['url_title']}${(needsStrengthening[0][i]['skill_progress']['level'] == 5)? "/practice":""}'>${needsStrengthening[0][i]['title']}</a>, `;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = i - needsStrengthening[0].length;
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[1][bonusSkillIndex]['url_title']}${(needsStrengthening[1][bonusSkillIndex]['skill_progress']['level'] == 1)? "/practice":""}'>${needsStrengthening[1][bonusSkillIndex]['title']}</a>, `;
		}
	}
	strengthenBox.innerHTML = strengthenBox.innerHTML.substring(0, strengthenBox.innerHTML.length - 2);
	strengthenBox.innerHTML +=	(function()
								{
									if (numSkillsToShow == 1)
										return ""; // If there is only one skill in the list, don't put anything before it.
									else if (numSkillsToShow == numSkillsToBeStrengthened)
										return " & "; // Add & if we have put some stuff and showing every skill in list so the next one is the very last.
									else
										return ", "; // Otherwise we have put some stuff and there is more coming after so just put a comma.
								})();

	if (numSkillsToShow == numSkillsToBeStrengthened)
	{
		// we are showing every skill that needs to be stregnthened.
		if(needsStrengthening[1].length > 0)
		{
			// last skill to be displayed is a bonus skill
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[1][needsStrengthening[1].length - 1]['url_title']}${(needsStrengthening[1][needsStrengthening[1].length - 1]['skill_progress']['level'] == 1)? "/practice":""}'>${needsStrengthening[1][needsStrengthening[1].length - 1]['title']}</a>`;
		} else
		{
			// last skill to be displayed is a normal skill
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[0][needsStrengthening[0].length -1]['url_title']}${(needsStrengthening[0][needsStrengthening[0].length -1]['skill_progress']['level'] == 5)? "/practice":""}'>${needsStrengthening[0][needsStrengthening[0].length -1]['title']}</a>`;
		}
	}
	else
	{
		// some skills that need to be strengthened are not being shown, so the last one we are showing is just the next one in the order we have
		let lastIndexToBeShown = numSkillsToShow - 1; // the last for loop ended with i = numSkillsToShow - 2
		if (lastIndexToBeShown < needsStrengthening[0].length)
		{
			// index is in normal skill range
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[0][lastIndexToBeShown]['url_title']}${(needsStrengthening[0][lastIndexToBeShown]['skill_progress']['level'] == 5)? "/practice":""}'>${needsStrengthening[0][lastIndexToBeShown]['title']}</a>, `;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = lastIndexToBeShown - needsStrengthening[0].length;
			strengthenBox.innerHTML += `<a href='/skill/${languageCode}/${needsStrengthening[1][bonusSkillIndex]['url_title']}${(needsStrengthening[1][bonusSkillIndex]['skill_progress']['level'] == 1)? "/practice":""}'>${needsStrengthening[1][bonusSkillIndex]['title']}</a>, `;
		}

		let numSkillsLeft = numSkillsToBeStrengthened - numSkillsToShow;

		// Add a clickable element to show more skills in the list.
		// We are going to add on another needsStrengtheningListLength number of skills to the list, but as we are going to change this amount to lengthen the list, we need to original saved in storage.
	 	chrome.storage.sync.get("options", function (data)
	 	{
			let numExtraSkillsOnShowMore = Math.min(numSkillsLeft, data.options.needsStrengtheningListLength);

			let showMore = document.createElement("a");
			showMore.innerHTML = numSkillsLeft + " more...";
			showMore.href = "javascript:;";

			showMore.onclick = function () {
				options.needsStrengtheningListLength = String(+options.needsStrengtheningListLength + +numExtraSkillsOnShowMore);
				displayNeedsStrengthening(needsStrengthening, false);
			}
			
			showMore.title = "Click to show " + numExtraSkillsOnShowMore + " more skill" + ((numExtraSkillsOnShowMore != 1)? "s": "");

			strengthenBox.innerHTML += " and ";
			strengthenBox.appendChild(showMore);
		});
	}

	if(needToAddBox)
	{
		topOfTree.appendChild(strengthenBox);
	}
}

function displayCrownsBreakdown()
{
	if (Object.entries(userData).length == 0)
		return false;

	let skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	let bonusSkills = userData['language_data'][languageCode]['bonus_skills'];

	let crownLevelCount = [Array(6).fill(0),Array(2).fill(0)]; // will hold number skills at each crown level, index 0 : crown 0 (not finished), index 1 : crown 1, etc.

	for (let skill of skills)
	{
		crownLevelCount[0][skill['skill_progress']['level']]++;
	}

	for (let bonusSkill of bonusSkills)
	{
		crownLevelCount[1][bonusSkill['skill_progress']['level']]++;
	}

	let maxCrownCount = skills.length*5 + bonusSkills.length;

	let treeLevel = crownTreeLevel();

	let crownLevelContainer;
	if (inMobileLayout)
		crownLevelContainer = document.getElementsByClassName(CROWN_POPUP_CONTAINER)[1];
	else
		crownLevelContainer = document.getElementsByClassName(CROWN_POPUP_CONTAINER)[0];

	crownLevelContainer.style =
	`
		flex-wrap: wrap;
		justify-content: center;
	`;
	
	let crownTotalContainer;
	crownTotalContainer = crownLevelContainer.getElementsByClassName(CROWN_TOTAL_CONTAINER)[0];


	let maximumCrownCountContainer;
	if (options.crownsMaximum)
	{
		crownTotalContainer.style.fontSize = "22px";

		maximumCrownCountContainer = document.createElement("span");
		maximumCrownCountContainer.id = "maxCrowns";
		maximumCrownCountContainer.innerHTML = "/" + maxCrownCount;
	}
	/*
	maximumCrownCountContainer.style =
	`
		position:absolute;
		top: 50%;
		right: 0;
		margin-top: 5px;
		font-size: 36px;
		font-weight: 700;
		transform: translateY(-50%);
	`;
	*/

	let breakdownContainer = document.createElement("div");
	breakdownContainer.id = "crownLevelBreakdownContainer";
	breakdownContainer.style =
	`
		margin: 1em 1em 0 1em;
		text-align: left;
		flex-grow: 1;
		color: black;
	`;

	let treeLevelContainer = document.createElement("div");
	treeLevelContainer.id = "treeLevel";
	treeLevelContainer.style = "display: inline-block";
	treeLevelContainer.innerHTML = treeLevel;

	let breakdownList = document.createElement("ul");
	breakdownList.id = "breakdownList";
	breakdownList.style =
	`
		display: grid;
		grid-auto-rows: 1.5em;
		align-items: center;
	`;
	
	let imgContainer = document.createElement("div");
	imgContainer.style =
	`
		position: relative;
		display: inline-block;
		width: 100%;
		justify-self:center;
	`;
	
	let levelContainer = document.createElement("div");
	levelContainer.style =
	`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 2;
		color: #cd7900;
	`;

	let crownImg = document.createElement("img");
	crownImg['alt'] = "crown";
	// Class name _2PyWM used for other small crowns on skills. Corresponds to height & width 100% and z-index 1.
	crownImg.style =
	`
		height: 100%;
		width: 100%;
		z-index: 1;
	`;
	crownImg['src'] = "//d35aaqx5ub95lt.cloudfront.net/images/juicy-crown.svg" // old crown img: "//d35aaqx5ub95lt.cloudfront.net/images/crown-small.svg";

	imgContainer.appendChild(crownImg);
	imgContainer.appendChild(levelContainer);

	if(document.getElementsByClassName("crownLevelItem").length == 0) // We haven't added the breakdown data yet, so let's add it.
	{
		if (options.crownsMaximum) crownTotalContainer.appendChild(maximumCrownCountContainer);

		breakdownContainer.appendChild(document.createElement("p"))
		breakdownContainer.lastChild.style = "text-align: center;";
		breakdownContainer.lastChild.innerHTML = "Your tree is at Level&nbsp;";
		breakdownContainer.lastChild.appendChild(treeLevelContainer);

		for(let crownLevel = 0; crownLevel < crownLevelCount[0].length; crownLevel++)
		{
			let skillCount = crownLevelCount[0][crownLevel];

			if (!options.crownsBreakdownShowZerosRows && skillCount == 0)
				continue;

			let crownCount = skillCount * crownLevel;
		
			levelContainer.id = "crownLevel" + crownLevel + "Count";
			levelContainer.innerHTML = crownLevel;

			let breakdownListItem = document.createElement("li");
			breakdownListItem.className = "crownLevelItem";
			breakdownListItem.style =
			`
				display: grid;
				align-items: center;
				justify-items: right;
				grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;
			`;

			breakdownListItem.innerHTML =
			`
				<span>
					${skillCount}
				</span>
				<span style='justify-self: center;'>
					skill${(skillCount == 1 )?"":"s"} at
				</span>
			`;

			breakdownListItem.appendChild(imgContainer);

			breakdownListItem.innerHTML +=
			`
				=
				<span>
					${crownCount}
				</span>
				<span>
					crown${(crownCount == 1 )?"":"s"}
				</span>
			`;

			breakdownList.appendChild(breakdownListItem);
		}


		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			// The tree has some bonus skills so let's display a breakdown of their crown levels.
			let bonusSkillsBreakdownHeader = document.createElement("h3");
			bonusSkillsBreakdownHeader.innerText = "Bonus Skills";
			bonusSkillsBreakdownHeader.style =
			`
				margin: 0;
				font-size: 100%;
				justify-self: center
			`;

			breakdownList.appendChild(bonusSkillsBreakdownHeader);

			for(let crownLevel = 0; crownLevel < crownLevelCount[1].length; crownLevel++)
			{
				let skillCount = crownLevelCount[1][crownLevel];

				if (!options.crownsBreakdownShowZerosRows && skillCount == 0)
				continue;

				let crownCount = skillCount * crownLevel;
			
				levelContainer.id = "bonusSkillCrownLevel" + crownLevel + "Count";
				levelContainer.innerHTML = crownLevel;

				let breakdownListItem = document.createElement("li");
				breakdownListItem.className = "crownLevelItem";
				breakdownListItem.style =
				`
					display: grid;
					align-items: center;
					justify-items: right;
					grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;
				`;
				
				breakdownListItem.innerHTML =
				`
					<span>
						${skillCount}
					</span>
					<span style='justify-self: center;'>
						skill${(skillCount == 1 )?"":"s"} at
					</span>
				`;

				breakdownListItem.appendChild(imgContainer);

				breakdownListItem.innerHTML +=
				`
					=
					<span>
						${crownCount}
					</span>
					<span>
						crown${(crownCount == 1 )?"":"s"}
					</span>
				`;

				breakdownList.appendChild(breakdownListItem);
			}
		}
		
		breakdownContainer.appendChild(breakdownList);
		if (options.crownsBreakdown) crownLevelContainer.appendChild(breakdownContainer);

		if (treeLevel != 5)
		{
			let prediction = document.createElement("p");
			let numDays;
			if (progress.length > 5)
				numDays = daysToNextCrownLevel();
			else
				numDays = daysToNextCrownLevelByCalendar();

			if (numDays == -1)
			{
				crownLevelContainer.style['marginBottom'] = "1em";
				return false;
			}

			prediction.id = "treeCrownLevelPrediction";
			prediction.innerHTML =
			`
				At your current rate your tree will reach Level&nbsp;${treeLevel + 1} in
				<span style='font-weight: bold'>
					${numDays}
				</span>
				days, on
				${new Date((new Date()).setHours(0,0,0,0) + numDays*24*60*60*1000).toLocaleDateString()}
			`;

			prediction.style =
			`
				margin: 1em;
				text-align: center;
				color: black;
			`;

			if (options.crownsPrediction) crownLevelContainer.appendChild(prediction)
		}
	}
	else // We have already added the breakdown data, just update it.
	{
		for(let crownLevel = 0; crownLevel < crownLevelCount[0].length; crownLevel++)
		{
			let levelContainerElement = document.getElementById("crownLevel" + crownLevel + "Count");
			levelContainerElement.innerHTML = crownLevel;
		}
		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			for(let crownLevel = 0; crownLevel < crownLevelCount[1].length; crownLevel++)
			{
				let levelContainerElement = document.getElementById("bonusSkillCrownLevel" + crownLevel + "Count");
				levelContainerElement.innerHTML = crownLevel;
			}
		}

		document.getElementById("maxCrowns").innerHTML = "/" + maxCrownCount;
		document.getElementById("treeLevel").innerHTML = treeLevel;
	}
}

function displayXPBreakdown()
{
	if (Object.entries(userData).length == 0
		|| (document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER).length === 0 && document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER).length === 0))
		return false;
	
	let data =
		{
			'language_string':	userData['language_data'][languageCode]['language_string'],
			'level_progress':	userData['language_data'][languageCode]['level_progress'],
			'level':			userData['language_data'][languageCode]['level'],
			'level_points':		userData['language_data'][languageCode]['level_points'],
			'points':			userData['language_data'][languageCode]['points'],
			'history':			userData['language_data'][languageCode]['calendar']
			//'timezone':			userData['timezone_offset'] seems to not be available for every users, maybe depends on platform use.
		}

	let levelProgressPercentage = data['level_progress']*100/data['level_points'];

	if(document.getElementById("XPBox") == null)
	{
		// We haven't made the XP Box yet

		let container = document.createElement("div");
		container.id = "XPBox";
		container.style['margin-top'] = "1em";
		container.style['color'] = "black";

		let XPHeader = document.createElement("h2");
		XPHeader.innerText = data['language_string']+ " XP";

		let languageLevelContainer = document.createElement("div");

		languageLevelContainer.appendChild(XPHeader);

		let languageLevelElement = document.createElement("p");
		languageLevelElement.id = "xpTotalAndLevel";
		languageLevelElement.innerText = "Level " + data['level'];
		languageLevelElement.style =
		`
			font-size: 175%;
			font-weight: bold;
			text-align: center;
			color: ${ORANGE};
		`;

		let languageXPElement = document.createElement("span");
		languageXPElement.innerText = data['points'] + " XP - ";
		languageXPElement.style =
		`
			color: black;
			font-weight: normal;
		`;
		
		languageLevelElement.insertBefore(languageXPElement, languageLevelElement.childNodes[0]);
		languageLevelContainer.appendChild(languageLevelElement);
		if (options.XPBreakdown) container.appendChild(languageLevelContainer);
		
		if (data['level'] != 25)
		{
			let nextLevelProgressElement = document.createElement("p");
			nextLevelProgressElement.style =
			`
				text-align: center;
				margin-bottom: 0;
			`;
			nextLevelProgressElement.innerText = `${data['level_points']-data['level_progress']} XP till Level ${data['level']+1}`;

			let languageLevelProgressBarContainer = document.createElement("div");
			languageLevelProgressBarContainer.className = "languageLevelProgressBar";
			languageLevelProgressBarContainer.style =
			`
				height: 0.5em;
				width: 100%;
				background-color: ${GREY};
				border-radius: 0.25em;
			`;

			let languageLevelProgressBar = document.createElement("div");
			languageLevelProgressBar.className = "languageLevelProgressBar";
			languageLevelProgressBar.style =
			`
				height: 100%;
				width: ${levelProgressPercentage}%;
				background-color: ${ORANGE};
				border-radius: 0.25em;
			`;

			languageLevelProgressBarContainer.appendChild(languageLevelProgressBar);

			let currentLevelProgressElement = document.createElement("p");
			currentLevelProgressElement.style = "text-align: center;";
			currentLevelProgressElement.innerText = `(${data['level_progress']}/${data['level_points']} XP - ${Number(levelProgressPercentage).toFixed(1)}%)`;

			languageLevelContainer.appendChild(nextLevelProgressElement);
			languageLevelContainer.appendChild(languageLevelProgressBarContainer);
			languageLevelContainer.appendChild(currentLevelProgressElement);


			let daysLeft = daysToNextXPLevel(data['history'], data['level_points']-data['level_progress']);
			let projectedNextLevelCompletion = document.createElement("p");
			projectedNextLevelCompletion.style =
			`
				margin-bottom: 0;
				text-align: center;
			`;
			projectedNextLevelCompletion.innerHTML =
			`
				At your current rate you will reach the next level, Level&nbsp;${data['level']+1}, in about
				<span style='font-weight:bold'>
					${daysLeft}
				</span>
				days, on ${new Date((new Date()).setHours(0,0,0,0) + daysLeft*24*60*60*1000).toLocaleDateString()}
			`;
			
			if (daysLeft != -1 && options.XPPrediction)
			{
				container.appendChild(projectedNextLevelCompletion);
			}
		}
		else
		{
			// Reached max level
			let maxLevelMessage = document.createElement("p");
			maxLevelMessage.innerText = "You have reached the maximum level!";
			languageLevelContainer.appendChild(maxLevelMessage);
		}
		if (document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER).length != 0)
		{
			// If there is a Daily Goal box pop-up box, put the breakdown in that
			if (inMobileLayout)
				document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER)[1].appendChild(container);
			else
				document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER)[0].appendChild(container);
			
			// Reduce gap between XP graph and streak info.
			container.parentNode.getElementsByClassName(XP_GRAPH_CONTAINER)[0].style['margin-top'] = "-2em";
			container.style['margin-top'] = "0";
			container.parentNode.style['padding-top'] = "0.5em";
			container.parentNode.style['padding-bottom'] = "0";

		}
		else if (document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER).length != 0)
		{
			// If there is a Daily Goal box in the sidebar put the breakdown in that
			document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER)[0].appendChild(container);
		}
		else
		{
			// Neither is about so we just don't do anything. Shouldn't get to this point as we should have exited the function at the start.
		}
	}
	else
	{
		// We alreayd have the XP Box, let's just update the values
		let languageLevelElement = document.getElementById("xpTotalAndLevel");
		let languageXPElement = languageLevelElement.childNodes[0];
		languageXPElement.innerText = data['points'] + " XP - ";
		languageLevelElement.innerText = "Level " + data['level'];
		languageLevelElement.insertBefore(languageXPElement,languageLevelElement.childNodes[0]);
		
		if (languageLevelElement.nextSibling != null)
		{
			// Wasn't level 25 ...
			if (data['level'] != 25)
			{
				// ... and still aren't
				let languageLevelProgressBarContainer = document.getElementsByClassName("languageLevelProgressBar")[0];
				languageLevelProgressBarContainer.style =
				`
					height: 0.5em;
					width: 100%;
					background-color: ${GREY};
					border-radius: 0.25em;
				`;

				let languageLevelProgressBar = document.getElementsByClassName("languageLevelProgressBar")[1];
				languageLevelProgressBar.style =
				`
					height: 100%;
					width: ${levelProgressPercentage}%;
					background-color: ${ORANGE};
					border-radius: 0.25em;
				`;

				let nextLevelProgressElement = languageLevelProgressBarContainer.previousSibling;
				nextLevelProgressElement.innerText = `${data['level_points']-data['level_progress']} XP till Level ${data['level']+1}`;

				let currentLevelProgressElement = languageLevelProgressBarContainer.nextSibling;
				currentLevelProgressElement.innerText =
				`
					(${data['level_progress']}/${data['level_points']} XP - ${Number(levelProgressPercentage).toFixed(1)}%)
				`;

				if (options.XPPrediction)
				{
					let daysLeft = daysToNextXPLevel(data['history'], data['level_points']-data['level_progress']);
					languageLevelElement.parentNode.lastChild.childNodes[1].innerText = daysLeft;
				}
			}
			else
			{
				// ... but is now, so let's remove all the irrelevant info
				while (languageLevelElement.nextSibling != null)
				{
					languageLevelElement.parentNode.removeChild(languageLevelElement.nextSibling);
				}

				let maxLevelMessage = document.createElement("p");
				maxLevelMessage.style = "margin-bottom: 0";
				maxLevelMessage.innerText = "You have reached the maximum level!";
				languageLevelElement.parentNode.appendChild(maxLevelMessage);
			}
		}
	}
}

function displaySuggestion(skills, bonusSkills)
{
	// let skillTree;
	// let firstSkillRow

	let topOfTree;
	if (
			document.getElementsByClassName(TREE_CONTAINER).length != 0 &&
			document.getElementsByClassName(SKILL_ROW).length != 0 &&
			(
				document.getElementsByClassName(TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length != 0
			)
		) // Has the tree loaded from a page change
	{
		/* currently unused
		skillTree = document.getElementsByClassName(TREE_CONTAINER)[0];
		firstSkillRow = document.getElementsByClassName(SKILL_ROW)[0];
		*/
		topOfTree = document.getElementsByClassName(TREE_CONTAINER)[0].childNodes[0];
	}
	else
	{
		// body hasn't loaded yet so element not there, let's try again after a small wait, but only if we are still on the main page.
		if(onMainPage)
		{
			setTimeout(displaySuggestion(skills, bonusSkills), 500);
		}
		else
		{
			// swtiched away before we got a chance to try again.
		}
		return false;
	}

	topOfTree.style['height'] = "auto";
	topOfTree.style['width'] = "100%";

	if (document.getElementById("fullStrengthMessageContainer") == null)
	{
		let container = document.createElement("div");
		container.id = "fullStrengthMessageContainer";
		if (inMobileLayout)
			container.style = "margin: 0.5em 1em 0.5em 1em;";
		else
			container.style = "margin: 0 0 2em 0;";

		if (topOfTree.getElementsByClassName(IN_BETA_LABEL).length != 0)
		{
			// If there is the IN BETA label, make it relative, not absolute.
			topOfTree.getElementsByClassName(IN_BETA_LABEL)[0].style['position'] = 'relative';
			if (inMobileLayout)
				container.style['margin-top'] = "1.5em";
			else
				container.style['margin-top'] = "0.5em";
		}
		else
		{
			// Not being pushed down by the IN BETA label.
			if (inMobileLayout)
			{
				// In mobile layout so we don't need to make room for the try plus button.
			}
			else
			{
				// In desktop layout so let's make room for the TRY PLUS button to the right.
				container.style['width'] = "calc(100% - 119px)";
			}
		}
		let treeLevel = crownTreeLevel();
		let skillsByCrowns = [[],[],[],[],[],[]];

		for (let skill of skills)
		{
			skillsByCrowns[skill['skill_progress']['level']].push(skill);
		}
		
		let randomSuggestion;
		/*

			0: Random
			1: First
			2: Last
		*/
		switch (options.skillSuggestionMethod)
		{
			case "0":
				randomSuggestion = skillsByCrowns[treeLevel][Math.floor(Math.random()*skillsByCrowns[treeLevel].length)];
				break;
			case "1":
				randomSuggestion = skillsByCrowns[treeLevel][0];
				break;
			case "2":
				randomSuggestion = skillsByCrowns[treeLevel][skillsByCrowns[treeLevel].length-1];
				break;
		}

		let link = document.createElement("a");
		link.href = "/skill/" + languageCode + "/" + randomSuggestion['url_title'] + ((treeLevel == 5) ? "/practice/" : "/");
		link.innerText = randomSuggestion['title'];
		link.style.color = 'blue';
		link.addEventListener('focus',
			function(event)
			{
				event.target.style.fontWeight = 'bold';
				event.target.style.textDecoration = 'underline';
			});

		link.addEventListener('blur',
			function(event)
			{
				event.target.style.fontWeight = 'normal';
				event.target.style.textDecoration = 'none';
			});
		
		let fullStrengthMessage = document.createElement("p");
		if (treeLevel == 5)
		{
			fullStrengthMessage.innerHTML =
			`
				Your ${language} tree is fully strengthened and at Level 5! Why not do a
				<a href='/practice'>
					general practice
				</a>
			`;
		}
		else if (treeLevel == 0)
		{
			link.href = "/skill/" + languageCode + "/" + skillsByCrowns[0][0]['url_title'] + "/";
			link.innerText = skillsByCrowns[0][0]['title'];

			fullStrengthMessage.innerText = "All the skills that you have learnt so far are fully strengthened. ";
			fullStrengthMessage.innerText += "The next skill to learn is: ";
			fullStrengthMessage.appendChild(link);
		}
		else
		{
			fullStrengthMessage.innerHTML = `Your ${language} tree is fully strengthened. Why not practice this skill to work towards getting your tree to Level&nbsp;${treeLevel + 1}: `;	
			fullStrengthMessage.appendChild(link);
		}

		container.appendChild(fullStrengthMessage);

		topOfTree.appendChild(container);

		link.focus();
	}
	else
	{
		// Already made the box
	}
}

function getStrengths()
{
	// parses the data from duolingo.com/users/USERNAME and extracts strengths and skills that need strengthening
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
	
	let strengths = [[],[]];	// will hold array of the strength values for each skill in tree in order top to bottom, left to right and array of strengths of bonus skills. values between 0 and 1.0 in 0.25 steps.
	let needsStrengthening = [[],[]]; // will hold the objects for the skills that have strength < 1.0 and the bonus skills that have strength < 1.0.
	
	languageCode = Object.keys(userData['language_data'])[0]; // only one child of 'language_data', a code for active language.

	let skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	let bonusSkills = userData['language_data'][languageCode]['bonus_skills'];

	function sortSkills(skill1,skill2)
	{
		if (skill1['coords_y'] < skill2['coords_y']) // x above y give x
		{
			return -1;
		} else if (skill1['coords_y'] > skill2['coords_y'])// x below y give y
		{
			return 1;
		} else // x and y on same level
		{
			if (skill1['coords_x'] < skill2['coords_x']) // x to left of y give x
			{
				return -1;
			} else // x to right of y give y
			{
				return 1;
			}
		}
	}

	skills.sort(sortSkills);
	bonusSkills.sort(sortSkills);

	for (let skill of skills)
	{
		strengths[0].push([skill['strength'],Boolean(skill['skill_progress']['level'])]);
		if(skill['strength'] != 1 && skill['strength'] != 0 && skill['skill_progress']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[0].push(skill);
		}
	}

	for (let bonusSkill of bonusSkills)
	{
		strengths[1].push([bonusSkill['strength'],Boolean(bonusSkill['skill_progress']['level'])]);
		if(bonusSkill['strength'] != 1 && bonusSkill['strength'] != 0 && bonusSkill['skill_progress']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}
	}

	if (options.strengthBars) addStrengths(strengths); // call function to add these strengths under the skills
	
	if (options.XPInfo) displayXPBreakdown();

	if (needsStrengthening[0].length+needsStrengthening[1].length !=0)
	{
		// Something needs strengthening.
		if (options.needsStrengtheningList) displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}
	else
	{
		// Nothing that needs strengthening!
		if (options.skillSuggestion) displaySuggestion(skills);
	}

	// All done displaying what needs doing so let reset and get ready for another change.
	resetLanguageFlags();
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
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				{
					document.getElementById('userData${requestID}').innerText = "//" + xmlHttp.responseText;		
				}
			};
			xmlHttp.open('GET', '${url+'?id='+requestID}', true);
			xmlHttp.send(null);
		})()`;


	let data = document.createElement('script');
	data.id = 'userData' + requestID;
	document.body.appendChild(data);

	let xhrScript = document.createElement("script");
	xhrScript.id = 'xhrScript' + requestID;
	xhrScript.innerHTML = code;
	document.body.append(xhrScript);

	function checkData(id)
	{
		let dataElem = document.getElementById('userData' + id);
		if (dataElem.innerHTML == '')
		{
			setTimeout(()=>checkData(id), 50);
		}
		else
		{
			let newData  = dataElem.innerHTML.slice(2)
			document.body.removeChild(dataElem);
			document.body.removeChild(document.getElementById('xhrScript' + id));
			responseHandler(newData, id);
		}
	}

	checkData(requestID ++);
}

async function handleDataResponse(responseText)
{
	userData = JSON.parse(responseText); // store response text as JSON object.
	let newDataLanguageCode = Object.keys(userData['language_data'])[0];
	let newDataLanguageString = userData['language_data'][newDataLanguageCode]['language_string'];

	if (language == '')
	{
		// no lanuage set , then this must be the first load and we need to set the lanuage now.
		language = newDataLanguageString;
	}
	if (languageChangesPending > 1)
	{
		// Multiple language changes happened, we may have eneded up back where we started...
		// In this case, we set the language to unknown and request the data once more.
		// This next set of data will be processed and added to the tree.
		// There is a chance that this data still won't be up to date but the chances are low, hopefully...
		language = 'unknown';
		requestData(); // async
		languageChangesPending = 1;
		return false;

	}
	if (languageChanged && newDataLanguageString == language)
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
		languageCode = newDataLanguageCode;
		language = newDataLanguageString;
		resetLanguageFlags();
		await retrieveProgressHistory();
		updateProgress();

		getStrengths();	// actual processing of the data.
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
			getStrengths(userData);
		}

		httpGetAsync( // asks for data and async calls handle function when ready.
			encodeURI(window.location.origin+"/users/"+username),
			function (responseText, responseID)
			{
				if (languageChangesPending > 1 && responseID != requestID - 1)
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

/*
Currently there is only one UI versions known to be in use.

2019-08-01 the Daily goal box has been moved for some users to the side bar.
This is just handled in the displayXPBreadown function.

function checkUIVersion()
{

}
*/

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
let childListMutationHandle = function(mutationsList, observer)
{
	for (let mutation of mutationsList)
	{
		if (mutation.target == rootElem)
		{
			// root child list has changed so rootChild has probably been replaced, let's redefine it.
			rootChild = rootElem.childNodes[0];
			init();
		}
		else if (mutation.target == rootChild)
		{
			// Check if there is both the topbar and the main page elem.
			if (rootChild.childElementCount == 2)
			{
				// not just changed into a lesson
				languageChanged = false;
				init();
			}
			else
			{
				// we have just entered a lesson in the normal way and we don't need to do anything.
			}
		}
		else if (mutation.target == mainBody)
		{
			// Switched between mobile and desktop layouts.

			// Set appropriate styling to need strengthing list or skill suggestion
			let mobileMargin = "0.5em 1em 0.5em 1em";
			let desktopMargin = "0 0 2em 0";

			let mobileWidth = "auto";
			let desktopWidth = "calc(100% - 119px)";

			if (document.getElementsByClassName(IN_BETA_LABEL).length != 0)
			{
				// There is an IN BETA label
				mobileMargin = "1.5em 1em 0.5em 1em";
				desktopMargin = "0.5em 1em 2em 1em";
				desktopWidth = "auto";
			}

			if (document.getElementsByClassName(SIDEBAR).length == 0)
			{
				// No sidebar so we are in mobile layout.
				inMobileLayout = true;

				if (document.getElementById("strengthenBox") != null)
				{
					document.getElementById("strengthenBox").style['margin'] = mobileMargin;
					document.getElementById("strengthenBox").style['width'] = mobileWidth;
				}
				if (document.getElementById("fullStrengthMessageContainer") != null)
				{
					document.getElementById("fullStrengthMessageContainer").style['margin'] = mobileMargin;
					document.getElementById("fullStrengthMessageContainer").style['width'] = mobileWidth;
				}
				
			}
			else
			{
				// There is a sidebar so we are in normal desktop layout.
				inMobileLayout = false;

				if (document.getElementById("strengthenBox") != null)
				{
					document.getElementById("strengthenBox").style['margin'] = desktopMargin;
					document.getElementById("strengthenBox").style['width'] = desktopWidth;
					
				}
				if (document.getElementById("fullStrengthMessageContainer") != null)
				{
					document.getElementById("fullStrengthMessageContainer").style['margin'] = desktopMargin;
					document.getElementById("fullStrengthMessageContainer").style['width'] = desktopWidth;
				}
				

				// Try and add the XP box again as the sidebar has come back
				if (options.XPInfo) displayXPBreakdown();
			}
		}
		else if (mutation.target.className == POPUP_ICON) // Applies to both mobile and desktop layout streak and crowns icons.
		{
			// Crown or streak pop up box has appeared or dissapeared.

			if (languageChanged)
			{
				// Language change has still yet to be resolved, let's not display the info as it is likely not for this language.
				continue;
			}
			else if (mutation.target.getElementsByClassName(GOLD_CROWN).length + mutation.target.getElementsByClassName(GREY_CROWN).length != 0) // WZkQ9 for gold crown logo, _3FM63 for grey when at 0 crowns.
			{
				// Crowns has had the change.
				if (options.crownsInfo && mutation.target.lastChild.nodeName == 'DIV')
				{
					// Pop-up box, which is a div, has just appeared as the last child, let's display the Crown breakdown.
					displayCrownsBreakdown();
				}
				else
				{
					// Pop-up box disappeared
				}
			}
			if (mutation.target.getElementsByClassName(COLOURED_FLAME).length +  mutation.target.getElementsByClassName(GREY_FLAME).length != 0) // _2ctH6 for coloured flame logo, _27oya for grey when not met day's XP goal.
			{
				// Streak/XP has had the change.
				if (options.XPInfo && mutation.target.lastChild.nodeName == 'DIV')
				{
					// Pop-up box, which is a div, has just appeared as the last child, let's display the XP breakdown.
					displayXPBreakdown();
				}
				else
				{
					// Pop-up box disappeared
				}
			}
		}
	}
};

let classNameMutationHandle = function(mutationsList, observer)
{
	/*
		First we go through all the mutations to check if any of them are a language change.
		If there has been a language change, then we will just deal with that.
		This is the deal with the case that the script loaded on a page other than the main page, where when a language changes then happens,
		we are also changed to the main page, triggering the page change mutation.
	*/
	let pageChanged = false;
	for (let mutation of mutationsList)
	{
		if (mutation.target.parentNode.parentNode == languageLogo)
		{
			// it was a language change
			languageChanged = true;
			languageChangesPending++;
		}
		else
		{
			// this mutation is not a language change, so it must be a page change.
			pageChanged = true;
		}
	}
	if (languageChanged)
	{
		// Now we deal with the language change.
		// As the language has just changed, need to wipe the slate clean so no old data is shown after change.
		removeStrengthBars();
		removeNeedsStrengtheningBox();
		removeCrownsBreakdown();
		removeXPBox();
		removeSuggestion();
		progress = [];
		// now get the new data

		requestData();
	}
	if (pageChanged)
	{
		// There has been a page change, either to or from the main page.
		// Just in case there is also a language change still going on we won't set languageChanged to false.

		// check if we are now on the main page
		if (topBarDiv.childNodes[0].className.includes(ACTIVE_TAB))
		{
			// on main page
			// check if language has been previously set as we only set it in init if we were on the main page
			onMainPage = true;
			if (language != "")
			{
				// language has previously been set so not first time on main page, let's just get some new data.
				requestData(language);
			}
			else
			{
				// language was not set so first time on home page, let's run init again
				init();
			}
		}
		else
		{
			// not on main page, don't need to do anything other than set the flag.
			onMainPage = false;
		}
	}
};

let classNameObserver = new MutationObserver(classNameMutationHandle);
let childListObserver = new MutationObserver(childListMutationHandle);

async function init()
{
	let optionsLoaded = retrieveOptions();

	rootElem = document.getElementById("root"); // When logging in child list is changed.
	/*
		data-react attribute seems to have been removed as of 2019-07-17
		dataReactRoot = rootElem.childNodes[0]; // When entering or leaving a lesson children change there is a new body so need to detect that to know when to reload the bars.
	*/
	rootChild = rootElem.childNodes[0];
	childListObserver.observe(rootElem,{childList: true}); // Observing for changes to its children to detect logging in and out?
	childListObserver.observe(rootChild,{childList: true}); // Observing for changes to its children to detect entering and leaving a lesson.
	
	mainBody = rootChild.lastChild.firstChild;
	childListObserver.observe(mainBody,{childList:true}); // Observing for changes to its children to detect moving between mobile and desktop layout.

	if (mainBody.getElementsByClassName(SIDEBAR).length == 0)
		inMobileLayout = true;
	else
		inMobileLayout = false;

	if(rootChild.childNodes.length == 1) // If there is only one child of rootChild then we are on the log in page.
	{
		// On login page so cannot continue to turn rest of init process.
		onMainPage = false;
		return false;
	}
	else
	{
		// should be logged in
		
		/*
			As of 2019-07-17 comment nodes have been removed, so testing of position of main body element is simpler.
			Main body container element has class _3MLiB. If it is the first child, there is no topbar Div, if it is second place, then second should be a topBarDiv.
			As no comment nodes before or after, can just check the number of children.
			If there are two children, then we have both a top bar and the main page, otherwise it is probably just the main page with no top bar.
		*/

		if(rootChild.childElementCount == 2)
		{
			// Using new white topBar layout

			// set username via the href of a link to the profile
			let profileTabHrefParts = document.querySelector("[data-test = \"profile-tab\"]").href.split("/")
			username = profileTabHrefParts[profileTabHrefParts.length - 1];

			// topBar Div is the direct container holding the navigation butons, has class _3F_8q
			// old method topBarDiv = dataReactRoot.childNodes[2].childNodes[1].childNodes[2].childNodes[0];
			// Above works as of 2019-06-11 but any new elements will cause childNodes indices to be wrong.
			// Safer to use class name, which may also change...
			// Note there are two elements with class name _3F_8q, the first is the right one, but let's do a check in case of any changes.
			topBarDiv = rootChild.getElementsByClassName(TOP_BAR)[0];
			mobileTopBarDiv = rootChild.getElementsByClassName(TOP_BAR)[1];
			
			// active tab has class _2lkuX. Buttons seem to have _3MT82 as defining class.
			let numNavButtons = topBarDiv.getElementsByClassName(NAVIGATION_BUTTON).length;
			// if numNavButtons = 4 then there is no stories button.
			// if numNavButtons = 5 then there is a stories button and that goes after the homeNav.

			let homeNav = topBarDiv.childNodes[0];

			let storiesNav;
			// let discussionNav;
			let shopNav;
			let crownNav;
			let streakNav;

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
			//classNameObserver.observe(shopNav,{attributes: true}); // Observing to see if class of shopNav changes to tell if we have switched to or from the shop.

			// set up observers for crown and streak nav hovers
			childListObserver.observe(crownNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing crown data.
			childListObserver.observe(streakNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing streak and XP data.

			if (homeNav.className.includes(ACTIVE_TAB))
			{
				// on home page
				onMainPage = true;
			}
			else
				onMainPage = false;

			// need to set up Observer on language logo for language change detection
			// The element that changes on language change is the first grandchild of languageLogo. Note that on over or click this granchild gets a sibling which is the dropdown box.
			classNameObserver.observe(languageLogo.childNodes[0].childNodes[0],{attributes: true});

			/*
			language = document.head.getElementsByTagName("title")[0].innerHTML.split(" ")[3]; // not sure how well this will work if not using english as the UI language. Needs more work.
			
			language seems to be quite difficult to set on first load, on the white topbar UI, the language as a string is only available embedded in sentences, which may change if the user is using a different language.
			We could use the whole sentence in its place as we really only care about the changes in the lanuage on the whole. However, I don't know how if the language is always embedded in these senteces for all languages.
			

			Instead we will not set it initially and wait for the data to be loaded the first time and take the language string from that.
			*/

			await optionsLoaded;
			requestData();
		}
		else
		{
			// page we are on is most likely a lesson, and we got here from a link in the strengthenBox.
			onMainPage = false;
		}
	}
}

document.body.onload = init(); // call function to start display sequence on first load

//observer.disconnet(); can't disconnect as always needed while page is loaded.