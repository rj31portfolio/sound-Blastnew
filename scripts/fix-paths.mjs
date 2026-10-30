import fs from 'node:fs';
let f='includes/bootstrap.php',t=fs.readFileSync(f,'utf8');t=t.replace("rtrim(dirname($script),'/')","rtrim(str_replace('\\\\','/',dirname($script)),'/')");fs.writeFileSync(f,t);
f='index.php';t=fs.readFileSync(f,'utf8');const decoder=new TextDecoder('windows-1252'),inverse=new Map();for(let i=0;i<256;i++)inverse.set(decoder.decode(new Uint8Array([i])),i);for(let i=0;i<2;i++)t=Buffer.from([...t].map(c=>inverse.get(c)??c.charCodeAt(0))).toString('utf8');fs.writeFileSync(f,t);
