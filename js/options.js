"use strict";
function addKeywordObjectToOptions(keywordObject)
{
	//document.getElementById("keyList").value += keywordObject.keyword+"\n";
	var target = document.getElementById("optionsTableBody");
	//add new row to table
	var template = document.getElementById("optionsTemplate");
	var newObject = template.cloneNode(true);
	newObject.className='optionsRow';
	
	//populate with the correct information
	newObject.querySelector("input[name=match]").value = keywordObject.keyword;
	newObject.querySelector("input[name=close]").checked = keywordObject.closeSource;
	newObject.querySelector("input[name=private]").checked = keywordObject.private; 
	newObject.querySelector("input[name=pin]").checked = keywordObject.pin;
	newObject.querySelector("img[title=Delete]").onclick = function(){deleteThisKeywordOption(this);return false;}
	target.appendChild(newObject);
	return false;
}

function deleteThisKeywordOption(keywordObject)
{
	keywordObject.parentNode.parentNode.parentNode.removeChild(keywordObject.parentNode.parentNode);
}

function loadList() {
	var sitesToMatch = retrieveAndParsePropertyList();
	var numAdded = 0;
	for (var x in sitesToMatch)
	{
		if(sitesToMatch[x].keyword.replace(/^\s+|\s+$/g, "")!="")	//skip blanks if they exist
		{
			addKeywordObjectToOptions(sitesToMatch[x]);
			++numAdded;
		}
	}
	
	//if there are no rows in the table, add a placeholder for appearance
	if(numAdded==0)
	{
		document.getElementById("addMore").click();
	}
}

function saveList() {
	var savingList = [];
	var arrayList = document.getElementById("optionsTable").querySelectorAll("tr.optionsRow");
	for (var x=0; x<arrayList.length; ++x)
	{
		var savingObject = {
			'keyword'     : arrayList[x].querySelector("input[name=match]").value, 
			'private'     : arrayList[x].querySelector("input[name=private]").checked,
			'pin'	 	  : arrayList[x].querySelector("input[name=pin]").checked,
			'closeSource' : arrayList[x].querySelector("input[name=close]").checked
		};
	
		if(savingObject.keyword.trim() != "")
			savingList.push(savingObject); 
	}
	
	widget.preferences['siteList'] = JSON.stringify(savingList);
	
	return false;
}

window.onload = function() {
	document.getElementById("saveButtonInput").onclick = saveList;
	document.getElementById("prefform").onsubmit = saveList;
	document.getElementById("addMore").onclick = function() { addKeywordObjectToOptions({'keyword':'', 'private':true}); return false; };
	
	loadList();
}