/********************************************************************************
Script Name: gwPlsPlayer.js
@(#) Purpose: This class implements a pls player for HTML5 audio tag
@(#)  
@(#) 
**********************************************************************************
Written By: Brad Detchevery
Created: Mar 23, 2020
********************************************************************************/
function gwPlsPlayer(audioId,plsLoc)
{
this.pls = {};
this.pls.audio = document.getElementById(audioId);
this.plsFile = plsLoc;
}

gwPlsPlayer.prototype.play = function()
{
if (window.XMLHttpRequest) {
    // code for IE7 +, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.open("GET", this.plsFile, false);
xhr.send();
xhrDoc = xhr.responseText;

// split into lines
this.pls.Entries = xhrDoc.split("\n");
alert (JSON.stringify(this.pls.Entries));
// Entry 0 is [playlist]
// Entry 1 is NumberOfEntries=n
this.pls.Count = this.pls.Entries[1].split("=")[1];
// Entry 2,3,4 = File#=,Title#=,Length#=
// repeat from 1 to NumberOfEntries

this.pls.Items = [];
this.pls.curItem = 0;
this.pls.listOk = true;
for (var i = 0; i < this.pls.Count; i++ ) {
    alert (this.pls.Entries[i]);
    this.pls.Items.push( {
        file: this.pls.Entries[i + 2].split("=")[1],
        title: this.pls.Entries[i + 3].split("=")[1],
        length: this.pls.Entries[i + 4].split("=")[1]
        });
}
// get the audio element



// hook onEnded and onError events to jump to next PLS item
this.pls.audio.addEventListener("error", audioEvent, false);
this.pls.audio.addEventListener("ended", audioEvent, false);

var loadPLS = function(whichItem,pls) 
    {
    if (whichItem >= pls.Count) 
       {
        return false;
        
    } 
     else 
      {
        pls.audio.autoplay = false;
        alert (JSON.stringify(pls.Items));
         pls.audio.src = pls.Items[whichItem].file;
        var title = document.getElementById("title");
        title.innerText = pls.Items[whichItem].title + "[" + pls.curItem + "/" + pls.Items[whichItem].file + "]";
        return true;
    }
}


// load audio tag with first source
this.pls.listOk = loadPLS(this.pls.curItem++,this.pls);

var audioEvent = function(event) 
    {
    // if the listOk is still true (ie not at the end of the list)
    // step to the next item either on ended or error
    if (this.pls.listOk) {
        this.pls.listOk = loadPLS(this.pls.curItem ++ );
    } else {
        // action to indicate end of stream    
    }
}
}