---
title: "Developers"
layout: page
tags: [devs]
data: { dateless: "true" }
htmlSitemapOrder: -2
sitemapChangeFrequency: yearly
---
<style>
header.page h1 {
	padding-bottom: 0.33em;
	margin-bottom: 0.33em;
}
header.page p {
	margin: 0;
}
main > div, .dotsep {
	padding-block: 2em 3em;
}
h2 {
	font-size: 1.5em;
}
</style>

<header class="page">

# Developers

</header>


<div>

## [API Documentation](#)

API documentation for the **latest stable release** is available here:

<ul class="arrows">
<li><a href="https://wpewebkit.org/reference/stable/wpe-webkit-2.0/">WPEWebKit 2.0 API documentation</a></li>
<li><a href="https://wpewebkit.org/reference/stable/wpe-javascriptcore-2.0/">WPEJavaScriptCore 2.0 API documentation</a></li>
<li><a href="https://wpewebkit.org/reference/stable/wpe-web-extension-2.0/">WPEWebExtension 2.0 API documentation</a></li>
<li><a href="https://wpewebkit.org/reference/stable/wpe-webkit-1.1/">WPEWebKit 1.1 API documentation (deprecated)</a></li>
<li><a href="https://wpewebkit.org/reference/stable/wpe-javascriptcore-1.1/">WPEJavaScriptCore 1.1 API documentation (deprecated)</a></li>
<li><a href="https://wpewebkit.org/reference/stable/wpe-web-extension-1.1/">WPEWebExtension 1.1 API documentation (deprecated)</a></li>
</ul>

</div>

<div class="dotsep">

## [WPE Builds](/about/builds.html)

While there are several simple ways for developers to experiment with and explore WPE, none are tuned for performance. Generally, shipping products for embedded systems are performance-tuned custom builds. To make this easier, there is also [meta-webkit](https://github.com/Igalia/meta-webkit), which provides build recipes, WebKit based runtimes, and browsers for use with OpenEmbedded and/or Yocto.

There are also pre-built packages available for many <a href="/about/get-wpe.html">Linux distributions</a>.

</div>

<div class="dotsep">

## [Release Schedule](/release/schedule)

WPE WebKit follows a **6-month development cycle**:

<ul class="arrows">
<li>There are two feature releases every year, typically in March and September.</li>
<li>Within feature releases, there may be any number of bug-fixes.</li>
<li>Development releases are the base for the feature releases that follow them.  They do not follow a fixed schedule in the release cycle.</li>
</ul>

WPE WebKit and [WebKitGTK](https://webkitgtk.org/) share a fair amount of code.  Therefore, both projects produce their feature releases simultaneously, and share the same release branches.  For bug-fix releases, the release teams for both projects try to sync their version numbers as well as they can.

</div>

<div class="dotsep">
<div>
<h2><a href="/about/architecture.html">WPE Design</a></h2>
<p>WPE is the official WebKit port for Linux-based embedded platforms. WPE is uniquely designed for embedded systems in that it doesn’t depend on any user-interface toolkits such as the traditional Cocoa, GTK, etc toolkits.</p>
</div>
<img src="/assets/img/diagram-WPE-design.svg" alt="">
</div>

<div class="dotsep">
<h2><a href="/about/faq.html">WPE’s Frequently Asked Questions</a></h2>
<p>We've been collecting answers to lots of common questions we've been asked. If you've got questions, you might just find a ready answer in the FAQ.</p>
</div>
