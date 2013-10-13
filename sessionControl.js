// Number of states 
FSM_SC = 0;
FSM_STATE_ldData = FSM_SC++; // 0
FSM_STATE_ldLayouts = FSM_SC++; // 1
FSM_STATE_ldAssets = FSM_SC++; // 2
FSM_STATE_ldSession = FSM_SC++; // 3
FSM_STATE_ldPage = FSM_SC++; // 4
FSM_STATE_strTrl = FSM_SC++; // 5
FSM_STATE_ldSmp = FSM_SC++; // 6
FSM_STATE_wtSmpRsp = FSM_SC++; // 7
FSM_STATE_wtCmpRsp = FSM_SC++; // 8
FSM_STATE_wtTrlFdbck = FSM_SC++; // 9
FSM_STATE_wtITI = FSM_SC++; // 10
FSM_STATE_EndTrl = FSM_SC++; // 11
FSM_STATE_EndSession = FSM_SC++; // 12

// Initialize the state machine state 
var FSM_state = FSM_STATE_ldData;
console.log("Initialized State: FSM_STATE_ldData ("+FSM_state+"/"+FSM_SC);

// Finite State Machine Events
FSM_EC = 1;
EVENT_INIT = FSM_EC++; // 1
EVENT_AJAX_SUCCESS = FSM_EC++; // 2
EVENT_AJAX_ERROR = FSM_EC++; // 3
EVENT_START_SESSION = FSM_EC++; // 4
EVENT_FIRST_TRIAL = FSM_EC++; // 5
EVENT_LOAD_TRIAL = FSM_EC++; // 6
EVENT_SET_TRIAL = FSM_EC++; // 7
EVENT_SHOW_TRIAL = FSM_EC++; // 8
EVENT_SHOW_SAMPLE = FSM_EC++; // 9
EVENT_SHOW_COMPARISONS = FSM_EC++; // 10
EVENT_HIDE_COMPARISONS = FSM_EC++; // 11
EVENT_SHOW_CONSEQUENCE = FSM_EC++; // 12
EVENT_HIDE_CONSEQUENCE = FSM_EC++; // 13
EVENT_SHOW_ITI = FSM_EC++; // 14
EVENT_ITI_TIMEOUT = FSM_EC++; // 15
EVENT_CLICK_SAMPLE = FSM_EC++; // 16
EVENT_CLICK_S_MINUS = FSM_EC++; // 17
EVENT_CLICK_S_PLUS = FSM_EC++; // 18
EVENT_CLICK_COMPARISON = FSM_EC++; // 19
EVENT_CLICK_BACKGROUND = FSM_EC++; // 20
EVENT_TIMEOUT = FSM_EC++; // 21

// --------------------------------------
// Initialize the Finite State Machine Array (group the actions for each event on each state)
	//FSM_action = {"state": new Array()};
	var FSM_action = new Array();

// ---------------------------------------------------------
// Prepare the States to receive the correspondent Events 
// ---------------------------------------------------------	
		FSM_action[FSM_STATE_ldData] = [];
		FSM_action[FSM_STATE_ldPage] = [];
		FSM_action[FSM_STATE_strTrl] = [];
		FSM_action[FSM_STATE_wtSmpRsp] = [];
		FSM_action[FSM_STATE_wtCmpRsp] = [];		
		FSM_action[FSM_STATE_wtTrlFdbck] = [];
		FSM_action[FSM_STATE_wtITI] = [];		

// ---------------------------------------------------------
// Assign the Events for each correspondent State
// ---------------------------------------------------------
	
	var FSM_events = new Array(); // Array with all events

