opera.extension.onmessage = function(event) {
	//console.log(event);
	
	var sitesToMatch = widget.preferences['siteList'];
	var doneOnce = false;
	
	sitesToMatch = JSON.parse(sitesToMatch?sitesToMatch:"[]");
	
	for (var x=0; x<sitesToMatch.length; ++x)
	{
		if (!doneOnce && event.data.url.indexOf(sitesToMatch[x])!=-1)
		{
			opera.extension.tabs.create({
				'url': event.data.url, 
				'private': true, 
				'focused': true
			});
			
			//TODO: optionally close source tab
			doneOnce = true;
		}
	}
}