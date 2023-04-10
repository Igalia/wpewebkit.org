---
layout: post
title: "WPEBackend-fdo 1.3.0 released!"
date: 2019-05-08
tags: [release, unstable]
version: 1.3.0
package: wpebackend-fdo
permalink: /release/wpebackend-fdo-1.3.0.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.3.0.tar.xz
---

This is the first development release leading towards the 1.4 series.

### What's new in the WPEBackend-fdo 1.3.0 release?

- Do not include EGL headers in libwpe public headers
  ([#38](https://github.com/Igalia/WPEBackend-fdo/pull/38)).
- New API for exported images which allows querying their dimension their backing `EGLImageKHR`
  ([#37](https://github.com/Igalia/WPEBackend-fdo/pull/37)).
- Use the default priority for the GLib event sources
  ([#33](https://github.com/Igalia/WPEBackend-fdo/pull/33)).

#### Checksums

<pre>
wpebackend-fdo-1.3.0.tar.xz (26.8KB)
   md5sum: 6e00accb294fee5f2d27a716552284d2
   sha1sum: f07e4c92deae09b2904db1efdc457bfcce1551f9
   sha256sum: fed9ab29f5d53cf465188da80d014f3aa067c77704f8508c6bd17971fded359d
</pre>
