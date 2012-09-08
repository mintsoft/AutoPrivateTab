"use strict";
function addKeywordObjectToOptions(keywordObject)
{
	//document.getElementById("keyList").value += keywordObject.keyword+"\n";
	var target = document.getElementById("optionsTableBody");
	//add new row to table
	var template = document.getElementById("optionsTemplate");
	var newObject = template.cloneNode(true);
	newObject.className='';
	
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
	
	for (var x in sitesToMatch)
	{
		if(sitesToMatch[x].keyword.replace(/^\s+|\s+$/g, "")!="")	//skip blanks if they exist
			addKeywordObjectToOptions(sitesToMatch[x]);
	}
}

function saveList() {
	var inputList = document.getElementById("keyList").value;
	inputList = inputList.replace(/^\s+|\s+$/g, "");	//remove any spare lines on the end
	var arrayList = inputList.split(/[\r\n]+/);
	var savingList = {};
	
	for (var x=0; x<arrayList.length; ++x)
	{
		savingList[x] = {
			'keyword'     : arrayList[x].trim(), 
			'private'     : true,
			'pin'	 	  : false,
			'closeSource' : document.getElementById("closeSourceTab").checked
		};
	}
	
	widget.preferences['siteList'] = JSON.stringify(savingList);
	
	return false;
}

window.onload = function() {
	loadList();
	document.getElementById("saveButtonInput").onclick = saveList;
	document.getElementById("prefform").onsubmit = saveList;
	document.getElementById("addMore").onclick = function() { addKeywordObjectToOptions({'keyword':''}); return false; };
}