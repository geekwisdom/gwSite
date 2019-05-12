<!DOCTYPE html>
<!-- GeekWisdom.org - Themeable Site / W3C Compliant - Brad Detchevery -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <?php echo @$settingsAry["TAG_LINE"]; ?>   -->
<html lang="en">
<head><title><?php echo @$settingsAry["TITLE"]; ?></title>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-112001731-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-112001731-1');
</script>


<link rel="alternate" type="application/rss+xml" title="<?php echo @$settingsAry["SITE_URL"]; ?> - RSS" href="<?php echo @$settingsAry["SITE_RSS"]; ?>" />
<!--[if lt IE 9]-->
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js">
</script>
<!--[endif]-->
<link id="MainStyle" rel="stylesheet" type="text/css" href="/themes/gw-theme.css" />

<!--  ClickJack /Javascript Helper -->
<style id="noJavascriptStyle">
    #noJavascript {display:none !important;}
</style>
<script src="./scripts/org/geekwisdom/logging/gwLogger.js"></script>
<script src="./scripts/org/geekwisdom/settings/gwSettings.js"></script>
<!-- Standard Meta data -->
<meta name="Author" CONTENT="<?php echo @$settingsAry["AUTHOR"]; ?>">
<meta name="Publisher" CONTENT="<?php echo @$settingsAry["PUBLISHER"]; ?>">
<meta name="Content-Language" CONTENT="en-US">
<meta name="description" content="<?php echo @$settingsAry["DESCRIPTION"]; ?>">


<!-- Open Graph metadata -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="<?php echo @$settingsAry["SITE_NAME"]; ?>" />
<meta property="og:title" content="<?php echo @$settingsAry["TITLE"]; ?>" />
<meta property="og:url" content="<?php echo @$settingsAry["SITE_URL"]; ?>" />
<meta property="og:description" content="<?php echo @$settingsAry["DESCRIPTION"]; ?>" />
<meta property="og:image" content="<?php echo @$settingsAry["OG_IMAGE"]; ?>" />

<!-- Twitter metadata -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="<?php echo @$settingsAry["TWITTER_NAME"]; ?>">
<meta name="twitter:title" content="<?php echo @$settingsAry["TITLE"]; ?>">
<meta name="twitter:description" content="<?php echo @$settingsAry["DESCRIPTION"]; ?>">
</head>
