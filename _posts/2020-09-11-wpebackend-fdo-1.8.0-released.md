---
layout: post
title: "WPEBackend-fdo 1.8.0 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.8.0
date: 20200911T16:45+0300
permalink: /release/wpebackend-fdo-1.8.0.html
---

This is the first stable release in the 1.8 series.

### Highlights of the WPEBackend-fdo 1.8.0 release

- Added new API for the audio rendering protocol, which allows embedders to receive audio samples instead of letting WPE WebKit handle their playback.
- Added support to export frames using [EGLStream](https://www.khronos.org/registry/EGL/extensions/KHR/EGL_KHR_stream.txt)s, which can be used e.g. with Nvidia GPUs.
- New build configuration system based on [Meson](https://mesonbuild.com). The existing CMake-based system is still maintained, and both produce the same outputs.
- Expose symbols for the version retrieval functions.

#### Checksums

<pre>
wpebackend-fdo-1.8.0.tar.xz (41.5 KiB)
   md5sum: 6df96f80ff34c02d56f32a7a153a62c0
   sha1sum: 48dd8d5d525e0c89b8b7068fe51c439921804240
   sha256sum: 9652a99c75fe1c6eab0585b6395f4e104b2427e4d1f42969f1f77df29920d253
</pre>
