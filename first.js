chrome.tabs.executeScript(null, {file: "jquery-3.1.0.min.js"});
chrome.tabs.executeScript(null, {file: "popupmain.js"});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	//renderStatus(request.email);
				
	$('#email').text(request.email);
	
	prepareSendEmail();
				
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
  
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function prepareSendEmail(){
	var mailHrefId = 'autoemailanchor';
	var text = $('#email').text();
	
	//if( $('body').find('a[id="autoemailanchor"]').length < 0 ) {
	
		//$('body').append('<a id="' + mailHrefId + '" href="mailto:ananta.ghosh@enosisbd.com?subject=Daily&nbsp;Plan&nbsp;&body='+text+'&cc=nasif@enosisbd.com"></a>');
	//}
	
	//$('#sendEmailAnchor').attr('href', 'mailto:ananta.ghosh@enosisbd.com?subject=Daily&nbsp;Plan&nbsp;&body='+text+'&cc=nasif@enosisbd.com')
	
	//$('#' + mailHrefId).trigger('click');
	
	var mailData = { emailmsg: text };
	
	$.ajax({
	  method: "GET",
	  url: "https://192.168.1.62/aspx/test/testsendemail.aspx",
	  dataType: "jsonp",
	  crossDomain: true,
	  data: { emailmsg: text }
	})
	  .done(function( msg ) {
		alert( "Data Send: " + msg );
		renderStatus(msg);
	  });
	  
	  /*var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://192.168.1.62/aspx/test/testsendemail.aspx", true, mailData);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			// JSON.parse does not evaluate the attacker's scripts.
			var resp = JSON.parse(xhr.responseText);
		  }
		}
		xhr.send();*/
}