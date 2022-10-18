---
layout: page
title: "Why Choose WPE?"
tags: [about]
data: { dateless: "true" }
permalink: /about/a-good-choice.html
---
<style>
:not(header) > h2 {
	background: url({{ '/assets/img/graphic-title-blue.svg' | url }}) 0 100% / 7rem auto no-repeat;
	padding-bottom: 1em;
}
ul.gallery.c2 {
	align-items: stretch;
	gap: 1em;
}
ul.gallery.c2 li {
	padding: 3.5em 1.5em 1.5em;
	border: 1px dashed var(--colorMain);
	background: url({{ '/assets/img/checkmark.png' | url}}) 1em 1em / 2em 2em no-repeat;
}
.full-bleed.banner {
	margin-block: 5rem 4rem;
	padding: 1px 0;
}
@media (min-width: 75rem) {
	.banner::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -5rem;
		width: 5rem;
		height: 1px;
		background: linear-gradient(90deg,#000,#0008);
		-webkit-mask-image: repeating-linear-gradient(270deg, transparent, #89A 1px, #999 3px, transparent 4px, transparent 7px);
		mask-image: repeating-linear-gradient(270deg, transparent, #89A 1px, #999 3px, transparent 4px, transparent 7px);
	}
}
.banner img {
	display: block;
	margin: -5rem auto;
	margin-block: calc( min(65rem,100vw) * 0.31229 * -0.25 );
}
</style>

<nav class="sidebar">
<ul>
<li><a href="{{ '/about/supported-hardware.html' | url }}">Supported Hardware</a></li>
<li class="currentPage"><a href="{{ '/about/a-good-choice.html' | url }}">Why Choose WPE?</a></li>
<li><a href="{{ '' | url }}">WPE in Action</a></li>
</ul>
</nav>

<header class="page">

# Why Choose WPE? 

WPE WebKit is widely adopted in many industries, including digital signage, professional audio, video and broadcasting, home appliances, set-top boxes, and automative and in-flight infotainment systems.

</header>

<section class="full-bleed banner">
<img src="{{ '/assets/img/WhyChooseWPE.png' | url }}" alt="">
</section>

<section>

<p class="leadin">If you need a fast and lightweight web runtime for embedded devices that supports most current web standards, has hardware acceleration wherever it is advantageous, and has a strong focus on multimedia applications, WPE WebKit is a great choice.</p>

WPE WebKit offers great possibilities for deployment on different platforms, thanks to its underlying design which allows for integration in a variety of hardware configurations. At a minimum, only EGL and OpenGL ES 2 support and basic GStreamer integration are required.
</section>

<section class="dotsep">

## Some advantages of WPE WebKit

<ul class="gallery c2">
<li>The minimal set of dependencies needed to run WPE WebKit ensures that its footprint is small and it consumes less memory, which allows applications built with WPE WebKit to run on low-end devices.</li>
<li>Enables rich and fast 2D and 3D HTML-based user interfaces, multimedia integration, 3D content, and many more of the latest Web technologies to run smoothly and efficiently on low-cost devices.</li>
<li>Displays multimedia content with high-quality CSS 3D animations, WebGL, and fluid high-quality HTML videos.</li>
<li>Focused on graphics performance with multi-threading optimizations to improve CSS animation, scrolling, scaling, and rendering of canvas and video elements.</li>
<li>Provides a strong focus on multimedia applications and performance with WebRTC, MSE (MP4, WebM, VP9, Opus) and EME (ClearKey and other third-party DRM frameworks) supported and constantly improving.</li>
<li>Unlicensed parts of YouTube TV and similar platforms are supported.</li>
</ul>

</section>
