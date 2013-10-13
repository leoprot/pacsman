function tempo(){
	/* 	AVALIA SE A SESSAO DEVE SER FINALIZADA AGORA OU NAO 
		  - Incrementa o tempo do contador geral da sessao
		  - Para o andamento do tempo se a sessao atingiu o criterio de encerramento
	*/
	
	if (SessionPause == true || SessionEnd == true) { 
				
			PauseTimmer();
			
			// NEED TO DO:
			// ALWAYS DECREMENT THE VALUE (this make the conditions more simple - x == 0, then ...)
			// NEVER STOP THE TIMMER
				// -> use um difernt timer for each control
					// - Session time
					// - Trial time					
					// - Feedback time
// 		return; // Counter stopped
	} 
	
	else {

		sessionTime += 0.5;
		$('input[name=time]').val(sessionTime);
		
		if (trialActive == true){
			trialTime += 0.5;
			$('input[name=trialTime]').val(trialTime);
		}
		
		// Analyse if the session reach the Time Limit
		if (sessionTime == timeLimit){
			document.location.href="#finalScreen";
			$("#finalScreen").append("<h2>Time limit reached!</h2>");
			SessionEnd = true;
			return; // Finaliza a sessão
		}						
		
	}
}

function PauseTimmer(value){

	if (value === "reset"){
		FeedbackTimer = 0;
		console.log("PauseTimmer() reseted!");
		return // Finishes the function
	} else {
		
		// In CASE the trial is paused for FSM_STATE_wtTrlFdbck
		if(FSM_state == FSM_STATE_wtTrlFdbck){
		
			console.log("Showing Feedback of "+lastClickedFunc+":"+FeedbackTimer+"s ("+timeSPlusFeedback+"s for S+ OR "+timeSMinusFeedback+"s for S-)");
	
			if (lastClickedFunc == "S+" && FeedbackTimer >= timeSPlusFeedback){
				
				FeedbackTimer = -0.5; // Feedback Counter
				
				// Will call the ITI period AFTER do the feedback
				var FSM = FSM_action[FSM_state][EVENT_HIDE_CONSEQUENCE];
				FSM(lastClickedFunc);	
	
			}
			else if (lastClickedFunc == "S-" && FeedbackTimer >= timeSMinusFeedback){
				
				FeedbackTimer = -0.5; // Feedback Counter
				
				// Will call the ITI period AFTER do the feedback
				var FSM = FSM_action[FSM_state][EVENT_HIDE_CONSEQUENCE];
				FSM(lastClickedFunc);
			}
		}

		// In CASE the trial is paused for FSM_STATE_wtITI
		if(FSM_state == FSM_STATE_wtITI && FeedbackTimer >= ITI){
		
				FeedbackTimer = -0.5; // Feedback Counter
				
				console.log("Showing ITI :"+FeedbackTimer+"/("+ITI+")s");
				
				// Call the ITI period AFTER have shown the feedback
				FSM_action[FSM_state][EVENT_ITI_TIMEOUT]();

		}
	}
	
	// Increment the pause timmer
	FeedbackTimer += 0.5; // Feedback Counter
}