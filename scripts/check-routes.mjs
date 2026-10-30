import fs from 'node:fs';
let f='index.php',t=fs.readFileSync(f,'utf8').replaceAll('\uFFFD','→');fs.writeFileSync(f,t);
fs.appendFileSync('css/style.css','\n.brand img{width:110px;height:80px;clip-path:none;object-fit:cover}.footer-brand img{width:145px;height:100px}@media(max-width:680px){.brand img{width:86px;height:64px}.footer-brand img{width:120px;height:88px}}\n');
const xml=fs.readFileSync('sitemap.xml','utf8');const urls=[...xml.matchAll(/<loc>https:\/\/www.soundblast.co.in([^<]*)<\/loc>/g)].map(m=>m[1]);let errors=[];for(const u of urls){let r=await fetch('http://127.0.0.1:8088'+u);let html=await r.text();if(r.status!==200||/Fatal error|Warning:|Parse error/.test(html))errors.push({url:u,status:r.status});}console.log(JSON.stringify({routesChecked:urls.length,errors}));
