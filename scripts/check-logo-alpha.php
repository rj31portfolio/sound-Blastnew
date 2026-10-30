<?php $im=imagecreatefrompng(__DIR__.'/../images/logo-transparent.png');foreach([[0,0],[640,550],[100,100]] as $p){$c=imagecolorat($im,$p[0],$p[1]);echo json_encode([$p,($c>>24)&127]).PHP_EOL;}
