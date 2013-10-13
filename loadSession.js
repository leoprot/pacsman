function loadSession(){
		
		$.ajax({
			url : "trialBlock.json",
			crossDomain : true,
			dataType : 'json',
			error: ajax_error_callback,
			success : ajax_success_callback
		}); // END - $.ajax({})
		
		// JSON NSX Cross Domain call Implementation - - - - - - - - - - - - - - - - - - -
			// ATENTION: On the first time was needed to access the JSON URl trough 
			// HTPPS the URl need to be mark as secure on the browser. We have a certificate issue to handle
		
		// Implementation #1
		$.ajax({
			url: 'https://dev.ummsshriver.org:8443/nsx/v1/initialize_p/edu.ummsshriver.nsx.pacsman_v1.Experiment/audviscur',
		
			dataType: 'jsonp',
			success: function(data){
				var text = '';
			
				text += '<h1>NSX Response Implementation #1 - Data from <i>dev.ummsshriver.org</i></h1>';
				text += '<p><b>' + 'experiment_name: </b>' + data.experiment_name + '</p>';
				text += '<p><b>' + 'status: </b>' + data.status + '</p>';
				text += '<p><b>' + 'sl_ctx: </b>' + data.sl_ctx + '</p>';
				text += '<p><b>' + 'btg_ctx: </b>' + data.btg_ctx + '</p>';
				text += '<p><b>' + 'stimuli: </b>' + data.stimuli + '</p>';
				text += '<p><b>' + 'trials: </b>' + data.trials + '</p>';
				text += '<p><b>' + 'interactions: </b>' + data.interactions + '</p>';
				text += '<p><b>' + 'reports: </b>' + data.reports + '</p>'	;			
			
				$('#data1').html(text);
				
				
				// Handle with the stimuli as object
				stmliImg = jQuery.parseJSON( data.stimuli );
				console.log(stmliImg['teaching']);
				console.log(stmliImg['control']);
				
				$('#data1').append('<hr><p><u>Handle with the stimuli as object - Teaching Stimuli</u></p>')
				for(var x=0; x < stmliImg['teaching'].length; x++){
					$('#data1').append('<b>Stimulus:</b> ' + stmliImg['teaching'][x] + '<br>');
				}
				$('#data1').append('<p><u>Handle with the stimuli as object - Control Stimuli</u></p>')
				for(var x=0; x < stmliImg['control'].length; x++){
					$('#data1').append('<b>Stimulus:</b> ' + stmliImg['control'][x] + '<br>');
				}
				$('#data1').append('<hr>');					
			},
			error: function(data) {
				alert("Failed: " + data);
			}	
		});
	// - - - - - - - -- - - - - - - - - - - - - - - - - - - - -- - - - - -- 
	
}

// -    -- - - --- - ---------
	function ajax_success_callback (data) {
		var FSM = FSM_action[FSM_state][EVENT_AJAX_SUCCESS];
		FSM(data);
	}
	
	function ajax_error_callback (data) {
		FSM = FSM_action[FSM_state][EVENT_AJAX_ERROR];
		FSM(data);
	}
	
	//FSM_action[FSM_state][EVENT_AJAX_SUCCESS]
	function ajax_success (data) {		
			
			// Global Variable with all Trial Block information (Trials, Session Data and Interactions)
			TrialBlockData = data; // Global variable: the session data (all trials and session info)
			trialData = TrialBlockData.user.application[0].session[0].trialBlock.trial;
			
			console.log('Trials of this session, on trialData Object:');
			console.log(trialData);
			
			//DEBUG: Show the stimuli set for this session
			var textTemp = '<h1>NSX Response Implementation (localhost) - Data from <i>offline JSON file</i></h1>';
				for(var trl = 0; trl < trialData.length; trl++){
					
					textTemp += "<p> Trial "+trl+"<ul>";
					for(var key = 0; key < trialData[trl].stimKey.length; key++){
						textTemp += "<li>"+trialData[trl].stimKey[key].id+": <a href='"+appPath+"/assets/"+trialData[trl].stimKey[key].stimId+"'>"+trialData[trl].stimKey[key].stimId+"</a></li>";
					}
					textTemp += "</ul></p>";
				}
			$('#startPage').append(textTemp);
			
			// Find the Total number of trials in this session
			sessionTrialSize = trialData.length;
			lastTrial = sessionTrialSize -1;
			
			lastLayoutLoaded = trialData[0].layoutId;
			
			// Among Trials Links
			$(".TrialLinks").click(function(){
				$.mobile.changePage("#Page"+nextScreen);
		  	});
		
		} // END - success : function (data) {}
		
