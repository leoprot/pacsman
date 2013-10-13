function merit1(){
	//Load specif App data (Layout, JS, asses, etc..)
	//$("head").append("<link id='Layout_Id-001' href='appName.Data/css/Layout_Id-001.css' type='text/css' rel='stylesheet' />");

	//$('#messages').append("<br /><strong>Merit1 Specif Data Loaded!!</strong> <br /> Comparisons hidden by JQuery \n");
	$('#messages').append("test"); // DEBUG Only 

	// Call the appropriated layout interactions script for the trial
		
		$('<head>').load(appPath+'/js/'+currentLayout+'.js');
	
		// Just change the Global variables values for the Layout specific variables 
		// $.ajax({
		  // url: appPath+'/js/'+currentLayout+'.js',
		  // dataType: "script"
		// });
}
