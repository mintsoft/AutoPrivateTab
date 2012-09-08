"use strict";
function retrieveAndParsePropertyList()
{
	var siteList = widget.preferences['siteList'];
	siteList = JSON.parse(siteList?siteList:"[]");
	//convert old format to new format
	for (var x in siteList)
	{
		if(typeof siteList[x] === "string")
		{
			siteList[x] = {
							'keyword'	  : siteList[x], 
							'private'	  : true,
							'closeSource' : widget.preferences['closeSourceTab']=="true"
						};
		}
	}
	return siteList;
}