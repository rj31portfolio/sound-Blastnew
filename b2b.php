<?php
// Retain old bookmarks while the Events page replaces B2B Solutions.
$path=str_replace('\\','/',dirname($_SERVER['SCRIPT_NAME']??'/b2b.php'));
header('Location: '.rtrim($path,'/').'/events.php',true,301);
exit;
