import fs from 'node:fs';
let f='includes/bootstrap.php',t=fs.readFileSync(f,'utf8');
const helper=`
function product_image($p,$lazy=true){
 if(is_file(__DIR__.'/../'.$p['image'])){echo '<img '.($lazy?'loading="lazy" ':'').'src="'.e(url($p['image'])).'" alt="'.e($p['model']).'">';return;}
 [$x1,$y1,$x2,$y2]=$p['box'];
 echo '<svg class="source-product-image" role="img" aria-label="'.e($p['model']).'" viewBox="'.$x1.' '.$y1.' '.($x2-$x1).' '.($y2-$y1).'" xmlns="http://www.w3.org/2000/svg"><title>'.e($p['model']).'</title><image href="'.e(url('images/catalogue/'.$p['page'].'.jpg')).'" x="0" y="0" width="1334" height="1888" preserveAspectRatio="none" /></svg>';
}
`;
t=t.replace('function card($p)',helper+'\nfunction card($p)');
t=t.replace('<img loading="lazy" src="<?=e(url($p[\'image\']))?>" alt="<?=e($p[\'model\'])?>">','<?php product_image($p); ?>');fs.writeFileSync(f,t);
for(f of ['index.php','includes/category-page.php','includes/product-page.php']){t=fs.readFileSync(f,'utf8');t=t.replace('<img loading="lazy" src="<?=e(url($cp[0][\'image\']))?>" alt="<?=e($c[\'name\'])?>">','<?php product_image($cp[0]); ?>').replace('<img loading="lazy" src="<?=e(url($products[0][\'image\']))?>" alt="Hercules amplifier">','<?php product_image($products[0]); ?>').replace('<img loading="lazy" src="<?=e(url($items[0][\'image\']))?>" alt="<?=e($cat[\'name\'])?>">','<?php product_image($items[0]); ?>').replace('<img src="<?=e(url($product[\'image\']))?>" alt="<?=e($product[\'model\'])?>">','<?php product_image($product,false); ?>');fs.writeFileSync(f,t);}
fs.appendFileSync('css/style.css',`\n.source-product-image{display:block;object-fit:contain;overflow:hidden}.product-visual>.source-product-image{width:90%;height:82%;transition:transform .45s}.product-card:hover .source-product-image{transform:scale(1.05)}.category-card>.source-product-image{width:100%;height:180px;padding:25px 10px 3px}.category-tile .source-product-image{width:100%;height:200px;padding:25px 10px 10px}.detail-visual>.source-product-image{width:95%;height:350px}.dealer-art>.source-product-image{width:110%;max-height:300px;transform:rotate(-7deg);margin-top:50px}@media(max-width:680px){.category-card>.source-product-image{height:155px}.category-tile .source-product-image{height:130px;padding:20px 0 10px}.detail-visual>.source-product-image{height:260px}.dealer-art>.source-product-image{width:85%;height:210px;margin-top:0}}\n`);
