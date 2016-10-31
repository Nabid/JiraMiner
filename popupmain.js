function extractEmail() {
	var text = 'Rahul,\nI have included our daily plan with this email. Please let me know if you have any feedback.\n';
	var userComment = [];
	
	$('div.activity-comment').filter(function () {
		var retVal = false;
		$(this).children().find('div.action-details').children().find('span.date').each(function () {

			var dt = new Date($(this).attr('title'));
			var nw = new Date();
			if (dt.getDate() == nw.getDate() && dt.getMonth() == nw.getMonth() && dt.getFullYear() == nw.getFullYear()) {
				retVal = true;
			}
		});
		return retVal;
	}).each(function () {
		var comment = '\n' + $(this).find('div a.user-avatar').filter(function (i, v) { if (i == 0) return true; }).text().trim().replace(/[^a-zA-z0-9, -]/gi, ' ').replace(/ +/gi, ' ');

		$(this).children().find('div.action-body ul li').each(function () {
			comment = comment + '\n' + $(this).text().trim().replace(/[^a-zA-z0-9, -]/gi, ' ').replace(/ +/gi, ' ');
			$(this).find('span a').each(function () {
				var issueID = $(this).parent().text().trim().replace(/[^a-zA-z0-9, -]/gi, ' ').replace(/ +/gi, ' ');
				var issueDesc = issueID.split(' ')[0] + ' (' + $(this).attr('original-title').trim().replace(/[^a-zA-z0-9, -]/gi, ' ').replace(/ +/gi, ' ') + ')';
				comment = comment.replace(issueID, issueDesc);
			});
		});

		comment = comment.replace('Md Nabid Imteaj Enosis', 'Nabid:')
					.replace('Ananta Ghosh Enosis', 'Ananta:')
					.replace('Kazi Mohammed Ehsan Enosis', 'Ehsan:')
					.replace('Saifur Rahman', 'Saifur:');

		if (comment.indexOf('Ananta:') >= 0) userComment[0] = comment;
		else if (comment.indexOf('Ehsan:') >= 0) userComment[1] = comment;
		else if (comment.indexOf('Nabid:') >= 0) userComment[2] = comment;
		else if (comment.indexOf('Saifur:') >= 0) userComment[3] = comment;
	});


	text = (text + userComment.join('\n') + '\n\nWith Regards,\nAnanta')
	.replace(/Yesterday/gi, 'Yesterday:')
	.replace(/Today/gi, 'Today:')
	.replace(/Impediments/gi, 'Impediments:');

	console.log(text);
	
	var mailHrefId = 'autoemailanchor';
	if( $('body').find('a[id="autoemailanchor"]').length < 0 ) {
	
		$('body').append('<a id="' + mailHrefId + '" href="mailto:ananta.ghosh@enosisbd.com?subject=Daily&nbsp;Plan&nbsp;&body='+text+'&cc=nasif@enosisbd.com"></a>');
	}
	
	$('#' + mailHrefId).trigger('click');
	
	chrome.runtime.sendMessage({greeting: "hello", email: text}, function(response) {
	  console.log(response.farewell);
	});
	
	//renderStatus(text);
	//alert(text);
}

//alert('extractEmail');
extractEmail();
//window.open('mailto:test@example.com?subject=subject&body=body');
/*
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});

chrome.tabs.executeScript(null, {file: "content_script.js"});
*/