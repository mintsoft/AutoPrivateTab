
function str_trim(inputString)
{
	return inputString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

opera.extension.onmessage = function(event) {

	var	sitesToMatch = widget.preferences['siteList'],
		sourceTab = {private: true};	//incase of a catastrophe we might a well just bomb out
	
	sitesToMatch = JSON.parse(sitesToMatch?sitesToMatch:"[]");
	
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
	
	for (var x=0; x<sitesToMatch.length; ++x)
	{
		var url_to_compare = str_trim(sitesToMatch[x].toLowerCase());
		if (url_to_compare !=="" && event.data.url.toLowerCase().indexOf(url_to_compare)!=-1)
		{
			opera.extension.tabs.create({
				'url': event.data.url, 
				'private': true, 
				'focused': sourceTab.focused
			});
					
			if(widget.preferences['closeSourceTab'])
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