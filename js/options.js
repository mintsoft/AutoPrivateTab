function loadList() {
	var sitesToMatch = widget.preferences['siteList'];
	sitesToMatch = JSON.parse(sitesToMatch?sitesToMatch:"[]");
	
	for (x=0; x<sitesToMatch.length; ++x)
	{
		if(sitesToMatch[x].replace(/^\s+|\s+$/g, "")!="")	//skip blanks if they exist
			document.getElementById("keyList").value += sitesToMatch[x]+"\n";
	}
}

function saveList() {
	var inputList = document.getElementById("keyList").value;
	inputList = inputList.replace(/^\s+|\s+$/g, "");	//remove any spare lines on the end
	var arrayList = inputList.split(/[\r\n]+/);
	widget.preferences['siteList'] = JSON.stringify(arrayList);
	return false;
}

window.onload = function(){
	loadList();
	document.getElementById("saveButtonInput").onclick = saveList;
	document.getElementById("prefform").onsubmit = saveList;
}