---
layout: post
title: "WPE's Frequently Asked Questions"
tags: [about]
data: { dateless: "true" }
permalink: /about/faq.html
sitemapChangeFrequency: monthly
---

[[toc]]

## What licenses WPE and its related components are published under?

WPE is an Open Source project developed upstream as part of [the WebKit project](https://webkit.org), with all its code being pushed to [WebKit's upstream repository](https://github.com/WebKit/WebKit). Therefore, **WPE is published under a mix of LGPLv2 and BSD licenses**, which are the ones applying to the WebKit project as a whole. You can [find a copy of such licenses in the webkit.org website](https://webkit.org/licensing-webkit).

There are also [three related components developed alongside WPE WebKit](https://wpewebkit.org/release), tied to the legacy API (pre-2.54) and kept for existing deployments. They are externally maintained and have their own Open Source licenses:

* libwpe: [BSD-2-Clause license](https://github.com/WebPlatformForEmbedded/libwpe/blob/master/COPYING) (also known as _“Simplified BSD License”_).
* WPEBackend-fdo: [BSD-2-Clause license](https://github.com/Igalia/WPEBackend-fdo/blob/master/COPYING).
* Cog: [MIT license](https://github.com/Igalia/cog/blob/master/COPYING).

## What is the difference between WebPlatformForEmbedded's WPE and WPEWebKit?

Historically, the [WebPlatformForEmbedded flavor of WPE](https://github.com/WebPlatformForEmbedded/WPEWebKit) came first. It included several adaptations for the Reference Design Kit (RDK) platform, as well as different fixes for its supported devices. Quoting the [RDK](https://rdkcentral.com/) website:

> RDK is a fully modular, portable, and customizable open source software
> solution that standardizes core functions used in video, broadband and IoT
> devices.

The [RDK WPE page](https://wiki.rdkcentral.com/display/RDK/WPE) provides more
information about WPE in the RDK platform.

In 2017, engineers from [Igalia](https://igalia.com) submitted a new flavor of WPE, suitable for upstream hosting under the [webkit.org](https://webkit.org/) umbrella. This version of WPE is [released every 6 months](/release/schedule) from the code hosted on the [upstream repository](https://github.com/WebKit/WebKit). This flavor of WPE is maintained upstream and provides regular [security updates](/security).


## Is WPE supported on any specific hardware System-on-Chip?

WPE has been [ported to a wide range of hardware platforms](https://wpewebkit.org/about/supported-hardware.html). The team aims to expand the list even further, so don't hesitate to contact us if you can't find your favorite <acronym title="System-on-Chip">SoC</acronym> in the list.


## Is WPE ported to non-Linux operating systems?

WPE currently only works on Linux-based operating systems. We are currently working on supporting Android, though. If you require WPE to run on any other OS, don't hesitate to contact us.


## What Web features does WPE support?

The [Web Platform Tests (WPT) and Browser Compatibility Data (BCD) results
page](https://wpewebkit.org/wpt-status/) may be used to check which features
are supported. However, the provided information is for a stock build with most
features enables: the customizable nature of WPE WebKit means that a custom
deployment may have different build and runtime configurations, which can
alter the results.


## What's the status regarding WebRTC?

As of March 2022 the facts are:

1. [WPEWebKit upstream has support for WebRTC](https://blogs.gnome.org/tsaunier/2018/07/31/webkitgtk-and-wpe-gains-webrtc-support-back/), by relying on [LibWebRTC](https://webrtc.googlesource.com/src/).
2. LibWebRTC is bundled as third-party library in WebKit's upstream repository.
3. The LibWebRTC backend supports hardware-acceleration only for decoding. Encoding is supported only via software encoders.
4. LibWebRTC bundles [BoringSSL](https://boringssl.googlesource.com/boringssl/), which is a fork of OpenSSL started while OpenSSL
   was still under the dual OpenSSL and SSLeay licences.

Taking these facts into account, the WPEWebKit maintainers have decided to leave WebRTC support disabled in the default build configuration of the official release tarballs because:

- Bundling LibWebRTC in tarballs significantly increases the archive size.
- The dependency on BoringSSL prevents LibWebRTC usage in GPL applications.
- The lack of hardware-accelerated support in LibWebRTC would incur a bad
  performance impact on the embedded platforms that WPE targets.

In order to solve these issues, an alternative WebRTC backend based on [GstWebRTC](http://blog.nirbheek.in/2018/02/gstreamer-webrtc.html) will be enabled by default in the WPE upstream CMake build, hopefully soon; bug [#235885](https://bugs.webkit.org/show_bug.cgi?id=235885) is being used to track progress. This new backend will seamlessly integrate with hardware-accelerated encoders and decoders on most embedded platforms. GstWebRTC depends on [OpenSSL](https://www.openssl.org/), which is released under an Apache-style license, so it doesn't have limitations regarding redistribution in binary form.


## What's up with EME? How can I support this feature in my WPE-based product?

There is code in WebKit to support Encrypted Media Extensions (EME), but in any case, you will need a license agreement with DRM CDM providers to access it, since this part is not open source. There are three ways you can get this working:

- Obtain a license and use the [Thunder OCDM plugin](https://github.com/rdkcentral/Thunder).
- Write a Thunder-compatible API complement that will work with your DRM system.
- Write a new CDM backend for WebKit using your DRM system.


## What is the WPEPlatform API?

WPEPlatform is the platform integration layer that ships inside WPE WebKit. It handles rendering and input for the target environment: a `WPEDisplay` manages the `WPEView`s that display web content, buffers are exchanged through `WPEBuffer` (e.g. `WPEBufferDMABuf`, `WPEBufferAndroid`, shared memory), and WPE WebKit provides built-in implementations for Wayland, DRM/KMS, and headless output. The right implementation can be chosen at runtime through the `WPE_DISPLAY` environment variable, or automatically.

Since 2.54, WPEPlatform is the default and recommended API. See the [architecture page](/about/architecture.html) for the full picture, and the [WPEPlatform API reference](/reference/stable/wpe-platform-2.0/) for the details.

## How do I build a launcher with the WPEPlatform API?

With WPEPlatform there is no separate launcher to install: writing one is only a few lines of code, because WPE WebKit provides the platform integration itself. A minimal launcher looks like this:

```cpp
#include <wpe/webkit.h>

int main(int argc, const char *argv[]) {
    g_autoptr(GMainLoop) loop = g_main_loop_new(nullptr, false);
    g_autoptr(WebKitWebView) view = WEBKIT_WEB_VIEW(g_object_new(WEBKIT_TYPE_WEB_VIEW, nullptr));
    webkit_web_view_load_uri(view, (argc > 1) ? argv[1] : "https://wpewebkit.org");
    g_main_loop_run(loop);
    return EXIT_SUCCESS;
}
```

Build it against the `wpe-webkit-2.0` and `wpe-platform-2.0` pkg-config modules, then choose the platform at runtime with the `WPE_DISPLAY` environment variable:

```sh
# Wayland (needs a compositor, e.g. Weston)
WPE_DISPLAY=wpe-display-wayland ./my-launcher https://wpewebkit.org/

# DRM/KMS (no compositor)
WPE_DISPLAY=wpe-display-drm ./my-launcher https://wpewebkit.org/

# Headless (no output, for testing and CI)
WPE_DISPLAY=wpe-display-headless ./my-launcher https://wpewebkit.org/
```

## Do I still need libwpe and a WPE backend?

No. For the common targets (Wayland, DRM/KMS, and headless), WPE WebKit provides everything through its built-in WPEPlatform implementations, so neither libwpe nor an external rendering backend is required.

libwpe, WPEBackend-fdo, and similar backends belong to the legacy API used before 2.54. They are kept for existing deployments and still built as needed, but new projects should target WPEPlatform.


## What is (and isn't) Cog? (legacy)

Cog is the launcher built on the legacy API (pre-2.54). It is kept for existing deployments, but new projects do not need it: with WPEPlatform, [a launcher is only a few lines of code](#how-do-i-build-a-launcher-with-the-wpeplatform-api%3F).

From [Cog's README](https://github.com/igalia/cog):

> Cog is a small single “window” launcher for the WebKit WPE port. It is small,
> provides no user interface, and is suitable to be used as a Web application
> container. The “window” may be fullscreen depending on the WPE backend being
> used.

Cog's usage scenarios span from a MiniBrowser application to a full web-app container application meant to run HTML-based user interfaces on embedded platforms and products.

Although it can run on Linux-based desktop environments, Cog is not a full-blown Web Browser to be compared with Google Chrome or Safari. Cog's primary environment is on embedded platforms, and it can run within a Wayland compositor such as Weston. Additionally, if the platform supports KMS/DRM, Cog can run as a full-screen standalone browser, this use-case is very common on kiosk products for instance.

For legacy deployments, Cog combined with WPEBackend-FDO provided a flexible solution for agile tinkering and for testing WPE's features. For new projects, prefer [writing a small launcher against the WPEPlatform API](#how-do-i-build-a-launcher-with-the-wpeplatform-api%3F) instead.


## Is Wayland required to run WPE?

As we say in Galicia, "it depends".

Since 2.54, WPE WebKit integrates with the target platform through its built-in
WPEPlatform implementations, and Wayland is just one of several supported outputs:

* **Wayland** (`WPEDisplayWayland`) renders as a client of a Wayland compositor, so
  a compositor (such as Weston) is required.
* **DRM/KMS** (`WPEDisplayDRM`) renders web content directly on screen through the
  display controller, with no compositor at all. This is very common on kiosk and
  appliance products.
* **Headless** (`WPEDisplayHeadless`) produces no on-screen output, and is meant for
  testing and CI.

The implementation can be chosen at runtime with the `WPE_DISPLAY` environment
variable, or by manually creating a `WPEDisplay`, so Wayland is required only if
you select the Wayland output.

It also helps to remember that "Wayland" tends to conflate several things:

* Wayland *itself* is an <abbr title="Inter-Process Communication">IPC</abbr>
  **protocol**, designed to move buffers containing pixel data and input events from
  one process to another.

* The Wayland *package* typically contains the **reference implementation** of the
  protocol, `libwayland`. Other implementations are theoretically possible.

* By extension we may refer to **a compositor**, a program that implements the server
  side of the Wayland protocol, possibly with the aid of `libwayland`.

<details>
<summary>Legacy note: Wayland and the pre-2.54 backends</summary>

With the legacy API, [WPEBackend-fdo][fdo-backend] internally used the Wayland
*protocol* (via `libwayland`) to pass rendered frames from the `WPEWebProcess`
program to the application that embedded the web view (the "UI process"). As that
was an implementation detail of the backend, the application did not need to know the
Wayland protocol was involved. A *compositor* might or might not be required,
depending on how the UI process displayed the web content.

For example, [Cog][cog-github] could act as a Wayland *client* through its <abbr
title="FreeDesktop.Org">FDO</abbr> platform plug-in, in which case a Wayland
*compositor* was required. Using Cog's <abbr title="Direct Rendering Manager">DRM</abbr>
platform plug-in, it displayed rendered web content directly on screen, without a
running Wayland *compositor*. In both cases WPEBackend-fdo was used as the backend, so
the Wayland *protocol* was still in use. Some WPE backends did not require Wayland at
all, such as [WPEBackend-rdk][rdk-backend] in some configurations
(`USE_BACKEND_BCM_RPI`, `USE_BACKEND_BCM_NEXUS`, etc.).

[cog-github]: https://github.com/Igalia/cog
[fdo-backend]: https://github.com/Igalia/WPEBackend-fdo
[rdk-backend]: https://github.com/WebPlatformForEmbedded/WPEBackend-rdk

</details>

## Are open dialogs/popups menus supported?

The application embedding WPE is responsible for rendering popups and dialogs. For instance, the legacy launcher Cog has limited support for these features (e.g. Cog supported option menus as of 2021).


## What is the wayland-protocols build dependency about in Cog (legacy)?

*This applies to the legacy Cog launcher and its FDO/Wayland plug-in.*

Depending on which platform rendering plugin is enabled at build time, the Cog browser might depend on the [wayland-protocols](https://github.com/wayland-project/wayland-protocols) project to generate source files needed in order to act as a Wayland client to the compositor (server) implementing those protocols.

So for instance, if you enable the [FDO platform plugin](https://github.com/Igalia/cog/blob/master/CMakeLists.txt#L57) and want to use it at runtime to have Cog running as a Wayland application, then the plugin will try to consume some Wayland protocols from the server, such as `xdg-shell`, `fullscreen-shell-unstable-v1`, `presentation-time` and `linux-dmabuf-unstable-v1`. Those protocols can't be used without first generating source files derived from each protocol XML spec definition. This is all part of the Wayland design.


## Why does the launcher crash at startup?

If you are building an embedded system image yourself, make sure there is at least one font installed that can be used as fallback by [Fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig/). You can use the `fc-list` program to print the list of known fonts.


## Why does the launcher crash when trying to play audio?

If you are building an embedded system image yourself, make sure that the
GStreamer elements `autoaudiosink` and `alsasink` are installed. Even if your
system uses some other audio output by default (PulseAudio, PipeWire, etc.)
ALSA is always tried as the last fallback if all the other available sinks
fail.


## Why does the launcher not load local files?

If you are building an embedded system image yourself, make sure to install
the [shared MIME database][shared-mime-db] is installed—in most distributions
this is part of a package named `shared-mime-info`. WebKit uses it to
determine which kind of data within file before loading it. Note that this is
not needed if you plan to loading remote resources because HTTP servers
provide the needed information in the `Content-Type` HTTP header.

[shared-mime-db]: https://www.freedesktop.org/wiki/Specifications/shared-mime-info-spec/
