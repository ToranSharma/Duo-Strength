GOLD = "rgb(250, 217, 29)"; // "rgb(248, 176, 45)" old gold colour
RED = "rgb(244, 78, 81)"; // "rgb(219, 62, 65)";  old red colour
ORANGE = "rgb(255, 150, 0)";
GREY = "rgb(229, 229, 229)";
var languageCode = "";
var language = "";
var languageChanged = false;
var languageLogo;

var options = Object();
var username = "";
var userData = Object();
var oldUI = false;

var rootElem;
var dataReactRoot;
var topBarDiv;
var topBarMobilePractice;

var onMainPage;

function retrieveOptions()
{
	chrome.storage.sync.get("options", function (data)
	{
		if (Object.entries(data).length === 0)
		{
			// First time using version with options so nothing is set in storage.
			options = 
			{
				"strengthBars":					true,
				"needsStrengtheningList":		true,
				"needsStrengtheningListLength":	"10",
				"skillSuggestion":				true,
				"crownsInfo":					true,
				"crownsMaximum":				true,
				"crownsBreakdown":				true,
				"crownsPrediction":				true,
				"XPInfo":						true,
				"XPBreakdown":					true,
				"XPPrediction":					true
			};
			chrome.storage.sync.set({"options": options});
		}
		else

			options = data.options;
	});
}

function resetLanguageFlags()
{
	// reset to be called after finished successfully displaying everything.
	// need to be ready for a change so we reset them back to false.
	languageChanged = false;
}

function removeStrengthBars()
{
	var bars = document.getElementsByClassName("strengthBarHolder");
	for (var bar of bars)
	{
		bar.parentNode.removeChild(bar);
	}
}

function removeNeedsStrengtheningBox()
{
	var strengthenBox = document.getElementById("strengthenBox");
	if(strengthenBox != null) // could be null if changed from old to new UI and the topOfTree div gets removed.
	{
		strengthenBox.parentNode.removeChild(strengthenBox);
	}
}

function removeCrownsBreakdown()
{
	var maxCrowns = document.getElementById("maxCrowns");
	if(maxCrowns != null) // is null after some language changes.
	{
		maxCrowns.parentNode.removeAttribute("style"); // may need to do this another way for cases where the element is null.
		maxCrowns.parentNode.removeChild(maxCrowns);
	}

	var crownLevelBreakdownContainer = document.getElementById("crownLevelBreakdownContainer");
	if (crownLevelBreakdownContainer != null) crownLevelBreakdownContainer.parentNode.removeChild(crownLevelBreakdownContainer);

	var treeCrownLevelPrediction = document.getElementById("treeCrownLevelPrediction");
	if (treeCrownLevelPrediction != null) treeCrownLevelPrediction.parentNode.removeChild(treeCrownLevelPrediction);
}

function removeXPBox()
{
	var xpBox = document.getElementById("XPBox");
	if (xpBox != null)
	{
		xpBox.parentNode.removeChild(xpBox);	
	}
}

function removeSuggestion()
{
	var suggestionContainer = document.getElementById("fullStrengthMessageContainer");
	if (suggestionContainer != null)
	{
		suggestionContainer.parentNode.removeChild(suggestionContainer);
	}
}

function crownTreeLevel()
{
	var skills = userData['language_data'][languageCode]['skills'];

	var skillsByCrowns = [[],[],[],[],[],[]];

	for (var skill of skills)
	{
		skillsByCrowns[skill['skill_progress']['level']].push(skill);
	}

	var treeLevel = 0;
	var i = 0;
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
	var xpTotal = 0;
	var numDays;
	var firstDate = new Date(history[0].datetime);
	var lastDate;
	for (var lesson of history)
	{
		xpTotal += lesson.improvement;
		date = new Date(lesson.datetime);
		lastDate = date;
	}

	currentDate = new Date(Date.now());

	if ((currentDate-lastDate)/(1000*60*60) > 48)
	{
		// been more than 48 hours between last data point and now, therefore we will use now as the last date as at least one day has been missed.
		lastDate = currentDate;
	}

	var timePeriod = lastDate - firstDate;

	var xpRate = xpTotal/timePeriod // in units of xp/millisecond
	xpRate *= 1000*60*60*24 // now in units of xp/day

	return Math.ceil(xpLeft/xpRate);
}

function daysToNextCrownLevel()
{
	var skills = userData['language_data'][languageCode]['skills'];
	var treeLevel = crownTreeLevel();
	var lessonsToNextCrownLevel = 0;

	for (skill of skills)
	{
		if (skill['locked']) continue;
		
		if (skill['skill_progress']['level'] == treeLevel)
		{
			lessonsToNextCrownLevel += skill['num_sessions_for_level'] - skill['level_sessions_finished'];
		}
	}

	var calendar = userData['language_data'][languageCode]['calendar'];
	var practiceTimes = Array();

	for (lesson of calendar)
	{	
		date = new Date(lesson['datetime']);
		date.setHours(0,0,0,0);
		
		practiceTimes.push(date);
	}

	var numLessons = practiceTimes.length;
	var firstDate = practiceTimes[0]; // assuming sorted acending.
	var lastDate = practiceTimes[numLessons-1];
	var currentDate = new Date();

	if ((currentDate-lastDate)/(1000*60*60) > 48) lastDate = currentDate;

	if (numLessons == 0) return -1;

	var timePeriod = (lastDate - firstDate)/(1000*60*60*24) + 1; // in days
	var lessonRate = numLessons/timePeriod; // in lessons per day

	return Math.ceil(lessonsToNextCrownLevel/lessonRate);
}

