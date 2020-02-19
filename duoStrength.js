const GOLD = "rgb(250, 217, 29)";
const RED = "rgb(244, 78, 81)";
const ORANGE = "rgb(255, 150, 0)";
const GREY = "rgb(229, 229, 229)";
const DARK_BLUE = "rgb(24, 153, 214)";
const LIGHT_BLUE = "rgb(28, 176, 246)";

// Duolingo class names:
const SKILL_CONTAINER = "Af4up";
const SKILL_CONTAINER_CHILD = "_1fneo";
const SKILL_ICON = "_2969E";
const SKILL_NAME = "_33VdW";
const BONUS_SKILL_DIVIDER = "_32Q0j";
const TREE_CONTAINER = "i12-l";
const TOP_OF_TREE_WITH_IN_BETA = "w8Lxd";
const TOP_OF_TREE = "_3rABk";
const TOP_OF_TREE_NEW = "iIzBH";
const MOBILE_TOP_OF_TREE = "_3UShd";
const SKILL_ROW = "_2GJb6";
const SKILL_COLUMN = "QmbDT";
const IN_BETA_LABEL = "_27CnM";
const CROWN_POPUP_CONTAINER = "NugKJ";
const CROWN_LOGO_CONTAINER = "_3uwBi";
const CROWN_DESCRIPTION_CONTAINER = "_27NkX";
const CROWN_TOTAL_CONTAINER = "_2boWj";
const DAILY_GOAL_POPUP_CONTAINER = "yRM09";
const DAILY_GOAL_SIDEBAR_CONATINER = "_1Ygk_";
const XP_GRAPH_CONTAINER = "_3qiOl TTBxS w341j";
const SIDEBAR = "_2_lzu";
const WHITE_SIDEBAR_BOX_CONTAINER = "_1E3L7";
const POPUP_ICON = "_3gtu3 _1-Eux iDKFi";
const GOLD_CROWN = "WZkQ9";
const GREY_CROWN = "_3FM63";
const COLOURED_FLAME = "_2ctH6";
const GREY_FLAME = "_27oya";
const ACTIVE_TAB = "_2lkuX";
const TOP_BAR = "_3F_8q";
const NAVIGATION_BUTTON = "_3MT82";
const QUESTION_CONTAINER = "_14lWn";
const LOGIN_PAGE = "_3nlUH";
const LESSON = "BWibf _3MLiB";
const LESSON_MAIN_SECTION = "_2-1wu";
const LESSON_BOTTOM_SECTION = "_3gDW-";
const QUESTION_UNCHECKED = "_34sNg";
const QUESTION_CHECKED = "_2f9Fr";
const CRACKED_SKILL_OVERLAY = "._22Nf9";
const NEW_WORD_SELECTOR = "._29XRF";
const LEAGUE_TABLE = "_2ANgP";

let languageCode = "";
let language = "";
let languageChanged = false;
let languageChangesPending = 0;
let languageLogo;

let options = {};
let progress = [];
let username = "";
let userData = {};
let requestID = 0;

let rootElem;
let rootChild;
let mainBody;
let mainBodyContainer;
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
					"strengthBars":							true,
						"strengthBarBackgrounds":				true, 
					"needsStrengtheningList":				true,
						"needsStrengtheningListLength":			"10",
						"needsStrengtheningListSortOrder":		"0",
					"crackedSkillsList":					true,
						"crackedSkillsListLength":				"10",
						"crackedSkillsListSortOrder":			"0",
					"skillSuggestion":						true,
						"skillSuggestionMethod":				"0",
					"focusFirstSkill":						true,
					"practiseButton":						true,
					"practiceType":							"0",
						"lessonThreshold":						"4",
					"crownsInfo":							true,
						"crownsMaximum":						true,
						"crownsGraph":							true,
						"crownsBreakdown":						true,
							"crownsBreakdownShowZerosRows":			true,
						"crownsPrediction":						true,
					"XPInfo":								true,
						"XPBreakdown":							true,
						"XPPrediction":							true,
					"languagesInfo":						true,
						"languagesInfoSortOrder":				"0",
					"showTranslationText":					true,
						"revealHotkey":							true,
							"revealHotkeyCode":						"Ctrl+Alt+H",
					"showToggleHidingTextButton":			true,
					"showLeagues":							true,
				};

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
					if (data.options.hasOwnProperty(option))
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
				data.progress = {};
			data.progress[username+languageCode] = progress;
			chrome.storage.sync.set({"progress": data.progress});
			resolve();
		});
	});
}

