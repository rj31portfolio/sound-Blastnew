import fs from 'node:fs';let f='includes/home-hero.php',t=fs.readFileSync(f,'utf8').replace("['CLASS D','HERCULES SERIES']","['>90 dB','SIGNAL TO NOISE']");fs.writeFileSync(f,t);
