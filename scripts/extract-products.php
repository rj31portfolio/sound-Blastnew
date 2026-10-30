<?php
// Exact source crops: no product or logo regeneration.
chdir(__DIR__.'/..');
$data=json_decode(file_get_contents('data/catalogue.json'),true,512,JSON_THROW_ON_ERROR);
$report=[];$cache=[];
$only=$argv[1]??null;
foreach($data['products'] as $p){
 if($only && !in_array($p['slug'],explode(',',$only)))continue;
 $key=$p['page'].':'.implode(',',$p['box']);
 if(isset($cache[$key])){if(!is_dir(dirname($p['image'])))mkdir(dirname($p['image']),0777,true);copy($cache[$key],$p['image']);continue;}
 $source=imagecreatefromjpeg('images/catalogue/'.$p['page'].'.jpg');
 [$x1,$y1,$x2,$y2]=$p['box'];$scale=imagesx($source)/1334;
 $sx=max(0,(int)round(($x1-4)*$scale));$sy=max(0,(int)round(($y1-4)*$scale));
 $sw=min(imagesx($source)-$sx,(int)round(($x2-$x1+8)*$scale));$sh=min(imagesy($source)-$sy,(int)round(($y2-$y1+8)*$scale));
 $ratio=min(1,760/$sw,760/$sh);$w=(int)round($sw*$ratio);$h=(int)round($sh*$ratio);
 $im=imagecreatetruecolor($w,$h);imagecopyresampled($im,$source,0,0,$sx,$sy,$w,$h,$sw,$sh);imagedestroy($source);
 // Learn flat background colours from the crop perimeter.
 $hist=[];for($y=0;$y<$h;$y++)for($x=0;$x<$w;$x++){if($x>2&&$y>2&&$x<$w-3&&$y<$h-3)continue;$rgb=imagecolorat($im,$x,$y);$r=($rgb>>16)&255;$g=($rgb>>8)&255;$b=$rgb&255;$k=(int)($r/16).':'.(int)($g/16).':'.(int)($b/16);$hist[$k]=($hist[$k]??0)+1;}
 arsort($hist);$palette=[];$top=reset($hist);foreach($hist as $k=>$n){if($n<$top*.12||count($palette)>=5)break;$v=array_map(fn($n)=>(int)$n*16+8,explode(':',$k));$palette[]=$v;}
 if($p['page']===30)$palette=[[0,0,0]];
 if($p['page']===31)$palette=[[248,248,248],[255,188,0],[51,49,49]];
 $mask=str_repeat("\0",$w*$h);$bg=str_repeat("\0",$w*$h);
 for($y=0;$y<$h;$y++)for($x=0;$x<$w;$x++){$i=$y*$w+$x;$rgb=imagecolorat($im,$x,$y);$r=($rgb>>16)&255;$g=($rgb>>8)&255;$b=$rgb&255;foreach($palette as [$pr,$pg,$pb]){$tol=($pr<100&&$pg<100&&$pb<100)?10:26;$same=max(abs($r-$pr),abs($g-$pg),abs($b-$pb))<$tol;$yellow=$pr>190&&$pg>115&&$pb<65&&$r>175&&$g>100&&$b<100&&$r>$g*.85;if($same||$yellow){$bg[$i]="\1";break;}}}
 // Flood only background connected to the crop boundary.
 $queue=new SplQueue();for($x=0;$x<$w;$x++){foreach([$x,($h-1)*$w+$x] as $i)if($bg[$i]==="\1"&&$mask[$i]==="\0"){$mask[$i]="\1";$queue->enqueue($i);}}for($y=0;$y<$h;$y++){foreach([$y*$w,$y*$w+$w-1] as $i)if($bg[$i]==="\1"&&$mask[$i]==="\0"){$mask[$i]="\1";$queue->enqueue($i);}}
 while(!$queue->isEmpty()){$i=$queue->dequeue();$x=$i%$w;foreach([($x>0?$i-1:-1),($x<$w-1?$i+1:-1),$i-$w,$i+$w] as $n)if($n>=0&&$n<$w*$h&&$mask[$n]==="\0"&&$bg[$n]==="\1"){$mask[$n]="\1";$queue->enqueue($n);}}
 // Discard isolated catalogue lettering and tiny speckles; retain product groups.
 // Remove known catalogue badge/text corners outside the product silhouette.
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
 if($px>=$cx1&&$px<=$cx2&&$py>=$cy1&&$py<=$cy2)$mask[$y*$w+$x]="\1";
 }
 $visited=$mask;$groups=[];for($i=0;$i<$w*$h;$i++){if($visited[$i]!=="\0")continue;$visited[$i]="\1";$queue->enqueue($i);$group=[];while(!$queue->isEmpty()){$n=$queue->dequeue();$group[]=$n;$x=$n%$w;foreach([($x>0?$n-1:-1),($x<$w-1?$n+1:-1),$n-$w,$n+$w] as $j)if($j>=0&&$j<$w*$h&&$visited[$j]==="\0"){$visited[$j]="\1";$queue->enqueue($j);}}$groups[]=$group;}
 $max=0;foreach($groups as $g)$max=max($max,count($g));$min=max(100,(int)($max*.022));$keep=str_repeat("\0",$w*$h);foreach($groups as $g)if(count($g)>=$min)foreach($g as $i)$keep[$i]="\1";
 imagealphablending($im,false);imagesavealpha($im,true);$clear=imagecolorallocatealpha($im,0,0,0,127);$minx=$w;$miny=$h;$maxx=0;$maxy=0;$visible=0;
 for($y=0;$y<$h;$y++)for($x=0;$x<$w;$x++){if($keep[$y*$w+$x]==="\0")imagesetpixel($im,$x,$y,$clear);else{$visible++;$minx=min($minx,$x);$miny=min($miny,$y);$maxx=max($maxx,$x);$maxy=max($maxy,$y);}}
 if($visible){$out=imagecreatetruecolor($maxx-$minx+25,$maxy-$miny+25);imagealphablending($out,false);imagesavealpha($out,true);imagefill($out,0,0,imagecolorallocatealpha($out,0,0,0,127));imagecopy($out,$im,12,12,$minx,$miny,$maxx-$minx+1,$maxy-$miny+1);}else{$out=$im;}
 if(!is_dir(dirname($p['image'])))mkdir(dirname($p['image']),0777,true);imagepng($out,$p['image'],7);$cache[$key]=$p['image'];$report[]=['model'=>$p['model'],'image'=>$p['image'],'coverage'=>round($visible/($w*$h),3),'groups'=>count($groups)];imagedestroy($out);if($out!==$im)imagedestroy($im);echo $p['model']."\n";
}
file_put_contents('data/extraction-report.json',json_encode($report,JSON_PRETTY_PRINT));echo "Finished all ".count($data['products'])." PNGs\n";
