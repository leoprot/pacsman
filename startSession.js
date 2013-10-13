$(document).on('pageinit', '#initPage', function() {
	
	var FSM = FSM_action[FSM_state][EVENT_INIT];
	FSM();
    	
});