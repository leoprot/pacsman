function createKeys(trialDataKeys, loadTrial, targetScreenKeys){
	
	// Load the stimuli and their functions for each layout key

			$("#messages2").append('<br/> TRIAL KEYS - Trial: '+loadTrial+'<br/>');
			
			// Clean the DIV for the new keys
			$('#Screen'+targetScreenKeys).html('<!--// Interaction Data Form - Trial: '+loadTrial+' -->')
			
			// Clicks's controls - Global variable 
			comparisonClicksCtrl[loadTrial] = new Array;
			
			console.group("Keys");
				
				// Load each stimulus of each trial	
				for (var k = 0; k < trialDataKeys.stimKey.length; k++) {
				
					var trialNumber = trialDataKeys.number;
					var idKey = trialDataKeys.stimKey[k].id; // Retrieve Key id from the JSON 
					var name = trialDataKeys.stimKey[k].stimId; // Retrieve Stimulus name from the JSON (Can be the url)
					var StmFunction = trialDataKeys.stimKey[k].stimFunction; // Retrieve Key function from the JSON 
					var layoutIdTrial = trialDataKeys.layoutId;
					
					// Create and populate each key for each trial designed on the JSON string.
					$('#Screen'+targetScreenKeys).append('<div id="'+idKey+'" class="stml_btn">')
					
					// Create all the custom data fields 
					var keyFullID = '#Screen'+targetScreenKeys+' >  #'+idKey
					$(keyFullID).attr("data-stmFunction", StmFunction);
					$('#Screen'+targetScreenKeys+' >  #'+idKey).attr("data-layoutClass", layoutIdTrial);
					$('#Screen'+targetScreenKeys+' >  #'+idKey).attr("data-keyClicks", 0);
					if (StmFunction == "S-"){
						$('#Screen'+targetScreenKeys+' >  #'+idKey).attr("data-ClicksLimit", sMinusClicksLimit);
						var ComparisonSMinusLimit = sMinusClicksLimit;
					}
					if (StmFunction == "S+"){
						$('#Screen'+targetScreenKeys+' >  #'+idKey).attr("data-ClicksLimit", sPlusClicksLimit);
						var ComparisonSMinusLimit = sPlusClicksLimit;
					}					
					$('#Screen'+targetScreenKeys+' >  #'+idKey).attr("data-loadTrial", loadTrial);															
					
					//INSERT the Image insite the key DIV
					$('#Screen'+targetScreenKeys+' >  #'+idKey).append('<img src="'+appPath+'/assets/'+name+'" id="'+loadTrial+'-'+idKey+'_'+k+'" class="stmImg"><br />');
					$('#'+loadTrial+'-'+idKey+'_'+k).attr("data-Imgkey", idKey);										

					// Extra information inside the key DIV (Debugging proposes)
					$('#Screen'+targetScreenKeys+' >  #'+idKey).append('('+StmFunction+') Trial:'+ (loadTrial+1) +'<br />'+layoutIdTrial+'</div>');
					
					// Clicks's controls - Global variable 
					// The value from Jquery selection is for test, can be replaced by sMinusClicksLimit/sPlusClicksLimit
					if (StmFunction == "S-"){
						comparisonClicksCtrl[loadTrial][idKey] = sMinusClicksLimit;
					} else if (StmFunction == "S+"){
						comparisonClicksCtrl[loadTrial][idKey] = sPlusClicksLimit;
					} else if (StmFunction == "Sample"){
						comparisonClicksCtrl[loadTrial][idKey] = obsRespsValue;
					}
					console.log("Trial "+(loadTrial+1)+" - "+idKey+" ("+StmFunction+"): "+comparisonClicksCtrl[loadTrial][idKey]+" max clicks");

					// DEBUG: can be deleted soon
					$("#messages2").append("<br>FR"+comparisonClicksCtrl[loadTrial][idKey]+" on Key "+idKey);
				}
				
			$('#Screen'+targetScreenKeys).children().attr( "data-enhance", "false" );
				
				console.groupEnd();
}	