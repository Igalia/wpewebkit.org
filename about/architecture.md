---
layout: page
title: WPE Architecture
tags: [about]
data: { dateless: "true" }
permalink: /about/architecture.html
sitemapChangeFrequency: yearly
---
<style>
main > *, .dotsep {
	padding: 2em 0 3em;
}
.masthead-img {
	padding: 0;
	margin-block: 4em 1em;
}
.masthead-img img {
	max-width: 90%;
	max-width: min(800px,100%);
	margin-block: -2em;
}
</style>

<header class="page">

# {{ title }}

WPE is the official [WebKit](https://webkit.org) port for embedded platforms. WPE is uniquely designed
for embedded systems in that it doesn't depend on any user-interface toolkit
such as the traditional Cocoa, GTK, etc toolkits.

</header>

<div class="masthead-img full-bleed" align="center">
<img src="/assets/img/diagram-WPE-design.svg" alt="">
</div>

<section>

## Web page rendering

<p class="leadin">WPE is considered a hybrid port because it defers the final web page delivery for display to a rendering backend. A traditional port would provide a widget for a given toolkit, but WPE opted for a different and more flexible approach.</p>

The common interface between WPEWebKit and its rendering backends is provided by
[libwpe](https://github.com/WebPlatformForEmbedded/libwpe). On one side, once
WPEWebKit has a graphical representation of the final composited Web page ready
for rendering, it invokes a callback function on `libwpe`. On the other side,
the WPE application has to register a view backend on the WPE WebView. This view
backend is provided by the rendering backend. The view backend receives the Web
page representation from `libwpe`, usually as an EGLImage, and is in charge of
presenting it in the application, on-screen.

The decoupling between generating the WebPage representation on WebKit side and
the actual rendering on the application side provides a very flexible design.
For instance, WPE integrators can easily develop a new rendering backend for
specific embedded platforms that might have a graphics driver with special API
requirements.

WPE provides a rendering backend aiming to target the most common platforms and
leverage the existing graphics stack available in the
[Freedesktop](https://freedesktop.org) umbrella eco-system.
[WPEBackend-FDO](https://github.com/Igalia/WPEBackend-FDO) is the reference
implementation of the base rendering backend design. WPEBackend-FDO provides an API
for WPE applications that aims to ease the handling of rendering either
on-screen using EGL, or off-screen using SHM.

</section>

<section class="dotsep">

## Input events handling

<p class="leadin">In a traditional WebKit port, the provided widget usually also handles input
(keyboard, mouse, touch) events and is in charge of relaying them to the
internal WebKit input-methods components.</p>

As WPE doesn't provide a widget, it relies on `libwpe` APIs to relay input
events from the WPE application to the internal WebKit input-methods components.
This design again adds flexibility to the overall WPE architecture, enabling
applications to support new input devices without having to go through a UI
toolkit first.

In the example of the [Cog WPE browser](https://github.com/Igalia/cog), the
application relies on Wayland protocols for user input to communicate events
coming from the Wayland compositor to WPE.

</section>
