<?php
$catalogue=json_decode(file_get_contents(__DIR__.'/../data/catalogue.json'),true,512,JSON_THROW_ON_ERROR);
$categories=$catalogue['categories']; $products=$catalogue['products'];
require_once __DIR__.'/business.php';
function e($v){return htmlspecialchars((string)$v,ENT_QUOTES,'UTF-8');}
function url($path=''){return BASE_PATH.'/'.ltrim($path,'/');}
function category($slug){global $categories;foreach($categories as $c)if($c['slug']===$slug)return $c;return null;}
function category_url($c){return url('products/'.$c['slug'].'/');}
function product_url($p){return url('products/'.$p['category'].'/'.$p['slug'].'.php');}
function category_products($slug){global $products;return array_values(array_filter($products,fn($p)=>$p['category']===$slug));}

function product_image($p,$lazy=true){
 if(is_file(__DIR__.'/../'.$p['image'])){echo '<img '.($lazy?'loading="lazy" ':'').'src="'.e(url($p['image'])).'" alt="'.e($p['model']).'">';return;}
 [$x1,$y1,$x2,$y2]=$p['box'];
 echo '<svg class="source-product-image" role="img" aria-label="'.e($p['model']).'" viewBox="'.$x1.' '.$y1.' '.($x2-$x1).' '.($y2-$y1).'" xmlns="http://www.w3.org/2000/svg"><title>'.e($p['model']).'</title><image href="'.e(url('images/catalogue/'.$p['page'].'.jpg')).'" x="0" y="0" width="1334" height="1888" preserveAspectRatio="none" /></svg>';
}

function card($p){global $business;$c=category($p['category']);$spec=array_values($p['specs']);$enquiry=$business['whatsapp'].'?text='.rawurlencode('Hello Sound Blast, I would like to enquire about '.$p['model'].' ('.$c['name'].'). Please share availability and product details.'); ?>
<article class="product-card reveal"><a class="product-visual" href="<?=e(product_url($p))?>" aria-label="View <?=e($p['model'])?> specifications"><?php product_image($p); ?><span class="card-arrow" aria-hidden="true">&nearr;</span></a><div class="product-copy"><span class="eyebrow muted"><?=e($c['name'])?></span><h3><a href="<?=e(product_url($p))?>"><?=e($p['model'])?></a></h3><p><?=e(implode(' · ',array_slice($spec,0,2)))?></p><div class="product-actions"><a class="text-link" href="<?=e(product_url($p))?>">Specifications <span aria-hidden="true">&rarr;</span></a><a class="product-enquiry" href="<?=e($enquiry)?>" target="_blank" rel="noopener" aria-label="Enquire about <?=e($p['model'])?> on WhatsApp"><?php icon('whatsapp'); ?><span>Enquire now</span></a></div></div></article>
<?php }
$script=str_replace('\\','/',$_SERVER['SCRIPT_NAME']??'/index.php');
$marker=strpos($script,'/products/');
define('BASE_PATH',$marker!==false?substr($script,0,$marker):rtrim(str_replace('\\','/',dirname($script)),'/'));
