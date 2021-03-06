---
layout: post
title: "WPEBackend-fdo 1.2.1 released!"
date: 2019-07-01
tags: [release, stable]
version: 1.2.1
package: wpebackend-fdo
permalink: /release/wpebackend-fdo-1.2.1.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.2.1.tar.xz
---


### What's new in the WPEBackend-fdo 1.2.1 release?

- Improved how CMake searches for wayland-scanner, making it friendlier for
  cross-compilation ([#39](https://github.com/Igalia/WPEBackend-fdo/pull/39)).

- Fixed the build when using EGL headers which define prototypes for
  EGL extensions ([#51](https://github.com/Igalia/WPEBackend-fdo/pull/51)),
  and when the EGL_WAYLAND_BUFFER_WL definition is missing
  ([#50](https://github.com/Igalia/WPEBackend-fdo/pull/50)).

##### Checksums

<pre>
wpebackend-fdo-1.2.1.tar.xz (26.8KB)
   md5sum: fc76ac572ed03da8237d1e3e3991d0c3
   sha1sum: 8c994a25839b9df214c148c8892ee2c6f88ebbde
   sha256sum: 6ef0852ecb9513a6789f8bbb9533083fcb165bb2d762eeb6d31e0b58c708cca0
</pre>
