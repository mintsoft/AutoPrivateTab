/** 
	This contains the injected script and just sends its URL to the bg process
*/
(function(){
	opera.extension.postMessage({
		'url': document.URL
		});
})();