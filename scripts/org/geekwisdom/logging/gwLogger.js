/********************************************************************************
Script Name: gwLoggerjs
@(#) Purpose: This script allows for simple logging to the browser console. Note:
@(#) For some browsers, items may not be written to the javascript console if the 
@(#) console is not opened up. In these cases the application will simply not log
@(#) The calling application needs to set an approperiate log verbosity level
**********************************************************************************
Written By: Brad Detchevery
Created: May 16, 2019
********************************************************************************
MIT License [MODIFIED COPYRIGHT NOTICE]

-- BEGIN COPYRIGHT NOTICE --
Copyright (c) 2019 Brad Detchevery
This product uses GeekWisdom.org Software, and has been provided FREE OF CHARGE.
If you like it please consider becoming a Patron at https://patreon.com/GeekWisdom
-- END COPYRIGHT NOTICE --

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice (text between the -- BEGIN COPYRIGHT NOTICE -- and -- END COPYRIGHT NOTICE --)
and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
