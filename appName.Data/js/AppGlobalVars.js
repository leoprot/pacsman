// APPLICATION GENERAL PARAMETERS
var appName = "Merit1"
var appPath = "appName.Data";
var delaySampleShow = 5000; // delay to show de Sample in miliseconds
var StmParam = "hideComp"; // Comparison behavior on the before the sample click 
var feedbackTime = 3000; // Time showing the feedback in miliseconds

// ALL STIMULI KEYS PARAMETERS
// Observing Response Parameters
var keysActive = true;
var obsRespsType = "FR";
var obsRespsValue = 3 // 1 will create a typical Obs Response criterion (1 click on sample)
var localObsRespControl = -10;
var obsRespsControl = false;

//COMPARISONS BEHAVIOR
var comparisonShowDelay = 4; // Delay in seconds to show the comparisons when the Trial starts
var sPlusClicksLimit = 1; // How many clicks on S+ the user is allowed to do
var sMinusClicksLimit = 3; // How many clicks on S- the user is allowed to do
var comparisonClicksCtrl = []; // Comparisons cliks || CONFIRM, BUT PROBABLY IS UNNECESSARY - THE data-keyclicks is enough

// SAMPLE BEHAVIOR - Simultaneous or Delayed Matching To Sample Parameters
var sampleGoAway = false;
var sampleGoAwayDelay = 500; //in miliseconds
var mtsType = "simultaneous";