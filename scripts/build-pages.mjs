import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('data/catalogue.json','utf8'));
fs.writeFileSync('products/index.php',"<?php require __DIR__.'/../includes/category-page.php';\n");
for(const c of data.categories){fs.mkdirSync(`products/${c.slug}`,{recursive:true});fs.writeFileSync(`products/${c.slug}/index.php`,`<?php $categorySlug='${c.slug}'; require __DIR__.'/../../includes/category-page.php';\n`);}
for(const p of data.products)fs.writeFileSync(`products/${p.category}/${p.slug}.php`,`<?php $categorySlug='${p.category}'; $productSlug='${p.slug}'; require __DIR__.'/../../includes/product-page.php';\n`);
let urls=['/','/about.php','/events.php','/contact.php','/products/',...data.categories.map(c=>`/products/${c.slug}/`),...data.products.map(p=>`/products/${p.category}/${p.slug}.php`)];
fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`\n<url><loc>https://www.soundblast.co.in${u}</loc></url>`).join('')}\n</urlset>\n`);
console.log(`Generated ${urls.length} sitemap URLs and all PHP entry pages`);
