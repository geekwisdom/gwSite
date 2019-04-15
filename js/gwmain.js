/*******************************************************************************************************************************************************
 .----------------.  .----------------.  .----------------.  .----------------.                                         
| .--------------. || .--------------. || .--------------. || .--------------. |                                        
| |    ______    | || |  _________   | || |  _________   | || |  ___  ____   | |                                        
| |  .' ___  |   | || | |_   ___  |  | || | |_   ___  |  | || | |_  ||_  _|  | |                                        
| | / .'   \_|   | || |   | |_  \_|  | || |   | |_  \_|  | || |   | |_/ /    | |                                        
| | | |    ____  | || |   |  _|  _   | || |   |  _|  _   | || |   |  __'.    | |                                        
| | \ `.___]  _| | || |  _| |___/ |  | || |  _| |___/ |  | || |  _| |  \ \_  | |                                        
| |  `._____.'   | || | |_________|  | || | |_________|  | || | |____||____| | |                                        
| |              | || |              | || |              | || |              | |                                        
| '--------------' || '--------------' || '--------------' || '--------------' |                                        
 '----------------'  '----------------'  '----------------'  '----------------'                                         
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| | _____  _____ | || |     _____    | || |    _______   | || |  ________    | || |     ____     | || | ____    ____ | |
| ||_   _||_   _|| || |    |_   _|   | || |   /  ___  |  | || | |_   ___ `.  | || |   .'    `.   | || ||_   \  /   _|| |
| |  | | /\ | |  | || |      | |     | || |  |  (__ \_|  | || |   | |   `. \ | || |  /  .--.  \  | || |  |   \/   |  | |
| |  | |/  \| |  | || |      | |     | || |   '.___`-.   | || |   | |    | | | || |  | |    | |  | || |  | |\  /| |  | |
| |  |   /\   |  | || |     _| |_    | || |  |`\____) |  | || |  _| |___.' / | || |  \  `--'  /  | || | _| |_\/_| |_ | |
| |  |__/  \__|  | || |    |_____|   | || |  |_______.'  | || | |________.'  | || |   `.____.'   | || ||_____||_____|| |
| |              | || |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 

http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Blocks&t=Geek%0AWisdom

Really !, you want to cheat and look at the code ?

Really ???

#GeekWisdom

*******************************************************************************************************************************************************






































































Okay !!, Good for you... */
var MaxLevels=5;
function reset()
{
localStorage.setItem("userlevel",1);
}
function pageload()
{
//redirect small screens
if (window.screen.width < 640 && window.screen.height < 480)
{
window.location = "https://geekwizdom.blogspot.ca/2018/01/about-geek-wisdom.html";
return;
}

var msg=document.getElementById("message");
var level=0;
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var pagelevel=filename.substr(5,1);
if (typeof(Storage) !== "undefined") {
	level=localStorage.getItem("userlevel");
	if (level == null) level=1;	
if (!isNumeric(level))
	{
	//for higher levels only
	var theitem=document.getElementById("thecode");
	theitem.value=level;
	//autosubmit to consume
	document.forms[0].submit();
	}
	
    // Code for localStorage/sessionStorage.
} else {
   //bad browser - should upgrade !!
    window.location="https://www.youtube.com/channel/UChtmog8oIF9z4npDfY7_QVQ";
}
msg.textContent="READY... LEVEL " + level;
if (level == null) level=1;
if (pagelevel != level && level <= MaxLevels) 
	{
	if (isNumeric(level)) setTimeout(function(){ window.location="./level"+level+".html"; }, 1500);
	}
else
   {
    if (level >= MaxLevels && pagelevel != level ) 
	{
	if (pagelevel != level && isNumeric(level) ) window.location="/level" + MaxLevels + ".html";
	else { 
levelup(level);
PageLoad();

}
	}
    else { levelup(level); PageLoad(); }
   }
   
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function levelup(level)
{
    if (level < MaxLevels) level++;
    localStorage.setItem("userlevel",level);
}

window.addEventListener('load', function() {
  pageload();
})


