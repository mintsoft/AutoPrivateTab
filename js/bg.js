opera.extension.onmessage = function(event) {

	var	sitesToMatch = widget.preferences['siteList'],
		doneOnce = false;
	
	sitesToMatch = JSON.parse(sitesToMatch?sitesToMatch:"[]");
	
	var allTabs = opera.extension.tabs.getAll();
	
	//iterate 'backwards', its more likely that the tab is new and is therefore at the end of the 
	// list than near the beginning.
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
		if (!doneOnce && event.data.url.indexOf(sitesToMatch[x])!=-1)
		{
			opera.extension.tabs.create({
				'url': event.data.url, 
				'private': true, 
				'focused': true
			});
					
			if(widget.preferences['closeSourceTab'])
			{
				sourceTab.close();
			}
			break;
		}
	}
}