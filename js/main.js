'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const mobile=$('.mobile-toggle'),nav=$('.main-nav'),mega=$('.mega-parent'),megaToggle=$('.mega-toggle');
mobile?.addEventListener('click',()=>{const open=nav.classList.toggle('open');mobile.setAttribute('aria-expanded',String(open));mobile.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
megaToggle?.addEventListener('click',()=>{const open=mega.classList.toggle('open');megaToggle.setAttribute('aria-expanded',String(open));});
mega?.addEventListener('mouseenter',()=>{if(innerWidth>950)megaToggle.setAttribute('aria-expanded','true');});
mega?.addEventListener('mouseleave',()=>{if(innerWidth>950&&!mega.classList.contains('open'))megaToggle.setAttribute('aria-expanded','false');});
document.addEventListener('click',event=>{if(!event.target.closest('.mega-parent')){mega?.classList.remove('open');megaToggle?.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav?.classList.remove('open');mega?.classList.remove('open');mobile?.setAttribute('aria-expanded','false');megaToggle?.setAttribute('aria-expanded','false');}});
const dialog=$('.search-dialog'),search=$('#product-search'),results=$('.search-results');
const data=JSON.parse($('#search-data')?.textContent||'[]');
function showResults(){const q=search.value.trim().toLowerCase();results.replaceChildren();if(!q)return;const matches=data.filter(p=>(p.name+' '+p.category).toLowerCase().includes(q));if(!matches.length){const p=document.createElement('p');p.textContent='No products found. Try a category or another model name.';results.append(p);return;}for(const p of matches.slice(0,20)){const a=document.createElement('a'),name=document.createElement('span'),cat=document.createElement('small');a.href=p.url;name.textContent=p.name;cat.textContent=p.category+' ↗';a.append(name,cat);results.append(a);}if(matches.length>20){const p=document.createElement('p');p.textContent=`Showing 20 of ${matches.length} matches. Refine your search for more specific results.`;results.append(p);}}
$('.search-toggle')?.addEventListener('click',()=>{dialog.showModal();search.focus();});
$('.search-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
search?.addEventListener('input',showResults);
const tabs=$$('.product-tabs [role=tab]');
function selectTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((tab,i)=>{tab.tabIndex=i?-1:0;tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});});
$('#model-filter')?.addEventListener('input',event=>{const q=event.target.value.trim().toLowerCase();let count=0;$$('.category-products .product-card').forEach(card=>{card.hidden=!card.textContent.toLowerCase().includes(q);if(!card.hidden)count++;});$('#filter-empty').hidden=count>0;});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.04});$$('.reveal').forEach(el=>observer.observe(el));}
$('#enquiry-form')?.addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.target),message=`Hello Sound Blast,\n\nMy name is ${form.get('name')}.\nEnquiry: ${form.get('type')}\nProduct / category: ${form.get('product')||'General enquiry'}\n\n${form.get('message')}`;const link=$('#enquiry-whatsapp');link.href='https://wa.me/919318321456?text='+encodeURIComponent(message);link.hidden=false;$('#enquiry-status').textContent='Your enquiry is ready. Open WhatsApp below to review and send it to our team.';link.focus();});
// Nationwide service map. The points illustrate coverage, not branch offices.
const coverageData=JSON.parse($('#coverage-data')?.textContent||'{}');
const regionButtons=$$('.region-chip');
function selectRegion(key){if(!coverageData[key])return;regionButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.region===key)));$$('.india-state').forEach(state=>state.classList.toggle('is-highlighted',key!=='all'&&state.dataset.region===key));$('.map-states')?.classList.toggle('is-filtered',key!=='all');$('#region-label').textContent=coverageData[key][0].toUpperCase()+' SERVICE';$('#region-title').textContent=coverageData[key][1];$('#region-description').textContent=coverageData[key][2];}
regionButtons.forEach(button=>button.addEventListener('click',()=>selectRegion(button.dataset.region)));
$$('.india-state').forEach(state=>{state.addEventListener('click',()=>selectRegion(state.dataset.region));state.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectRegion(state.dataset.region);}});});
// Count catalogue totals once as they enter view.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!reducedMotion){const counterObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;counterObserver.unobserve(entry.target);const end=Number(entry.target.dataset.count),start=performance.now();function frame(now){const progress=Math.min(1,(now-start)/1100),ease=1-Math.pow(1-progress,3);entry.target.textContent=Math.round(end*ease);if(progress<1)requestAnimationFrame(frame);}requestAnimationFrame(frame);});},{threshold:.8});$$('[data-count]').forEach(el=>counterObserver.observe(el));}
// Shared responsive carousels. Stop rotation while reading, interacting or offscreen.
$$('[data-carousel]').forEach(root=>{
 const track=$('[data-track]',root),prev=$('[data-prev]',root),next=$('[data-next]',root),play=$('[data-play]',root);
 if(!track||!track.children.length)return;
 const items=[...track.children],motion=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=!motion.matches,hovered=false,focused=false,inView=false,timer=null,scrollTimer;
 function metrics(){const gap=parseFloat(getComputedStyle(track).columnGap)||0,stride=items[0].getBoundingClientRect().width+gap,visible=Math.max(1,Math.round((track.clientWidth+gap)/stride));return{stride,visible,max:Math.max(0,track.scrollWidth-track.clientWidth)};}
 function status(){const {stride,visible,max}=metrics(),start=Math.min(items.length-1,Math.round(track.scrollLeft/stride)),end=Math.min(items.length,start+visible);const label=$('[data-status]',root);if(label)label.textContent=`${start+1}–${end} of ${items.length}`;const progress=$('[data-progress]',root);if(progress)progress.style.width=`${max?Math.min(100,((track.scrollLeft+track.clientWidth)/track.scrollWidth)*100):100}%`;root.dataset.autoplay=String(enabled);if(play){play.setAttribute('aria-pressed',String(!enabled));play.setAttribute('aria-label',`${enabled?'Pause':'Start'} ${root.id==='categories'?'category':'testimonial'} autoplay`);$('[data-play-symbol]',play).textContent=enabled?'Ⅱ':'▶';}}
 function rotate(direction){const {stride,visible,max}=metrics();if(max<2)return;let left=track.scrollLeft+direction*stride*visible;if(direction>0&&track.scrollLeft>=max-3)left=0;if(direction<0&&track.scrollLeft<=3)left=max;track.scrollTo({left:Math.max(0,Math.min(max,left)),behavior:motion.matches?'instant':'smooth'});}
 function schedule(){clearInterval(timer);timer=null;if(enabled&&!hovered&&!focused&&inView&&!document.hidden)timer=setInterval(()=>rotate(1),Number(root.dataset.interval)||5000);}
 prev?.addEventListener('click',()=>{rotate(-1);schedule();});next?.addEventListener('click',()=>{rotate(1);schedule();});play?.addEventListener('click',()=>{enabled=!enabled;status();schedule();});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();rotate(event.key==='ArrowRight'?1:-1);schedule();}});
 track.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(status,100);},{passive:true});
 root.addEventListener('mouseenter',()=>{hovered=true;schedule();});root.addEventListener('mouseleave',()=>{hovered=false;schedule();});
 root.addEventListener('focusin',()=>{focused=true;schedule();});root.addEventListener('focusout',()=>{setTimeout(()=>{focused=root.contains(document.activeElement);schedule();},0);});
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{if(motion.matches)enabled=false;status();schedule();});
 window.addEventListener('resize',()=>{status();schedule();},{passive:true});
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.1}).observe(root);}else{inView=true;}
 status();schedule();
});
// Homepage product banners: only one slide and its links are active at a time.
const heroSlider=$('[data-hero-slider]');
if(heroSlider){
 const slides=$$('[data-hero-slide]',heroSlider),buttons=$$('[data-hero-go]',heroSlider),play=$('[data-hero-play]',heroSlider),motion=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,enabled=!motion.matches,timer=null,focused=false,visible=true,touchStart=null;
 function updatePlay(){heroSlider.dataset.autoplay=String(enabled);play?.setAttribute('aria-pressed',String(!enabled));play?.setAttribute('aria-label',enabled?'Pause hero autoplay':'Start hero autoplay');const symbol=$('[data-hero-play-symbol]',heroSlider);if(symbol)symbol.textContent=enabled?'Ⅱ':'▶';}
 function schedule(){clearTimeout(timer);if(enabled&&!focused&&visible&&!document.hidden)timer=setTimeout(()=>show(active+1,false),Number(heroSlider.dataset.duration)||5000);}
 function show(index,announce=true){active=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{const selected=i===active;slide.hidden=!selected;slide.inert=!selected;slide.classList.toggle('is-active',selected);});buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));const counter=$('[data-hero-counter]',heroSlider);if(counter)counter.innerHTML=String(active+1).padStart(2,'0')+' <span>/ '+String(slides.length).padStart(2,'0')+'</span>';heroSlider.dataset.activeSlide=String(active);if(announce)$('[data-hero-announcement]',heroSlider).textContent=slides[active].getAttribute('aria-label');schedule();}
 buttons.forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.heroGo))));$('[data-hero-prev]',heroSlider)?.addEventListener('click',()=>show(active-1));$('[data-hero-next]',heroSlider)?.addEventListener('click',()=>show(active+1));play?.addEventListener('click',()=>{enabled=!enabled;updatePlay();schedule();});
 function keyboardFocus(){const element=document.activeElement;focused=heroSlider.contains(element)&&element.matches(':focus-visible');schedule();}
 heroSlider.addEventListener('focusin',keyboardFocus);heroSlider.addEventListener('focusout',()=>setTimeout(keyboardFocus,0));heroSlider.addEventListener('pointerdown',()=>{focused=false;schedule();});
 heroSlider.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(active+(event.key==='ArrowRight'?1:-1));}});
 heroSlider.addEventListener('touchstart',event=>{const touch=event.changedTouches[0];touchStart={x:touch.clientX,y:touch.clientY};clearTimeout(timer);},{passive:true});heroSlider.addEventListener('touchend',event=>{if(!touchStart)return;const touch=event.changedTouches[0],dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)show(active+(dx<0?1:-1));else schedule();},{passive:true});heroSlider.addEventListener('touchcancel',()=>{touchStart=null;schedule();},{passive:true});
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{if(motion.matches)enabled=false;updatePlay();schedule();});if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(heroSlider);
 updatePlay();show(0,false);
}
// Real MP4 previews play muted on hover/focus, with explicit controls for touch.
const brandReelCards=$$('[data-brand-reel]');
brandReelCards.forEach(card=>{
 const video=$('video',card),toggle=$('.reel-preview-toggle',card);if(!video)return;
 let request=0,wanted=false,manualPause=false;
 function stop(){request++;wanted=false;video.pause();card.classList.remove('is-playing');toggle?.setAttribute('aria-pressed','false');toggle?.setAttribute('aria-label','Play reel preview');}
 async function play(manual=false){if(!manual&&(manualPause||matchMedia('(prefers-reduced-motion: reduce)').matches))return;brandReelCards.forEach(other=>{if(other!==card)other.dispatchEvent(new Event('stop-reel'));});const token=++request;wanted=true;video.muted=true;try{await video.play();if(token!==request||!wanted){video.pause();return;}card.classList.add('is-playing');toggle?.setAttribute('aria-pressed','true');toggle?.setAttribute('aria-label','Pause reel preview');}catch{stop();const label=$('.reel-watch-label',card);if(label)label.textContent='Open on Instagram to watch';}}
 card.addEventListener('mouseenter',()=>play());card.addEventListener('mouseleave',()=>{manualPause=false;stop();});card.addEventListener('focusin',event=>{if(event.target.matches(':focus-visible'))play();});card.addEventListener('focusout',()=>setTimeout(()=>{if(!card.contains(document.activeElement)){manualPause=false;stop();}},0));card.addEventListener('stop-reel',stop);toggle?.addEventListener('click',()=>{if(wanted){manualPause=true;stop();}else{manualPause=false;play(true);}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{if(event.matches)stop();});if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();},{threshold:.1}).observe(card);
});