function updateProgress()
{
	let entry = [(new Date()).setHours(0,0,0,0),crownTreeLevel(),currentProgress()];

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

function removeCrackedSkillsList()
{
	let crackedBox = document.getElementById("crackedBox");
	if (crackedBox != null) // could be null if changed from old to new UI and the topOfTree div gets removed.
	{
		crackedBox.parentNode.removeChild(crackedBox);
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
	return userData.streak_extended_today;
}

function currentProgress()
{
	let skills = userData.language_data[languageCode].skills;
	let treeLevel = crownTreeLevel();
	let lessonsToNextCrownLevel = 0;
	for (let skill of skills)
	{
		//if (skill.locked) continue;
		
		if (skill.skill_progress.level == treeLevel)
		{
			lessonsToNextCrownLevel += skill.num_sessions_for_level - skill.level_sessions_finished;
		}
	}

	return lessonsToNextCrownLevel;
}

function crownTreeLevel()
{
	let skills = userData.language_data[languageCode].skills;

	let skillsByCrowns = [[],[],[],[],[],[]];

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

	let xpRate = xpTotal/timePeriod; // in units of xp/day

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
		return Math.ceil(currentProgress() / progressRate); // in days
	else
		return -1;
}

function daysToNextCrownLevelByCalendar()
{
	let skills = userData.language_data[languageCode].skills;
	let treeLevel = crownTreeLevel();
	let lessonsToNextCrownLevel = 0;

	for (let skill of skills)
	{
		if (skill.skill_progress.level == treeLevel)
		{
			lessonsToNextCrownLevel += skill.num_sessions_for_level - skill.level_sessions_finished;
		}
	}

	let calendar = userData.language_data[languageCode].calendar;
	if (calendar.length == 0)
		return -1;

	let practiceTimes = Array();

	let currentDate = (new Date()).setHours(0,0,0,0);	

	for (let lesson of calendar)
	{	
		let date = (new Date(lesson.datetime)).setHours(0,0,0,0);
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
	labels.setAttributeNS(null, "font-size", String(Math.min(6,0.1*height)));
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
	yTitle.setAttributeNS(null, "y", `${0.5*height}`);
	yTitle.setAttributeNS(null, "text-anchor", "middle");
	yTitle.setAttributeNS(null, "alignment-baseline", "text-before-edge");
	yTitle.setAttributeNS(null, "transform-origin", `0 ${0.5*height}`);
	yTitle.setAttributeNS(null, "transform", "rotate(-90)");
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
		title.textContent = `${data[i]} crown level contributing lesson${data[i]!=1?"s":""}`;

		if (data[i] == 0)
			point.setAttributeNS(null, "fill", "white");

		point.appendChild(title);
		points.appendChild(point);
	}
	
	graph.appendChild(points);

	return graph;
}

function addStrengths(strengths)
{
	// Adds strength bars and percentages under each skill in the tree.
	/*
		The structure of skill tree is as follows:
		<div class="_2GJb6"> 														<-- container for row of skills, has classes _1H-7I and _1--zr if bonus skill row
			<a class="Af4up QmbDt" data-test="skill"> 								<-- container for individual skill
				<div class="_1fneo" tab-index="0">									<-- new container as of 2019-09-03, unknown function
					<div class="_2albn">
						<div class="Fu0xk">											<-- new container as of 2020-02-18
							<div class="_2969E">									<-- new container as of 2020-02-18
								<div class="_39IKr">		     					<-- progress ring container
									<div class="_3zkuO">							<-- progress ring container
										<div class="_3o9cS">						<-- rotated progress ring container
											<svg>...</svg>         					<-- progress ring svg
										</div>
									</div>
								</div>
								<div class="_3hKMGG" data-test="skill-icon">		<-- skill icon container
									<div class="...">								<-- skill icon background
										<svg>...</svg>								<--	skill icon
									</div>
								</div>
								<div clas ="_26l3y">...</div>						<-- skill crowns logo and number
							</div>
							<div>													<-- another possibly new container as of 2019-03-01 holds skill name
								####################################################<-- Strength Bar to be inserted here
								<div class="_378Tf _1YG0X _3qO9M _33VdW">Skill Name</div>
							</div>
						</div>
					</div>
				</div>
				####### when skill clicked on new div below is appended ##########	<-- moved to direct child of Af4up container as of 2020-02-18
				<div class="_2RblG _32ZXv _3czW4" data-test="skill-popout">			<-- popup box container
					<div>...</div>													<-- popup box container
				</div>
			</a>
		</div>
	*/

	let skillElements = Array.from(document.getElementsByClassName(SKILL_CONTAINER)); // Af4up is class of skill containing element, may change.
	
	let skills = Array();
	/*
		Each element of skills array will be an array with the following information:
		0:	skill icon element (unused currently).
		1:	skill name element.
		2:	skill strength between 0 and 1.0.
		3:	display boolean - false if skill at crown 0, true otherwise.
	*/
	let bonusElementsCount = 0;
	
	const bonusSkillDividers = Array.from(document.querySelectorAll(`.${BONUS_SKILL_DIVIDER}`));
	let bonusSkillRow;
	if (bonusSkillDividers.length != 0)
	{
		bonusSkillRow = bonusSkillDividers[0].nextElementSibling;
	}

	for (let i=0; i<skillElements.length; i++)
	{
		let elementContents = [
			skillElements[i].getElementsByClassName(SKILL_ICON)[0],
			skillElements[i].getElementsByClassName(SKILL_NAME)[0]
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
		if (bonusSkillRow != null && bonusSkillRow.contains(skillElements[i]))
		{
			// this skill is in the bonus skill section.
			elementContents.push(strengths[1][bonusElementsCount][0]);
			elementContents.push(strengths[1][bonusElementsCount][1]);
			bonusElementsCount ++;

			skills.push(elementContents);
		}
		else
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
		let name = nameElement.textContent;
		let strength = skills[i][2]*1.0;
		let display = (skills[i][3])? "" : "none";
		
		if(document.getElementsByClassName("strengthBarHolder").length == numBarsAdded) // if we have only the number of bars added this time round, keep adding new ones.
		{
			let strengthBarHolder = document.createElement("div");
			strengthBarHolder.className = "strengthBarHolder";
			strengthBarHolder.style = 
			`
				width: 100%;
				position: relative;
				display: ${display};
				margin-top: 0.5em;
				margin-bottom: -8px;
				line-height: 1em;
			`;
			
			nameElement.parentNode.style.width = "100%";
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
				position: relative;
				width: 97%;
				text-align: right;
				vertical-align: middle;
				font-size: 75%;
				z-index: 3;
				margin: auto;
			`;
			strengthValue.textContent = strength*100 + "%";
			
			if (options.strengthBarBackgrounds) strengthBarHolder.appendChild(strengthBarBackground);
			strengthBarHolder.appendChild(strengthBar);
			strengthBarHolder.appendChild(strengthValue);
			
			numBarsAdded ++; // added a bar so increment counter.
			
		} else // we already have the elements made previously, just update their values.
		{
			let strengthBar = document.getElementById(name + "StrengthBar");
			strengthBar.style.width = (strength*100)+"%";
			strengthBar.style.backgroundColor = (strength == 1.0 ? GOLD : RED);
			
			let strengthValue = document.getElementById(name + "StrengthValue");
			strengthValue.textContent = strength*100 + "%";

			strengthBar.parentNode.style.display = display;
		}
	}
}

function displayNeedsStrengthening(needsStrengthening, cracked = false, needsSorting = true)
{
	// Adds clickable list of skills that need strengthening to top of the tree.
	
	// let skillTree;
	// let firstSkillRow;
	let topOfTree;
	if (
			document.getElementsByClassName(TREE_CONTAINER).length != 0 &&
			document.getElementsByClassName(SKILL_ROW).length != 0 &&
			(
				document.getElementsByClassName(TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_NEW).length != 0 ||
				document.getElementsByClassName(MOBILE_TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length != 0
			)

		) // Has the tree loaded from a page change
	{
		/* currently unused
		skillTree = document.getElementsByClassName(TREE_CONTAINER)[0];
		firstSkillRow = document.getElementsByClassName(SKILL_ROW)[0];
		*/
		topOfTree = document.getElementsByClassName(TREE_CONTAINER)[0].firstChild;
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
		return (a.title < b.title) ? -1 : 1;
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
	
	topOfTree.style.height = "auto";
	topOfTree.style.width = "100%";

	let strengthenBox = document.getElementById((!cracked)?"strengthenBox":"crackedBox"); // will be a div to hold list of skills that need strengthenening
	let needToAddBox = false;

	if (strengthenBox == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = (!cracked)?"strengthenBox":"crackedBox";
		strengthenBox.style =
		`
			text-align: left;
			margin: 0 0 2em 0;
			min-height: 3em
		`;
		if (inMobileLayout)
			strengthenBox.style.margin = "0.5em 1em 0.5em 1em";

		if (topOfTree.getElementsByClassName(IN_BETA_LABEL).length != 0)
		{
			// If there is the IN BETA label, make it relative, not aboslute.
			topOfTree.getElementsByClassName(IN_BETA_LABEL)[0].style.position = 'relative';
			if (inMobileLayout)
				strengthenBox.style.marginTop = "1.5em";
			else
				strengthenBox.style.marginTop = "0.5em";
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
				strengthenBox.style.width = "calc(100% - 119px)";	
			}
		}
	}

	let numSkillsToBeStrengthened = needsStrengthening[0].length + needsStrengthening[1].length;

	strengthenBox.textContent = "";

	if (!cracked)
	{
		strengthenBox.textContent +=
		`
			Your tree has ${numSkillsToBeStrengthened} 
			${(needsStrengthening[0].length + needsStrengthening[1].length != 1) ? " skills that need": " skill that needs"}
			strengthening:
		`;
	}
	else
	{
		strengthenBox.textContent +=
		`
			Your tree has ${numSkillsToBeStrengthened} 
			${(needsStrengthening[0].length + needsStrengthening[1].length != 1) ? " skills that are": " skill that is"}
			cracked:
		`;
	}

	strengthenBox.appendChild(document.createElement("br"));

	let numSkillsToShow = Math.min(numSkillsToBeStrengthened, (!cracked)?options.needsStrengtheningListLength:options.crackedSkillsListLength);
	for (let i = 0; i < numSkillsToShow - 1; i++)
	{
		let skillLink = document.createElement("a");
		skillLink.style.color = "blue";
		if (i < needsStrengthening[0].length)
		{
			// index is in normal skill range
			const skill = needsStrengthening[0][i];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}` +
			                 `${(skill.skill_progress.level == 5 ||
							     options.practiceType == "1" ||
							     (options.practiceType == "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
							    ) ? "/practice":""}`;
			skillLink.textContent = skill.title;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = i - needsStrengthening[0].length;
			const skill = needsStrengthening[1][bonusSkillIndex];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.title;
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
		skillLink.style.color = "blue";
		// we are showing every skill that needs to be stregnthened.
		if (needsStrengthening[1].length > 0)
		{
			// last skill to be displayed is a bonus skill
			const skill = needsStrengthening[1][needsStrengthening[1].length -1];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.title;
		} else
		{
			// last skill to be displayed is a normal skill
			const skill = needsStrengthening[0][needsStrengthening[0].length -1];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}` +
			                 `${(skill.skill_progress.level == 5 ||
								 options.practiceType == "1" ||
								 (options.practiceType == "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
							    )? "/practice":""}`;
			skillLink.textContent = skill.title;
		}
		
		strengthenBox.appendChild(skillLink);
	}
	else
	{
		// some skills that need to be strengthened are not being shown, so the last one we are showing is just the next one in the order we have
		const skillLink = document.createElement("a");
		skillLink.color = "blue";
		let lastIndexToBeShown = numSkillsToShow - 1; // the last for loop ended with i = numSkillsToShow - 2
		if (lastIndexToBeShown < needsStrengthening[0].length)
		{
			// index is in normal skill range
			const skill = needsStrengthening[0][lastIndexToBeShown];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}` +
			                 `${(skill.skill_progress.level == 5 ||
							     options.practiceType == "1" ||
								 (options.practiceType == "2" && skill.skill_progress.level.toString() >= options.lessonThreshold)
							    )? "/practice":""}`;
			skillLink.textContent = skill.title;
		} else
		{
			// index has past normal skills so doing bonus skills now.
			let bonusSkillIndex = lastIndexToBeShown - needsStrengthening[0].length;
			const skill = needsStrengthening[1][bonusSkillIndex];

			skillLink.href = `/skill/${languageCode}/${skill.url_title}${(skill.skill_progress.level == 1)? "/practice":""}`;
			skillLink.textContent = skill.title;
		}
		strengthenBox.appendChild(skillLink);
		strengthenBox.appendChild(document.createTextNode(", "));
		
		let numSkillsLeft = numSkillsToBeStrengthened - numSkillsToShow;

		// Add a clickable element to show more skills in the list.
		// We are going to add on another needsStrengtheningListLength number of skills to the list, but as we are going to change this amount to lengthen the list, we need to original saved in storage.
	 	chrome.storage.sync.get("options", function (data)
	 	{
			let numExtraSkillsOnShowMore = Math.min(numSkillsLeft, (!cracked)?data.options.needsStrengtheningListLength:data.options.crackedSkillsListLength);

			let showMore = document.createElement("a");
			showMore.style.color = "blue";
			showMore.textContent = numSkillsLeft + " more...";
			showMore.href = "";

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

	const firstSkillLink = strengthenBox.getElementsByTagName("A")[0];
	firstSkillLink.addEventListener('focus',
		function(event)
		{
			event.target.style.fontWeight = 'bold';
			event.target.style.textDecoration = 'underline';
		}
	);

	firstSkillLink.addEventListener('blur',
		function(event)
		{
			event.target.style.fontWeight = 'normal';
			event.target.style.textDecoration = 'none';
		}
	);
	
	if(needToAddBox)
	{
		topOfTree.appendChild(strengthenBox);
	}

	if (options.focusFirstSkill) firstSkillLink.focus();
}

function addPractiseButton(skillPopout)
{
	if (skillPopout == null)
		return false;

	const startButton = document.querySelector(`[data-test="start-button"]`);
	startButton.textContent = "START LESSON";

	const startButtonContainer = startButton.parentNode;

	const practiseButtonContainer = startButtonContainer.cloneNode(true);
	practiseButtonContainer.style.marginTop = "0.5em";

	const practiseButton = practiseButtonContainer.firstChild;
	practiseButton.textContent = "Practise";
	practiseButton.title = "Practising this skill will strengthen it, but will not contribute any progress towards earning the next crown.";
	practiseButton.attributes["data-test"].value = "practise-button";

	skillTitle = skillPopout.parentNode.querySelector("span").textContent;
	urlTitle = userData.language_data[languageCode].skills.filter(skill => skill.short == skillTitle)[0].url_title;
	practiseButton.addEventListener("click", (event) => {
		window.location = `/skill/${languageCode}/${urlTitle}/practice`;
	});

	startButtonContainer.parentNode.insertBefore(practiseButtonContainer, startButtonContainer.nextSibling);
}

function getCrackedSkills()
{
	const crackedSkillElements = Array.from(document.querySelectorAll(CRACKED_SKILL_OVERLAY));
	const crackedSkillNames = crackedSkillElements.map(
		(crackedSkill) => {
			const skillIcon = crackedSkill.parentNode;
			const skillContainer = skillIcon.parentNode.parentNode.parentNode;
			const skillName = skillContainer.lastChild.lastChild.textContent;

			return skillName;
		}
	);

	const crackedSkills = [
		userData.language_data[languageCode].skills.filter(skill => crackedSkillNames.includes(skill.short)),
		userData.language_data[languageCode].bonus_skills.filter(skill => crackedSkillNames.includes(skill.short)),
	];

	crackedSkillElements.forEach(
		(crackedSkillOverlay) => {
			const parentElement = crackedSkillOverlay.parentNode;
			childListObserver.observe(parentElement, {childList: true});
		}
	)

	return crackedSkills;
}

function getLanguagesInfo()
{
	languages = userData.languages.filter(language => language.learning);
	
	languagesInfo = languages.map(language => [
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

function displayCrownsBreakdown()
{
	if (Object.entries(userData).length == 0)
		return false;

	let skills = userData.language_data[languageCode].skills; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	let bonusSkills = userData.language_data[languageCode].bonus_skills;

	let crownLevelCount = [Array(6).fill(0),Array(2).fill(0)]; // will hold number skills at each crown level, index 0 : crown 0 (not finished), index 1 : crown 1, etc.

	for (let skill of skills)
	{
		crownLevelCount[0][skill.skill_progress.level]++;
	}

	for (let bonusSkill of bonusSkills)
	{
		crownLevelCount[1][bonusSkill.skill_progress.level]++;
	}

	let maxCrownCount = skills.length*5 + bonusSkills.length;

	let treeLevel = crownTreeLevel();

	let crownLevelContainer;
	if (inMobileLayout)
		crownLevelContainer = document.getElementsByClassName(CROWN_POPUP_CONTAINER)[1];
	else
		crownLevelContainer = document.getElementsByClassName(CROWN_POPUP_CONTAINER)[0];

	if (!inMobileLayout)
	{
		crownLevelContainer.style =
		`
			flex-wrap: wrap;
			justify-content: center;
			overflow-y: auto;
			max-height: calc(100vh - ${(70+20)}px);
		`;
	}
	else
	{
		crownLevelContainer.style =
		`
			flex-wrap: wrap;
			justify-content: center;
		`;

		crownLevelContainer.parentNode.style =
		`
			overflow-y: auto;
			max-height: calc(100vh - ${(58+90)}px);
		`;
	}
	let crownLogoContainer = document.getElementsByClassName(CROWN_LOGO_CONTAINER)[inMobileLayout? 1 : 0];
	let crownDescriptionContainer = document.getElementsByClassName(CROWN_DESCRIPTION_CONTAINER)[inMobileLayout ? 1 : 0];

	crownLogoContainer.style.transform = 'scale(1.7)';
	crownDescriptionContainer.style.width = '50%';

	let crownTotalContainer;
	crownTotalContainer = crownLevelContainer.getElementsByClassName(CROWN_TOTAL_CONTAINER)[0];


	let maximumCrownCountContainer;
	if (options.crownsMaximum)
	{
		crownTotalContainer.style.fontSize = "15px";

		maximumCrownCountContainer = document.createElement("span");
		maximumCrownCountContainer.id = "maxCrowns";
		maximumCrownCountContainer.textContent = "/" + maxCrownCount;
	}

	// Add crowns progress graph
	if (options.crownsGraph && crownTreeLevel() != 5)
	{
		let crownsEarnedInWeek = [];
		// will hold number of crowns earned each day for seven days
		// crownsEarnedInWeek[0] : week ago;
		// crownsEarnedInWeek[6] : today;

		let dateToday = (new Date()).setHours(0,0,0,0);
		let msInDay = 24*60*60*1000;
		
		let day = dateToday;
		let i = progress.length - 1; // used to index into progress
		while (day > dateToday - 7*msInDay && i > 0)
		{
			// Loop through the last week backwards.
			// Also stop if we run out of progress entries to use.

			if (progress[i][0] == day)
			{
				// If there is progress for the day we are testing
				// prepend the array with the change in number of crowns left
				// compared to the previous progress entry

				crownsEarnedInWeek.unshift(progress[i-1][2] - progress[i][2]);
				i--;

				if (progress[i][0] == day)
				{
					// If the previous progress entry is from the same day
					// a level boundary was crossed.
					// This progress entry then holds the number of crowns left
					// at the time of getting to the next crown level.

					// We then add the remaining number of crowns from the previous
					// progress entry that must have been earned to level up
					//
					crownsEarnedInWeek[0] = crownsEarnedInWeek[0] + progress[i-1][2];
					i--;
				}
			}
			else
			{
				// The progress entry isn't for the day we are testing,
				// so no crowns were earned on that day.

				crownsEarnedInWeek.unshift(0);

				// Note we don't decrement i as we haven't used the info in this
				// progress entry.
			}
			
			// decrement the timestamp by a day
			day = day - msInDay;
		}

		while (crownsEarnedInWeek.length != 7)
		{
			// If we ran out of progress entries for a whole week
			// we will fill the rest with zeros.

			crownsEarnedInWeek.unshift(0);
		}


		// Generate a graph for the data.
		let graph = graphSVG(crownsEarnedInWeek);
		graph.width = "100%";
		graph.style.margin = "0 1em";

		crownLevelContainer.appendChild(graph);
	}

	// Add breakdown table

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
	treeLevelContainer.textContent = treeLevel;

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
	crownImg.alt = "crown";
	// Class name _2PyWM used for other small crowns on skills. Corresponds to height & width 100% and z-index 1.
	crownImg.style =
	`
		height: 100%;
		width: 100%;
		z-index: 1;
	`;
	crownImg.src = "//d35aaqx5ub95lt.cloudfront.net/images/juicy-crown.svg"; // old crown img: "//d35aaqx5ub95lt.cloudfront.net/images/crown-small.svg";

	imgContainer.appendChild(crownImg);
	imgContainer.appendChild(levelContainer);

	if(document.getElementsByClassName("crownLevelItem").length == 0) // We haven't added the breakdown data yet, so let's add it.
	{
		if (options.crownsMaximum) crownTotalContainer.appendChild(maximumCrownCountContainer);

		breakdownContainer.appendChild(document.createElement("p"));
		breakdownContainer.lastChild.style = "text-align: center; color: black;";
		breakdownContainer.lastChild.textContent = "Your tree is at Level\xA0";
		breakdownContainer.lastChild.appendChild(treeLevelContainer);

		for (let crownLevel = 0; crownLevel < crownLevelCount[0].length; ++crownLevel)
		{
			let skillCount = crownLevelCount[0][crownLevel];

			if (!options.crownsBreakdownShowZerosRows && skillCount == 0)
				continue;

			let crownCount = skillCount * crownLevel;
		
			imgContainer.lastChild.id = "crownLevel" + crownLevel + "Count";
			imgContainer.lastChild.textContent = crownLevel;

			let breakdownListItem = document.createElement("li");
			breakdownListItem.className = "crownLevelItem";
			breakdownListItem.style =
			`
				display: grid;
				align-items: center;
				justify-items: right;
				grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;
			`;

			const skillCountSpan = document.createElement("span");
			skillCountSpan.textContent = skillCount;
			breakdownListItem.appendChild(skillCountSpan);

			const skillsAtSpan = document.createElement("span");
			skillsAtSpan.textContent = `skill${skillCount == 1 ? "" : "s"} at`;
			skillsAtSpan.style.justifySelf = "center";
			breakdownListItem.appendChild(skillsAtSpan);

			breakdownListItem.appendChild(imgContainer);
			imgContainer = imgContainer.cloneNode(true);

			breakdownListItem.appendChild(document.createTextNode("="));
			
			const crownCountSpan = document.createElement("span");
			crownCountSpan.textContent = crownCount;
			breakdownListItem.appendChild(crownCountSpan);

			const crownsSpan = document.createElement("span");
			crownsSpan.textContent = `crown${(crownCount == 1 )?"":"s"}`;
			breakdownListItem.appendChild(crownsSpan);

			breakdownList.appendChild(breakdownListItem);
		}


		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			// The tree has some bonus skills so let's display a breakdown of their crown levels.
			let bonusSkillsBreakdownHeader = document.createElement("h3");
			bonusSkillsBreakdownHeader.textContent = "Bonus Skills";
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
			
				imgContainer.lastChild.id = "bonusSkillCrownLevel" + crownLevel + "Count";
				imgContainer.lastChild.textContent = crownLevel;

				let breakdownListItem = document.createElement("li");
				breakdownListItem.className = "crownLevelItem";
				breakdownListItem.style =
				`
					display: grid;
					align-items: center;
					justify-items: right;
					grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;
				`;
				
				const skillCountSpan = document.createElement("span");
				skillCountSpan.textContent = skillCount;
				breakdownListItem.appendChild(skillCountSpan);

				const skillsAtSpan = document.createElement("span");
				skillsAtSpan.textContent = `skill${skillCount == 1 ? "" : "s"} at`;
				skillsAtSpan.style.justifySelf = "center";
				breakdownListItem.appendChild(skillsAtSpan);

				breakdownListItem.appendChild(imgContainer);
				imgContainer = imgContainer.cloneNode(true);

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
				crownLevelContainer.style.marginBottom = "1em";
				return false;
			}

			prediction.id = "treeCrownLevelPrediction";
			prediction.appendChild(
				document.createTextNode(`At your current rate your tree will reach Level\xA0${treeLevel + 1} in `)
			);
			prediction.appendChild(document.createElement("span"));
			prediction.lastChild.textContent = numDays;
			prediction.lastChild.style.fontWeight = "bold";
			prediction.appendChild(
				document.createTextNode(` days, on `)
			);
			prediction.appendChild(document.createElement("span"));
			prediction.lastChild.textContent = new Date((new Date()).setHours(0,0,0,0) + numDays*24*60*60*1000).toLocaleDateString();
			prediction.lastChild.style.fontWeight = "bold";

			prediction.style =
			`
				margin: 1em;
				text-align: center;
				color: black;
			`;

			if (options.crownsPrediction) crownLevelContainer.appendChild(prediction);
		}
	}
	else
	{
		// We have already added the breakdown data, just update it.

		for (let crownLevel = 0; crownLevel < crownLevelCount[0].length; crownLevel++)
		{
			let levelContainerElement = document.getElementById("crownLevel" + crownLevel + "Count");
			levelContainerElement.textContent = crownLevel;
		}
		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			for(let crownLevel = 0; crownLevel < crownLevelCount[1].length; crownLevel++)
			{
				let levelContainerElement = document.getElementById("bonusSkillCrownLevel" + crownLevel + "Count");
				levelContainerElement.textContent = crownLevel;
			}
		}

		document.getElementById("maxCrowns").textContent = "/" + maxCrownCount;
		document.getElementById("treeLevel").textContent = treeLevel;
	}
}

function displayXPBreakdown()
{
	if (Object.entries(userData).length == 0
		|| (document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER).length === 0 && document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER).length === 0))
		return false;
	
	let data =
		{
			'language_string':	userData.language_data[languageCode].language_string,
			'level_progress':	userData.language_data[languageCode].level_progress,
			'level':			userData.language_data[languageCode].level,
			'level_points':		userData.language_data[languageCode].level_points,
			'points':			userData.language_data[languageCode].points,
			'history':			userData.language_data[languageCode].calendar,
			//'timezone':			userData.timezone_offset seems to not be available for every users, maybe depends on platform use.
		};

	let levelProgressPercentage = (data.level_progress*100)/(data.level_points);

	if(document.getElementById("XPBox") == null)
	{
		// We haven't made the XP Box yet

		let container = document.createElement("div");
		container.id = "XPBox";
		container.style = 
		`
			margin-top: 1em;
			color: black;
		`;

		let XPHeader = document.createElement("h2");
		XPHeader.textContent = data.language_string+ " XP";

		let languageLevelContainer = document.createElement("div");

		languageLevelContainer.appendChild(XPHeader);

		let languageLevelElement = document.createElement("p");
		languageLevelElement.id = "xpTotalAndLevel";
		languageLevelElement.textContent = "Level " + data.level;
		languageLevelElement.style =
		`
			font-size: 175%;
			font-weight: bold;
			text-align: center;
			color: ${ORANGE};
		`;

		let languageXPElement = document.createElement("span");
		languageXPElement.textContent = data.points + " XP - ";
		languageXPElement.style =
		`
			color: black;
			font-weight: normal;
		`;
		
		languageLevelElement.insertBefore(languageXPElement, languageLevelElement.childNodes[0]);
		languageLevelContainer.appendChild(languageLevelElement);
		if (options.XPBreakdown) container.appendChild(languageLevelContainer);
		
		if (data.level != 25)
		{
			let nextLevelProgressElement = document.createElement("p");
			nextLevelProgressElement.style =
			`
				text-align: center;
				margin-bottom: 0;
			`;
			nextLevelProgressElement.textContent = `${data.level_points - data.level_progress} XP till Level ${data.level+1}`;

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
			currentLevelProgressElement.textContent = `(${data.level_progress}/${data.level_points} XP - ${Number(levelProgressPercentage).toFixed(1)}%)`;

			languageLevelContainer.appendChild(nextLevelProgressElement);
			languageLevelContainer.appendChild(languageLevelProgressBarContainer);
			languageLevelContainer.appendChild(currentLevelProgressElement);


			let daysLeft = daysToNextXPLevel(data.history, data.level_points-data.level_progress);
			let projectedNextLevelCompletion = document.createElement("p");
			projectedNextLevelCompletion.style =
			`
				margin-bottom: 0;
				text-align: center;
			`;
			projectedNextLevelCompletion.appendChild(
				document.createTextNode(
					`At your current rate you will reach the next level, Level\xA0${data.level+1}, in about `
				)
			);
			projectedNextLevelCompletion.appendChild(document.createElement("span"));
			projectedNextLevelCompletion.lastChild.id = "XPPrediction";
			projectedNextLevelCompletion.lastChild.style.fontWeight = "bold";
			projectedNextLevelCompletion.lastChild.textContent = daysLeft;

			projectedNextLevelCompletion.appendChild(
				document.createTextNode(
					` days, on `
				)
			);
			
			projectedNextLevelCompletion.appendChild(document.createElement("span"));
			projectedNextLevelCompletion.lastChild.id = "XPPredictionDate";
			projectedNextLevelCompletion.lastChild.textContent = (new Date((new Date()).setHours(0,0,0,0) + daysLeft*24*60*60*1000)).toLocaleDateString();
			
			if (daysLeft != -1 && options.XPPrediction)
			{
				container.appendChild(projectedNextLevelCompletion);
			}
		}
		else
		{
			// Reached max level
			let maxLevelMessage = document.createElement("p");
			maxLevelMessage.textContent = "You have reached the maximum level!";
			languageLevelContainer.appendChild(maxLevelMessage);
		}
		
		if (document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER).length != 0)
		{
			// If there is a Daily Goal box in the sidebar put the breakdown in that.
			document.getElementsByClassName(DAILY_GOAL_SIDEBAR_CONATINER)[0].appendChild(container);
		}
		else if (document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER).length != 0)
		{
			// Otherwise if there is a Daily Goal box pop-up box, put the breakdown in that.
			if (inMobileLayout)
				document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER)[1].appendChild(container);
			else
				document.getElementsByClassName(DAILY_GOAL_POPUP_CONTAINER)[0].appendChild(container);
			
			if(!inMobileLayout)
			{
				container.parentNode.style =
				`
					overflow-y: auto;
					max-height: calc(100vh - ${(58+90)}px);
				`;
			}
			else
			{
				container.parentNode.parentNode.style =
				`
					overflow-y: auto;
					max-height: calc(100vh - ${(58+90)}px);
				`;
			}
		}
		else
		{
			// Neither is about so we just don't do anything. Shouldn't get to this point as we should have exited the function at the start.
		}
	}
	else
	{
		// We already have the XP Box, let's just update the values, if we want a breakdown.
		if (options.XPBreakdown)
		{
			let languageLevelElement = document.getElementById("xpTotalAndLevel");
			let languageXPElement = languageLevelElement.childNodes[0];
			languageXPElement.textContent = data.points + " XP - ";
			languageLevelElement.textContent = "Level " + data.level;
			languageLevelElement.insertBefore(languageXPElement,languageLevelElement.childNodes[0]);
			
			if (languageLevelElement.nextSibling != null)
			{
				// Wasn't level 25 ...
				if (data.level != 25)
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
					nextLevelProgressElement.textContent = `${data.level_points - data.level_progress} XP till Level ${data.level+1}`;

					let currentLevelProgressElement = languageLevelProgressBarContainer.nextSibling;
					currentLevelProgressElement.textContent =
					`
						(${data.level_progress}/${data.level_points} XP - ${Number(levelProgressPercentage).toFixed(1)}%)
					`;

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
					maxLevelMessage.textContent = "You have reached the maximum level!";
					languageLevelElement.parentNode.appendChild(maxLevelMessage);
				}
			}
		}
		if (options.XPPrediction && document.getElementById("XPPredicition")!= null)
		{
			let daysLeft = daysToNextXPLevel(data.history, data.level_points-data.level_progress);
			document.getElementById("XPPrediction").textContent = daysLeft;
			document.getElementById("XPPredictionDate").textContent = (new Date((new Date()).setHours(0,0,0,0) + daysLeft*24*60*60*1000)).toLocaleDateString();
		}
	}
}

function displayLanguagesInfo(languages)
{
	let languagesBox = document.getElementById("languagesBox");

	if (languagesBox != null)
	{
		// We already have a languagesBox.
	
		if (languagesBox.querySelectorAll("tr").length == languages.length + 1)
		{	
			// Number of languages is unchanged, just update the data.
			for (languageInfo of languages)
			{
				const tableRow = document.getElementById(`${languageInfo[0]}Row`);
				const tableDataElements = tableRow.querySelectorAll("td");

				languageInfo.forEach(
					(data, index) => {
						const tableData = tableDataElements[index];
						tableData.textContent = data;
					}
				);
			}
		}
		else
		{
			// Number of languages has changed, need to repopulate table.
			const table = document.getElementById("languagesTable");
			tableRowElements = languagesTable.querySelectorAll("table > tr");

			// Clear current table
			tableRowElements.forEach(row => table.removeChild(row));

			// Add new rows
			languages.forEach(
				(languagesInfo, index) => {
					const tableRow = document.createElement("TR");
					tableRow.id = `${languageInfo[0]}Row`;
					tableRow.style.backgroundColor = (index %2) ? "#f0f0f0" : "";
					table.appendChild(tableRow);

					languageInfo.forEach(
						(data) => {
							const tableData = document.createElement("TD");
							tableData.style.padding = "0";
							tableData.textContent = data;
							tableRow.appendChild(tableData);
						}
					);
				}
			);
		}
	}
	else
	{
		// Need to make a languagesBox.
		
		languagesBox = document.createElement("DIV");
		languagesBox.id = "languagesBox";
		languagesBox.className = WHITE_SIDEBAR_BOX_CONTAINER;
		
		const heading = document.createElement("H2");
		heading.textContent = "Languages Info";
		languagesBox.appendChild(heading);

		const table = document.createElement("TABLE");
		table.id = "languagesTable";
		languagesBox.appendChild(table);

		const tableHead = document.createElement("THEAD");
		table.appendChild(tableHead);
		const tableHeadRow = document.createElement("TR");
		tableHeadRow.style.borderBottom = "1px solid black";
		tableHead.appendChild(tableHeadRow);
		
		const tableHeading = document.createElement("TH");
		tableHeading.style.padding = "0";

		tableHeading.textContent = "Language";
		tableHeading.style.width = "30%";
		tableHeadRow.appendChild(tableHeading.cloneNode(true));
		
		tableHeading.textContent = "Level";
		tableHeading.style.width = "20%";
		tableHeadRow.appendChild(tableHeading.cloneNode(true));

		tableHeading.textContent = "Total XP";
		tableHeading.style.width = "25%";
		tableHeadRow.appendChild(tableHeading.cloneNode(true));

		tableHeading.textContent = "XP to Next Level";
		tableHeading.style.width = "25%";
		tableHeadRow.appendChild(tableHeading.cloneNode(true));

		languages.forEach(
			(languageInfo, index) => {
				const tableRow = document.createElement("TR");
				tableRow.id = `${languageInfo[0]}Row`;
				tableRow.style.backgroundColor = (index %2) ? "#f0f0f0" : "";
				table.appendChild(tableRow);

				languageInfo.forEach(
					(data) => {
						const tableData = document.createElement("TD");
						tableData.style.padding = "0";
						tableData.textContent = data;
						tableRow.appendChild(tableData);
					}
				);
			}
		);

		// Add the new side bar box to the page
		const sidebar = document.querySelector(`.${SIDEBAR}`);
		const dailyGoalBox = sidebar.querySelector(`.${DAILY_GOAL_SIDEBAR_CONATINER}`);

		sidebar.insertBefore(languagesBox, dailyGoalBox.nextSibling);
	}
}

function displaySuggestion(skills, fullyStrengthened, noCrackedSkills)
{
	// let skillTree;
	// let firstSkillRow

	let topOfTree;
	if (
			document.getElementsByClassName(TREE_CONTAINER).length != 0 &&
			document.getElementsByClassName(SKILL_ROW).length != 0 &&
			(
				document.getElementsByClassName(TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_NEW).length != 0 ||
				document.getElementsByClassName(MOBILE_TOP_OF_TREE).length != 0 ||
				document.getElementsByClassName(TOP_OF_TREE_WITH_IN_BETA).length != 0
			)
		) // Has the tree loaded from a page change
	{
		/* currently unused
		skillTree = document.getElementsByClassName(TREE_CONTAINER)[0];
		firstSkillRow = document.getElementsByClassName(SKILL_ROW)[0];
		*/
		topOfTree = document.getElementsByClassName(TREE_CONTAINER)[0].firstChild;
	}
	else
	{
		// body hasn't loaded yet so element not there, let's try again after a small wait, but only if we are still on the main page.
		if(onMainPage)
		{
			setTimeout(function(){displaySuggestion(skills, fullyStrengthened, noCrackedSkills);}, 50);
		}
		else
		{
			// swtiched away before we got a chance to try again.
		}
		return false;
	}

	topOfTree.style.height = "auto";
	topOfTree.style.width = "100%";

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
			topOfTree.getElementsByClassName(IN_BETA_LABEL)[0].style.position = 'relative';
			if (inMobileLayout)
				container.style.marginTop = "1.5em";
			else
				container.style.marginTop = "0.5em";
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
				container.style.width = "calc(100% - 119px)";
			}
		}
		let treeLevel = crownTreeLevel();
		let skillsByCrowns = [[],[],[],[],[],[]];

		for (let skill of skills)
		{
			skillsByCrowns[skill.skill_progress.level].push(skill);
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
		link.href = "/skill/" + languageCode + "/" + randomSuggestion.url_title + ((treeLevel == 5) ? "/practice/" : "/");
		link.textContent = randomSuggestion.title;
		link.style.color = 'blue';
		link.addEventListener('focus',
			function(event)
			{
				event.target.style.fontWeight = 'bold';
				event.target.style.textDecoration = 'underline';
			}
		);

		link.addEventListener('blur',
			function(event)
			{
				event.target.style.fontWeight = 'normal';
				event.target.style.textDecoration = 'none';
			}
		);
		
		let suggestionMessage = document.createElement("p");
		if (treeLevel == 5)
		{
			let messageText = `Your ${language} tree is `
			if (fullyStrengthened)
				messageText += `fully strengthened and `;
			
			messageText += `at Level 5`;

			if (noCrackedSkills)
				messageText += ` with no cracked skills`;

			messageText += `! Why not do a `;

			suggestionMessage.textContent = messageText;

			suggestionMessage.appendChild(document.createElement("a"));
			suggestionMessage.lastChild.href = "/practice";
			suggestionMessage.lastChild.style.color = "blue";
			suggestionMessage.lastChild.textContent = "general practice";
		}
		else if (treeLevel == 0)
		{
			// Tree not finished, so suggest the next skill that is not yet been completed.
			let nextSkill = skillsByCrowns[0][0];
			
			if (fullyStrengthened && noCrackedSkills)
				suggestionMessage.textContent = `All the skills that you have learnt so far are fully Strengthened, and none are cracked. `;
			else if (fullyStrengthened)
				suggestionMessage.textContent = `All the skills that you have learnt so far are fully strengthened. `;
			else if (noCrackedSkills)
				suggestionMessage.textContent = `None of the skills that you have learnt so far are cracked. `

			if (nextSkill.locked)
			{
				// The next skill is locked, so a checkpoint test is needed.
				let checkpointNumber;
				const checkpoints = document.querySelectorAll(`[data-test="checkpoint-badge"]`);
				checkpoints.forEach(
					(checkpoint, index) =>
					{
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
				// The next skil is unlocked so lets suggest it.
				link.href = `/skill/${languageCode}/${nextSkill.url_title}/`;
				link.textContent = nextSkill.title;

				suggestionMessage.textContent += "The next skill to learn is: ";
			}
			
			suggestionMessage.appendChild(link);
		}
		else
		{
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

		topOfTree.appendChild(container);

		if (options.focusFirstSkill) link.focus();
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
	
	languageCode = Object.keys(userData.language_data)[0]; // only one child of 'language_data', a code for active language.

	let skills = userData.language_data[languageCode].skills; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	let bonusSkills = userData.language_data[languageCode].bonus_skills;

	function sortSkills(skill1,skill2)
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
	}

	skills.sort(sortSkills);
	bonusSkills.sort(sortSkills);

	for (let skill of skills)
	{
		strengths[0].push([skill.strength,Boolean(skill.skill_progress.level)]);
		if(skill.strength != 1 && skill.strength != 0 && skill.skill_progress.level != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[0].push(skill);
		}
	}

	for (let bonusSkill of bonusSkills)
	{
		strengths[1].push([bonusSkill.strength,Boolean(bonusSkill.skill_progress.level)]);
		if(bonusSkill.strength != 1 && bonusSkill.strength != 0 && bonusSkill.skill_progress.level != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}
	}

	const crackedSkills = getCrackedSkills();

	if (options.strengthBars) addStrengths(strengths); // call function to add these strengths under the skills
	
	if (options.XPInfo) displayXPBreakdown();

	if (options.languagesInfo) displayLanguagesInfo(getLanguagesInfo());

	const fullyStrengthened = (needsStrengthening[0].length + needsStrengthening[1].length) == 0;
	const noCrackedSkills = (crackedSkills[0].length + crackedSkills[1].length) == 0;

	if (options.needsStrengtheningList && !fullyStrengthened)
		displayNeedsStrengthening(needsStrengthening); // Not fully strengthened and the list is enabled.
	else
		removeNeedsStrengtheningBox(); // Remove if there happens to be one.

	if (options.crackedSkillsList && !noCrackedSkills)
		displayNeedsStrengthening(crackedSkills, true); // There are cracked skills and the list is enabled.
	else
		removeCrackedSkillsList(); // Remove if there happens to be one.

	if (
		(fullyStrengthened && noCrackedSkills) ||
		(!fullyStrengthened && !options.hideSuggestionNonStrengthened) ||
		(!noCrackedSkills && !options.hideSuggestionsWithCrackedSkills)
	)
	{
		// Either a fully strengthened tree, or
		// Not fully strengthened but still show suggestion, or
		// There are cracked skills but still show suggestion
		
		if (options.skillSuggestion)
			displaySuggestion(skills, fullyStrengthened, noCrackedSkills);
		else
			removeSuggestion(); // if there happens to be one
	}
	else
	{
		// Should not be displaying a suggestion.
		removeSuggestion() // if there happens to be one
	}

	if (options.practiseButton)
	{
		// Add each skill to childListObserver
		document.querySelectorAll(`.${SKILL_CONTAINER}`).forEach(
			(skill) => {
				childListObserver.observe(skill, {childList: true});
			}
		);
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
					document.getElementById('userData${requestID}').textContent = "//" + xmlHttp.responseText;		
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
	xhrScript.textContent = code;
	document.body.appendChild(xhrScript);

	function checkData(id)
	{
		let dataElem = document.getElementById('userData' + id);
		if (dataElem.textContent == '')
		{
			setTimeout(()=>checkData(id), 50);
		}
		else
		{
			let newData  = dataElem.textContent.slice(2);
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
	let newDataLanguageCode = Object.keys(userData.language_data)[0];
	let newDataLanguageString = userData.language_data[newDataLanguageCode].language_string;

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

function hideTranslationText(reveal = false, setupObserver = true)
{
	if (document.getElementsByClassName(QUESTION_CONTAINER).length == 0)
		return false;
	const questionContainer = document.getElementsByClassName(QUESTION_CONTAINER)[0];
	const questionTypeString = questionContainer.firstChild.getAttribute("data-test");

	if (questionTypeString != null && questionTypeString.includes("translate"))
	{
		// Translate type question
		const challengeTranslatePrompt = questionContainer.querySelector('[data-test="challenge-translate-prompt"]');
		
		if (challengeTranslatePrompt.querySelectorAll("BUTTON").length != 0)
		{
			// There is an svg in the question sentence which is the speaker button so we are translating from the target to the native language
			const questionArea = questionContainer.firstChild.firstChild;
			if (setupObserver) childListObserver.observe(questionArea, {childList: true});
			
			const hintSentence = challengeTranslatePrompt.querySelector('[data-test="hint-sentence"]');
			

			if (hintSentence.querySelectorAll(NEW_WORD_SELECTOR).length != 0)
				return false; // There is a new word, so we don't want to be hiding this sentence.

			if (options.showTranslationText == false && reveal == false)
			{
				hintSentence.style.filter = "blur(0.3em)";
				hintSentence.onclick = () => {
					hintSentence.style.filter = "unset";
					hintSentence.title = "";
				};
				hintSentence.title = "Click to Show Sentence";

				if (options.revealHotkey)
				{
					hintSentence.tile += " or Press " + options.revealHotkeyCode;
					document.onkeydown = (e) => {
						const hotkeyList = options.revealHotkeyCode.split("+");
						const numKeys = hotkeyList.length;
						if (
							e.key.toUpperCase() == hotkeyList[numKeys-1] &&
							( (hotkeyList.includes("Ctrl") && e.ctrlKey) || !hotkeyList.includes("Ctrl") ) &&
							( (hotkeyList.includes("Shift") && e.shiftKey) || !hotkeyList.includes("Shift") ) &&
							( (hotkeyList.includes("Meta") && e.metaKey) || !hotkeyList.includes("Meta") ) &&
							( (hotkeyList.includes("Alt") && e.altKey) || !hotkeyList.includes("Alt") )
						)
						{
							hideTranslationText(true, false);
						}
					};
				}
			}
			else
			{
				hintSentence.style.filter = "none";
				hintSentence.title = "";
			}

			if (options.showToggleHidingTextButton)
			{
				let enableDisableButton = questionContainer.getElementsByClassName("hideTextEnableDisable");
				if (enableDisableButton.length == 0)
				{
					// No enableDisableButton so make one and add it next to the question header
					const headerContainer = document.createElement("div");
					headerContainer.style =
					`
						width: 100%;
						margin-top: 1em;
						display: flex;
						justify-content: space-between;
						align-items: center;
					`;

					const questionHeader = questionContainer.querySelector(`[data-test="challenge-header"]`);
					questionHeader.style.width = `fit-content`;
					questionHeader.parentNode.insertBefore(headerContainer, questionHeader);
					headerContainer.appendChild(questionHeader);

					enableDisableButton = document.createElement("button");
					enableDisableButton.className = "hideTextEnableDisable";
					enableDisableButton.textContent = options.showTranslationText ? "Enable text hiding" : "Disable text hiding";
					enableDisableButton.style =
					`
						color: white;
						border: 0;
						border-radius: 0.5em;
						padding: 0.4em;
						background-color: ${LIGHT_BLUE};
						box-shadow: 0 0.3em ${DARK_BLUE};
						transition: filter 0.2s;
						filter: brightness(1.0);
					`;
					enableDisableButton.onmouseover = () => {
						enableDisableButton.style.filter = "brightness(1.1)";
					};
					enableDisableButton.onmouseleave = () => {
						enableDisableButton.style.filter = "brightness(1.0)";
						enableDisableButton.style.boxShadow = `0 0.3em ${DARK_BLUE}`;
						enableDisableButton.style.transform = "none";
					};
					enableDisableButton.onmousedown = () => {
						enableDisableButton.style.boxShadow = "none";
						enableDisableButton.style.transform = "translate(0, 0.3em)";
					};
					enableDisableButton.onmouseup = () => {
						enableDisableButton.style.boxShadow = `0 0.3em ${DARK_BLUE}`;
						enableDisableButton.style.transform = "none";

						options.showTranslationText = !options.showTranslationText;
						chrome.storage.sync.set({"options": options});
						hideTranslationText();
					};

					/*
					if (questionArea.querySelectorAll(`[dir="ltr"]`).length > 0)
					{
						// LTR language, button goes to the right
						enableDisableButton.style.float = "right";
						enableDisableButton.style.marginLeft = "1em";
					}
					else if (questionArea.querySelectorAll(`[dir="rtl"]`).length > 0)
					{
						// RTL language, button goes to the left
						enableDisableButton.style.float = "left";
						enableDisableButton.style.marginRight = "1em";
					}
					
					hintSentence.parentNode.insertBefore(enableDisableButton, hintSentence.nextSibling);
					*/

					headerContainer.appendChild(enableDisableButton);
				}
				else
				{
					// There is already an enableDisableButton just update the text and function

					enableDisableButton = enableDisableButton[0];
					enableDisableButton.textContent = options.showTranslationText ? "Enable text hiding" : "Disable text hiding";
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

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
let childListMutationHandle = function(mutationsList, observer)
{
	let rootChildReplaced = false;
	let rootChildContentsReplaced = false;
	let mainBodyReplaced = false
	let mainBodyContentsChanged = false ;
	let popupChanged = false;
	let popupIcon;
	let lessonLoaded = false;
	let lessonQuestionChanged = false;
	let lessonInputMethodChanged = false;
	let skillRepaired = false;
	let skillPopoutAdded = false;
	let skillPopout;
	
	for (let mutation of mutationsList)
	{
		if (mutation.target == rootElem)
			rootChildReplaced = true;
		else if (mutation.target == rootChild)
			rootChildContentsReplaced = true;
		else if (mutation.target == mainBodyContainer)
			mainBodyReplaced = true;
		else if (mutation.target == mainBody)
			mainBodyContentsChanged = true;
		else if (mutation.target.className == POPUP_ICON)
		{
			popupChanged = true;
			popupIcon = mutation.target;
		}
		else if (mutation.target.className == LESSON_MAIN_SECTION && mutation.addedNodes.length != 0)
			lessonLoaded = true;
		else if (mutation.target.parentNode.className == LESSON_MAIN_SECTION && mutation.addedNodes.length != 0)
			lessonQuestionChanged = true;
		else if (mutation.target.parentNode.parentNode.className.includes(QUESTION_CONTAINER))
			lessonInputMethodChanged = true;
		else if (
			mutation.target.attributes.hasOwnProperty("data-test") &&
			mutation.target.attributes["data-test"].value == "skill-icon" &&
			mutation.removedNodes.length == 1 &&
			`.${mutation.removedNodes[0].className}` == CRACKED_SKILL_OVERLAY
		)
			skillRepaired = true;
		else if (
			mutation.target.className == SKILL_CONTAINER &&
			mutation.addedNodes.length != 0 &&
			mutation.target.querySelectorAll(`[data-test="skill-popout"]`)
		)
		{
			skillPopoutAdded = true;
			skillPopout = mutation.target.querySelector(`[data-test="skill-popout"]`);
		}
	}

	if (rootChildReplaced)
	{
		// root child list has changed so rootChild has probably been replaced, let's redefine it.
		rootChild = rootElem.childNodes[0];
		init();
	}
	if (rootChildContentsReplaced)
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
			// Entered a lesson in the normal way, through the skill tree.
			// Need to set up observer on lessonMainSection for when the first question loads

			childListObserver.observe(document.getElementsByClassName(LESSON_MAIN_SECTION)[0], {childList:true});
		}
	}
	if (mainBodyReplaced)
	{
		// mainBodyContainer childlist changed, so the mainBody element must have been replaced.
		mainBody = mainBodyContainer.firstChild;


		// This mainBody element being replaced happens on some page changes, so let's also trigger some page change checks.
		// But also make sure that this page hasn't removed to top bar, if it has just stop.
		if (document.body.contains(topBarDiv))
			classNameMutationHandle(mutationsList, null);
		else
			return false;
	}
	if (mainBodyContentsChanged)
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
				document.getElementById("strengthenBox").style.margin = mobileMargin;
				document.getElementById("strengthenBox").style.width = mobileWidth;
			}
			if (document.getElementById("fullStrengthMessageContainer") != null)
			{
				document.getElementById("fullStrengthMessageContainer").style.margin = mobileMargin;
				document.getElementById("fullStrengthMessageContainer").style.width = mobileWidth;
			}
			
		}
		else
		{
			// There is a sidebar so we are in normal desktop layout.
			inMobileLayout = false;

			if (document.getElementById("strengthenBox") != null)
			{
				document.getElementById("strengthenBox").style.margin = desktopMargin;
				document.getElementById("strengthenBox").style.width = desktopWidth;
				
			}
			if (document.getElementById("fullStrengthMessageContainer") != null)
			{
				document.getElementById("fullStrengthMessageContainer").style.margin = desktopMargin;
				document.getElementById("fullStrengthMessageContainer").style.width = desktopWidth;
			}
			

			// Try and add the XP box again as the sidebar has come back
			if (options.XPInfo) displayXPBreakdown();
			if (options.languagesInfo) displayLanguagesInfo(getLanguagesInfo());
		}
	}
	if (popupChanged)
	{
		// Crown or streak pop up box has appeared or dissapeared.

		if (languageChanged)
		{
			// Language change has still yet to be resolved, let's not display the info as it is likely not for this language.
			return false;
		}
		else if (popupIcon.getElementsByClassName(GOLD_CROWN).length + popupIcon.getElementsByClassName(GREY_CROWN).length != 0) // WZkQ9 for gold crown logo, _3FM63 for grey when at 0 crowns.
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
		if (popupIcon.getElementsByClassName(COLOURED_FLAME).length +  popupIcon.getElementsByClassName(GREY_FLAME).length != 0) // _2ctH6 for coloured flame logo, _27oya for grey when not met day's XP goal.
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
	}
	if (lessonLoaded)
	{
		// Question section loaded.

		// Run check for translation type question
		hideTranslationText();

		// Set up mutation observer for question change
		childListObserver.observe(document.getElementsByClassName(LESSON_MAIN_SECTION)[0].firstChild, {childList:true});
		
		
		// Set up mutation observer for question checked status change
		const lessonBottomSection = document.getElementsByClassName(LESSON_BOTTOM_SECTION)[0];
		classNameObserver.observe(lessonBottomSection.firstChild, {attributes: true});
	}
	if (lessonQuestionChanged)
	{
		// Run check for translation type question

		hideTranslationText();
	}
	if (lessonInputMethodChanged)
	{
		// Need to re run question hiding as the question box has been replaced.

		hideTranslationText(undefined, false);
	}
	if (skillRepaired)
	{
		getStrengths();
	}
	if (skillPopoutAdded)
	{
		if (options.practiseButton) addPractiseButton(skillPopout);
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
	let questionCheckStatusChange = false;
	for (let mutation of mutationsList)
	{
		if (mutation.target.parentNode.parentNode == languageLogo)
		{
			// it was a language change
			languageChanged = true;
			languageChangesPending++;
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
	if (languageChanged)
	{
		// Now we deal with the language change.
		// As the language has just changed, need to wipe the slate clean so no old data is shown after change.
		removeStrengthBars();
		removeNeedsStrengtheningBox();
		removeCrackedSkillsList();
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
		if (topBarDiv.childNodes[0].className.includes(ACTIVE_TAB) || window.location.pathname == "/learn")
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
	
	mainBodyContainer = rootChild.lastChild;
	mainBody = mainBodyContainer.firstChild;
	
	childListObserver.observe(mainBodyContainer, {childList:true}); // Observing for changes to its children to detect if the mainBody element has been replaced.
	childListObserver.observe(mainBody,{childList:true}); // Observing for changes to its children to detect moving between mobile and desktop layout.
	
	if (mainBody.getElementsByClassName(SIDEBAR).length == 0)
		inMobileLayout = true;
	else
		inMobileLayout = false;
	
	if (rootChild.firstChild.className === LOGIN_PAGE)
	{
		// On login page so cannot continue to run rest of init process.
		onMainPage = false;
		return false;
	}
	else
	{
		// should be logged in
		// now test to see if we are in a lesson or not

		if (rootChild.firstChild.className == LESSON)
		{
			// in a lesson
			// we probably got here from a link in the needs strengthenin list

			onMainPage = false;

			const lessonMainSection = document.getElementsByClassName(LESSON_MAIN_SECTION)[0];

			// There is a loading animation inside lessonMainSection before the first question,
			// so let's add a childList mutaion observer to lessonMainSection and run the checks then.

			childListObserver.observe(lessonMainSection, {childList: true});
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

			if (rootChild.childElementCount == 1)
			{
				// no topBarDiv so nothing left to do
				onMainPage = false;
				return false;
			}
			else
			{
				// there is a topBarDiv so we can continue to process the page to workout what to do

				// set username via the href of a link to the profile
				let profileTabHrefParts = document.querySelector("[data-test = \"profile-tab\"]").href.split("/");
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
				classNameObserver.observe(shopNav,{attributes: true}); // Observing to see if class of shopNav changes to tell if we have switched to or from the shop.

				// set up observers for crown and streak nav hovers
				childListObserver.observe(crownNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing crown data.
				childListObserver.observe(streakNav.lastChild,{childList: true}); // Observing to see if pop-up box is created showing streak and XP data.

				if (homeNav.className.includes(ACTIVE_TAB) || window.location.pathname == "/learn")
				{
					// Seems as though the main page is now at /learn and the tab is not active, but we leave the check in case
					// on home page
					onMainPage = true;
				}
				else
					onMainPage = false;

				// need to set up Observer on language logo for language change detection
				// The element that changes on language change is the first grandchild of languageLogo. Note that on over or click this granchild gets a sibling which is the dropdown box.
				classNameObserver.observe(languageLogo.childNodes[0].childNodes[0],{attributes: true});

				/*
				language = document.head.getElementsByTagName("title")[0].textContent.split(" ")[3]; // not sure how well this will work if not using english as the UI language. Needs more work.
				
				language seems to be quite difficult to set on first load, on the white topbar UI, the language as a string is only available embedded in sentences, which may change if the user is using a different language.
				We could use the whole sentence in its place as we really only care about the changes in the lanuage on the whole. However, I don't know how if the language is always embedded in these senteces for all languages.
				

				Instead we will not set it initially and wait for the data to be loaded the first time and take the language string from that.
				*/

				await optionsLoaded;
				if (options.showLeagues)
					document.getElementsByClassName(LEAGUE_TABLE)[0].style.removeProperty('display');
				else
					document.getElementsByClassName(LEAGUE_TABLE)[0].style.display = "none";

				requestData();
			}
		}
	}
}

document.body.onload = init(); // call function to start display sequence on first load

//observer.disconnet(); can't disconnect as always needed while page is loaded.
