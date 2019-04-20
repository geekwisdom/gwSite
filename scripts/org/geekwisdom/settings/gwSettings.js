"use strict";
/********************************************************************************
Script Name: gwSettings.js
@(#) Purpose: This script allows the user to get / set settings within the browser
@(#) It provides 2 functions, "GetSetting", and "SetSetting" which will store 
@(#) information locally to the browser using either an IndexedDB, LocalStorage
@(#) or cookies depending upon browser support. This script assumes that the @(#) file is also included to work properly. It also assumes a settings db variable
@(#) exits (eg: SettingsDB)
Note: Due to the nature of indexdb, and asynchronos calls, the GetSetting Function must have passed in a call back function that is called when the setting is returned.
**********************************************************************************
Written By: Brad Detchevery
Created: Nov 24, 2014
********************************************************************************/


function gwSetting()
{
this.DefaultDB="SettingsDB";

/* Private */
this.LogInfo = function (msg,LogLevel)
{
if (typeof gwLogger == "undefined")
  {
  console.log(msg);
  }
else
 {
 var verbose=1;
 if (typeof LogVerbosity == "undefined") verbose=1;
 else verbose=LogVerbosity;
 let l=new gwLogger(verbose);
 l.LogInfo(msg,LogLevel);
 }
}

/* Private */
this.supports_html5_storage = function ()
{
    try { 
    window.localStorage.setItem("test","test");
    return true;
    } 
    catch (e) {
    return false; 
    } 
}
 

}

gwSetting.prototype.WriteSetting = function (IName,IValue)
{
    var store = this.supports_html5_storage();
    if (store) {
        this.LogInfo("Local storage found! Setting Item", 1);
        window.localStorage.setItem(IName, IValue);
    }
    else {
        this.LogInfo("No local stroage, trying cookie method");
        var d = new Date();
        d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = IName + "=" + IValue + "; " + expires;
    }
}

gwSetting.prototype.GetSetting = function (IName)
{
    var store = this.supports_html5_storage();
    if(store) 
    {
        this.LogInfo("Local storage found!",1);
        var retval = window.localStorage.getItem(IName);
        return retval;

    }
    else
    {
        //use cookies
        var name = IName + "=";
        this.LogInfo("No Local storage found! - using cookies",1);
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) { return c.substring(name.length,c.length); 
            }
        }
        return "";
    } 

}

