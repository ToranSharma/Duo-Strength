GOLD = "rgb(250, 217, 29)"; // "rgb(248, 176, 45)" old gold colour
RED = "rgb(244, 78, 81)"; // "rgb(219, 62, 65)";  old red colour
ORANGE = "rgb(255, 150, 0)";
GREY = "rgb(229, 229, 229)";
var languageCode = "";
var languageCodeChanged = false;
var language = "";
var languageChanged = false;
var languageLogo;


var username = "";
var userData = Object();
var juicyUI = true;
var numBonusSkillsInTree = 0;

var rootElem;
var dataReactRoot;
var topBarDiv;
var topBarMobilePractice;

var onMainPage;

function resetLanguageFlags()
{
	// reset to be called after finished successfully displaying everything.
	// need to be ready for a change so we reset them back to false.
	languageChanged = false;
	languageCodeChanged = false;
	numBonusSkillsInTree = 0;
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
	crownLevelBreakdownContainer.parentNode.removeChild(crownLevelBreakdownContainer);
}

function removeXPBox()
{
	var xpBox = document.getElementById("XPBox");
	if (xpBox != null)
	{
		xpBox.parentNode.removeChild(xpBox);	
	}
}

function daysToNextLevel(history, xpLeft /*, timezone*/)
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
			elementContents.push(strengths[1][bonusElementsCount]);

			bonusElementsCount ++;

			skills.push(elementContents);
		} else
		{
			// Normal skill
			elementContents.push(strengths[0][i - bonusElementsCount]);
			
			skills.push(elementContents);
		}
	}

	numBonusSkillsInTree += bonusElementsCount; // update number of bonus elements that were in the tree for use in strengthenBox.
	
	var numBarsAdded = 0
	
	for (var i = 0; i< skills.length; i++)
	{
		var iconElement = skills[i][0];
		var nameElement = skills[i][1];
		var name = nameElement.innerHTML;
		var strength = skills[i][2]*1.0;
		
		if(document.getElementsByClassName("strengthBarHolder").length == numBarsAdded) // if we have only the number of bars added this time round, keep adding new ones.
		{
			var strengthBarHolder = document.createElement("div");
			strengthBarHolder.className = "strengthBarHolder";
			strengthBarHolder.style['width'] = "100%";
			strengthBarHolder.style['padding'] = "0 5%";
			
			nameElement.parentNode.insertBefore(strengthBarHolder, nameElement);
			
			var strengthBar = document.createElement("div");
			strengthBar.className = "strengthBar";
			strengthBar.id = name + "StrengthBar";
			strengthBar.style['display'] = "inline-block";
			strengthBar.style['width'] = (strength*75)+"%";
			strengthBar.style['height'] = "1em";
			strengthBar.style['backgroundColor'] = (strength == 1.0 ? GOLD : RED);
			strengthBar.style['borderRadius'] = "0.5em";
			strengthBar.style['verticalAlign'] = "text-top";
			
			var strengthValue = document.createElement("div");
			strengthValue.className = "strengthValue";
			strengthValue.id = name + "StrengthValue";
			strengthValue.style['display'] = "inline-block";
			strengthValue.style['width'] = ((1-strength)*75+25)+"%";
			strengthValue.style['textAlign'] = "right";
			strengthValue.innerHTML = strength*100 + "%";
			
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
		var skillTree = document.getElementsByClassName("i12-l")[0];
		var topOfTree = document.getElementsByClassName("w8Lxd")[0];
		// or var topOfTree = skillTree.childNodes[0]
		var firstSkillRow = document.getElementsByClassName("_2GJb6")[0];
	}
	else
	{
		// body hasn't loaded yet so element not there, lets try again after a small wait, but only if we are still on the main page.
		if(onMainPage)
		{
			setTimeout(displayNeedsStrengthening(needsStrengthening), 500);
		}
		else
		{
			// swtiched away before we got a chance to try again.
		}
		return false;
	}

	shopButtonFloatedDiv = document.createElement("div");
	shopButtonFloatedDiv.id = "shopButtonFloatedDiv";
	shopButtonFloatedDiv.style	= "width: " + document.getElementsByClassName("_1YIzB")[0].offsetWidth + "px;"
								+ "height: " + document.getElementsByClassName("_1YIzB")[0].offsetHeight + "px;"
								+ "float: right;"
								+ "margin-top: -" + document.getElementsByClassName("w8Lxd")[0].offsetHeight + "px;"
								+ "margin-bottom: 0.5em;";

	var strengthenBox; // will be a div to hold list of skills that need strengthenening
	var needToAddBox = false;
	if (document.getElementById("strengthenBox") == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = "strengthenBox";
		strengthenBox.style['textAlign'] = "left";
		strengthenBox.style['marginBottom'] = "2em";
	}
	else
	{
		strengthenBox = document.getElementById("strengthenBox");
	}

	var numSkillsToBeStrengthened = needsStrengthening[0].length +needsStrengthening[1].length;

	strengthenBox.innerHTML = "";
	strengthenBox.appendChild(shopButtonFloatedDiv);
	
	strengthenBox.innerHTML += "The following " + numSkillsToBeStrengthened +
								((needsStrengthening[0].length + numBonusSkillsInTree != 1) ? " skills need": " skill needs") +
								" strengthening: <br/>";
	
	for (var i = 0; i < numSkillsToBeStrengthened - 1; i++)
	{
		if (i < needsStrengthening[0].length)
		{
			// index is in normal skill range
			strengthenBox.innerHTML += "<a href='/skill/" +
									languageCode + "/" +
									needsStrengthening[0][i]['url_title'] +
									((needsStrengthening[0][i]['progress_v3']['level'] == 5)? "/practice'>":"'>" ) + // 5 crown skill doesn't decay AFAIK so needless but included JIC.
									needsStrengthening[0][i]['title'] + "</a>, ";
		} else
		{
			// index has past normal skills so doing bonus skills now.
			bonusSkillIndex = i - needsStrengthening[0].length;
			strengthenBox.innerHTML += "<a href='/skill/" +
									languageCode + "/" +
									needsStrengthening[1][bonusSkillIndex]['url_title'] +
									((needsStrengthening[1][bonusSkillIndex]['progress_v3']['level'] == 1)? "/practice'>":"'>" ) + // 1 crown bonus skill does decay but is on practice not lessons.
									needsStrengthening[1][bonusSkillIndex]['title'] + "</a>, ";
		}
		
	}
	strengthenBox.innerHTML = strengthenBox.innerHTML.substring(0, strengthenBox.innerHTML.length - 2);
	strengthenBox.innerHTML += (numSkillsToBeStrengthened > 1) ? " & ": "";
	if(needsStrengthening[1].length > 0)
	{
		// last skill to be displayed is a bonus skill
		strengthenBox.innerHTML += "<a href='/skill/" +
										languageCode + "/" +
										needsStrengthening[1][needsStrengthening[1].length - 1]['url_title'] +
										((needsStrengthening[1][needsStrengthening[1].length - 1]['progress_v3']['level'] == 1)? "/practice'>":"'>" ) +
										needsStrengthening[1][needsStrengthening[1].length - 1]['title'] + "</a>";
	} else
	{
		// last skill to be displayed is a normal skill
		strengthenBox.innerHTML += "<a href='/skill/" +
										languageCode + "/" +
										needsStrengthening[0][needsStrengthening[0].length -1]['url_title'] +
										((needsStrengthening[0][needsStrengthening[0].length -1]['progress_v3']['level'] == 5)? "/practice'>":"'>" ) +
										needsStrengthening[0][needsStrengthening[0].length -1]['title'] + "</a>";
	}
	if(needToAddBox)
	{
		skillTree.insertBefore(strengthenBox, firstSkillRow);
	}
}

