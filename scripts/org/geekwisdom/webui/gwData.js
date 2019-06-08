/********************************************************************************
Script Name: gwData.js
@(#) Purpose: This script allows you to fill a page of form elements / span
@(#) tags with JSON data.
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

function gwData()
{
//constructor
//private methods
}

gwData.prototype.walkPage = function (jsonObj,prefix)
{

//given a json object attempt to fill the page whose element ID matches the
//DOM Object to contain the value in the JSON object

    for (var keyname in jsonObj) 
	{

	  if (jsonObj.hasOwnProperty(keyname)) 
		{
		  if (typeof (jsonObj[keyname]) == "object")
                  this.walkPage(jsonObj[keyname],prefix + "." + keyname);
	  	  else
   		    {
			    var key;
    			    if (typeof objectname != "undefined") key = objectname + "_" + keyname;
		            else key = keyname;
       			    var searchId;
    			    if (prefix == "")
			        searchId = key;
			    else
				searchId = prefix + "." + key;   

			    foundObj = document.getElementById(searchId);

			    if (foundObj != null) 
					{
					   var TestVar = foundObj.value;
    					   if (TestVar == undefined)
					        foundObj.textContent = jsonObj[keyname];
					    else 
						{
				                if (foundObj.type == "checkbox") 
						  {
					            if (jsonObj[keyname] == "true") { foundObj.checked = true; }
				                    else { foundObj.checked = false; }
						  }

        				          foundObj.value = jsonObj[keyname].replace(/&gt;/g, ">");
					        }
    				         }
						//try byName if no ID
				    	    names = document.getElementsByName(searchId);
    				            names = document.getElementsByName(searchId);
    					    for (i=0;i<names.length;i++)
					        { 
						var TestVar = names[i].value;
				    	        if (TestVar == undefined)
						 	names[i].textContent=jsonObj[keyname];
						else
						       {
	    					        if (names[i].type == "checkbox")
							  {
	 					           if (jsonObj[keyname] == "true") { names[i].checked = true; }
					    	           else { names[i].checked = false;}
						    	  }  
	    						names[i].value = jsonObj[keyname].replace(/&gt;/g, ">");
						        }
						} //end for

    			 	      } // end if foundObj !=null
    					

	     } // end of hasown poperty
	}  // END - for (var keyname in jsonObj) 


} // end function


gwData.prototype.fillElements = function (jsonDataStr)
{
var jsonObj = JSON.parse(jsonDataStr);
this.walkPage(jsonObj,"");
}
