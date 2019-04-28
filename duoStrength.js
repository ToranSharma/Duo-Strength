GOLD = "rgb(250, 217, 29)"; // "rgb(248, 176, 45)" old gold colour
RED = "rgb(244, 78, 81)"; // "rgb(219, 62, 65)";  old red colour
var languageCode = "";
var language = "";
var languageChanged = false;
var languageLogo;


var username = "";
var userData = Object();
var oldUI = false;

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
			strengthBarHolder.style['display'] = display;
			
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
			setTimeout(function() {displayNeedsStrengthening(needsStrengthening);}, 500);
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
									+ "margin-top: -" + document.getElementsByClassName("w8Lxd")[0].offsetHeight + "px;"
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
	}
	else
	{
		strengthenBox = document.getElementById("strengthenBox");
	}

	var numSkillsToBeStrengthened = needsStrengthening[0].length + needsStrengthening[1].length;

	strengthenBox.innerHTML = "";
	if (oldUI) strengthenBox.appendChild(shopButtonFloatedDiv);
	
	strengthenBox.innerHTML += "The following " + numSkillsToBeStrengthened +
								((needsStrengthening[0].length + needsStrengthening[1].length != 1) ? " skills need": " skill needs") +
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
		topOfTree.append(strengthenBox);
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
	
	var strengths = [[],[]];	// will hold  arry of the strength values for each skill in tree in order top to bottom, left to right and array of strengths of bonus skills. values between 0 and 1.0 in 0.25 steps.
	var needsStrengthening = [[],[]]; // will hold the objects for the skills that have strength < 1.0 and the bonus skills that have strength < 1.0.

	var skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	var bonusSkills = userData['language_data'][Object.keys(userData['language_data'])[0]]['bonus_skills'];

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
		strengths[0].push([skill['strength'],Boolean(skill['progress_v3']['level'])]);
		if(skill['strength'] != 1 && skill['strength'] != 0 && skill['progress_v3']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[0].push(skill);
		}
	}
	for (var bonusSkill of bonusSkills)
	{
		strengths[1].push([bonusSkill['strength'],Boolean(skill['progress_v3']['level'])]);
		if(bonusSkill['strength'] != 1 && bonusSkill['strength'] != 0 && bonusSkill['progress_v3']['level'] != 0)
		{
			//Add to needs strengthening if not at 100% and not at 0% and not at 0 crowns i.e. not started
			needsStrengthening[1].push(bonusSkill);
		}
	}
	
	addStrengths(strengths); // call function to add these strengths under the skills
	
	if (needsStrengthening[0].length+needsStrengthening[1].length !=0)
	{
		displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}
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
		if(mutation.target == rootElem)
		{
			// root child list has changed so dataReactRoot has probably been replaced, lets redefine it.
			dataReactRoot = rootElem.childNodes[0];
		}
		checkUIVersion();
		if(!oldUI)
		{
			if(dataReactRoot.childNodes[1].className != "BWibf _3MLiB")
			{
				// not just changed into a lesson
				topBarDiv = dataReactRoot.childNodes[1].childNodes[1].childNodes[1].childNodes[0].className;
				languageChanged = false;
				init();
			}
		}
		else
		{
			if(dataReactRoot.childNodes[1].className ==  "_6t5Uh")
			{
				// Top bar div has class for main tree page or words page.
				topBarDiv = dataReactRoot.childNodes[1]
				languageChanged = false; // language hasn't changed this update
				init();
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
					} else
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
		var mainBodyElemIn3rd = !dataReactRoot.childNodes[1].classList.contains("_3MLiB") && dataReactRoot.childNodes[2].classList.contains("_3MLiB");
		// Main body container element has class _3MLiB. If in second place, there is no topbar Div, if it is in thrid place, then second should be topBarDiv.
		// topBarDiv is no longer second, that it is nested a few levels down inside that.

		if(mainBodyElemIn3rd) // If main body element is in 3rd place then we are not in a lesson.
		{
			checkUIVersion();
			if (!oldUI)
			{
				// Using new white topBar layout
				topBarDiv = dataReactRoot.childNodes[1].childNodes[1].childNodes[1].childNodes[0]; // direct container of the divs holding the navigation butons, has class _3F_8q

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
				}
				else
				{
					/* unused/unusable
					var discussionNav = topBarDiv.childNodes[2];
					*/
					var shopNav = topBarDiv.childNodes[4];
					languageLogo = topBarDiv.childNodes[8];
				}
				
				// set up observers for page changes
				classNameObserver.observe(homeNav,{attributes: true}); // Observing to see if class of homeNav changes to tell if we have switched to or from main page.
				/* unused/unusable
				classNameObserver.observe(discussionNav,{attributes: true}); // Observing to see if class of discussionNav changes to tell if we have switched to or from discussion page. Though the extension does not handle this domain due to forums subdomain prefix.
				*/
				classNameObserver.observe(shopNav,{attributes: true}); // Observing to see if class of shopNav changes to tell if we have switched to or from the shop.

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