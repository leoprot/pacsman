function createLayout(trialDataLay, loadTrialLay, targetScreenLay){
		// loadTrialLay = Trial ID on this session
		// trialDataLay = Layout CSS file name for this Trial
		// targetScreenLay = Screen where this trial should be created

		if (trialDataLay == undefined){ console.log("Trial Data Empty! Last trial already created"); return }
		if (loadTrial > lastTrial){ alert("ERROR: Not posssible to find this Trial data on JSON!"); return }
		
		// DEBUG
			console.log("- - - - ("+lastLayoutLoaded+"), Screen: "+targetScreenLay+" - - - -");	
		
	
	// Get the layout ID and should see if the client already have this one
			// Load the specific JS and CSS for the trial
			lastLayoutLoaded = trialDataLay.layoutId;
			
			var stimKeys = new Array();
			
			// Create General Trial information fields
			$('#DataKeyForm'+targetScreenLay).html('<!--// Interaction Data Form - Trial: '+loadTrialLay+' -->');
			$('#DataKeyForm'+targetScreenLay).append('<!--//targetScreenLay: '+targetScreenLay+' (Form'+targetScreenLay+') | Trial:'+loadTrialLay+'(Max Time:'+timeLimit+'s)  -->');			
	
			$('<input>').attr({
				type : 'hidden',
				value : -10,
				id : 'obsRespsControl_'+targetScreenLay,
				name : 'obsRespsControl'
			}).appendTo('#DataKeyForm'+targetScreenLay);
			
			$('<input>').attr({
				type : 'hidden',
				value : trialTime,
				id : 'trialTime_'+targetScreenLay,
				name : 'trialTime'
			}).appendTo('#DataKeyForm'+targetScreenLay);			
			
			
			$('#DataKeyForm'+targetScreenLay).append("<br />");
			
			// Create Keys's interaction data fields
			for (var i = 0; i < trialDataLay.stimKey.length; i++) {
				var id = trialDataLay.stimKey[i].id; // Retrieve Key id from the JSON
				var name = trialDataLay.stimKey[i].stimId; // Retrieve Stimulus name from the JSON (Can be the url)
				var StmFunction = trialDataLay.stimKey[i].stimFunction;				
				
				$('<input>').attr({
					type : 'hidden',
					value : id,
					id : 'DataKeyId_'+id,
					name : 'DataKey Id'
				}).appendTo('#DataKeyForm'+targetScreenLay);

				$('<input>').attr({
					type : 'hidden',
					value : name,
					id : 'DataKeyName_' + id,
					name : 'DataKey Name'
				}).appendTo('#DataKeyForm'+targetScreenLay);

				$('<input>').attr({
					type : 'hidden',
					value : StmFunction,
					id : 'DataKeyFunction_' + id,
					name : 'DataKey Function'
				}).appendTo('#DataKeyForm'+targetScreenLay);				
				
				$('<input>').attr({
					type : 'hidden',
					value : 0,
					id : 'DataKeyClicks_' + id,
					name : 'DataKey Click'
				}).appendTo('#DataKeyForm'+targetScreenLay);

				$('<input>').attr({
					type : 'hidden',
					value : "",
					id : 'DataKeyClicksTime_' + id,
					name : 'DataKey ClickTime'
				}).appendTo('#DataKeyForm'+targetScreenLay);

				// Record the Session Time when the Trial finishes
				$('<input>').attr({
					type : 'hidden',
					value : "",
					id : 'DataTrialEndTime_' + loadTrialLay,
					name : 'DataTrial EndTime'
				}).appendTo('#DataKeyForm'+targetScreenLay);				
				
				//Create a break line  for each stimulus data
				$('#DataKeyForm'+targetScreenLay).append("\n <br /><!--// BreakLine"+loadTrialLay+" -->");
					
				// Save the trial's KEYS data on the trialBlokcResponse Object			
				stimKeys.push([id, name, StmFunction]);
					
			} // END - for (var i = 0; i < totalKeys; i++) {}
			
			// Save this trial data on the trialBlokcResponse Object			
			trialBlockResponse.push(callTrialData(trialDataLay.number, lastLayoutLoaded, stimKeys));
			
			// Call Create Keys 
			createKeys(trialDataLay, loadTrialLay, targetScreenLay);
			setTrialProperties(loadTrialLay, targetScreenLay, trialDataLay.layoutId)
			
			$('#DataKeyForm'+targetScreenLay).css( "zIndex", -10 );
			
			// Deactivate the JQuery Mobile Style on the data Form
			$('#DataKeyForm'+targetScreenLay).attr( "data-enhance", "false" );
			$('form').children('#DataKeyForm'+targetScreenLay).attr( "data-enhance", false );
			

		
			lastLayoutLoaded = trialDataLay.layoutId;
			loadTrial++; // Cnahge the loadTrial global variable

			return true; // Return a true value when the function ends his work.			

} // END - function createLayout(){}