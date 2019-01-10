const GOLD = "rgb(248, 176, 45)";
const RED = "rgb(219, 62, 65)";
var languageCode = "";
var userData = "";
var newUIVersion = false;

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
		elementContents.push(strengths[i]);
		
		skills.push(elementContents);
	}
	
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
		topOfTree = document.getElementsByClassName('mAsUf')[0].childNodes[1]; // mAsUf is class of the container element just above tree with language name and shop button, may change.
	}
	var strengthenBox;
	var needToAddBox = false;
	if (document.getElementById("strengthenBox") == null) // if we haven't made the box yet, make it
	{
		needToAddBox = true;
		strengthenBox = document.createElement("div"); // div to hold list of skills that need strengthenening
		strengthenBox.id = "strengthenBox";
		strengthenBox.style['textAlign'] = "left";
	}else {
		strengthenBox = document.getElementById("strengthenBox");
	}
	strengthenBox.innerHTML = "The following " + needsStrengthening.length +
								((needsStrengthening.length != 1) ? " skills need": " skill needs") +
								" strengthening: <br/>";
								
	for (var i =0; i< needsStrengthening.length - 1; i++)
	{
		strengthenBox.innerHTML += "<a href='/skill/" +
									languageCode + "/" +
									needsStrengthening[i]['url_title'] +
									((needsStrengthening[i]['progress_v1']['level'] == 5)? "/practice'>":"'>" ) + // 5 crown skill doesn't decay AFAIK so needless but included JIC. Similarly below.
									needsStrengthening[i]['title'] + "</a>, ";
	}
	strengthenBox.innerHTML = strengthenBox.innerHTML.substring(0, strengthenBox.innerHTML.length - 2);
	strengthenBox.innerHTML += (needsStrengthening.length > 1) ? " & ": "";
	strengthenBox.innerHTML += "<a href='/skill/" +
									languageCode + "/" +
									needsStrengthening[needsStrengthening.length -1]['url_title'] +
									((needsStrengthening[needsStrengthening.length -1]['progress_v1']['level'] == 5)? "/practice'>":"'>" ) +
									needsStrengthening[needsStrengthening.length -1]['title'] + "</a>";
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

function getStrengths(responseText) // parses the data from duolingo.com/users/USERNAME and extracts strengths and skills that need strengthening
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
	var data = JSON.parse(responseText);
	
	var strengths = Array();	// will hold the strength values for each skill in tree in order top to bottom, left to right. values between 0 and 1.0 in 0.25 steps.
	var needsStrengthening = Array(); // will hold the objects for the skills that have strength < 1.0
	
	languageCode = Object.keys(data['language_data'])[0]; // only one child of 'language_data', a code for active language.
	
	var skills = data['language_data'][languageCode]['skills']; // skills appear to be inconsistantly ordered so need sorting for ease of use.
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
	
	var bonusSkills = data['language_data'][Object.keys(data['language_data'])[0]]['bonus_skills'] // note bonus skills appear right to left AFAIK.
	for (var i = 0; i <skills.length ; i++)
	{
		if (bonusSkills.length != 0 && i == 5) // between normal skills 6 and 7 is where bonus skills go in tree. CAUTION this is based on spanish tree, could be different for other langs or could be chagened in the future.
		{
			for (var j = bonusSkills.length -1; j > -1; j-- )
			{
				strengths.push(bonusSkills[j]['strength']);
				
				if(bonusSkills[j]['strength'] != 1 && bonusSkills[j]['strength'] != 0)
				{
					//Add to needs strengtheneing if not at 100% and not at 0% i.e. not started
					needsStrengthening.push(bonusSkills[j]);
				}
			}
		}
		strengths.push(skills[i]['strength']);
		
		if(skills[i]['strength'] != 1 && skills[i]['strength'] != 0)
		{
			//Add to needs strengthening if nog at 100% and not at 0% i.e. not started
			needsStrengthening.push(skills[i]);
		}
	}
	
	addStrengths(strengths); // call function to add these strengths under the skills
	
	if (needsStrengthening.length !=0)
	{
		displayNeedsStrengthening(needsStrengthening); // if there are skills needing to be strengthened, call function to display this list
	}
}

function handleDataResponse(responseText)
{
	userData = responseText; // store response text for future use in faster display when changeing page.
	getStrengths(responseText); // actual handleing of data.
}

function requestData() // requests data for actively logged in user.
{
	if (userData != "")
	{
		getStrengths(userData);
	}
	if(document.getElementsByClassName("_2R9gT").length != 0)
	{
		var username = document.getElementsByClassName("_2R9gT")[0].innerHTML;
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

checkUIVersion();
document.body.onload = requestData(); // call function to start display sequence on first load

var dataReactRoot = document.body.childNodes[0].childNodes[0]; // When entering or leaving a lesson children change and new body so need to detect that to know when to reload the bars.
var topBarDiv = dataReactRoot.childNodes[1];// seems to stay in place across page changes with just class changes when going to shop page etc.
// detect changes to class using mutation of attributes, may trigger more than necessary but it catches what we need.
var languageLogo = document.getElementsByClassName("_3I51r _2OF7V")[0].childNodes[0];

var childListMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(mutation.type == 'childList' && dataReactRoot.childNodes[1].className ==  "_6t5Uh")
		{
			//should only be true when exiting a lesson.
			checkUIVersion(); // here for case of switching language with different UI versions
			requestData();
		}
	}
};

var classNameMutationHandle = function(mutationsList, observer)
{
	for (var mutation of mutationsList)
	{
		if(mutation.type == 'attributes' && topBarDiv.className == "_6t5Uh") // body on main page
		{
			checkUIVersion(); // here for case of switching language with different UI versions
			requestData(); // call on attribute change
		}
	}
};

var classNameObserver = new MutationObserver(classNameMutationHandle);
var childListObserver = new MutationObserver(childListMutationHandle);

classNameObserver.observe(topBarDiv,{attributes: true});
childListObserver.observe(dataReactRoot,{childList: true});
classNameObserver.observe(languageLogo,{attributes: true});


//observer.disconnet(); can't disconnect as always needed while page is loaded.