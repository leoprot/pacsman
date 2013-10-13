var SessionStart = true;
var SessionEnd = false;
var SessionPause = true;
var sessionTime = 0;
var trialTime = 0;
var timeLimit = 30000; // in seconds
var ITI = 0;
var FeedbackTimer = 0;
var stateMachine = "loadData";
var StMch;

var timeSMinusFeedback = 2; 
var timeSPlusFeedback = 2;

var TrialBlockData; // Global var that will have all the session data (Trials and other info) 
var trialData; // Global var that will have all the session trials 
var trialBlockResponse = []; // Will be an Object with all information about the Trial
var currentTrial = 0; // Current active trial on screen
var loadTrial = 0; // Control variable to call the createLayout() and loadNextTrial()
var lastTrial;
var trialActive = false;
var lastClickedFunc = ""; // Function of the last key clicked

var currentLayout = ""; // The last layout file loaded from the createLayout() function
var lastLayoutLoaded = ""; //Layout file of the active active (current) trial
var activeScreen;
var nextScreen;
var preLoadedScreens = 2; // Number of pre loaded trial (based on the number of avaliable screens (start from 0, zero))
var PageCmpntszIdx = 0;

					
					
					
					
					