function displayCrownsBreakdown(crownLevelCount, maxCrownCount)
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

	var treeLevel = 0;

	var i = 0;
	while (crownLevelCount[0][i] == 0 && i < 6)
	{
		treeLevel++;
		i++;
	}

	var crownLevelContainer = document.getElementsByClassName('aFqnr _1E3L7')[0];
	var crownTotalContainer = crownLevelContainer.getElementsByClassName('_2eJB1')[0]; // Was nh1S1, changed as of 2019-03-21, _3QZJ_ seems to represent >0 crowns, HY4N- for no crowns.
	crownTotalContainer.style.fontSize = "22px";

	var maximumCrownCountContainer = document.createElement("span");
	maximumCrownCountContainer.id = "maxCrowns";
	maximumCrownCountContainer.innerHTML = "/" + maxCrownCount;
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
	breakdownContainer.style =	"margin-top: 1em;"
							+	"text-align: left;";

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
		crownTotalContainer.appendChild(maximumCrownCountContainer);

		breakdownContainer.appendChild(document.createElement("p"))
		breakdownContainer.lastChild.style = "text-align: center;";
		breakdownContainer.lastChild.innerHTML = "Your tree is at Level ";
		breakdownContainer.lastChild.appendChild(treeLevelContainer);
		breakdownContainer.appendChild(breakdownList);
		crownLevelContainer.appendChild(breakdownContainer);
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

