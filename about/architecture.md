---
layout: post
title: "The Architecture of WPE"
tags: [about]
data: { dateless: "true" }
permalink: /about/architecture.html
---

### WPE

WPE is the official [WebKit](https://webkit.org) port for embedded platforms. WPE is uniquely designed
for embedded systems in that it doesn't depend on any user-interface toolkit
such as the traditional Cocoa, GTK, etc toolkits.

<div class="masthead-img" align="center">
      <img style="width: 400px; max-width: 100%;" src="{{ '/assets/wpe-architecture-diagram.png' | url }}"
		srcset="{{ '/assets/wpe-architecture-diagram@2x.png' | url }} 2x"
		alt="Block diagram of the WPE architeture">
</div>

#### Web page rendering

WPE is considered a hybrid port because it defers the final web page delivery for
display to a rendering backend. A traditional port would provide a widget for a
given toolkit, but WPE opted for a different and more flexible approach.

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

#### Input events handling

In a traditional WebKit port, the provided widget usually also handles input
(keyboard, mouse, touch) events and is in charge of relaying them to the
internal WebKit input-methods components.

As WPE doesn't provide a widget, it relies on `libwpe` APIs to relay input
events from the WPE application to the internal WebKit input-methods components.
This design again adds flexibility to the overall WPE architecture, enabling
applications to support new input devices without having to go through a UI
toolkit first.

In the example of the [Cog WPE browser](https://github.com/Igalia/cog), the
application relies on Wayland protocols for user input to communicate events
coming from the Wayland compositor to WPE.