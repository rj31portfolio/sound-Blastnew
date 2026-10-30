import fs from 'node:fs';
import path from 'node:path';
for(const dir of ['.','includes','scripts','css','js','products']){function visit(d){for(const ent of fs.readdirSync(d,{withFileTypes:true})){if(ent.isDirectory()){if(dir!=='.')visit(path.join(d,ent.name));}else if(/\.(php|mjs|js|css|txt)$/.test(ent.name)){const f=path.join(d,ent.name);const t=fs.readFileSync(f,'utf8');if(t.charCodeAt(0)===0xfeff)fs.writeFileSync(f,t.slice(1));}}}visit(dir);}
