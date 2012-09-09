"use strict";
opera.extension.onmessage = function(event) {

	var	sitesToMatch = retrieveAndParsePropertyList(),
		sourceTab = { 'private': true, 'apt_fake' : true };	//incase of a catastrophe we might a well just bomb out
	
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
	
	if(sourceTab.apt_fake)
		return;
	
	for (var x in sitesToMatch)
	{
		var url_to_compare = sitesToMatch[x].keyword.toLowerCase().trim();
		if(url_to_compare == "") 
			continue;
		if (event.data.url.toLowerCase().indexOf(url_to_compare)!=-1)
		{
			//Pinning & not private, so update current tab
			if(sitesToMatch[x].pin && !sitesToMatch[x].private)
			{
				sourceTab.update({locked: true});
			}
			
			//Privating - create a new tab anyway
			if(sitesToMatch[x].private)
			{
				opera.extension.tabs.create({
					'url'	  : event.data.url, 
					'private' : true, 
					'focused' : sourceTab.focused,
					'locked'  : sitesToMatch[x].pin
				});
						
				if(sitesToMatch[x].closeSource)
				{
					sourceTab.close();
				}
				break;
			}
		}
	}
}
/*
//unwise to use this atm, appears to be a bug in the tabs handling - blanks the url for the tab entirely!?
opera.extension.tabs.oncreate = function(event) {
	console.debug("tabs.oncreate",event);
}
*/