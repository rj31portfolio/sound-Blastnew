import fs from 'node:fs';
let f='scripts/extract-products.php',t=fs.readFileSync(f,'utf8');t=t.replace("$report=[];$cache=[];","$report=[];$cache=[];\n$only=$argv[1]??null;");t=t.replace("$key=$p['page']", "if($only && !in_array($p['slug'],explode(',',$only)))continue;\n $key=$p['page']");t=t.replace(' $mask=str_repeat'," if($p['page']===30)$palette=[[0,0,0]];\n $mask=str_repeat");t=t.replace('$visited=$mask;',`// Remove known catalogue badge/text corners outside the product silhouette.
 $corners=[
 'sb-806r'=>[[0,535,215,2000]],
 'ahd-bumper-camera'=>[[0,500,990,2000]],
 't5-front-camera'=>[[440,1415,1334,2000]],
 'sb-60w'=>[[720,1500,1334,2000]],
 'sb-m65c'=>[[720,1765,1334,2000]],
 'sb-en65c'=>[[700,875,1334,2000]],
 '7w12'=>[[1120,1230,1334,1405]],
 '11-5-inch-8-core-2k-player'=>[[0,0,1334,550]]
 ];
 foreach($corners[$p['slug']]??[] as [$cx1,$cy1,$cx2,$cy2])for($y=0;$y<$h;$y++)for($x=0;$x<$w;$x++){
 $px=$x1-4+$x/$ratio/$scale;$py=$y1-4+$y/$ratio/$scale;
 if($px>=$cx1&&$px<=$cx2&&$py>=$cy1&&$py<=$cy2)$mask[$y*$w+$x]="\\1";
 }
 $visited=$mask;`);fs.writeFileSync(f,t);
