/********************************************************************************
Script Name: gwPlsPlayer.js
@(#) Purpose: This class implements a pls player for HTML5 audio tag
@(#)  
@(#) 
**********************************************************************************
Written By: Brad Detchevery
Created: Mar 23, 2020
********************************************************************************/
function gwPlsPlayer(divId,plsLoc)
{
this.pls = {};
var audioplayer = document.createElement("audio");
var audioid = divId + "_gwPlayer";
audioplayer.setAttribute("id",audioid);
audioplayer.setAttribute("controls","controls");

var source= document.createElement('source');
source.type= 'audio/mp3';
source.src= "";
audioplayer.appendChild(source);
var node = document.createElement("div");  
var titleId = divId + "_gwPlayerText";
node.setAttribute("id",titleId);
var textnode = document.createTextNode("");
node.appendChild(textnode);                              // Append the text to <li>
var div=document.getElementById(divId);
div.appendChild(audioplayer);
div.appendChild(node);
this.pls.audio = document.getElementById(audioid);
this.pls.Title = document.getElementById(titleId);


this.plsFile = plsLoc;
}

gwPlsPlayer.prototype.play = function()
{
if (window.XMLHttpRequest) 
   {
    // code for IE7 +, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
   } 
  
else 
  {
    // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
var obj=this;
xhr.onreadystatechange = function() 
    {

     
//  	if (this.readyState == 4 && this.status == 200) 
  	if (this.readyState == 4)
         {
        // Typical action to be performed when the document is ready:
 //     buildPlayList(xhr.responseText,audioEvent,this);
    //temp for now

//     buildPlayList("[playlist]\nFile1=https://cbc.mc.tritondigital.com/CBC_COMEDY_FACTORY_FROM_CBC_RADIO_P/media/cf-Ei0cS5Tz-20200323.mp3\nTitle1=CBC Comedy Factory\nlength=40\nNumberOfEntries=1\n\nFile2=https://dts.podtrac.com/redirect.mp3/download.ted.com/talks/MollyWebster_2019S.mp3?apikey=172BB350-0207&prx_url=https://dovetail.prxu.org/70/2d6f9088-83a9-4b69-9e2a-46ab4ec47d39/MollyWebster_2019S_VO_Intro.mp3\nTitle2=The wierd history of sex chromosones\nNumberOfEntries=1",audioEvent,obj);
     buildPlayList("[playlist]\nFile1=https://newcap.leanstream.co/CIHIFM-MP3?args=tunein_01\nTitle1=Live Radio\nlength=40\nNumberOfEntries=1\n\nFile2=https://dts.podtrac.com/redirect.mp3/download.ted.com/talks/MollyWebster_2019S.mp3?apikey=172BB350-0207&prx_url=https://dovetail.prxu.org/70/2d6f9088-83a9-4b69-9e2a-46ab4ec47d39/MollyWebster_2019S_VO_Intro.mp3\nTitle2=The wierd history of sex chromosones\nNumberOfEntries=1",audioEvent,obj);

      }
   }

xhr.open("GET", this.plsFile);
xhr.send();


var loadPLS = function(whichItem,pls) 
    {
    if (whichItem >= pls.Count) 
       {
        return false;
        
    } 
     else 
      {
        pls.audio.autoplay = false;
        
//	alert (pls.Items[whichItem].file); 
        pls.audio.src = pls.Items[whichItem].file;
         if(pls.Items[whichItem].hasOwnProperty("length"))
         {
        var stopAt = pls.Items[whichItem].length;
	if (stopAt != -1) setTimeout(function(){ loadPLS(obj.pls.curItem++,obj.pls); obj.pls.audio.play(); }, stopAt * 1000);
	}
        var title = pls.Title;
        title.innerText = pls.Items[whichItem].title;

    pls.audio.style.visibility="visible"; 
        return true;
    }
}



var audioEvent = function(event) 
    {
    // if the listOk is still true (ie not at the end of the list)
    // step to the next item either on ended or error

    if (obj.pls.listOk) 
       {
        obj.pls.listOk = loadPLS(obj.pls.curItem++,obj.pls);
	obj.pls.audio.play();
       } 
else {
        // action to indicate end of stream    
    }
}

var buildPlayList = function(xhrDoc,audioEvent,obj)
{
// split into lines
var Entries = xhrDoc.split("\n");
var nextrecord=false;
var Items = [];
// Entry 0 is [playlist]
// Entry 1 is NumberOfEntries=n
var Item={};

for (var j=0;j<Entries.length;j++)
{
var Entry=Entries[j];
//alert (Entry);
if (Entry.indexOf("=") > 0)
 {
 var parts=Entry.split("=");
 if (parts.length > 2)
 {
  for (var k=2;k<parts.length;k++) parts[1] = parts[1] + "=" + parts[k];
 }
 if (parts[0].trim().toLowerCase().indexOf("file") >= 0) 
  { 
   if (nextrecord)
	{
	//process item
        var tmpItem = {};
	for(var k in Item) tmpItem[k]=Item[k];
        Items.push(tmpItem);
   	nextrecord=false;
	}
   Item["file"] = parts[1].trim(); 
   nextrecord=true; 
 }
 if (parts[0].trim().toLowerCase().indexOf("title") >= 0) Item["title"] = parts[1].trim();
 if (parts[0].trim().toLowerCase().indexOf("length") >= 0) Item["length"] = parts[1].trim();
 
 }
//process last record
} //end of for
Items.push(Item);
//alert (JSON.stringify(Items));
//alert ("end for: " + JSON.stringify(Items));
// Entry 2,3,4 = File#=,Title#=,Length#=
// repeat from 1 to NumberOfEntries
obj.pls.Count = Items.length;
obj.pls.Items = Items;
obj.pls.curItem = 0;
obj.pls.listOk = true;
// get the audio element

// hook onEnded and onError events to jump to next PLS item
obj.pls.audio.addEventListener("error", audioEvent, false);
obj.pls.audio.addEventListener("ended", audioEvent, false);
// load audio tag with first source
obj.pls.listOk = loadPLS(obj.pls.curItem++,obj.pls);

}
}