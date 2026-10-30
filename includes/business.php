<?php
// Shared, verified business contact details supplied by the owner.
$business=[
 'phone'=>'+91 93183 21456',
 'phoneHref'=>'+919318321456',
 'email'=>'kaneenterprises1979@gmail.com',
 'address'=>['C-105, Gali No. 07','Harit Vihar, Burari','Delhi – 110084'],
 'instagram'=>'https://www.instagram.com/soundblast2023/',
 'whatsapp'=>'https://wa.me/919318321456',
 // Set the official profile URLs when supplied.
 'facebook'=>'',
 'linkedin'=>'',
 'map'=>'https://www.google.com/maps/search/?api=1&query=C-105%20Gali%20No.%2007%20Harit%20Vihar%20Burari%20Delhi%20110084'
];
function icon($name){
 $paths=[
 'facebook'=>'<path fill="currentColor" stroke="none" d="M14.2 22v-9.1h3.1l.5-3.6h-3.6V7c0-1.1.3-1.8 1.8-1.8h1.9V2.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.5H7.2v3.6h3.2V22h3.8Z"/>',
 'linkedin'=>'<g fill="currentColor" stroke="none"><circle cx="5" cy="5" r="2"/><path d="M3.3 8.5h3.4V21H3.3zM9.2 8.5h3.3v1.7h.1c.5-1 1.6-2 3.4-2 3.6 0 4.3 2.4 4.3 5.4V21h-3.5v-6.6c0-1.6 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21H9.2z"/></g>',
 'instagram'=>'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/>',
 'phone'=>'<path d="M5 3H3a2 2 0 0 0-2 2c0 10 8 18 18 18a2 2 0 0 0 2-2v-2l-5-2-2 2a16 16 0 0 1-9-9l2-2-2-5Z" transform="translate(1 -1)"/>',
 'mail'=>'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
 'pin'=>'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
 'whatsapp'=>'<path d="M21 11.5a9 9 0 0 1-13.5 8L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z"/><path d="m8 7-1 2c1 4 3 6 7 7l2-1-2-3-2 1-2-2 1-2-3-2Z"/>',
 'arrow'=>'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 'truck'=>'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 'sound'=>'<path d="M4 9v6h4l5 4V5L8 9H4ZM17 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
 'shield'=>'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
 'spark'=>'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>'
 ];
 echo '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'.($paths[$name]??$paths['arrow']).'</svg>';
}
