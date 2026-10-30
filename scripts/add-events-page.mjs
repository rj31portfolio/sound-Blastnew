import fs from 'node:fs';
let f='includes/header.php',t=fs.readFileSync(f,'utf8');t=t.replace('<a href="<?=e(url(\'b2b.php\'))?>">B2B Solutions</a><a href="<?=e(url(\'about.php#quality\'))?>">Why S&B</a>','<a href="<?=e(url(\'events.php\'))?>">Events</a>');t=t.replaceAll("url('b2b.php')","url('contact.php')");fs.writeFileSync(f,t);
for(f of ['index.php','about.php','includes/footer.php']){t=fs.readFileSync(f,'utf8').replaceAll("url('b2b.php')","url('contact.php')");if(f==='includes/footer.php')t=t.replace('<a href="<?=e(url(\'contact.php\'))?>">Become a dealer</a>','<a href="<?=e(url(\'events.php\'))?>">Events</a><a href="<?=e(url(\'contact.php\'))?>">Become a dealer</a>');fs.writeFileSync(f,t);}
f='scripts/build-pages.mjs';t=fs.readFileSync(f,'utf8').replace("'/b2b.php'","'/events.php'");fs.writeFileSync(f,t);
f='sitemap.xml';t=fs.readFileSync(f,'utf8').replace('/b2b.php','/events.php');fs.writeFileSync(f,t);
fs.writeFileSync('b2b.php',`<?php\n// Retain old bookmarks while the Events page replaces B2B Solutions.\n$path=str_replace('\\\\','/',dirname($_SERVER['SCRIPT_NAME']??'/b2b.php'));\nheader('Location: '.rtrim($path,'/').'/events.php',true,301);\nexit;\n`);