// STATE: FSM_STATE_ldData -   -   -   -   -   -   -   -   -

		FSM_events[EVENT_INIT] = function (data){
			console.group("Session SetUp"); 
			console.log("State: "+FSM_state+" (of "+FSM_SC+"), FSM Event: "+EVENT_INIT+"(of "+FSM_EC+")");
			
			// start heart beat 
			setInterval('tempo()',500);
			
			// load the session
			loadSession();
		};
	
		FSM_events[EVENT_AJAX_SUCCESS] = function (data){
			
			// Change state 
			FSM_state = FSM_STATE_ldPage;
			
			console.log("State: "+FSM_state+" (of "+FSM_SC+"), FSM Event: "+EVENT_AJAX_SUCCESS+"(of "+FSM_EC+")");
			
			ajax_success (data); // Just create the Object with all the Trial Block data

			FSM_action[FSM_state][EVENT_FIRST_TRIAL]();
			// var FSM = FSM_action[FSM_state][EVENT_FIRST_TRIAL];
			// FSM();	
		};
		
		FSM_events[EVENT_AJAX_ERROR] = function (data){
			console.log("State: "+FSM_state+" (of "+FSM_SC+"), FSM Event: "+EVENT_AJAX_ERROR+"(of "+FSM_EC+")");
			alert('JSON file not Loaded - Wrong JSON structure or missing file');
			
			console.log("New State: "+FSM_state);
		};

		// Atribute the events for this state
		FSM_action[FSM_STATE_ldData][EVENT_INIT] = FSM_events[EVENT_INIT];
		FSM_action[FSM_STATE_ldData][EVENT_AJAX_SUCCESS] = FSM_events[EVENT_AJAX_SUCCESS];		
		FSM_action[FSM_STATE_ldData][EVENT_AJAX_ERROR] = FSM_events[EVENT_AJAX_ERROR];


// STATE: FSM_STATE_ldPage -   -   -   -   -   -   -   -   -

		FSM_events[EVENT_FIRST_TRIAL] = function (data){
			
			FSM_state = FSM_STATE_strTrl; // STATE: Waiting for USER Click on Sample
			
			console.log("FSM_STATE_ldPage: "+FSM_state+" (of "+FSM_SC+"), EVENT_FIRST_TRIAL ("+EVENT_FIRST_TRIAL+"/"+FSM_EC+")");
			
			//ACTION 1: Load the first TWO sessions on the player's screens
			for(t = 0; t < preLoadedScreens; t++) {
				
				// Keep this State for this loop
				FSM_state = FSM_STATE_strTrl;
				localObsRespControl = -10 // To assure that the observingResponse() will HIDe the comparisons (if obsRespsControl == true)
				
				// Create the firsts Trials (preloaded on the screens)
				console.group("CREATED TRIAL: " + (t+1) + "/"+(lastTrial+1)); 
				createLayout(trialData[t], t, t);
						
				setGeneralKeysBehavior(t);
				setVisualKeysBehavior(t);
				
				// Hide the Comparisons if it was defined on the createKey parameters
					// Need to identify the Sample Key Id for the 1th trial
				
				 for(var x=0; x > trialData[t].stimKey.lenght; x++){
					if (trialData[t].stimKey[x].stimFunction == "Sample"){
						var sampleKeyId = trialData[t].stimKey[x].id;
					}
				}
				
				if ( comparisonClicksCtrl[currentTrial][sampleKeyId] <= 0 ){
					FSM_action[FSM_STATE_strTrl][EVENT_SHOW_COMPARISONS](t);
				} else {
					console.log("- Obsv Response Activated");
					FSM_action[FSM_STATE_strTrl][EVENT_HIDE_COMPARISONS](t);	
				}
				
				console.groupEnd(); 
			}
			
			//ACTION 2: Set the event callback to the Start Button
			$("#startButton").click(function(){				
				 
				// Hide the Start Button 
				$("#startButton").hide();
				
				// Call the next Screen BUT force specific values on the EVENT_SHOW_TRIAL
				FSM_action[FSM_state][EVENT_SHOW_TRIAL](0); // currentTrial == 0 

				
				console.log("Show Page"+activeScreen);		
			});
	
			 
			console.log("New State: "+FSM_state+" | After EVENT_FIRST_TRIAL");
			console.groupEnd();
		};

		// Atribute the events for this state
		FSM_action[FSM_STATE_ldPage][EVENT_FIRST_TRIAL] = FSM_events[EVENT_FIRST_TRIAL];
		FSM_action[FSM_STATE_ldPage][EVENT_LOAD_TRIAL] = FSM_events[EVENT_LOAD_TRIAL];


