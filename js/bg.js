"use strict";
opera.extension.onmessage = function(event) {

	var	sitesToMatch = retrieveAndParsePropertyList(),
		sourceTab = { 'private': true };	//incase of a catastrophe we might a well just bomb out
	
	var allTabs = opera.extension.tabs.getAll();
	
	//iterate 'backwards', its more likely that the tab is new and is therefore at the end of the 
	// list than near the beginning?
	for(var x=allTabs.length-1; x>=0; --x) 
	{
		if(allTabs[x].port === event.source)
		{
			sourceTab = allTabs[x];
			break;
		} 
	}

	//if we're already private then do nothing
	if(sourceTab.private==true)
		return;
	
	for (var x in sitesToMatch)
	{
		//is the variable a string? (old format)
		//is the variable an array/object (new format)
		var url_to_compare = sitesToMatch[x].keyword.toLowerCase().trim();
		if (url_to_compare !=="" && event.data.url.toLowerCase().indexOf(url_to_compare)!=-1)
		{
			opera.extension.tabs.create({
				'url'	  : event.data.url, 
				'private' : true, 
				'focused' : sourceTab.focused
			});
					
			if(sitesToMatch[x].closeSource)
			{
				sourceTab.close();
			}
			break;
		}
	}
}
/*
//unwise to use this atm, appears to be a bug in the tabs handling - blanks the url for the tab entirely!?
opera.extension.tabs.oncreate = function(event) {
	console.debug("tabs.oncreate",event);
}
*/