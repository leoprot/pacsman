	// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   
	// START SESSION FUNCTION
	// - Get USER ID and APP ID (Actually implement as I already have this information)	
	// getTrialBlock() -> Load all assets (stimuli files) for all trials
	// ----------------------------------------------------------
		// TO DO!!!: Sumarize a stimulus list for all the trial
	//	- Look for this assets (stimuli files) locally
	//	- Load the missing assets (stimuli files)	
		// Load  

	// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -		

	// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -		
	// INTERACTION BEHAVIOR FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -		
	
	
	// -       -       -       -       -       -       -       -       -       -       -       -       -      
	// The click register
	function ClickCounter(keyID2, activeScreenID3){
		
		// Record the total of clicks on this key		
		var thisKeyClicks = $('#Screen'+activeScreenID3+' > #'+keyID2).attr("data-keyClicks");
		thisKeyClicks++; // Increment the total of clicks
		
		// Save the click value on the dataKeClicks data attribute (HTML5) inside the key DIV
		$('#Screen'+activeScreenID3+' > #'+keyID2).attr("data-keyCLicks", thisKeyClicks);
		
		// Save the click value on the DataKeyClicks field on DatFrom for this trail		
		$('#DataKeyForm'+activeScreenID3+' > input[id=DataKeyClicks_'+keyID2+']').val(thisKeyClicks);
		
		// Record the time of each click on this key
		var clickTimes = $('#DataKeyForm'+activeScreenID3+' > #DataKeyClicksTime_'+keyID2).val();
		var timeNow = $('#time').val();
		clickTimes += ','+timeNow; // Add current click time on the var record
		$('#DataKeyForm'+activeScreenID3+' > #DataKeyClicksTime_'+keyID2).val(clickTimes);
	}
	
	// -       -       -       -       -       -       -       -       -       -       -       -       -      
	
	function saveTrial(){
		trialBlockResponse[currentTrial].interactions = $('#DataKeyForm'+activeScreen).serialize();
		$("#finalScreen").append("<p><strong>Trial "+currentTrial+"</strong>");
		$("#finalScreen").append(trialBlockResponse[currentTrial].interactions);
		$("#finalScreen").append("</p>");
		$("#finalScreen").show(0);
	}

	// -       -       -       -       -       -       -       -       -       -       -       -       -       		
			
	// -       -       -       -       -       -       -       -       -       -       -       -       -       
	// Show the next screen (Trial)
	function ShowNextTrial(){
		
		activeScreen = (currentTrial % preLoadedScreens);
		// Defines the next screen to be shown, used on createLeyout()
		nextScreen = activeScreen + 1;
		if (nextScreen >= preLoadedScreens){
			nextScreen = 0;
		}
		
// 		$('#Screen'+nextScreen).hide();
// 		$('#Screen'+activeScreen).show();
		$('#Page'+nextScreen).hide();
		$('#Page'+activeScreen).show();	
		
		$.mobile.changePage( "#Page"+activeScreen, { transition: "slide"} );
	}


	// -       -       -       -       -       -       -       -       -       -       -       -       -       	
		
	function currentTrialCounter(ForceCurrentTrialPrm){

		if (ForceCurrentTrialPrm == "" || ForceCurrentTrialPrm == undefined){
			currentTrial++;
			console.log(' - > Used Global Var currentTrial currentTrialCounter() '+ForceCurrentTrialPrm);
		} if (ForceCurrentTrialPrm >= 0) {
			currentTrial = ForceCurrentTrialPrm;
			console.log(' - > Forced currentTrialCounter() '+ ForceCurrentTrialPrm);	
		}

		trialTime = 0;
		return currentTrial;
	}

// -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   
	
	
	//FUNCTION THAT RETURN THE STRUCTURED DATA FOR THE TRIAL 
	function callTrialData(number, layout, stimKeys, KeyClqLimit, interactions){
	// USE INSTRUCTIONS:
		// TO CREATE THE OBJECT
			// trialBlockResponse.push(callTrialData(trial.number, trial.layout, trial.stimKeys));
		// TO CALL THE OBJECT DATA
			// trialBlockResponse[loadTrial].number;
			// trialBlockResponse[loadTrial].layout;
			// trialBlockResponse[loadTrial].stimKeys;
			// trialBlockResponse[loadTrial].interactions;
		
		return {
		  number:number,
		  layout:layout,
		  stimKeys:stimKeys,
		  KeyClqLimit:KeyClqLimit,
		  interactions:interactions
		}
	}