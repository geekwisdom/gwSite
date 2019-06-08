/********************************************************************************
Script Name: gwModal.js
@(#) Purpose: This script allows to open a modal dialog in an existing page.
**********************************************************************************
Written By: Brad Detchevery
Created: May 25, 2019
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

function openModal(elName,src)
{
var modal = document.getElementById(elName);
var ifr_modal = document.getElementById(elName + "_ifr");
ifr_modal.src = src;
modal.style.display="block";
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal

span.onclick = function(event) {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
