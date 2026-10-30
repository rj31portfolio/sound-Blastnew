import fs from 'node:fs';
const path='data/reels.json',reels=JSON.parse(fs.readFileSync(path,'utf8').replace(/^\uFEFF/,''));reels.forEach((reel,i)=>{const video=`images/reels/${i+1}.mp4`;if(!fs.existsSync(video))throw Error('Missing '+video);reel.video_url=video;});fs.writeFileSync(path,JSON.stringify(reels,null,2)+'\n');
let file='js/main.js',t=fs.readFileSync(file,'utf8');t=t.replace("card.addEventListener('focusin',()=>play());","card.addEventListener('focusin',event=>{if(event.target.matches(':focus-visible'))play();});");fs.writeFileSync(file,t);
