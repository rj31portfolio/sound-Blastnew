import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
let files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.php'))files.push(p);}}walk('.');
let failures=[];for(const file of files){const r=spawnSync('C:/xampp/php/php.exe',['-n','-l',file],{encoding:'utf8'});if(r.status!==0)failures.push({file,output:r.stdout+r.stderr});}console.log(JSON.stringify({phpFiles:files.length,failures},null,2));if(failures.length)process.exit(1);
