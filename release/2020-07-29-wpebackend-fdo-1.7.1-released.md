---
layout: post
title: "WPEBackend-fdo 1.7.1 released"
tags: [release, unstable]
package: wpebackend-fdo
version: 1.7.1
permalink: /release/wpebackend-fdo-1.7.1.html
---

This is the first development release leading towards the 1.8 series.

### What's new in WPEBackend-fdo 1.7.1?

- Added new API for the audio rendering protocol, which allows embedders to
  receive audio samples instead of letting WPE WebKit handle their playback.
- Added support to export frames using EGLStreams, which can be used e.g.
  with Nvidia GPUs.
- New build configuration system based on Meson. The existing CMake-based
  system is still maintained, and both produce the same outputs.
- Expose symbols for the version retrieval functions.
- Use libepoxy for EGL operations.

#### Checksums

<pre>
wpebackend-fdo-1.7.1.tar.xz (40.8 KiB)
   md5sum: 7e66a08eecba6124f59bbce288c52fa1
   sha1sum: d72795efca8d6d4e624fc9e945cf279599e74bc0
   sha256sum: 9b980a73ea4e3762266c48f81ded56d9dcad4acf32bad9bd05d0dffdd454c6f5
</pre>