// STATE: FSM_STATE_strTrl -   -   -   -   -   -   -   -   -

		FSM_events[EVENT_START_SESSION] = function(data) {
			console.log("FSM_STATE_strTrl: "+FSM_state+" (of "+FSM_SC+"), EVENT_START_SESSION ("+EVENT_START_SESSION+"/"+FSM_EC+")");
			console.log("EVENT_START_SESSION");
			
			console.log("New State: "+FSM_state);	
		};

        FSM_events[EVENT_SHOW_COMPARISONS] = function(ScreenID) {
		
			//FSM_state = FSM_STATE_wtCmpRsp; // STATE: Waiting for USER Click on Comparison
			
			$("#Screen"+ScreenID+" > div[data-stmFunction='S-']").show(0);
			$("#Screen"+ScreenID+" > div[data-stmFunction='S+']").show(0);

			console.log("FSM_STATE_wtCmpRsp: "+FSM_state+" (of "+FSM_SC+"), FSM EVENT_SHOW_COMPARISONS: "+EVENT_SHOW_COMPARISONS+"(of "+FSM_EC+")");
        };
	
        FSM_events[EVENT_HIDE_COMPARISONS] = function(ScreenID) {
		
			//FSM_state = FSM_STATE_wtSmpRsp; // STATE: Waiting for USER Click on Sample
			
			$("#Screen"+ScreenID+" > div[data-stmFunction='S-']").hide(0);
			$("#Screen"+ScreenID+" > div[data-stmFunction='S+']").hide(0);
			
			localObsRespControl = -10; // Activate the observing Response control
			$('#DataKeyForm'+ScreenID+' > #obsRespsControl_'+ScreenID).val(localObsRespControl);

			console.log("FSM_STATE_wtSmpRsp: "+FSM_state+" (of "+FSM_SC+"), FSM EVENT_HIDE_COMPARISONS: "+EVENT_HIDE_COMPARISONS+"(of "+FSM_EC+")");
		};

		FSM_events[EVENT_SHOW_TRIAL] = function(forceCurrentTrial) {
			console.log("FSM_STATE_strTrl: "+FSM_state+" (of "+FSM_SC+"), EVENT_SHOW_TRIAL: "+EVENT_SHOW_TRIAL+"(of "+FSM_EC+")");
			
			// Change state
			if (obsRespsControl == true){
				FSM_state = FSM_STATE_wtSmpRsp; // STATE: Waiting for USER Click on Sample
			} else {
				FSM_state = FSM_STATE_wtCmpRsp; // STATE: Waiting for USER Click on Comparison
			}			
			
			// REGULAR TIMER
			SessionPause = false;  // de-pause the Sesssion
			trialActive = true;
			
			currentTrialCounter(forceCurrentTrial); // Control the current trial being displayed (increment currentTrial)
			ShowNextTrial(); // Show the next trial (jQuery Mobile call to a new data-page DIV)
			
			console.log(">>>>>Current Trial: " + currentTrial + "| Active Screen: " +activeScreen + "| Next Screen: " + nextScreen);
			
			console.log("New State: "+FSM_state+" (After EVENT_SHOW_TRIAL)");
			console.groupEnd(); 
		};

		// Atribute the events for the state: FSM_STATE_strTrl
		FSM_action[FSM_STATE_strTrl][EVENT_START_SESSION] = FSM_events[EVENT_START_SESSION];
		FSM_action[FSM_STATE_strTrl][EVENT_SHOW_TRIAL] = FSM_events[EVENT_SHOW_TRIAL];
		FSM_action[FSM_STATE_strTrl][EVENT_SHOW_COMPARISONS] = FSM_events[EVENT_SHOW_COMPARISONS];
		FSM_action[FSM_STATE_strTrl][EVENT_HIDE_COMPARISONS] = FSM_events[EVENT_HIDE_COMPARISONS];
		FSM_action[FSM_STATE_strTrl][EVENT_ITI_TIMEOUT] = FSM_events[EVENT_ITI_TIMEOUT];
		


