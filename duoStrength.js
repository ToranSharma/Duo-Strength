const GOLD = "rgb(248, 176, 45)";
const RED = "rgb(219, 62, 65)";
var languageCode = "";
var languageCodeChanged = false;
var language = "";
var languageChanged = false;
var languageLogo;


var username = "";
var userData = Object();
var newUIVersion = false;
var numBonusSkillsInTree = 0;

var dataReactRoot;
var topBarDiv;

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

function addStrengths(strengths) // Adds strength bars and percentages under each skill in the tree.
{
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
		var elementContents = [skillElements[i].childNodes[0].childNodes[0]];
		
		// name is a span element, normally it is the last element but if the skill is clicked then a new div is created with the start lesson button etc below the name plate. So need to find the correct span element.
		for (var spanElement of skillElements[i].childNodes[0].getElementsByTagName('span'))
		{
			if (spanElement.parentNode == elementContents[0].parentNode)
			{
				elementContents.push(spanElement);
			}
		}
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
			strengthBar.id = name + "StrengthBar";
			strengthBar.style['display'] = "inline-block";
			strengthBar.style['width'] = (strength*75)+"%";
			strengthBar.style['height'] = "1em";
			strengthBar.style['backgroundColor'] = (strength == 1.0 ? GOLD : RED);
			strengthBar.style['borderRadius'] = "0.5em";
			strengthBar.style['verticalAlign'] = "text-top";
			
			var strengthValue = document.createElement("div");
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
	var strengthenBox; // will be a div to hold list of skills that need strengthenening
	var needToAddBox = false;
	if (document.getElementById("strengthenBox") == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div");
		strengthenBox.id = "strengthenBox";
		strengthenBox.style['textAlign'] = "left";
	}
	else
	{
		strengthenBox = document.getElementById("strengthenBox");
	}

	var numSkillsToBeStrengthened = needsStrengthening[0].length +needsStrengthening[1].length;

	strengthenBox.innerHTML = "The following " + numSkillsToBeStrengthened +
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
									((needsStrengthening[0][i]['progress_v1']['level'] == 5)? "/practice'>":"'>" ) + // 5 crown skill doesn't decay AFAIK so needless but included JIC.
									needsStrengthening[0][i]['title'] + "</a>, ";
		} else
		{
			// index has past normal skills so doing bonus skills now.
			bonusSkillIndex = i - needsStrengthening[0].length;
			strengthenBox.innerHTML += "<a href='/skill/" +
									languageCode + "/" +
									needsStrengthening[1][bonusSkillIndex]['url_title'] +
									((needsStrengthening[1][bonusSkillIndex]['progress_v1']['level'] == 1)? "/practice'>":"'>" ) + // 1 crown bonus skill does decay but is on practice not lessons.
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
										((needsStrengthening[1][needsStrengthening[1].length - 1]['progress_v1']['level'] == 1)? "/practice'>":"'>" ) +
										needsStrengthening[1][needsStrengthening[1].length - 1]['title'] + "</a>";
	} else
	{
		// last skill to be displayed is a normal skill
		strengthenBox.innerHTML += "<a href='/skill/" +
										languageCode + "/" +
										needsStrengthening[0][needsStrengthening[0].length -1]['url_title'] +
										((needsStrengthening[0][needsStrengthening[0].length -1]['progress_v1']['level'] == 5)? "/practice'>":"'>" ) +
										needsStrengthening[0][needsStrengthening[0].length -1]['title'] + "</a>";
	}
	if(needToAddBox)
	{
		topOfTree.appendChild(strengthenBox);
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

	languageCode = Object.keys(userData['language_data'])[0]; // only one child of 'language_data', a code for active language.
	var skills = userData['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
	
	skills.sort(
		function(x, y)
		{
			if (x['coords_y'] < y['coords_y']) // x above y give x
			{
				return -1;
			} else if (x['coords_y'] > y['coords_y'])// x below y give y
			{
				return 1;
			} else // x and y on same level
			{
				if (x['coords_x'] < y['coords_x']) // x to left of y give x
				{
					return -1;
				} else // x to right of y give y
				{
					return 1;
				}
			}
		}
	);
	
	var bonusSkills = userData['language_data'][Object.keys(userData['language_data'])[0]]['bonus_skills'] // note bonus skills appear right to left AFAIK.
	for (var skill of skills)
	{
		strengths[0].push(skill['strength']);
		
		if(skill['strength'] != 1 && skill['strength'] != 0)
		{
			//Add to needs strengthening if nog at 100% and not at 0% i.e. not started
			needsStrengthening[0].push(skill);
		}
	}
	for (var bonusSkill of bonusSkills)
	{
		strengths[1].unshift(bonusSkill['strength']);
		if(bonusSkill['strength'] != 1 && bonusSkill['strength'] != 0)
		{
			//Add to needs strengthening if nog at 100% and not at 0% i.e. not started
			needsStrengthening[1].unshift(bonusSkill);
		}
	}
	
	addStrengths(strengths); // call function to add these strengths under the skills
	
	if (needsStrengthening.length !=0)
	{
		displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}

	// All done displaying what needs doing so let reset and get ready for another change.
	resetLanguageFlags();
}

function handleDataResponse(responseText)
{
	userData = JSON.parse(responseText); // store response text as JSON object.
	newDataLanguageCode = Object.keys(userData['language_data'])[0];
	if((!languageCodeChanged) && languageChanged && newDataLanguageCode == languageCode)
	{
		// languageCode hasn't been changed yet but we have changed langauge but the data isn't up to dat yet.
		// so request the data again after a little wait.
		setTimeout(function() {httpGetAsync("/users/"+ username, handleDataResponse);}, 100);
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
		httpGetAsync("/users/"+username, handleDataResponse); // asks for data and async calls handle function when ready.
	} else
	{
		console.log("User does not appear to be not logged in.");
	}
}

function checkUIVersion(){
	if (document.getElementsByClassName('_1bcgw').length != 0)
	{
		// Seem to be using new version of tree with the pentagonal checkpoint nodes
		newUIVersion = true;
	} else
	{
		newUIVersion = false;
	}
}

// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
var childListMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(mutation.type == 'childList' && dataReactRoot.childNodes[1].className ==  "_6t5Uh")
		{
			topBarDiv = dataReactRoot.childNodes[1]
			// should only be true when exiting a lesson.
			languageChanged = false; // language hasn't changed this update
			init();
		}
	}
};

var classNameMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(mutation.type == 'attributes' && topBarDiv.className == "_6t5Uh") // body on main page
		{
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
	}
};

var classNameObserver = new MutationObserver(classNameMutationHandle);
var childListObserver = new MutationObserver(childListMutationHandle);


function init()
{
	dataReactRoot = document.body.childNodes[0].childNodes[0]; // When entering or leaving a lesson children change and new body so need to detect that to know when to reload the bars.
	childListObserver.observe(dataReactRoot,{childList: true});
	

	if(!dataReactRoot.childNodes[1].classList.contains("_3MLiB") && dataReactRoot.childNodes[2].classList.contains("_3MLiB"))
	{
		// main body container element has class _3MLiB. If in second place, there is no topbar Div, if it is in thrid place, then second should be topBarDiv.
		topBarDiv = dataReactRoot.childNodes[1];
		classNameObserver.observe(topBarDiv,{attributes: true});

		if(topBarDiv.className == "_6t5Uh") // if we are on the homepage
		{
			if (languageLogo != document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[0])
			{
				languageLogo = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[0];
				classNameObserver.observe(languageLogo,{attributes: true});
			}
			language = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[1].innerHTML;
			checkUIVersion();
			requestData();
		}
	} else
	{
		// page we are on is most likely a lesson, and we go here from a link in the strengthenBox.
	}
}


document.body.onload = init(); // call function to start display sequence on first load

//observer.disconnet(); can't disconnect as always needed while page is loaded.