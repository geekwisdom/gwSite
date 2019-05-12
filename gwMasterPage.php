<?php
function file_get_contents_utf8($fn) {
     $content = file_get_contents($fn);
      return mb_convert_encoding($content, 'UTF-8',
          mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
}

if (!(isset($side_menu))) $side_menu="aside.inc";
if (!(isset($main_page))) $main_page="main.inc";
if (!(isset($settingsFile))) $settingsFile="home.nfo";
$settingsAry = parse_ini_file($settingsFile);
?>
﻿<?php include("head.inc"); ?>
<body>
<?php include("oldbrowser.inc"); ?>
<div id="noJavascript">
<?php include("header.inc"); ?>

<div>
<?php include("nav.inc"); ?>
<?php include($side_menu); ?>

<?php include($main_page); ?>

<?php include("footer.inc"); ?>
 </div>
</div>
<script>
function showMyPage()
{
    if (self === top) {
        var removeold = document.getElementById("noJavascriptDIV");
        removeold.parentNode.removeChild(removeold);
        var antiClickjack = document.getElementById("noJavascriptStyle");
        antiClickjack.parentNode.removeChild(antiClickjack);

    } else {
        top.location = self.location;
    }
}

document.onload = new function ()
{
mySettings = new gwSetting();
var theStyle=mySettings.GetArgument("theme");
if (theStyle == null || theStyle == "" || theStyle == "null") theStyle=mySettings.GetSetting("theme");
if (theStyle == null || theStyle == "" || theStyle == "null") 
 {
 var today = new Date();
 var hour = today.getHours();
 theStyle="gw_day-theme";
 if (hour > 19 || hour < 4) theStyle="gw-theme";
 }
if (theStyle != "") 
 {
 if (theStyle == "null") theStyle="gw-theme";

 mySettings.WriteSetting("theme",theStyle);
 var removeold = document.getElementById("MainStyle");
     removeold.parentNode.removeChild(removeold);

var newstyle = document.createElement("link"); // Create a new link Tag
   newstyle.setAttribute("rel", "stylesheet");
   newstyle.setAttribute("type", "text/css");
   newstyle.setAttribute("href", "/themes/" + theStyle + ".css"); // Your .css File
   document.getElementsByTagName("head")[0].appendChild(newstyle);
 }
showMyPage();

}
</script>
</body>
</html> 

