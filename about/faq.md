---
layout: post
title: "WPE's Frequently Asked Questions"
tags: [about]
data: { dateless: "true" }
permalink: /about/faq.html
---

[[toc]]

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

The WebKit project provides a [features status page](https://webkit.org/status/) to which you can refer. However, that information should be taken with a grain of salt. The multi-platform nature of WebKit implies that ports have different build-time and runtime configurations.

The WPE project currently does not have an official list of the Web features it supports. It might provide one in the future, but for the time being, we recommend users check for specific features by testing WPE through the Cog browser.


## What's the status regarding WebRTC? 

As of March 2022 the facts are:

1. [WPEWebKit upstream has support for WebRTC](https://blogs.gnome.org/tsaunier/2018/07/31/webkitgtk-and-wpe-gains-webrtc-support-back/), by relying on [LibWebRTC](https://webrtc.googlesource.com/src/).
2. LibWebRTC is bundled as third-party library in WebKit's upstream repository.
3. The LibWebRTC backend doesn't support hardware-accelerated encoders and decoders.
4. LibWebRTC bundles [BoringSSL](https://boringssl.googlesource.com/boringssl/), which is a fork of OpenSSL started while OpenSSL
   was still under the dual OpenSSL and SSLeay licences.

Taking these facts into account, the WPEWebKit maintainers have decided to leave WebRTC support disabled in the default build configuration of the official release tarballs because:

- Bundling LibWebRTC in tarballs significantly increases the archive size.
- The dependency on BoringSSL prevents LibWebRTC usage in non-GPL applications
  and redistribution in binary form.
- The lack of hardware-accelerated support in LibWebRTC would incur a bad
  performance impact on the embedded platforms that WPE targets.

In order to solve these issues, an alternative WebRTC backend based on [GstWebRTC](http://blog.nirbheek.in/2018/02/gstreamer-webrtc.html) will be merged in WPE upstream, most likely during 2022; bug [#235885](https://bugs.webkit.org/show_bug.cgi?id=235885) is being used to track progress. This new backend will seamlessly integrate with hardware-accelerated encoders and decoders on most embedded platforms. GstWebRTC depends on [OpenSSL](https://www.openssl.org/), which is released under an Apache-style license, so it doesn't have limitations regarding redistribution in binary form.


## What's up with EME? How can I support this feature in my WPE-based product?

There is code in WebKit to support Encrypted Media Extensions (EME), but in any case, you will need a license agreement with DRM CDM providers to access it, since this part is not open source. There are three ways you can get this working:

- Obtain a license and use the [Thunder OCDM plugin](https://github.com/rdkcentral/Thunder).
- Write a Thunder-compatible API complement that will work with your DRM system.
- Write a new CDM backend for WebKit using your DRM system.


## What is (and isn't) Cog?

From [Cog's README](https://github.com/igalia/cog):

> Cog is a small single “window” launcher for the WebKit WPE port. It is small,
> provides no user interface, and is suitable to be used as a Web application
> container. The “window” may be fullscreen depending on the WPE backend being
> used.

Cog's usage scenarios span from a MiniBrowser application to a full web-app container application meant to run HTML-based user interfaces on embedded platforms and products.

Although it can run on Linux-based desktop environments, Cog is not a full-blown Web Browser to be compared with Google Chrome or Safari. Cog's primary environment is on embedded platforms, and it can run within a Wayland compositor such as Weston. Additionally, if the platform supports KMS/DRM, Cog can run as a full-screen standalone browser, this use-case is very common on kiosk products for instance.

If you are a developer aiming to enable WPE on a certain embedded platform, Cog combined with WPEBackend-FDO provides the most flexible solution for agile tinkering and to test WPE's features.


## Is Wayland required to run WPE?

As we say in Galicia, "it depends".

[WPE's architecture](/about/architecture.html) was designed in order to
decouple rendering out of the Web engine and delegate this task to rendering
backends and to the application running the Web engine—it does not strictly
*require* usage of Wayland.

Typically when talking about Wayland we tend to conflate many things:

* Wayland *itself* is an <abbr title="Inter-Process Communication">IPC</abbr>
  **protocol** which happens to be designed to move buffers containing pixel
  data and input events from one process to another.

* The Wayland *package* typically contains the **reference implementation**
  of the protocol, `libwayland`. Other implementations are theoretically
  possible.

* By extension we may refer to **a compositor**, which is a program that
  implements the server–side of the Wayland
  protocol—possibly with the aid of `libwayland`.

If you use [WPEBackend-fdo][fdo-backend], it internally uses the Wayland
*protocol* (via `libwayland`) to pass rendered frames from the `WPEWebProcess`
program to the application that embeds the web view—that we call “the UI
process”. As this is an implementation detail of the backend, the fact that
Wayland is used as IPC protocol does not need to be known by the application.
A *compositor* may be required or not depending on how the UI process displays
the web content.

For example, [Cog][cog-github] can act as a Wayland *client* using its <abbr
title="FreeDesktop.Org">FDO</abbr> platform plug-in, and in that case a
Wayland *compositor* is required. On the other hand, using Cog's <abbr
title="Direct Rendering Manager">DRM</abbr> platform plug-in it will display
rendered web content directly on screen (without a running Wayland
*compositor*). Note that in both cases WPEBackend-fdo is used as backend,
which means that the Wayland *protocol* is still in use.

Some WPE backends may not require Wayland at all. Such is the case
of [WPEBackend-rdk][rdk-backend] in some configurations
(`USE_BACKEND_BCM_RPI`, `USE_BACKEND_BCM_NEXUS`, etc.)

[cog-github]: https://github.com/Igalia/cog
[fdo-backend]: https://github.com/Igalia/WPEBackend-fdo
[rdk-backend]: https://github.com/WebPlatformForEmbedded/WPEBackend-rdk

## Are open dialogs/popups menus supported?

The application embedding WPE is responsible for rendering popups and dialogs. The reference WPE Browser, Cog, has limited support for these features (as of 2021, it supports option menus).


## What is the wayland-protocols build dependency about in Cog?

Depending on which platform rendering plugin is enabled at build time, the Cog browser might depend on the [wayland-protocols](https://github.com/wayland-project/wayland-protocols) project to generate source files needed in order to act as a Wayland client to the compositor (server) implementing those protocols.

So for instance, if you enable the [FDO platform plugin](https://github.com/Igalia/cog/blob/master/CMakeLists.txt#L57) and want to use it at runtime to have Cog running as a Wayland application, then the plugin will try to consume some Wayland protocols from the server, such as `xdg-shell`, `fullscreen-shell-unstable-v1`, `presentation-time` and `linux-dmabuf-unstable-v1`. Those protocols can't be used without first generating source files derived from each protocol XML spec definition. This is all part of the Wayland design.


## Why does the browser/launcher (e.g. Cog) crash at startup?

If you are building an embedded system image yourself, make sure there is at least one font installed that can be used as fallback by [Fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig/). You can use the `fc-list` program to print the list of known fonts.


## Why does the browser/launcher (e.g. Cog) crash when trying to play audio?

If you are building an embedded system image yourself, make sure that the
GStreamer elements `autoaudiosink` and `alsasink` are installed. Even if your
system uses some other audio output by default (PulseAudio, PipeWire, etc.)
ALSA is always tried as the last fallback if all the other available sinks
fail.


## Why does the browser/launcher (e.g. Cog) not load local files?

If you are building an embedded system image yourself, make sure to install
the [shared MIME database][shared-mime-db] is installed—in most distributions
this is part of a package named `shared-mime-info`. WebKit uses it to
determine which kind of data within file before loading it. Note that this is
not needed if you plan to loading remote resources because HTTP servers
provide the needed information in the `Content-Type` HTTP header.

[shared-mime-db]: https://www.freedesktop.org/wiki/Specifications/shared-mime-info-spec/