function addStrengths(strengths) // Adds strength bars and percentages under each skill in the tree.
{
	/*
		The structure of skill tree is as follows:
		<div class="_2GJb6"> 												<-- container for row of skills, has classes _1H-7I and _1--zr if bonus skill row
			<a class="Af4up" href="javascript:;"> 							<-- container for individuale skill
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

	var skillElements = document.getElementsByClassName('Af4up'); // Af4up is class of skill containing element, may change.
	var skills = Array();
	/*
		Each element of skills array will be an array with the following information:
		0:	skill icon element (unused currently).
		1:	skill name element.
		2:	skill strength between 0 and 1.0.
		3:	display boolean - false if skill at crown 0, true otherwise.
	*/
	var bonusElementsCount = 0;
	for (var i=0; i<skillElements.length; i++)
	{
		var elementContents = [
		 	skillElements[i].childNodes[0].childNodes[0],
		 	skillElements[i].childNodes[0].childNodes[1].getElementsByClassName("_33VdW")[0]
		 ];

		/* old way of finding name element before new containers

		// name is a span element, normally it is the last element but if the skill is clicked then a new div is created with the start lesson button etc below the name plate. So need to find the correct span element.
		for (var spanElement of Array.from(skillElements[i].childNodes[0].getElementsByTagName('span')))
		{
			if (spanElement.parentNode == elementContents[0].parentNode)
			{
				elementContents.push(spanElement);
			}
		}
		*/


		if (skillElements[i].parentNode.classList.contains("_1H-7I") || skillElements[i].parentNode.classList.contains("_1--zr"))
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
	
	var numBarsAdded = 0;
	
	for (var i = 0; i< skills.length; i++)
	{
		var iconElement = skills[i][0];
		var nameElement = skills[i][1];
		var name = nameElement.innerHTML;
		var strength = skills[i][2]*1.0;
		var display = (skills[i][3])? "" : "none";
		
		if(document.getElementsByClassName("strengthBarHolder").length == numBarsAdded) // if we have only the number of bars added this time round, keep adding new ones.
		{
			var strengthBarHolder = document.createElement("div");
			strengthBarHolder.className = "strengthBarHolder";
			strengthBarHolder.style['width'] = "100%";
			strengthBarHolder.style['padding'] = "0 5%";
			strengthBarHolder.style['position'] = "relative";
			strengthBarHolder.style['display'] = display;
			
			nameElement.parentNode.insertBefore(strengthBarHolder, nameElement);

			var strengthBarBackground = document.createElement("div");
			strengthBarBackground.className = "strengthBarBackground";
			strengthBarBackground.style =	"position: absolute;"
										+	"display: inline-block;"
    									+	"width: 67.5%;"
        								+	"height: 1em;"
        								+	"top: 0.15em;"
        								+	"background-color: #e5e5e5;"
        								+	"border-radius: 0.5em;"
        								+	"z-index: 1;";

			var strengthBar = document.createElement("div");
			strengthBar.className = "strengthBar";
			strengthBar.id = name + "StrengthBar";
			strengthBar.style['display'] = "inline-block";
			strengthBar.style['position'] = "relative";
			strengthBar.style['top'] = "0.15em";
			strengthBar.style['width'] = (strength*75)+"%";
			strengthBar.style['height'] = "1em";
			strengthBar.style['backgroundColor'] = (strength == 1.0 ? GOLD : RED);
			strengthBar.style['borderRadius'] = "0.5em";
			strengthBar.style['zIndex'] = "2";
			
			var strengthValue = document.createElement("div");
			strengthValue.className = "strengthValue";
			strengthValue.id = name + "StrengthValue";
			strengthValue.style['display'] = "inline-block";
			strengthValue.style['width'] = ((1-strength)*75+25)+"%";
			strengthValue.style['textAlign'] = "right";
			strengthValue.innerHTML = strength*100 + "%";
			
			strengthBarHolder.appendChild(strengthBarBackground);
			strengthBarHolder.appendChild(strengthBar);
			strengthBarHolder.appendChild(strengthValue);
			
			numBarsAdded ++; // added a bar so increment counter.
			
		} else // we already have the elements made prerviously, just update their values.
		{
			var strengthBar = document.getElementById(name + "StrengthBar");
			strengthBar.style['width'] = (strength*75)+"%";
			strengthBar.style['backgroundColor'] = (strength == 1.0 ? GOLD : RED);
			
			var strengthValue = document.getElementById(name + "StrengthValue");
			strengthValue.style['width'] = ((1-strength)*75+25)+"%";
			strengthValue.innerHTML = strength*100 + "%";

			strengthBar.parentNode.style['display'] = display;
		}
	}
}

function displayNeedsStrengthening(needsStrengthening) // adds clickable list of skills that need strengthening to top of the tree.
{
	/* Old version where newUI had Part headings. Also mAsUf no longer seems to be used.
	var topOfTree;
	if(newUIVersion)
	{
		topOfTree = document.getElementsByClassName('_2GJb6')[0]; // top of tree is first row which has part 1.
		topOfTree.childNodes[0].style['marginBottom'] = "1em"; // reduced margin between part 1 heading an strengthenBox;
	} else
	{
		// old UI version.
		if(document.getElementsByClassName('mAsUf').length != 0)
		{
			// mAsUf is class of the container element just above tree with language name and shop button, may change.
			topOfTree = document.getElementsByClassName('mAsUf')[0].childNodes[1];
		} else
		{
			// body hasn't loaded yet so element not there.
			setTimeout(displayNeedsStrengthening(needsStrengthening), 500);
			return false;
		}
	}
	*/

	// Found as of 2019-03-15 new UI version no longer has Part 1, Part 2 etc. headings
	// Trees seem to be consistant so longer need for newUIversion detection

	if(
			document.getElementsByClassName("i12-l").length != 0 &&
			document.getElementsByClassName("w8Lxd").length != 0 &&
			document.getElementsByClassName("_2GJb6").length != 0
		) // Has the tree loaded from a page change
	{
		/* currently unused
		var skillTree = document.getElementsByClassName("i12-l")[0];
		var firstSkillRow = document.getElementsByClassName("_2GJb6")[0];
		*/
		var topOfTree = document.getElementsByClassName("w8Lxd")[0];
		// or var topOfTree = skillTree.childNodes[0]
	}
	else
	{
		// body hasn't loaded yet so element not there, lets try again after a small wait, but only if we are still on the main page.
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

	topOfTree.style['height'] = "auto";

	if(oldUI)
	{
		// Shop button moved in new UI so only needed if using the UI blue topBar layout.
		shopButtonFloatedDiv = document.createElement("div");
		shopButtonFloatedDiv.id = "shopButtonFloatedDiv";
		shopButtonFloatedDiv.style	= "width: " + document.getElementsByClassName("_1YIzB")[0].offsetWidth + "px;"
									+ "height: " + document.getElementsByClassName("_1YIzB")[0].offsetHeight + "px;"
									+ "float: right;"
									+ "margin-bottom: 0.5em;";
	}
	var strengthenBox; // will be a div to hold list of skills that need strengthenening
	var needToAddBox = false;
	if (document.getElementById("strengthenBox") == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = "strengthenBox";
		strengthenBox.style['textAlign'] = "left";
		strengthenBox.style['marginBottom'] = "2em";
		strengthenBox.style['min-height'] = "3em";
	}
	else
	{
		strengthenBox = document.getElementById("strengthenBox");
	}

	var numSkillsToBeStrengthened = needsStrengthening[0].length + needsStrengthening[1].length;

	strengthenBox.innerHTML = "";
	if (oldUI) strengthenBox.appendChild(shopButtonFloatedDiv);
	
	strengthenBox.innerHTML += "Your tree has " + numSkillsToBeStrengthened +
								((needsStrengthening[0].length + needsStrengthening[1].length != 1) ? " skills that need": " skill needs") +
								" strengthening: <br/>";

	numSkillsToShow = Math.min(numSkillsToBeStrengthened, options.needsStrengtheningListLength);
	for (var i = 0; i < numSkillsToShow - 1; i++)
	{
		if (i < needsStrengthening[0].length)
		{
			// index is in normal skill range
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[0][i]['url_title']
									+	((needsStrengthening[0][i]['skill_progress']['level'] == 5)? "/practice'>":"'>" ) // 5 crown skill DOES decay so note needless
									+	needsStrengthening[0][i]['title']
									+	"</a>, ";
		} else
		{
			// index has past normal skills so doing bonus skills now.
			bonusSkillIndex = i - needsStrengthening[0].length;
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[1][bonusSkillIndex]['url_title']
									+	((needsStrengthening[1][bonusSkillIndex]['skill_progress']['level'] == 1)? "/practice'>":"'>" ) // 1 crown bonus skill does decay but is a practice not lesson.
									+	needsStrengthening[1][bonusSkillIndex]['title']
									+	"</a>, ";
		}
		
	}
	strengthenBox.innerHTML = strengthenBox.innerHTML.substring(0, strengthenBox.innerHTML.length - 2);
	strengthenBox.innerHTML +=	(function ()
								{
									if (numSkillsToShow == numSkillsToBeStrengthened)
										return " & "; // Add & if showing every skill in list as the next one is the very last.
									else if (numSkillsToShow == 1)
										return ""; // If there is only one skill in the list, don't put anything before it.
									else
										return ", "; // Otherwise we have put some stuff and there is more coming after so just put a comma.
								})();

	if (numSkillsToShow == numSkillsToBeStrengthened)
	{
		// we are showing every skill that needs to be stregnthened.
		if(needsStrengthening[1].length > 0)
		{
			// last skill to be displayed is a bonus skill
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[1][needsStrengthening[1].length - 1]['url_title']
									+	((needsStrengthening[1][needsStrengthening[1].length - 1]['skill_progress']['level'] == 1)? "/practice'>":"'>" )
									+	needsStrengthening[1][needsStrengthening[1].length - 1]['title']
									+	"</a>";
		} else
		{
			// last skill to be displayed is a normal skill
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[0][needsStrengthening[0].length -1]['url_title']
									+	((needsStrengthening[0][needsStrengthening[0].length -1]['skill_progress']['level'] == 5)? "/practice'>":"'>" )
									+	needsStrengthening[0][needsStrengthening[0].length -1]['title']
									+	"</a>";
		}
	}
	else
	{
		// some skills that need to be strengthened are not being shown, so the last one we are showing is just the next one in the order we have
		lastIndexToBeShown = numSkillsToShow - 1; // the last for loop ended with i = numSkillsToShow - 2
		if (lastIndexToBeShown < needsStrengthening[0].length)
		{
			// index is in normal skill range
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[0][lastIndexToBeShown]['url_title']
									+	((needsStrengthening[0][lastIndexToBeShown]['skill_progress']['level'] == 5)? "/practice'>":"'>" ) // 5 crown skill DOES decay so note needless
									+	needsStrengthening[0][lastIndexToBeShown]['title']
									+	"</a>, ";
		} else
		{
			// index has past normal skills so doing bonus skills now.
			bonusSkillIndex = lastIndexToBeShown - needsStrengthening[0].length;
			strengthenBox.innerHTML +=	"<a href='/skill/"
									+	languageCode + "/"
									+	needsStrengthening[1][bonusSkillIndex]['url_title']
									+	((needsStrengthening[1][bonusSkillIndex]['skill_progress']['level'] == 1)? "/practice'>":"'>" ) // 1 crown bonus skill does decay but is a practice not lesson.
									+	needsStrengthening[1][bonusSkillIndex]['title']
									+	"</a>, ";
		}

		numSkillsLeft = numSkillsToBeStrengthened - numSkillsToShow;

		// Add a clickable element to show more skills in the list.
		// We are going to add on another needsStrengtheningListLength number of skills to the list, but as we are going to change this amount to lengthen the list, we need to original saved in storage.
	 	chrome.storage.sync.get("options", function (data)
	 	{
			numExtraSkillsOnShowMore = Math.min(numSkillsLeft, data.options.needsStrengtheningListLength);

			showMore = document.createElement("a");
			showMore.innerHTML = numSkillsLeft + " more...";
			showMore.href = "javascript:;";

			showMore.onclick = function () {
				options.needsStrengtheningListLength = String(+options.needsStrengtheningListLength + +numExtraSkillsOnShowMore);
				displayNeedsStrengthening(needsStrengthening);
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
	/*
		Side bar HTML structure:
		<div class="_2_lzu">							<-- Side bar container div
			<div class="aFqnr _1E3L7">					<-- Crown Level Box container div
				<h2>Crown Level</h2>
				<div class="_1kQ6y">					<-- Crown image and count container div
					<img class="_2vQZX" src="..." />	<-- Crown image svg
					<div class="nh1S1">CROWNCOUNT</div>	<-- Crown count text
					###################################	<-- /Maximum crown count will be put here.
				</div>
				####################################### <-- Crown Level breakdown will be put here.
			</div>
			<div class="-X3R5 _2KDjt">...</div>			<-- Advert/ disable ad blocker
			<div class="_21w25 _1E3L7">...</div>		<-- Daily Goal, xp graph & practice button
			<div class="_2SCNP _1E3L7">...</div>		<-- Achievements
			<div class="a5SW0">...</div>				<-- Friends list
			<div class="a5SW0">...</div>				<-- Duolingo Social Media links
		</div>

		Note a5SW0 seems to correspond with clear background, and _1E3L7 with whtie background.
		_1E3L7 is in class name of main tree, which has a white background.
	*/
	var skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	var bonusSkills = userData['language_data'][languageCode]['bonus_skills'];

	var crownLevelCount = [Array(6).fill(0),Array(2).fill(0)]; // will hold number skills at each crown level, index 0 : crown 0 (not finished), index 1 : crown 1, etc.

	for (var skill of skills)
	{
		crownLevelCount[0][skill['skill_progress']['level']]++;
	}

	for (var bonusSkill of bonusSkills)
	{
		crownLevelCount[1][bonusSkill['skill_progress']['level']]++;
	}

	var maxCrownCount = skills.length*5 + bonusSkills.length;

	var  treeLevel = crownTreeLevel();

	if (oldUI)
	{
		var crownLevelContainer = document.getElementsByClassName('aFqnr _1E3L7')[0];
		var crownTotalContainer = crownLevelContainer.getElementsByClassName('_2eJB1')[0]; // Was nh1S1, changed as of 2019-03-21, _3QZJ_ seems to represent >0 crowns, HY4N- for no crowns.
	}
	else
	{
		var crownLevelContainer = document.getElementsByClassName('NugKJ _55Inr')[0];
		var crownTotalContainer = crownLevelContainer.getElementsByClassName('_2boWj')[0];

		crownLevelContainer.style = 	"flex-wrap: wrap;"
									+	"justify-content: center;";
	}
	if (options.crownsMaximum)
	{
		crownTotalContainer.style.fontSize = "22px";

		var maximumCrownCountContainer = document.createElement("span");
		maximumCrownCountContainer.id = "maxCrowns";
		maximumCrownCountContainer.innerHTML = "/" + maxCrownCount;
	}
	/*
	maximumCrownCountContainer.style =	"position:absolute;"
									+ 	"top: 50%;"
									+	"right: 0;"
									+	"margin-top: 5px;"
									+	"font-size: 36px;"
									+	"font-weight: 700;"
									+	"transform: translateY(-50%);";
	*/

	var breakdownContainer = document.createElement("div");
	breakdownContainer.id = "crownLevelBreakdownContainer";
	if (oldUI)
	{
		breakdownContainer.style =	"margin-top: 1em;"
								+	"text-align: left;"
								+	"color: black;";
	}
	else
	{
		breakdownContainer.style =	"margin: 1em 1em 0 1em;"
								+	"text-align: left;"
								+	"flex-grow: 1;"
								+	"color: black;";
	}

	var treeLevelContainer = document.createElement("div");
	treeLevelContainer.id = "treeLevel";
	treeLevelContainer.style = "display: inline-block";
	treeLevelContainer.innerHTML = treeLevel;

	var breakdownList = document.createElement("ul");
	breakdownList.id = "breakdownList";
	breakdownList.style =	"display: grid;"
						+	"grid-auto-rows: 1.5em;"
						+	"align-items: center;";

	var imgContainer = document.createElement("div");
	imgContainer.style = "position: relative;"
						+"display: inline-block;"
						+"width: 100%;"
						+"justify-self:center";

	
	var levelContainer = document.createElement("div");
	levelContainer.style =	"position: absolute;"
						+	"top: 50%;"
						+   "left: 50%;"
						+   "transform: translateX(-50%) translateY(-50%);"
						+	"z-index: 2;"
						+	"color: #cd7900;"; // new colour for juicy UI look, was white.

	var crownImg = document.createElement("img");
	crownImg['alt'] = "crown";
	// Class name _2PyWM used for other small crowns on skills. Corresponds to height & width 100% and z-index 1.
	crownImg.style = "height: 100%; width: 100%; z-index: 1;";
	crownImg['src'] = "//d35aaqx5ub95lt.cloudfront.net/images/juicy-crown.svg" // old crown img: "//d35aaqx5ub95lt.cloudfront.net/images/crown-small.svg";

	imgContainer.appendChild(crownImg);
	imgContainer.appendChild(levelContainer);

	if(document.getElementsByClassName("crownLevelItem").length == 0) // We haven't added the breakdown data yet, so lets add it.
	{
		if (options.crownsMaximum) crownTotalContainer.appendChild(maximumCrownCountContainer);

		breakdownContainer.appendChild(document.createElement("p"))
		breakdownContainer.lastChild.style = "text-align: center;";
		breakdownContainer.lastChild.innerHTML = "Your tree is at Level&nbsp;";
		breakdownContainer.lastChild.appendChild(treeLevelContainer);

		for(var crownLevel = 0; crownLevel < crownLevelCount[0].length; crownLevel++)
		{
			var skillCount = crownLevelCount[0][crownLevel];
			var crownCount = skillCount * crownLevel;
		
			levelContainer.id = "crownLevel" + crownLevel + "Count";
			levelContainer.innerHTML = crownLevel;

			var breakdownListItem = document.createElement("li");
			breakdownListItem.className = "crownLevelItem";
			breakdownListItem.style =	"display: grid;"
									+	"align-items: center;"
									+	"justify-items: right;"
									+	"grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;";

			breakdownListItem.innerHTML =  "<span>" + skillCount + "</span>" + "<span style='justify-self: center;'>skill"+ ((skillCount == 1 )?"":"s") + " at</span>";

			breakdownListItem.appendChild(imgContainer);

			breakdownListItem.innerHTML += "=" +  "<span>" + crownCount  + "</span>" + "<span>crown" + ((crownCount == 1 )?"":"s") + "</span>";

			breakdownList.appendChild(breakdownListItem);
		}


		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			// The tree has some bonus skills so lets display a breakdown of their crown levels.
			bonusSkillsBreakdownHeader = document.createElement("h3");
			bonusSkillsBreakdownHeader.innerText = "Bonus Skills";
			bonusSkillsBreakdownHeader.style =	"margin: 0;"
											+	"font-size: 100%;"
											+	"justify-self: center";

			breakdownList.appendChild(bonusSkillsBreakdownHeader);

			for(var crownLevel = 0; crownLevel < crownLevelCount[1].length; crownLevel++)
			{
				var skillCount = crownLevelCount[1][crownLevel];
				var crownCount = skillCount * crownLevel;
			
				levelContainer.id = "bonusSkillCrownLevel" + crownLevel + "Count";
				levelContainer.innerHTML = crownLevel;

				var breakdownListItem = document.createElement("li");
				breakdownListItem.className = "crownLevelItem";
				breakdownListItem.style =	"display: grid;"
										+	"align-items: center;"
										+	"justify-items: right;"
										+	"grid-template-columns: 2.5fr 7.5fr 2.5em 1fr 3fr 5.5fr;";
				
				breakdownListItem.innerHTML = "<span>" + skillCount + "</span>" + "<span style='justify-self: center;'>skill"+ ((skillCount == 1 )?"":"s") + " at</span>";

				breakdownListItem.appendChild(imgContainer);

				breakdownListItem.innerHTML += "=" +  "<span>" + crownCount  + "</span>" + "<span>crown" + ((crownCount == 1 )?"":"s") + "</span>";

				breakdownList.appendChild(breakdownListItem);
			}
		}
		
		breakdownContainer.appendChild(breakdownList);
		if (options.crownsBreakdown) crownLevelContainer.appendChild(breakdownContainer);

		if (treeLevel != 5)
		{
			var prediction = document.createElement("p");
			numDays = daysToNextCrownLevel();

			if (numDays == -1)
			{
				crownLevelContainer.style['marginBottom'] = "1em";
				return false;
			}

			prediction.id = "treeCrownLevelPrediction";
			prediction.innerHTML =	"At your current rate your tree will reach Level&nbsp;"
								+	(treeLevel + 1) +	" in "
								+	"<span style='font-weight: bold'>"
								+	numDays
								+	"</span>"
								+	" days";
			if (oldUI)
			{
				prediction.style = "margin: 1em 0 0 0;";
			}
			else
			{
				prediction.style =	"margin: 1em;"
								+	"text-align: center;"
								+	"color: black;";
			}
			if (options.crownsPrediction) crownLevelContainer.appendChild(prediction)
		}
	}
	else // We have already added the breakdown data, just update it.
	{
		for(var crownLevel = 0; crownLevel < crownLevelCount[0].length; crownLevel++)
		{
			levelContainerElement = document.getElementById("crownLevel" + crownLevel + "Count");
			levelContainerElement.innerHTML = crownLevel;
		}
		if (crownLevelCount[1][0] + crownLevelCount[1][1] != 0)
		{
			for(var crownLevel = 0; crownLevel < crownLevelCount[1].length; crownLevel++)
			{
				levelContainerElement = document.getElementById("bonusSkillCrownLevel" + crownLevel + "Count");
				levelContainerElement.innerHTML = crownLevel;
			}
		}

		document.getElementById("maxCrowns").innerHTML = "/" + maxCrownCount;
		document.getElementById("treeLevel").innerHTML = treeLevel;
	}
}

function displayXPBreakdown()
{
	var data =
		{
			'language_string':	userData['language_data'][languageCode]['language_string'],
			'level_progress':	userData['language_data'][languageCode]['level_progress'],
			'level':			userData['language_data'][languageCode]['level'],
			'level_points':		userData['language_data'][languageCode]['level_points'],
			'points':			userData['language_data'][languageCode]['points'],
			'history':			userData['language_data'][languageCode]['calendar']
			//'timezone':			userData['timezone_offset'] seems to not be available for every users, maybe depends on platform use.
		}

	levelProgressPercentage = data['level_progress']*100/data['level_points'];

	if(document.getElementById("XPBox") == null)
	{
		// We haven't made the XP Box yet

		var container = document.createElement("div");
		container.id = "XPBox";
		if (oldUI)
		{
			container.className = "_1E3L7";	
		}
		else
		{
			container.style = "margin-top: 1em;";
		}
		container.style = "color: black;";

		var XPHeader = document.createElement("h2");
		XPHeader.innerText = data['language_string']+ " XP";

		languageLevelContainer = document.createElement("div");
		if (oldUI) languageLevelContainer.className = "_2QmPh";

		languageLevelContainer.appendChild(XPHeader);

		var languageLevelElement = document.createElement("p");
		languageLevelElement.id = "xpTotalAndLevel";
		languageLevelElement.innerText = "Level " + data['level'];
		languageLevelElement.style = 	"font-size: 175%;"
									+	"font-weight: bold;"
									+	"text-align: center;"
									+	"color: " + ORANGE + ";";

		var languageXPElement = document.createElement("span");
		languageXPElement.innerText = data['points'] + " XP - ";
		languageXPElement.style =	"color: black;"
								+	"font-weight: normal;";
		
		languageLevelElement.insertBefore(languageXPElement, languageLevelElement.childNodes[0]);
		languageLevelContainer.appendChild(languageLevelElement);
		if (options.XPBreakdown) container.appendChild(languageLevelContainer);
		
		if (data['level'] != 25)
		{
			var nextLevelProgressElement = document.createElement("p");
			nextLevelProgressElement.style =	"text-align: center;"
											+	"margin-bottom: 0;";
			nextLevelProgressElement.innerText = (data['level_points']-data['level_progress']) + " XP till Level " + (data['level']+1);

			var languageLevelProgressBarContainer = document.createElement("div");
			languageLevelProgressBarContainer.className = "languageLevelProgressBar";
			languageLevelProgressBarContainer.style =	"height: 0.5em;"
													+	"width: 100%;"
													+	"background-color: " + GREY + ";"
													+	"border-radius: 0.25em;";

			var languageLevelProgressBar = document.createElement("div");
			languageLevelProgressBar.className = "languageLevelProgressBar";
			languageLevelProgressBar.style =	"height: 100%;"
											+	"width: " + levelProgressPercentage + "%;"
											+	"background-color: " + ORANGE + ";"
											+	"border-radius: 0.25em;";

			languageLevelProgressBarContainer.appendChild(languageLevelProgressBar);

			var currentLevelProgressElement = document.createElement("p");
			currentLevelProgressElement.style = "text-align: center;";
			currentLevelProgressElement.innerText =	"(" + data['level_progress'] + "/" + data['level_points'] + " XP - "
													+	Number(levelProgressPercentage).toFixed(1) + "%)";

			languageLevelContainer.appendChild(nextLevelProgressElement);
			languageLevelContainer.appendChild(languageLevelProgressBarContainer);
			languageLevelContainer.appendChild(currentLevelProgressElement);


			var daysLeft = daysToNextXPLevel(data['history'], data['level_points']-data['level_progress']);
			var projectedNextLevelCompletion = document.createElement("p");
			projectedNextLevelCompletion.style = "margin-bottom: 0; text-align: center;"
			projectedNextLevelCompletion.innerHTML =	"At your current rate you will reach the next level, Level " + (data['level']+1) + ", in about "
													+	"<span style='font-weight:bold'>"
													+	daysLeft
													+	"</span>"
													+	" days";
			
			if (daysLeft != -1 && options.XPPrediction)
			{
				container.appendChild(projectedNextLevelCompletion);
			}
		}
		else
		{
			// Reached max level
			var maxLevelMessage = document.createElement("p");
			maxLevelMessage.innerText = "You have reached the maximum level!";
			languageLevelContainer.appendChild(maxLevelMessage);
		}
		
		if (oldUI)
		{
			document.getElementsByClassName('aFqnr _1E3L7')[0].parentNode.insertBefore(container, document.getElementsByClassName('aFqnr _1E3L7')[0].nextSibling);
		}
		else
		{
			document.getElementsByClassName('yRM09')[0].appendChild(container);
		}
	}
	else
	{
		// We alreayd have the XP Box, lets just update the values
		var languageLevelElement = document.getElementById("xpTotalAndLevel");
		languageXPElement = languageLevelElement.childNodes[0];
		languageXPElement.innerText = data['points'] + " XP - ";
		languageLevelElement.innerText = "Level " + data['level'];
		languageLevelElement.insertBefore(languageXPElement,languageLevelElement.childNodes[0]);
		
		if (languageLevelElement.nextSibling != null)
		{
			// Wasn't level 25 ...
			if (data['level'] != 25)
			{
				// ... and still aren't
				var languageLevelProgressBarContainer = document.getElementsByClassName("languageLevelProgressBar")[0];
				languageLevelProgressBarContainer.style =	"height: 0.5em;"
														+	"width: 100%;"
														+	"background-color: " + GREY + ";"
														+	"border-radius: 0.25em;";

				var languageLevelProgressBar = document.getElementsByClassName("languageLevelProgressBar")[1];
				languageLevelProgressBar.style =	"height: 100%;"
												+	"width: " + levelProgressPercentage + "%;"
												+	"background-color: " + ORANGE + ";"
												+	"border-radius: 0.25em;";

				var nextLevelProgressElement = languageLevelProgressBarContainer.previousSibling;
				nextLevelProgressElement.innerText = (data['level_points']-data['level_progress']) + " XP till Level " + (data['level']+1);

				var currentLevelProgressElement = languageLevelProgressBarContainer.nextSibling;
				currentLevelProgressElement.innerText =	"(" + data['level_progress'] + "/" + data['level_points'] + " XP - "
													+	Number(levelProgressPercentage).toFixed(1) + "%)";

				if (options.XPPrediction)
				{
					var daysLeft = daysToNextXPLevel(data['history'], data['level_points']-data['level_progress']);
					languageLevelElement.parentNode.lastChild.childNodes[1].innerText = daysLeft;
				}
			}
			else
			{
				// ... but is now, so lets remove all the irrelevant info
				while (languageLevelElement.nextSibling != null)
				{
					languageLevelElement.parentNode.removeChild(languageLevelElement.nextSibling);
				}

				var maxLevelMessage = document.createElement("p");
				maxLevelMessage.style = "margin-bottom: 0";
				maxLevelMessage.innerText = "You have reached the maximum level!";
				languageLevelElement.parentNode.appendChild(maxLevelMessage);
			}
		}
	}
}

function displaySuggestion(skills, bonusSkills)
{
	if (
			document.getElementsByClassName("i12-l").length != 0 &&
			document.getElementsByClassName("w8Lxd").length != 0 &&
			document.getElementsByClassName("_2GJb6").length != 0
		) // Has the tree loaded from a page change
	{
		/* currently unused
		var skillTree = document.getElementsByClassName("i12-l")[0];
		var firstSkillRow = document.getElementsByClassName("_2GJb6")[0];
		*/
		var topOfTree = document.getElementsByClassName("w8Lxd")[0];
		// or var topOfTree = skillTree.childNodes[0]
	}
	else
	{
		// body hasn't loaded yet so element not there, lets try again after a small wait, but only if we are still on the main page.
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

	if (oldUI)
	{
		shopButtonFloatedDiv = document.createElement("div");
		shopButtonFloatedDiv.id = "shopButtonFloatedDiv";
		shopButtonFloatedDiv.style	= "width: " + document.getElementsByClassName("_1YIzB")[0].offsetWidth + "px;"
									+ "height: " + document.getElementsByClassName("_1YIzB")[0].offsetHeight + "px;"
									+ "float: right;"
									+ "margin-bottom: 0.5em;";
	}

	if (document.getElementById("fullStrengthMessageContainer") == null)
	{
		var container = document.createElement("div");
		container.id = "fullStrengthMessageContainer";
		container.style = "margin-bottom: 2em;";

		if (oldUI) container.appendChild(shopButtonFloatedDiv);

		var treeLevel = crownTreeLevel();
		var skillsByCrowns = [[],[],[],[],[],[]];

		for (var skill of skills)
		{
			skillsByCrowns[skill['skill_progress']['level']].push(skill);
		}
		
		var randomSuggestion = skillsByCrowns[treeLevel][Math.floor(Math.random()*skillsByCrowns[treeLevel].length)];

		var link = document.createElement("a");
		link.href = "/skill/" + languageCode + "/" + randomSuggestion['url_title'] + ((treeLevel == 5) ? "/practice/" : "/");
		link.innerText = randomSuggestion['title'];
		
		var fullStrengthMessage = document.createElement("p");
		if (treeLevel == 5)
		{
			fullStrengthMessage.innerText = "Your " + randomSuggestion['language_string'] + " tree is fully strengthened and at Level 5! Why not do a <a href='/practice'>general practice</a>";
		}
		else if (treeLevel == 0)
		{
			link.href = "/skill/" + languageCode + "/" + skillsByCrowns[0][0]['url_title'] + "/";
			link.innerText = skillsByCrowns[0][0]['title'];

			fullStrengthMessage.innerHTML = "All the skills that you have learnt so far are fully strengthened. ";
			fullStrengthMessage.appendChild(link);
			fullStrengthMessage.innerHTML += " is the next skill to learn.";
		}
		else
		{
			fullStrengthMessage.innerText = "Your " + randomSuggestion['language_string'] + " tree is fully strengthened. Why not practice this skill to work towards getting your tree to Level " + (treeLevel + 1) + ": ";	
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

function httpGetAsync(url, responseHandler)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
	{ 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            responseHandler(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.send(null);
}

function getStrengths() // parses the data from duolingo.com/users/USERNAME and extracts strengths and skills that need strengthening
{
	/*
		Data comes formatted as such:
		{
			'language_data': {
				'es': {
					...
					skills			: [...],
					bonus_skills	: [...],
					...
				}
			}
		}
		each skill in either skills or bonus_skills has a number or properties including 'strength', 'title', 'url_title', 'coords_x', 'coords_y'.
	*/
	
	var strengths = [[],[]];	// will hold array of the strength values for each skill in tree in order top to bottom, left to right and array of strengths of bonus skills. values between 0 and 1.0 in 0.25 steps.
	var needsStrengthening = [[],[]]; // will hold the objects for the skills that have strength < 1.0 and the bonus skills that have strength < 1.0.
	
	languageCode = Object.keys(userData['language_data'])[0]; // only one child of 'language_data', a code for active language.

	var skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	var bonusSkills = userData['language_data'][languageCode]['bonus_skills'];

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

	for (var skill of skills)
	{
		strengths[0].push([skill['strength'],Boolean(skill['skill_progress']['level'])]);
		if(skill['strength'] != 1 && skill['strength'] != 0 && skill['skill_progress']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[0].push(skill);
		}
	}

	for (var bonusSkill of bonusSkills)
	{
		strengths[1].push([bonusSkill['strength'],Boolean(skill['skill_progress']['level'])]);
		if(bonusSkill['strength'] != 1 && bonusSkill['strength'] != 0 && bonusSkill['skill_progress']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}
	}

	if (options.strengthBars) addStrengths(strengths); // call function to add these strengths under the skills
	
	if (needsStrengthening[0].length+needsStrengthening[1].length !=0)
	{
		// Something needs strengthening
		if (options.needsStrengtheningList) displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}
	else
	{
		// Nothing that needs strengthening!
		if (options.skillSuggestion) displaySuggestion(skills);
	}
	if (oldUI && options.crownsInfo)
		displayCrownsBreakdown(); // call function to add breakdown of crown levels under crown total.
	if (oldUI && options.XPInfo)
		displayXPBreakdown();
	// All done displaying what needs doing so let reset and get ready for another change.
	resetLanguageFlags();
}

function handleDataResponse(responseText, languageOnCall)
{
	userData = JSON.parse(responseText); // store response text as JSON object.
	var newDataLanguageCode = Object.keys(userData['language_data'])[0];
	var newDataLanguageString = userData['language_data'][Object.keys(userData['language_data'])[0]]['language_string'];
	if (languageChanged && newDataLanguageString != language)
	{
		// language change has happened but the data isn't up to date yet as it is not matching the current active language
		// so request the data, but only if still on the main page. Safe to not wait as the httpRequest will take some time.
		if (onMainPage)
		{
			requestData(languageOnCall);
		}
	}
	else
	{
		languageCode = newDataLanguageCode;
		resetLanguageFlags();
		getStrengths();	// actual processing of the data.
	}
}

function requestData(languageOnCall) // requests data for actively logged in user.
{
	if (!(Object.keys(userData).length === 0 && userData.constructor === Object) && (!languageChanged))
	{
		// If there is already userData and not changing language, display current data while requesting new data.
		getStrengths(userData);
	}
	if (!oldUI)
	{
		httpGetAsync(
			encodeURI(window.location+"users/"+username),
			function (responseText)
			{
				if (languageOnCall != language)
				{
					// current language at time of response is not the language anymore
					return false;
				}
				else
				{
					handleDataResponse(responseText, languageOnCall);
				}
			}
		); // asks for data and async calls handle function when ready.
	}
	else
	{
		// using old UI requestData method
		if(document.getElementsByClassName("_2R9gT").length != 0) // Check if there is a username element
		{
			username = document.getElementsByClassName("_2R9gT")[0].innerHTML;
			httpGetAsync(
				encodeURI(window.location+"users/"+username),
				function (responseText)
				{
					if (languageOnCall != language)
					{
						// current language at time of response is not the language anymore
						return false;
					}
					else
					{
						handleDataResponse(responseText, languageOnCall);
					}
				}
			); // asks for data and async calls handle function when ready.
		}
	}
}

function checkUIVersion(){
	/*	Old old version of UI checking for adding of parts and pentagonal checkpoints
	if (document.getElementsByClassName('_1bcgw').length != 0)
	{
		// Seem to be using new version of tree with the pentagonal checkpoint nodes
		newUIVersion = true;
	} else
	{
		newUIVersion = false;
	}
	*/
	/* Old version of UI checking for if using the juicy look. Assuming this is now universal
	// check for new 'juicy' UI version by testing crown image.
	var crownElem = document.getElementsByClassName("_2PyWM")[0];

	if (crownElem == null)
	{
		if(onMainPage)
		{
			setTimeout(checkUIVersion, 500);
		}
		else
		{
			// switched away before we got to check again.
			return false;
		}
	}
	else if (!crownElem.src.includes("juicy")) // _2PyWM is class of small crown img for each skill
	{
		// if src of crown image isn't the new juicy-crown.svg:
		juicyUI = false;
		// change GOLD and RED colours to old versions.
		GOLD = "rgb(248, 176, 45)";
		RED = "rgb(219, 62, 65)";
	}
	*/
	if (document.getElementsByClassName("_6t5Uh").length != 0) // topBarDiv used to have class _6t5Uh
	{
		oldUI = true;
	}
	else
	{
		oldUI = false; // just in case you change between users who have different UI versions
	}

}

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
var childListMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		checkUIVersion();
		if (mutation.target == rootElem)
		{
			// root child list has changed so dataReactRoot has probably been replaced, lets redefine it.
			dataReactRoot = rootElem.childNodes[0];
			init();
		}
		else if (mutation.target == dataReactRoot)
		{
			if (!oldUI)
			{

				if(dataReactRoot.childNodes[1].className != "BWibf _3MLiB")
				{
					// not just changed into a lesson
					topBarDiv = dataReactRoot.childNodes[2].childNodes[1].childNodes[1].childNodes[0].className;
					languageChanged = false;
					init();
				}
			}
			else
			{
				if (dataReactRoot.childNodes[1].className ==  "_6t5Uh")
				{
					// Top bar div has class for main tree page or words page.
					topBarDiv = dataReactRoot.childNodes[1]
					languageChanged = false; // language hasn't changed this update
					init();
				}
			}
		}
		else if (mutation.target.className == "_3gtu3 _1-Eux iDKFi")
		{
			// Crown or streak pop up box has appeared or dissapeared.
			if (mutation.target.getElementsByClassName("_3FM63").length + mutation.target.getElementsByClassName("WZkQ9").length != 0) // _3FM63 for gold crown logo, WZkQ9 for grey when at 0 crowns.
			{
				// Crowns has had the change.
				if (mutation.target.lastChild.className.includes("_3yH6G") && options.crownsInfo)
				{
					// Pop-up box has just appeared, lets display the Crown breakdown.
					displayCrownsBreakdown();
				}
				else
				{
					// Pop-up box disappeared
				}
			}
			if (mutation.target.getElementsByClassName("_2ctH6").length +  mutation.target.getElementsByClassName("_27oya").length != 0) // _2ctH6 for coloured flame logo, _27oya for grey when not met day's XP goal.
			{
				// Streak/XP has had the change.
				if (mutation.target.lastChild.className.includes("_3yH6G") && options.XPInfo)
				{
					// Pop-up box has just appeared, lets display the XP breakdown.
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

var classNameMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		checkUIVersion();
		if(!oldUI)
		{
			// check if it was a language change
			if (mutation.target.parentNode.parentNode == languageLogo)
			{
				// it was a language change,
				languageChanged = true;

				// as the language has just changed, need to wipe the slate clean so no old data is shown after change.
				removeStrengthBars();
				removeNeedsStrengtheningBox();
				removeCrownsBreakdown();
				removeXPBox();
				removeSuggestion();

				function checkCurrentLanguage()
				{
					var currentLanguage = document.head.getElementsByTagName("title")[0].innerHTML.split(" ")[3];
					if (language == currentLanguage)
					{
						// page title hasn't updated yet, we need the new language name so lets try this thing again in a bit
						setTimeout(checkCurrentLanguage, 100);
					}
					else
					{
						// page title has changed to reflect new language
						language = currentLanguage;

						// now get the new data
						checkUIVersion(); // Just in case.
						requestData(language);
					}
				}
				checkCurrentLanguage();
			}
			else
			{
				// it wasn't a language change
				languageChanged = false;
			}

			// check if we are now on the main page
			if (topBarDiv.childNodes[0].className.includes("_2lkuX"))
			{
				// on main page
				// check if language has been previously set as we only set it in init if we were on the main page
				if (language != "")
				{
					// language has previously been set so not first time on main page, lets just get some new data.
					requestData(language);
				}
				else
				{
					// language was not set so first time on home page, lets run init again
					init();
				}
			}
			else
			{
				// not on main page
				onMainPage = false;
			}
		}
		else
		{
			// old UI page nad language handling
			if(topBarDiv.className == "_6t5Uh" && document.getElementsByClassName("_2XW92").length == 0) // _6t5Uh means we are on body on main page or words page. no _2XW92 means not on words page. So we are on main page.
			{
				onMainPage = true;
				if (language != "")
				{
					// language has previously been set so not first time on home page.
					var topBarLanguage = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[1].innerHTML;
					if (language != topBarLanguage)
					{
						// language has just changed so set flag to true
						languageChanged = true;
						language = topBarLanguage;
						// as the language has just changed, need to wipe the slate clean so no old data is shown after change.
						removeStrengthBars();
						removeNeedsStrengtheningBox();
						removeCrownsBreakdown();
						removeXPBox();
						removeSuggestion();
					}
					else
					{
						// language hasn't just changed set flag to false
						languageChanged = false;
					}
					checkUIVersion(); // here for case of switching language with different UI versions
					requestData(language); // call on attribute change
				} else
				{
					//language had not been previously set so first time on homepage
					init();
				}
			}
			else
			{
				onMainPage = false;
			}
		}
	}
};

var classNameObserver = new MutationObserver(classNameMutationHandle);
var childListObserver = new MutationObserver(childListMutationHandle);

function init()
{
	retrieveOptions();

	rootElem = document.getElementById("root"); // When logging in child list is changed.
	dataReactRoot = rootElem.childNodes[0]; // When entering or leaving a lesson children change there is a new body so need to detect that to know when to reload the bars.
	
	childListObserver.observe(rootElem,{childList: true});
	childListObserver.observe(dataReactRoot,{childList: true});
	
	if(dataReactRoot.childNodes.length == 1) // If there is only one child of dataReactRoot then we are on the log in page.
	{
		// On login page so cannot continue to turn rest of init process.
		onMainPage = false;
		return false;
	}
	else
	{
		// should be logged in
		//var mainBodyElemIn3rd = !dataReactRoot.childNodes[1].classList.contains("_3MLiB") && dataReactRoot.childNodes[2].classList.contains("_3MLiB");
		var mainBodyElemIn4th =  dataReactRoot.childNodes[3].nodeType != 8 && dataReactRoot.childNodes[3].classList.contains("_3MLiB");
		// Main body container element has class _3MLiB. If in second place, there is no topbar Div, if it is in thrid place, then second should be topBarDiv.
		// topBarDiv is no longer second, now it is nested a few levels down inside that.
		// As of v1.0.16 on 2019-05-15, a additional comment node has been added in second position, so topbar now should be in 3rd and main bodyElem in 4th.

		if(mainBodyElemIn4th) // If main body element is in 3rd place then we are not in a lesson.
		{
			checkUIVersion();
			if (!oldUI)
			{
				// Using new white topBar layout

				// topBar Div is the direct container holding the navigation butons, has class _3F_8q
				// old method topBarDiv = dataReactRoot.childNodes[2].childNodes[1].childNodes[2].childNodes[0];
				// Above works as of 2019-06-11 but any new elements will cause childNodes indices to be wrong.
				// Safer to use class name, which may also change...
				// Note there are two elements with class name _3F_8q, the first is the right one, but let's do a check in case of any changes.
				for (elem of dataReactRoot.getElementsByClassName("_3F_8q"))
					if (elem.getElementsByTagName("a").length != 0)
						topBarDiv = elem;
				
				// active tab has class _2lkuX. Buttons seem to have _3MT82 as defining class.
				numNavButtons = topBarDiv.getElementsByClassName("_3MT82").length;
				// if numNavButtons = 4 then there is no stories button.
				// if numNavButtons = 5 then there is a stories button and that goes after the homeNav.

				var homeNav = topBarDiv.childNodes[0];

				if (numNavButtons == 5)
				{
					var storiesNav = topBarDiv.childNodes[2];
					/* unused/unusable
					var discussionNav = topBarDiv.childNodes[4];
					*/
					var shopNav = topBarDiv.childNodes[6];
					languageLogo = topBarDiv.childNodes[10];
					var crownNav = topBarDiv.childNodes[11];
					var streakNav = topBarDiv.childNodes[12];
				}
				else
				{
					/* unused/unusable
					var discussionNav = topBarDiv.childNodes[2];
					*/
					var shopNav = topBarDiv.childNodes[4];
					languageLogo = topBarDiv.childNodes[8];
					var crownNav = topBarDiv.childNodes[9];
					var streakNav = topBarDiv.childNodes[10];
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

				if (homeNav.className.includes("_2lkuX"))
				{
					// on home page
					onMainPage = true;

					// need to set up Observer on language logo for language change detection
					// The element that changes on language change is the first grandchild of languageLogo. Note that on over or click this granchild gets a sibling which is the dropdown box.
					classNameObserver.observe(languageLogo.childNodes[0].childNodes[0],{attributes: true});
					language = document.head.getElementsByTagName("title")[0].innerHTML.split(" ")[3]; // not sure how well this will work if not using english as the UI language. Needs more work.

					// need to set the username, get this by getting the href of the view more link in the achievements box the anchor element has X8N_G as its identifying class
					username = document.getElementsByClassName("X8N_G")[0].href.split("/")[3];

					checkUIVersion();
					requestData(language);
				}
				else
				{
					// We are not on the main page. Don't need to do anything further, we have set up the observer to see if we go back to the main page from here.
					onMainPage = false;
				}
			}
			else
			{
				// using old blue topBar layout
				topBarDiv = dataReactRoot.childNodes[1];

				// topBarMobilePractice either has class _2XW92 or _3IyDY _1NQPL.
				if(topBarDiv.getElementsByClassName("_3IyDY _1NQPL").length != 0)
				{
					topBarMobilePractice = topBarDiv.getElementsByClassName("_3IyDY _1NQPL")[0]; // Class for when on homepage, store and labs
				}
				else if(topBarDiv.getElementsByClassName("_2XW92").length != 0)
				{
					topBarMobilePractice = topBarDiv.getElementsByClassName("_2XW92")[0]; // Class for when on words page
				}
				else
				{
					// Element not found or has a class we are not expecting. It should be the 2nd child of topBarDiv so lets just set it as that and hope for the best.
					topBarMobilePractice = topBarDiv.childNodes[1];
				}

				classNameObserver.observe(topBarDiv,{attributes: true}); // Observing to see if class of topBarDiv changes to tell if we have switched between main or words page and store or labs page.
				classNameObserver.observe(topBarMobilePractice,{attributes: true}); // Observing to see if class of topBarMobilePractice changes to tell if we have swtiched between main and words page.

				if(topBarDiv.className == "_6t5Uh" && document.getElementsByClassName("_2XW92").length == 0) // if we are on the homepage. _2XW92 is class of mobile view practice button when on words page. On home page it is _3IyDY _1NQPL.
				{
					onMainPage = true;
					if(languageLogo != document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[0])
					{
						languageLogo = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[0];
						classNameObserver.observe(languageLogo,{attributes: true});
					}
					language = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[1].innerHTML;
					requestData(language);
				}
				else if(topBarDiv.className == "_6t5Uh" && document.getElementsByClassName("_2XW92").length != 0) // if we are on the words page
				{
					// We are on the words page. Don't need to do anything further, we have set up the observer to see if we go back to the main page from here.
					onMainPage = false;
				}
			}
		} else
		{
			// page we are on is most likely a lesson, and we got here from a link in the strengthenBox.
			onMainPage = false;
		}
	}
}

document.body.onload = init(); // call function to start display sequence on first load

//observer.disconnet(); can't disconnect as always needed while page is loaded.