// STATE: FSM_STATE_wtSmpRsp -   -   -   -   -   -   -   -   -
	
		FSM_events[EVENT_CLICK_SAMPLE] = function(KeyFunction, keyID, activeScreenID2) {
		
			ClickCounter(keyID, activeScreenID2);
			
			// Decrease the comparisonClicksCtrl
			comparisonClicksCtrl[currentTrial][keyID]--;
			
			if (comparisonClicksCtrl[currentTrial][keyID]  <= 0){

				FSM_action[FSM_STATE_strTrl][EVENT_SHOW_COMPARISONS](activeScreenID2);
			
			} else {
				console.log('Sample Clicks Control: '+comparisonClicksCtrl[currentTrial][keyID]);
				FSM_action[FSM_STATE_strTrl][EVENT_HIDE_COMPARISONS](activeScreenID2);
				
			}

		};
	
		FSM_events[EVENT_CLICK_S_MINUS] = function(KeyFunction, keyID, activeScreenID2) {
			console.log("FSM_STATE_wtSmpRsp: "+FSM_state+" (of "+FSM_SC+"), EVENT_CLICK_S_MINUS: "+EVENT_CLICK_S_MINUS+"(of "+FSM_EC+") - data: "+KeyFunction);
			
			ClickCounter(keyID, activeScreenID2);

			console.log("Clicks on Trial "+currentTrial+" Key "+keyID+" ("+KeyFunction+"): "+comparisonClicksCtrl[currentTrial][keyID]);
			
			// Decrease the comparisonClicksCtrl
			comparisonClicksCtrl[currentTrial][keyID]--;

			
			// Conditional that assures that the S- Comparisons can call the next Trail after reach the total clicks limit
			if (comparisonClicksCtrl[currentTrial][keyID] <= 0){
				
				//Call the consequence
				FSM_action[FSM_state][EVENT_SHOW_CONSEQUENCE](KeyFunction);
			}	
		};
		
		FSM_events[EVENT_CLICK_S_PLUS] = function(KeyFunction, keyID, activeScreenID2) {
			console.log("FSM_STATE_wtSmpRsp: "+FSM_state+" (of "+FSM_SC+"), EVENT_CLICK_S_PLUS: "+EVENT_CLICK_S_PLUS+"(of "+FSM_EC+")");
			
			ClickCounter(keyID, activeScreenID2);
			
			console.log("Trial "+currentTrial+", Clicks on Key "+keyID+": "+comparisonClicksCtrl[currentTrial][keyID]);
			
			// Decrease the comparisonClicksCtrl
			comparisonClicksCtrl[currentTrial][keyID]--;
			
			
			// Conditional that assures that the S- Comparisons can call the next Trail after reach the total clicks limit
			if (comparisonClicksCtrl[currentTrial][keyID] <= 0){
				
				//Call the consequence
				FSM_action[FSM_state][EVENT_SHOW_CONSEQUENCE](KeyFunction);
			}		
		};		
		
		// Atribute the events for this state		
		FSM_action[FSM_STATE_wtSmpRsp][EVENT_CLICK_SAMPLE] = FSM_events[EVENT_CLICK_SAMPLE];
		FSM_action[FSM_STATE_wtSmpRsp][EVENT_CLICK_S_MINUS] = FSM_events[EVENT_CLICK_S_MINUS];
		FSM_action[FSM_STATE_wtSmpRsp][EVENT_CLICK_S_PLUS] = FSM_events[EVENT_CLICK_S_PLUS];
		FSM_action[FSM_STATE_wtSmpRsp][EVENT_SHOW_CONSEQUENCE] = FSM_events[EVENT_SHOW_CONSEQUENCE];


// STATE: FSM_STATE_wtCmpRsp -   -   -   -   -   -   -   -   -
		
		// Atribute the events for this state
		FSM_action[FSM_STATE_wtCmpRsp][EVENT_CLICK_SAMPLE] = FSM_events[EVENT_CLICK_SAMPLE];
		FSM_action[FSM_STATE_wtCmpRsp][EVENT_CLICK_S_MINUS] = FSM_events[EVENT_CLICK_S_MINUS];
		FSM_action[FSM_STATE_wtCmpRsp][EVENT_CLICK_S_PLUS] = FSM_events[EVENT_CLICK_S_PLUS];

