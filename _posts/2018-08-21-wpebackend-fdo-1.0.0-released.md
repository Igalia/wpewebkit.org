---
layout: post
title: "WPEBackend-fdo 1.0.0 released!"
date: 2018-08-21
tags: release
permalink: /release/wpebackend-fdo-1.0.0.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.0.0.tar.xz
---


### What's new in the WPEBackend-fdo 1.0.0 release?

- Updated to use [libwpe 1.0.0](https://github.com/WebPlatformForEmbedded/libwpe/releases/tag/1.0.0)
  ([#23](https://github.com/Igalia/WPEBackend-fdo/pull/23),
  [#20](https://github.com/Igalia/WPEBackend-fdo/pull/20)).

- The `libWPEBackend-fdo` library now uses the [libtool
  versioning](https://autotools.io/libtool/version.html) convention
  ([#22](https://github.com/Igalia/WPEBackend-fdo/pull/22)).

- New API which supports exporting frames as EGL images. This provides
  applications with a ready to to render `EGLImage`, and has the advantage
  that the library hides the actual protocol used by the backend's nested
  compositor from the application
  ([#16](https://github.com/Igalia/WPEBackend-fdo/pull/16)).

- Improved dispatching of Wayland events
  ([#11](https://github.com/Igalia/WPEBackend-fdo/pull/11),
  [#15](https://github.com/Igalia/WPEBackend-fdo/pull/15)).

- Support using DMA-BUF Wayland surfaces
  ([#18](https://github.com/Igalia/WPEBackend-fdo/pull/18),
  [#17](https://github.com/Igalia/WPEBackend-fdo/pull/17),
  [#13](https://github.com/Igalia/WPEBackend-fdo/pull/13)).

- Support using Wayland versions older than 1.10
  ([#19](https://github.com/Igalia/WPEBackend-fdo/pull/19)).


##### Checksums

<pre>
wpebackend-fdo-1.0.0.tar.xz (24.2KB)
   md5sum: 5318728afb3bf7417293af67ce427963
   sha1sum: 7ee22bc1d585616f4ad2047d8be54ec396486211
   sha256sum: 7a747f87a1ae46d30144369050e3ce348b58986d04e1a139ba75c198fa636729
</pre>
