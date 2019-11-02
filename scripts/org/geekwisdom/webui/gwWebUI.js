/********************************************************************************
Script Name: gwWebUI.js
@(#) Purpose: This class implements various useful WebUI Functions
@(#) For example, to implement a growing text box simpy include this javascript, 
@(#) and on the textbox you want to grow, add the 
@(#) gwWebUI.gwOnGrow (this) to the onkeydown event handler.
@(#) This function assumes your inputbox is contained within an outer div of a 
@(#) specified width.
**********************************************************************************
Written By: Brad Detchevery
Created: Nov 2, 2019
********************************************************************************/
function gwWebUI()
{

}

gwWebUI.prototype.onGrow = function(obj)
{
var gwGetDefaultFontSize=function(pa)
 {
 pa= pa || document.body;
 var who= document.createElement('div');
 who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em';
 who.appendChild(document.createTextNode('a'));
 pa.appendChild(who);
 var fs= [who.offsetWidth, who.offsetHeight];
 pa.removeChild(who);
 return fs;
 }

var gwGetRequiredFontSize = function (pa,thestr)
 {
 pa= pa || document.body;
 var who= document.createElement('div');
 who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em';
who.style.padding=pa.padding;
who.appendChild(document.createTextNode('a'));
who.textContent=thestr;
 pa.appendChild(who);
 var fs= [who.offsetWidth, who.offsetHeight];
 return fs;
 }



var thestr=obj.value;
var expandbox = obj.parentElement;
var defsize=gwGetDefaultFontSize(expandbox);
var rsize=gwGetRequiredFontSize(expandbox,thestr,defsize[0]);
var initialsize=expandbox.offsetWidth + 1;
var requiredsize=Math.floor(rsize[0] + defsize[0]);
console.log("i: " + initialsize);
console.log("r: " + requiredsize);
if (requiredsize > initialsize)
 {
 expandbox.style.offsetWidth=requiredsize;
 expandbox.style.width=requiredsize.toString() + "px";
 }
}

