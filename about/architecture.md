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

<p class="leadin">WPE integrates with the target platform through the WPEPlatform
API, which ships as part of WPE WebKit itself. Because WPE provides no user-interface
toolkit widget, this layer is what turns the rendered web page into pixels on screen
and feeds input back to the engine.</p>

Since 2.54, WPEPlatform is the default integration layer, and the only one needed
for the common targets. A `WPEDisplay` represents the connection to the underlying
windowing system or output, and manages one or more `WPEView`s, each hosted in a
`WPEToplevel` (a top-level surface such as a window or a full-screen output). The
composited web page is handed over through `WPEBuffer`, using a system GPU buffer
(e.g. `WPEBufferDMABuf`, `WPEBufferAndroid`), or shared memory (i.e. `WPEBufferSHM`)
as a fallback.

WPE WebKit includes several built-in platform implementations:

- **Wayland** (`WPEDisplayWayland`): renders as a client of a Wayland compositor.
- **DRM/KMS** (`WPEDisplayDRM`): renders directly through the display controller,
  with no compositor, for dedicated embedded outputs.
- **Headless** (`WPEDisplayHeadless`): renders off-screen, for testing and CI.

The implementation can be selected at runtime through the `WPE_DISPLAY` environment
variable (`wpe-display-wayland`, `wpe-display-drm`, `wpe-display-headless`), or
chosen automatically with `wpe_display_get_default()`. None of these targets
require libwpe or a separate rendering backend.

This design keeps WPE flexible without giving up that convenience: for special
environments not covered by the built-in implementations, an integrator can provide
a custom WPEPlatform implementation by subclassing `WPEDisplay` (and the related
view and toplevel types).

</section>

<section class="dotsep">

## Input events handling

<p class="leadin">In a traditional WebKit port, the provided widget usually also handles input
(keyboard, mouse, touch) events and is in charge of relaying them to the
internal WebKit input handling components.</p>

As WPE doesn't provide a widget, input is handled by the active WPEPlatform
implementation. Each implementation gathers events from its environment (for
example, from the Wayland compositor, or directly from the input devices under
DRM/KMS) and delivers them to the target `WPEView`, which relays them to WebKit's
internal input handling components. This flexible design enables applications to
 provide input events in any way that better suits them.

</section>

<section class="dotsep">

## Legacy architecture (libwpe and WPE backends)

<p class="leadin">Before 2.54, WPE integrated with the platform through libwpe and a
separate, external rendering backend. This model is legacy as of 2.54: it is kept for
existing deployments and still built as needed, but new projects should use the
WPEPlatform API described above.</p>

<details>
<summary>How the legacy libwpe and WPE backend model works</summary>

The common interface between WPE WebKit and its rendering backends was provided by
[libwpe](https://github.com/WebPlatformForEmbedded/libwpe). On one side, once WPE
WebKit had a graphical representation of the final composited web page ready for
rendering, it invoked a callback function on `libwpe`. On the other side, the WPE
application had to register a view backend on the WPE web view. This view backend
was provided by the rendering backend, received the web page representation from
`libwpe` (usually as an EGLImage), and was in charge of presenting it in the
application, on-screen.

This decoupling between generating the web page representation on the WebKit side
and the actual rendering on the application side provided a flexible design. WPE
integrators could develop a new rendering backend for specific embedded platforms
whose graphics driver had special API requirements.

WPE provided a rendering backend aiming to target the most common platforms and
leverage the existing graphics stack available in the
[Freedesktop](https://freedesktop.org) umbrella ecosystem.
[WPEBackend-FDO](https://github.com/Igalia/WPEBackend-FDO) is the reference
implementation of that base rendering backend design. WPEBackend-FDO provides an
API for WPE applications that eases the handling of rendering either on-screen
using EGL, or off-screen using SHM.

For input, because WPE provides no widget, this model relied on `libwpe` APIs to
relay input events from the WPE application to the internal WebKit input-method
components. In the example of the [Cog launcher](https://github.com/Igalia/cog),
the application relied on Wayland protocols to communicate input events coming from
the Wayland compositor to WPE.

</details>

</section>
