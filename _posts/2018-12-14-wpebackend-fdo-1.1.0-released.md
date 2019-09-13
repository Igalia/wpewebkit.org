---
layout: post
title: "WPEBackend-fdo 1.1.0 released!"
date: 2018-12-14
tags: [release, unstable]
version: 1.1.0
permalink: /release/wpebackend-fdo-1.1.0.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.1.0.tar.xz
---

Thiss is the first development release leading towards the 1.2 series.

### What's new in the WPEBackend-fdo 1.1.0 release?

- Use the new libwpe API to notify when frames have been displayed
  ([#28](https://github.com/Igalia/WPEBackend-fdo/pull/28)).

- Allow calling `wpe_fdo_initialize_for_egl_display()` multiple times, with a
  warning printed to the standard error output when trying to switch displays
  (which is unsupported)
  ([#26](https://github.com/Igalia/WPEBackend-fdo/pull/26)).

- Provide a dummy implementation of the EGL offscreen target interface, to let
  WebKit use Pbuffer-based offscreen contexts as fallback, instead of crashing
  ([5a4b58c](https://github.com/Igalia/WPEBackend-fdo/commit/5a4b58c7d6a70068d13b8404a0c970b03a856119)).

- Minor cleanups in headers and function prototypes
  ([#25](https://github.com/Igalia/WPEBackend-fdo/pull/25),
  [#24](https://github.com/Igalia/WPEBackend-fdo/pull/24)).


##### Checksums

<pre>
wpebackend-fdo-1.1.0.tar.xz (24.6KB)
   md5sum: dc852a6cafaf4b6392dcb91e36cd7abb
   sha1sum: 688377f441e19273fe2b44c0a2ea9da149f97fa4
   sha256sum: f6c72130d16e50860cb83eb0f6e109c76f1826d2c6bee39025fb3651941761e7
</pre>
