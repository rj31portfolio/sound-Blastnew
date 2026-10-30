import fs from 'node:fs';
let f='includes/business.php',t=fs.readFileSync(f,'utf8');t=t.replace(" 'whatsapp'=>'https://wa.me/919318321456',"," 'whatsapp'=>'https://wa.me/919318321456',\n // Set the official profile URLs when supplied.\n 'facebook'=>'',\n 'linkedin'=>'',");t=t.replace(" $paths=["," $paths=[\n 'facebook'=>'<path fill=\"currentColor\" stroke=\"none\" d=\"M14.2 22v-9.1h3.1l.5-3.6h-3.6V7c0-1.1.3-1.8 1.8-1.8h1.9V2.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.5H7.2v3.6h3.2V22h3.8Z\"/>',\n 'linkedin'=>'<g fill=\"currentColor\" stroke=\"none\"><circle cx=\"5\" cy=\"5\" r=\"2\"/><path d=\"M3.3 8.5h3.4V21H3.3zM9.2 8.5h3.3v1.7h.1c.5-1 1.6-2 3.4-2 3.6 0 4.3 2.4 4.3 5.4V21h-3.5v-6.6c0-1.6 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21H9.2z\"/></g>',");fs.writeFileSync(f,t);
f='includes/footer.php';t=fs.readFileSync(f,'utf8');const start=t.indexOf('<div class="social-links">'),end=t.indexOf('</div></div><div><h3>Explore Sound Blast',start);t=t.slice(0,start)+`<div class="social-links"><?php foreach([
 ['instagram','Instagram',$business['instagram']],
 ['facebook','Facebook',$business['facebook']],
 ['linkedin','LinkedIn',$business['linkedin']],
 ['whatsapp','WhatsApp',$business['whatsapp']],
 ['mail','Email','mailto:'.$business['email']]
] as [$socialIcon,$socialName,$socialUrl]):$socialClass=$socialIcon==='mail'?'email':$socialIcon; ?>
<?php if($socialUrl): ?><a class="social-<?=e($socialClass)?>" href="<?=e($socialUrl)?>" <?= $socialIcon!=='mail'?'target="_blank" rel="noopener"':'' ?> aria-label="<?=e($socialName==='Email'?'Email Sound Blast':'Sound Blast on '.$socialName)?>" title="<?=e($socialName)?>"><?php icon($socialIcon); ?></a>
<?php else: ?><span class="social-pending social-<?=e($socialClass)?>" role="img" aria-label="<?=e($socialName)?> profile link coming soon" title="<?=e($socialName)?> profile link coming soon"><?php icon($socialIcon); ?></span><?php endif; ?>
<?php endforeach; ?>`+t.slice(end);fs.writeFileSync(f,t);
