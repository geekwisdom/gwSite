<?php
/********************************************************************************
Script Name: makeTemplate.php
@(#) Purpose: Takes an Import File and an NFO file and applies the two files 
@(#) together to create a new file that applies the informatin into the template
@(#) EG: php makeTemplate.php gwTemplate.html home.nfo

**********************************************************************************
Written By: Brad Detchevery
Created: Apr 20, 2019
********************************************************************************

Contents of home.nfo Example
TAG_LINE = Be Proud of Your Inner Geek
TITLE = Be Proud of Your Inner Geek - Home
SITE_URL = https://geekwisdom.org
SITE_RSS = http://blog.geekwisdom.org/feeds/posts/default?alt=rss
AUTHOR = Brad Detchevery
DESCRIPTION = Misson: To seek out new Gadgets and Gizmos, to boldly go where no Geek has gone before!
SITENAME = Be Proud of Your Inner Geek - #GeekWisdom
OG_IMAGE= http://geekwisdom.org/styles/gwlogosmall.png
TWITTER_NAME = @TrueGeekWisdom
********************************************************************************/
if (count ($argv) > 2)
{
$templateFile = $argv[1];
$settingsFile = $argv[2];
$templateData = file_get_contents_utf8($templateFile);
$settingsAry = parse_ini_file($settingsFile);
foreach ($settingsAry as $settingName => $settingValue) {
   if (strpos($settingValue,"http")  >= 0) $settingValue=urldecode($settingValue);
   $templateData = str_replace("%{" . $settingName . "}%",$settingValue,$templateData);
}
echo $templateData;
}
else
 {
 $script_name = __FILE__; 
 $script_info = file($script_name);
 
 $help_info="";
 for ($i=0;$i<count($script_info);$i++)
  {
  $the_line=$script_info[$i];
  $is_help = preg_match("/^@\(#\)(.*)$/m",$script_info[$i],$help_info_ary);
  if ($is_help > 0) $help_info = $help_info . "\n" . $help_info_ary[1];
  }
echo $help_info . "\n";
 
 }

function file_get_contents_utf8($fn) {
     $content = file_get_contents($fn);
      return mb_convert_encoding($content, 'UTF-8',
          mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
}
?>