function displayXPBreakdown(data)
{
	levelProgressPercentage = data['level_progress']*100/data['level_points'];


	if(document.getElementById("XPBox") == null)
	{
		// We haven't made the XP Box yet

		var container = document.createElement("div");
		container.className = "_1E3L7";
		container.id = "XPBox";

		var XPHeader = document.createElement("h2");
		XPHeader.innerText = data['language_string']+ " XP";

		container.appendChild(XPHeader);

		languageLevelContainer = document.createElement("div");
		languageLevelContainer.className = "_2QmPh";

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

			var daysLeft = daysToNextLevel(data['history'], data['level_points']-data['level_progress']);
			var projectedNextLevelCompletion = document.createElement("p");
			projectedNextLevelCompletion.innerHTML =	"At your current rate you will reach the next level in about "
													+	"<span style='font-weight:bold'>"
													+	daysLeft
													+	"</span>"
													+	" days.";

			languageLevelContainer.appendChild(nextLevelProgressElement);
			languageLevelContainer.appendChild(languageLevelProgressBarContainer);
			languageLevelContainer.appendChild(currentLevelProgressElement);
			if (daysLeft != -1)
			{
				languageLevelContainer.appendChild(projectedNextLevelCompletion);
			}
		}
		else
		{
			// Reached max level
			var maxLevelMessage = document.createElement("p");
			maxLevelMessage.innerText = "You have reached the maximum level!";
			languageLevelContainer.appendChild(maxLevelMessage);
		}
		languageLevelContainer.lastChild.style['marginBottom'] = "0";
		container.appendChild(languageLevelContainer);

		document.getElementsByClassName('aFqnr _1E3L7')[0].parentNode.insertBefore(container, document.getElementsByClassName('aFqnr _1E3L7')[0].nextSibling);
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

				var daysLeft = daysToNextLevel(data['history'], data['level_points']-data['level_progress']);
				languageLevelElement.parentNode.lastChild.childNodes[1].innerText = daysLeft;
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
 	var crownLevelCount = [Array(6).fill(0),Array(2).fill(0)]; // will hold number skills at each crown level, index 0 : crown 0 (not finished), index 1 : crown 1, etc.
	
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
		strengths[0].push(skill['strength']);
		
		if(skill['strength'] != 1 && skill['strength'] != 0)
		{
			//Add to needs strengthening if nog at 100% and not at 0% i.e. not started
			needsStrengthening[0].push(skill);
		}

		crownLevelCount[0][skill['progress_v3']['level']]++;
	}

	for (var bonusSkill of bonusSkills)
	{
		strengths[1].push(bonusSkill['strength']);
		if(bonusSkill['strength'] != 1 && bonusSkill['strength'] != 0)
		{
			//Add to needs strengthening if nog at 100% and not at 0% i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}

		crownLevelCount[1][bonusSkill['progress_v3']['level']]++;
	}

	addStrengths(strengths); // call function to add these strengths under the skills
	
	if (needsStrengthening[0].length+needsStrengthening[1].length !=0)
	{
		displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}

	displayCrownsBreakdown(crownLevelCount, skills.length*5 + bonusSkills.length); // call function to add breakdown of crown levels under crown total.

	var XPData =
	{
		'language_string':	userData['language_data'][languageCode]['language_string'],
		'level_progress':	userData['language_data'][languageCode]['level_progress'],
		'level':			userData['language_data'][languageCode]['level'],
		'level_points':		userData['language_data'][languageCode]['level_points'],
		'points':			userData['language_data'][languageCode]['points'],
		'history':			userData['language_data'][languageCode]['calendar']
		//'timezone':			userData['timezone_offset'] seems to not be available for every users, maybe depends on platform use.
	}
	displayXPBreakdown(XPData);

	// All done displaying what needs doing so let reset and get ready for another change.
	resetLanguageFlags();
}

