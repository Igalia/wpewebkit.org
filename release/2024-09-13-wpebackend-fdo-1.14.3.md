---
layout: post
title: "WPEBackend-fdo 1.14.3 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.14.3
permalink: /release/wpebackend-fdo-1.14.3.html
---

This is a bug fix release in the stable 1.14 series.

### What's new in WPEBackend-fdo 1.14.3?

- Fix build issues in some configurations that require en explicit cast
  to `EGLNativeWindowType`.
- Fix memory leak when the view backend `wl_resource` is destroyed.
- Fix `wpe_dmabuf_pool` object leak.

#### Checksums

<pre>
wpebackend-fdo-1.14.3.tar.xz (42.4 KiB)
   md5sum: ab73398b1e35495977e50bee103969d2
   sha1sum: 2d2945df15cc1efa957657fa727f3bc4c6f580bb
   sha256sum: 10121842595a850291db3e82f3db0b9984df079022d386ce42c2b8508159dc6c
</pre>
