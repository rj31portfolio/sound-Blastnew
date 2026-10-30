# Sound Blast PHP catalogue

A static content catalogue rendered with PHP. No database, cart, checkout, accounts or dependencies are required.

## Run locally

From this folder:

```
php -n -S 127.0.0.1:8088 -t .
```

Open http://127.0.0.1:8088/. The -n flag avoids unrelated warnings in the machine's existing PHP configuration. Apache/XAMPP can also serve the folder with PHP 8.1 or newer.

## Structure

- index.php: homepage
- products/index.php: all categories
- products/{category}/index.php: category listing
- products/{category}/{model}.php: individual product
- includes/: shared templates and catalogue helpers
- data/catalogue.json: 97 models and variants, 22 categories
- css/style.css and js/main.js: responsive styling and interactions
- images/catalogue/: unmodified source catalogue pages
- images/hero.png and images/interior.png: AI generated promotional artwork
- sitemap.xml and robots.txt: search engine discovery
- scripts/build-catalogue.mjs: editable transcription source
- scripts/build-pages.mjs: regenerate entry pages and sitemap after catalogue changes

## Product images

All 97 catalogue entries have separate transparent PNGs under images/products/{category}/. Original product pixels and logos are preserved. Scripted background removal is followed by hand traced silhouette refinements for crowded source artwork. The three bass tube variants use the complete repeated catalogue illustration; specifications remain specific to each model.

To rebuild cutouts using the available XAMPP PHP and GD extension:

```
C:/xampp/php/php.exe -n -d extension_dir=C:/xampp/php/ext -d extension=gd -d memory_limit=512M scripts/extract-products.php
C:/xampp/php/php.exe -n -d extension_dir=C:/xampp/php/ext -d extension=gd scripts/refine-silhouettes.php
```

## Catalogue content

Numerical data and features are transcribed from supplied catalogue pages. Where the catalogue gives inconsistent model names or technical values, notes preserve the discrepancy instead of guessing. Each product links to its source page. Product variants with a shared source photograph retain that shared photograph. Duplicate SB-8GA-YW artwork is treated as one model. Descriptive names identify products without printed model numbers.

Before public release, review the transcription and confirm model names, contradictory specifications, deployment domain and business contact details. Canonical URLs and sitemap use the supplied domain www.soundblast.co.in.

## Contact behaviour

The owner supplied the Delhi address, +91 93183 21456 and kaneenterprises1979@gmail.com. Shared values are maintained in includes/business.php. Instagram and WhatsApp links are included. The contact form prepares an enquiry and opens a WhatsApp link for the visitor to review and send. It does not submit messages automatically or store form data.

## Checks performed

- PHP templates and entry pages pass syntax validation.
- All 124 sitemap routes return HTTP 200 without PHP warnings or fatal errors.
- Desktop and mobile browser checks: menu, search, homepage category tabs, category model filter and product schema.
- No horizontal overflow at 390px, 768px or 1024px.
- All 97 product PNG files pass alpha-content and transparent-corner checks (data/image-validation.json).
- India map region selection, keyboard interaction and enquiry message preparation verified.

## Image generation

Built-in image_gen was used for the two promotional assets. Product photographs were extracted from the source catalogue without AI regeneration. Prompts are recorded in data/image-prompts.txt.

## Homepage refresh

Includes an animated category ticker, speaker spotlight with sound rings and equalizer, catalogue counters, product hover effects and the nationwide service section. The interactive India map highlights regions by click or keyboard. Connection points illustrate service coverage, not branch offices. All continuous motion respects prefers-reduced-motion.

Map source: https://geodataviewer.com/maps/blank/india/ (Natural Earth CC0). Original vector saved in images/india-map-source.svg; styled geometry in includes/india-map.php.

Browser results: data/browser-check-results.json. Screenshots: images/preview-*.png.

## Categories, testimonials and product enquiries

The homepage category carousel includes all 22 collections, autoplay, previous/next buttons, a pause/start control, touch swipe and arrow-key navigation. Rotation pauses on hover, focus, when offscreen and when the browser tab is hidden. Reduced motion disables autoplay by default.

The testimonial carousel in includes/testimonials.php contains explicitly labelled demonstration names, cities and quotes. These are sample layouts, not verified client reviews. Replace the demonstration entries with approved customer content before describing them as real testimonials.

Shared product cards now use separate links for specifications and WhatsApp enquiries. Each WhatsApp link includes the selected model and category; no message is sent automatically.

The About page includes a brand hero, collection facts, company story, guiding principles, featured collections and partnership/contact sections.

Verification: data/carousel-check-results.json. Autoplay, manual navigation, pause, responsive layout, enquiry URLs, lack of nested anchors and About images were checked in the browser. A separate reduced-motion check confirmed both sliders stop after the media preference changes. All 124 sitemap routes returned HTTP 200 without PHP errors.

## Events page

Events (events.php) replaces B2B Solutions and Why S&B in the main navigation. The About page and its values section remain available. Existing b2b.php bookmarks redirect to events.php with HTTP 301; dealer enquiry buttons link to Contact. The sitemap and its page generator use the Events URL.

No confirmed event names, dates or venues were supplied, so the announcement section clearly displays dates and venue to be announced. No past events or attendance claims are fabricated. Add confirmed event content to events.php when available. Browser checks verified desktop/mobile/tablet layouts, source images, navigation and the old URL redirect; all 124 sitemap URLs loaded successfully.

## Homepage product banners

The homepage hero is rendered by includes/home-hero.php and features three banners: Hercules HE-250.4D, Arnold SB-M300S and Android 4 Channel Amplifier. Each slide uses one product model, its catalogue specifications, a product detail link and a model-specific WhatsApp enquiry link.

Autoplay advances every five seconds, with previous/next controls, product selectors, pause/start, arrow-key navigation and touch swipe. Inactive slides are hidden and inert. Hero rotation continues while the mouse is over the banner and resumes after pointer controls. It pauses for keyboard focus, offscreen and in a hidden browser tab. Reduced motion disables automatic rotation by default and removes entrance/float effects.

Browser verification is recorded in data/hero-check-results.json. All three slides were checked at 390px, 768px, 1024px and desktop, with one visible product image per slide and no missing hero images or horizontal overflow.

## Brand reels section

The four-card Instagram-style section is rendered by includes/brand-reels.php. Configure each entry in data/reels.json with instagram_url (the actual reel permalink) and video_url (an authorized direct HTTPS MP4 URL or a project-relative MP4 path). Covers and brand labels are already provided.

Local videos images/reels/1.mp4 through 4.mp4 are connected to the four cards in that order. Each plays muted on hover and pauses on leave, with a tap-to-play/pause button on mobile. Individual Instagram permalinks remain unset, so the Instagram links open the official account profile.

Once video_url is configured, a muted, looping, inline video preview plays on hover or focus; a button supports touch playback. Previews pause on leave, loss of focus, offscreen or a hidden browser tab. Only one preview plays at a time. Hover playback respects reduced-motion preferences. Instagram permalinks alone open the actual reel on Instagram; they are not direct MP4 sources and cannot guarantee inline hover autoplay. No Instagram videos are downloaded or scraped.

Browser layout checks: data/brand-reels-check-results.json. All four local MP4s were verified playing in the browser, with pause on leave, a single active video and working mobile play/pause controls. Playback results: data/local-reels-check-results.json.
