import fs from 'node:fs';
let f='includes/bootstrap.php',t=fs.readFileSync(f,'utf8');t=t.replace("$categories=$catalogue['categories']; $products=$catalogue['products'];","$categories=$catalogue['categories']; $products=$catalogue['products'];\nrequire_once __DIR__.'/business.php';");fs.writeFileSync(f,t);
f='index.php';t=fs.readFileSync(f,'utf8').replace('2025→26','2025–26').replace('\\ HERCULES','HERCULES');fs.writeFileSync(f,t);
