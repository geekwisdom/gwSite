/********************************************************************************
Script Name: logging.js
@(#) Purpose: This script allows for simple logging to the browser console. Note:
@(#) For some browsers, items may not be written to the javascript console if the 
@(#) console is not opened up. In these cases the application will simply not log
@(#) The calling application needs to set an approperiate log verbosity level
**********************************************************************************
Written By: Brad Detchevery
Created: Nov 24, 2014
********************************************************************************/

function gwLogger (LogVerbosity)
{
this.Verbosity=LogVerbosity;
}

gwLogger.prototype.LogInfo = function(LogItem,LogLevel)
{
//Write out message to console if console object is available and less then log level. Assumes
//a logverbosity global variable has been set)
var Verbosity=1;
if (typeof this.Verbosity == "undefined") Verbosity=1;
else Verbosity=this.Verbosity;
if (typeof console == "undefined") { return;} 

if (LogLevel <= Verbosity)
 {
  var d = new Date();
  var n = d.toString();
  console.log(n + " " + LogItem);
 }
return
}
