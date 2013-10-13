function setVisualKeysBehavior(targetScreenPrm2){
	// FUNCTION WHO MONITOR CLICKS ON ALL STIMULI KEYS
		// Global var keysActive (global_var.js)
	if (keysActive == true){
		$("#Screen"+targetScreenPrm2+" > .stml_btn").mousedown(function(){
			// Visual feedback
			$(this).css( "border", "0px solid red" );
			$(this).css( "border", "3px solid red" );
		});
		
		// Visual feedback
		$("#Screen"+targetScreenPrm2+" > .stml_btn").mouseover(function(){
			$(this).css("border", "3px solid blue");
		});
				$("#Screen"+targetScreenPrm2+" > .stml_btn").mouseout(function(){
			$(this).css("border", "1px solid black");
		});

	}
	
}

function setGeneralKeysBehavior(targetScreenPrm2){
	// FUNCTION WHO MONITOR CLICKS ON ALL STIMULI KEYS
		// Global var keysActive (global_var.js)
		$("#Screen"+targetScreenPrm2+" > .stml_btn").mousedown(function(){
			var keyCliked = $(this).attr('id');
			var KeyFunction = $(this).attr("data-stmFunction");
			var activeScreenID = $(this).parent().attr('id');
			activeScreenID = activeScreenID.substr(activeScreenID.length - 1); // => "1"		

			if (KeyFunction == "Sample"){
				
				FSM_action[FSM_state][EVENT_CLICK_SAMPLE](KeyFunction, keyCliked, activeScreenID);

			}
		
			if (KeyFunction == "S+"){
				
				FSM_action[FSM_state][EVENT_CLICK_S_PLUS](KeyFunction, keyCliked, activeScreenID);
				
			}

			if (KeyFunction == "S-"){
				
				FSM_action[FSM_state][EVENT_CLICK_S_MINUS](KeyFunction, keyCliked, activeScreenID);

			}
		});
		
		var screenDIVStyle = {
				backgroundColor: "#996666",
				width: "50%",
				margin: "0 auto",
				MarginLeft: "auto",
				MarginRight: "auto"
			};
		$(".screenDIV").css(screenDIVStyle);
}

	 function setTrialProperties(loadTrialPrm, targetScreenPrm, trialLayout){

		if (loadTrialPrm > lastTrial){
			console.log("setTrialProperties() - Last session reached");
			return;
		} else {	

			//Analyses if is necessary change the layout files
			if (lastLayoutLoaded !== trialLayout){
				console.log("Layout "+trialLayout+" is needed for TRIAL: "+loadTrialPrm+" (CSS and JS files).");
				// TO DO: Call the new layout file
			}
		}

	} // END - setTrialProperties()
	
// -  -  -  -  -  -  -  -	-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	
	function sampleClickBehavior(targetScreenParam){
		if (sampleGoAway == true && obsRespsControl >= obsRespsValue){
			$("#Screen"+targetScreenParam+" > div[data-stmFunction='Sample']").hide(sampleGoAwayDelay);
		}
		
	} // END - sampleClickBehavior()
	
// -  -  -  -  -  -  -  -	-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -	
	
// Show the comparisons after the first click on sample
function observingResponse(targetScreenPrm2, obsRespsTypePrm, obsRespsValuePrm){
	
	if (localObsRespControl >= 0 && localObsRespControl < obsRespsValuePrm){

		localObsRespControl++; // Increment the Observing Response control variable

		$('#DataKeyForm'+targetScreenPrm2+' > #obsRespsControl_'+targetScreenPrm2).val(localObsRespControl);

		console.log("ObsResponse registred, "+localObsRespControl+"/"+obsRespsValuePrm);	
		
		if(obsRespsTypePrm == "FR" && localObsRespControl >= obsRespsValuePrm){

			// Call a EVENT
			FSM_action[FSM_STATE_strTrl][EVENT_SHOW_COMPARISONS](activeScreen);

		}
	}
	
	if (localObsRespControl < 0) {
	
		console.log(" -> observingResponse() 1th call - Hides Comparisons by FSM");
		FSM_action[FSM_STATE_strTrl][EVENT_HIDE_COMPARISONS](targetScreenPrm2);
		localObsRespControl = 0; // Activate the observing Response control
	}
}
	
 	// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -