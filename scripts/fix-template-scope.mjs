import fs from 'node:fs';
let file='includes/header.php',t=fs.readFileSync(file,'utf8');t=t.replace('foreach($categories as $c):','foreach($categories as $navCategory):').replace("category_url($c)","category_url($navCategory)").replace("e($c['name'])","e($navCategory['name'])");fs.writeFileSync(file,t);