// STATE: FSM_STATE_wtSmpRsp &  FSM_STATE_wtCmpRsp-   -   -   -   -   -   -   -   -   -   -   -   -


		FSM_events[EVENT_SHOW_CONSEQUENCE] = function (KeyFunctionParam){
			console.group("Feedback"); 
			console.log("FSM_STATE: "+FSM_state+" (of "+FSM_SC+"), FSM Event: EVENT_SHOW_CONSEQUENCE - "+EVENT_SHOW_CONSEQUENCE+"(of "+FSM_EC+") - Function Data: "+KeyFunctionParam);		
			
			// Record the time of each click on this key
			var timeNow = $('#time').val(); // Get the Current Time
			$('#DataKeyForm'+currentTrial+' > #DataKeyClicksTime_'+currentTrial).val(timeNow); // Add current click time on the var record
			
			FSM_state = FSM_STATE_wtTrlFdbck;
			SessionPause = true; // PauseTimmer()
			lastClickedFunc = KeyFunctionParam;

			if (KeyFunctionParam == "S+"){

				// Visual Feedback Screen
				$(".ScreenPage").hide(0);
				$("#blank").css( "border", "35px solid red" );
				$("#blank").css( "background-color", "green" );
				$("#blank").html(""); // Clean the HTML Text
				$("#blank").append("<h1>Congrats!!</h1>");
 				$("#blank").show(0);
				//$(".ScreenPage").hide(0);
			}

			else if (KeyFunctionParam == "S-"){

				// Visual Feedback Screen
				$(".ScreenPage").hide(0);
				$("#blank").css( "border", "0px solid white" );
				$("#blank").css( "background-color", "white" );								
				$("#blank").html("");
				$("#blank").show(0);
				//$(".ScreenPage").hide(0);		
			}
			
			if (KeyFunctionParam !== "S+" && KeyFunctionParam !== "S-") {
				console.log(" -> Sample Consequence <- | Waiting for a comparison response - Function:"+KeyFunctionParam);
			}
			
			// Save the trial Data
			saveTrial();
			
			console.log("New FSM_STATE_wtTrlFdbck: "+FSM_state+"(After EVENT_SHOW_CONSEQUENCE)");
		};

		// Atribute the events for this both states	
		FSM_action[FSM_STATE_wtSmpRsp][EVENT_SHOW_CONSEQUENCE] = FSM_events[EVENT_SHOW_CONSEQUENCE];
		FSM_action[FSM_STATE_wtCmpRsp][EVENT_SHOW_CONSEQUENCE] = FSM_events[EVENT_SHOW_CONSEQUENCE];

// STATE: FSM_STATE_wtTrlFdbck -   -   -   -   -   -   -   -   -   -   -   -   -

		FSM_events[EVENT_HIDE_CONSEQUENCE] = function (KeyFunction){
			console.log("FSM_STATE_wtTrlFdbck: "+FSM_state+" (of "+FSM_SC+"), FSM Event: EVENT_HIDE_CONSEQUENCE - "+EVENT_SHOW_CONSEQUENCE+"(of "+FSM_EC+")");	
			
			FSM_state = FSM_STATE_wtITI;
			
			// Analyse if is the last session trial - LOAD THE FINAL SCREEN
			if (currentTrial >= lastTrial){
			
				FSM_state = FSM_STATE_EndSession;

				$(".stml_btn").hide();
				$("#blank").css( "border", "0px solid white" );
 				$("#blank").css( "background-color", "white" );
 				$("#blank").html( "" ); 				
 				$("#blank").hide(0);
 				
				$("#finalScreen").append('<div id="DataFormPopUp" data-role="popup" data-theme="e" data-overlay-theme="a" class="ui-content"></div>');
				$("#DataFormPopUp").popup();
				$("#DataFormPopUp").append("<h3>Interactions Data</h3>");
				
				$.each([ 52, 97 ], function( index, value ) {
				  $("#DataFormPopUp").append(trialBlockResponse[index].interactions);
				});
				

				$("#finalScreen").show;
				$.mobile.changePage("#finalPage");
				
				$('#DataFormPopUp').popup( "open" );
	
				console.log("END - Session finished!");
		
				// REGULAR TIMER
				SessionPause = true;  // de-pause the Sesssion
				trialActive = false;
				SessionEnd = true;
		
				return;
			} 
			
			else {
		
				$("#blank").css( "border", "0px solid white" );
				$("#blank").css( "background-color", "white" );
 				$("#blank").html( "" );
				
				// Call the ITI period AFTER do the feedback
				FSM_action[FSM_state][EVENT_SHOW_ITI]();
			}
		};

		// Atribute the events for this state
		FSM_action[FSM_STATE_wtTrlFdbck][EVENT_HIDE_CONSEQUENCE] = FSM_events[EVENT_HIDE_CONSEQUENCE];		


