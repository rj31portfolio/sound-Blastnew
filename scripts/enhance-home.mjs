import fs from 'node:fs';
let f='index.php',t=fs.readFileSync(f,'utf8');t=t.replace('<b>22</b>','<b data-count="22">22</b>').replace('<b>97</b>','<b data-count="97">97</b>');
for(const name of ['shield','sound','spark','truck'])t=t.replace('<span><b>→</b>','<span><b><?php icon(\''+name+'\'); ?></b>');
for(const name of ['shield','sound','spark','phone'])t=t.replace('<div><b>→</b>','<div><b><?php icon(\''+name+'\'); ?></b>');fs.writeFileSync(f,t);
