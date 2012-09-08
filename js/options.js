function addKeywordObjectToOptions(keywordObject)
{
	document.getElementById("keyList").value += keywordObject.keyword+"\n";
}

function loadList() {
	var sitesToMatch = retrieveAndParsePropertyList();
	
	for (var x in sitesToMatch)
	{
		if(sitesToMatch[x].keyword.replace(/^\s+|\s+$/g, "")!="")	//skip blanks if they exist
			addKeywordObjectToOptions(sitesToMatch[x]);
	}
	
	document.getElementById("closeSourceTab").checked = widget.preferences['closeSourceTab']==="true";
}

function saveList() {
	var inputList = document.getElementById("keyList").value;
	inputList = inputList.replace(/^\s+|\s+$/g, "");	//remove any spare lines on the end
	var arrayList = inputList.split(/[\r\n]+/);
	var savingList = {};
	
	for (var x=0; x<arrayList.length; ++x)
	{
		savingList[x] = {
			'keyword' : arrayList[x], 
			'private' : true,
			'pin'	  : false
		};
	}
	
	widget.preferences['siteList'] = JSON.stringify(savingList);
	
	widget.preferences['closeSourceTab'] = document.getElementById("closeSourceTab").checked;
	
	return false;
}

window.onload = function() {
	loadList();
	document.getElementById("saveButtonInput").onclick = saveList;
	document.getElementById("prefform").onsubmit = saveList;
}