function handleDataResponse(responseText)
{
	userData = JSON.parse(responseText); // store response text as JSON object.
	newDataLanguageCode = Object.keys(userData['language_data'])[0];
	if((!languageCodeChanged) && languageChanged && newDataLanguageCode == languageCode)
	{
		// languageCode hasn't been changed yet but we have changed langauge but the data isn't up to date yet.
		// so request the data again after a little wait, but only if still on the main page.
		if(onMainPage)
		{
			setTimeout(function() {httpGetAsync(encodeURI(window.location+"users/"+username), handleDataResponse);}, 100);
			//setTimeout(function() {httpGetAsync("/users/"+ username, handleDataResponse);}, 100);
		}
	}
	else {
		languageCodeChanged = true;
		getStrengths();	// actual processing of the data.
	}
}

function requestData() // requests data for actively logged in user.
{
	if (!(Object.keys(userData).length === 0 && userData.constructor === Object) && (!languageChanged))
	{
		// If there is already userData and not changing language, display current data while requesting new data.
		getStrengths(userData);
	}
	if(document.getElementsByClassName("_2R9gT").length != 0) // Check if there is a username element
	{
		username = document.getElementsByClassName("_2R9gT")[0].innerHTML;
		httpGetAsync(encodeURI(window.location+"users/"+username), handleDataResponse); // asks for data and async calls handle function when ready.
	} else
	{
		// user not logged in.
	}
}

function checkUIVersion(){
	/*	Old version of UI checking for adding of parts and pentagonal checkpoints
	if (document.getElementsByClassName('_1bcgw').length != 0)
	{
		// Seem to be using new version of tree with the pentagonal checkpoint nodes
		newUIVersion = true;
	} else
	{
		newUIVersion = false;
	}
	*/

	// check for new 'juicy' UI version by testing crown image.
	if (!document.getElementsByClassName("_2PyWM")[0].src.includes("juicy")) // _2PyWM is class of small crown img for each skill
	{
		// if src of crown image isn't the new juicy-crown.svg:
		juicyUI = false;
		// change GOLD and RED colours to old versions.
		GOLD = "rgb(248, 176, 45)";
		RED = "rgb(219, 62, 65)";
	}

}

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
var childListMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(mutation.target == rootElem)
		{
			// root child list has changed so dataReactRoot has probably been replaced, lets redefine it.
			dataReactRoot = rootElem.childNodes[0];
		}
		if(dataReactRoot.childNodes[1].className ==  "_6t5Uh")
		{
			// Top bar div has class for main tree page or words page.
			topBarDiv = dataReactRoot.childNodes[1]
			languageChanged = false; // language hasn't changed this update
			init();
		}
	}
};

var classNameMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(topBarDiv.className == "_6t5Uh" && document.getElementsByClassName("_2XW92").length == 0) // _6t5Uh means we are on body on main page or words page. no _2XW92 means not on words page. So we are on main page.
		{
			onMainPage = true;
			if (language != "")
			{
				// language has previously been set so not first time on home page.
				 if (language != document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[1].innerHTML)
				{
					// language has just changed so set flag to true
					languageChanged = true;
					language = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[1].innerHTML;
					// as the language has just changed, need to wipe the slate clean so no old data is shown after change.
					removeStrengthBars();
					removeNeedsStrengtheningBox();
					removeCrownsBreakdown();
					removeXPBox();
				} else
				{
					// language hasn't just changed set flag to false
					languageChanged = false;
				}
				checkUIVersion(); // here for case of switching language with different UI versions
				requestData(); // call on attribute change
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
};

var classNameObserver = new MutationObserver(classNameMutationHandle);
var childListObserver = new MutationObserver(childListMutationHandle);

function init()
{
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

	var mainBodyElemIn3rd = !dataReactRoot.childNodes[1].classList.contains("_3MLiB") && dataReactRoot.childNodes[2].classList.contains("_3MLiB");
	// Main body container element has class _3MLiB. If in second place, there is no topbar Div, if it is in thrid place, then second should be topBarDiv.
	
	if(mainBodyElemIn3rd) // If main body element is in 3rd place then we are not in a lesson.
	{
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
			checkUIVersion();
			requestData();
		}
		else if(topBarDiv.className == "_6t5Uh" && document.getElementsByClassName("_2XW92").length != 0) // if we are on the words page
		{
			// We are on the words page. Don't need to do anything further, we have set up the observer to see if we go back to the main page from here.
			onMainPage = false;
		}
	} else
	{
		// page we are on is most likely a lesson, and we got here from a link in the strengthenBox.
		onMainPage = false;
	}
}

document.body.onload = init(); // call function to start display sequence on first load

//observer.disconnet(); can't disconnect as always needed while page is loaded.