// STATE: FSM_STATE_wtITI -   -   -   -   -   -   -   -   -   -   -   -   -

		FSM_events[EVENT_SHOW_ITI] = function (){
			console.log("FSM_STATE_wtITI: "+FSM_state+" (of "+FSM_SC+"), EVENT_SHOW_ITI: "+EVENT_SHOW_ITI+"(of "+FSM_EC+")");
			
			SessionPause = true;
			
			$("#blank").css( "border", "10px solid blue" );
			$("#blank").css( "background-color", "black" );
// 			$("#blank").show(0);
		};
		
		FSM_events[EVENT_ITI_TIMEOUT] = function (data){
		console.log("FSM_STATE_wtITI: "+FSM_state+" (of "+FSM_SC+"), EVENT_ITI_TIMEOUT ("+EVENT_ITI_TIMEOUT+") - Screen: "+activeScreen);
			
			FSM_state = FSM_STATE_strTrl;
			
			if( loadTrial > lastTrial ){
				console.log(' ===>> Last Trial Already Loaded!');
			} else {
				console.group("CREATED TRIAL: "+( loadTrial + 1 ) + "/"+(lastTrial+1)); 

				// Create the next Trial
				createLayout(trialData[loadTrial], loadTrial, activeScreen);

				// Configure the created Trial
				setGeneralKeysBehavior(activeScreen);
				setVisualKeysBehavior(activeScreen);
			
				// Hide the Comparisons if it was defined on the createKey parameters
					// Need to identify the Sample Key Id for the 1th trial
					var lastTrialCreated  = loadTrial - 1;
					 for(var x=0; x > trialData[lastTrialCreated].stimKey.lenght; x++){
						if (trialData[lastTrialCreated].stimKey[x].stimFunction == "Sample"){
							var sampleKeyId = trialData[lastTrialCreated].stimKey[x].id;
						}
					}
			
					if ( comparisonClicksCtrl[currentTrial][sampleKeyId] <= 0 ){
						FSM_action[FSM_STATE_strTrl][EVENT_SHOW_COMPARISONS](activeScreen);
					} else {
						console.log("- Obsv Response Activated");
						FSM_action[FSM_STATE_strTrl][EVENT_HIDE_COMPARISONS](activeScreen);	
					}			

				console.groupEnd();
			} // END - if ( trialData[loadTrial] != null || trialData[loadTrial] != undefined)

			
			$("#blank").css( "border", "0px solid white" );
			$("#blank").css( "background-color", "white" );
			$("#blank").hide(0);
					
			FSM_action[FSM_state][EVENT_SHOW_TRIAL](); // When called without any parameter the global var currentTrial will be used
		};	
		

		// Atribute the events for this state
		FSM_action[FSM_STATE_wtITI][EVENT_SHOW_ITI] = FSM_events[EVENT_SHOW_ITI];
		FSM_action[FSM_STATE_wtITI][EVENT_ITI_TIMEOUT] = FSM_events[EVENT_ITI_TIMEOUT];

// ===================================================================================
		
	// Verify the general session status
	function sessionStatusFn(specificCall, newValue){
			console.log("sessionStatus Function - specificCall:"+specificCall+" as "+newValue);
	
		if (specificCall == "SessionEnd" && typeof(newValue) === 'undefined'){
			if (SessionEnd == true) {
				return true;
				alert("Session END! - "+SessionEnd);
			} else {
				return false;
			}
		}
		
		if (specificCall == "SessionPause" && typeof(newValue) === 'undefined'){
			if (SessionPause == true) {
				return true;
			} else {
				return false;
			}
		}
		if (specificCall == "SessionTime" && SessionTime <= timeLimit && typeof(newValue) === 'undefined'){
			return false;
		}
		
		// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -		
		
		// IF NONE specificCall is defined: Just analyse if the general session status is OK or not.
		if (SessionEnd == true || SessionPause == true || SessionTime <= timeLimit){
			return false;
		}
		
		// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
		
		// Changes the Sessions Status parameter
		if (specificCall == "SessionEnd"){
			if (newValue == true) {
				SessionEnd = true;
				alert("Session END! - "+SessionEnd);
			} else {
				SessionEnd =  false;
			}
		}
		
		if (specificCall == "SessionPause"){
			if (newValue == true) {
				SessionPause = true;
			} else {
				SessionPause =  false;
			}
		}
		if (specificCall == "SessionTime" && SessionTime <= timeLimit){
			SessionTime = newValue;
		}		
		
	}
	
//-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -	
	
	function reachTimeLimit(){
		if(SessionTime == timeLimit){
			return true;
		} else {
			return false;
		}
	}

//-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
