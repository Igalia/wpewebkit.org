---
title: "Developers"
layout: page
tags: [devs]
data: { dateless: "true" }
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

## [WPE Builds]({{ '/about/builds.html' | url }})

While there are several simple ways for developers to experiment with and explore WPE, none are tuned for performance. Generally, shipping products for embedded systems are performance-tuned custom builds. To make this easier, there is also meta-webkit, which provides build recipes, WebKit based runtimes, and browsers for use with OpenEmbedded and/or Yocto.

<ul class="arrows">
<li><a href="{{ '/about/explore-wpe.html' | url }}">Linux distros for Debian, Ubuntu, Raspbian, Arch, Fedora...</a></li>
<li><a href="{{ '/about/flatpak.html' | url }}">Install WPE and minibrowser with flatpak</a></li>
<li><a href="{{ '/about/balena-wpe.html' | url }}">Install with Balena</a></li>
</ul>

</div>

<div class="dotsep">

## [Release Schedule]({{ '/release/schedule' | url }})

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
<h2><a href="{{ '/about/architecture.html' | url }}">WPE Design</a></h2>
<p>WPE is the official WebKit port for embedded platforms. WPE is uniquely designed for embedded systems in that it doesn’t depend on any user-interface toolkits such as the traditional Cocoa, GTK, etc toolkits.</p>
</div>
<img src="{{ '/assets/img/diagram-WPE-design.svg' | url }}" alt="">
</div>

<div class="dotsep">
<h2><a href="{{ '/about/faq.html' | url }}">WPE’s Frequently Asked Questions</a></h2>
<p>We've been collecting answers to lots of common questions we've been asked. If you've got questions, you might just find a ready answer in the FAQ.</p>
</div>
