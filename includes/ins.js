/** 
	This contains the injected script

	Originally this existed so that the background process was able to access the URL from every tab,
	however this now also sends messages to the background process whenever a page is visited in order
	to have the notifications working if they are enabled.
*/
(function(){
	opera.extension.postMessage({
		'url': document.URL
		});
})();