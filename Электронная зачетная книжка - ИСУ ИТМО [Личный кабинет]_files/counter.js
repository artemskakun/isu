;
'use strict';
$(document).ready(function () {
	function checkMessageCount () {
		var counterHolders = $('.autoUpdateMsgCounter');
		if (counterHolders.length) {
			runAsyncAjaxRequest3({
				flow_id: 2002, // Личный кабинет
				pageNew: 0,
				process: 'GET_MESSAGE_COUNT',
				callback: function (e) {
					var msgCount = +e.response;
					if (!isNaN(msgCount) && msgCount > 0) {
						counterHolders.removeClass('hide').html(msgCount);
					} else {
						counterHolders.addClass('hide');
					}
				}
			});
		}
	}
	
	init.push(checkMessageCount);
	
	G2.checkMessageCount = checkMessageCount;
	
	setInterval(checkMessageCount, 120000);
});