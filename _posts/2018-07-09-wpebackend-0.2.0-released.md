---
layout: post
title: "WPEBackend 0.2.0 released!"
date: 2018-07-09
tags: [release, stable]
version: 0.2.0
package: wpebackend-fdo
permalink: /release/wpebackend-0.2.0.html
download: https://wpewebkit.org/releases/wpebackend-0.2.0.tar.xz
---

This is a backwards-compatible, stable release of the WPE backend loader
library.

### What's new in the WPBackend 0.2.0 release?

- New API to set and query the backend implementation library being used
  ([#19](https://github.com/WebPlatformForEmbedded/WPEBackend/pull/19)).

- New API to query the version library, both with macros at build time,
  and functions at runtime
  ([#18](https://github.com/WebPlatformForEmbedded/WPEBackend/pull/18)).

- Trying to use a backend implementation library which does not provide
  a `load_object` callback will produce a meaningful error instead of
  silently failing.


##### Checksums

<pre>
wpebackend-0.2.0.tar.xz (8.6KB)
   md5sum: d04e44a32709dbb763ce1fcfc28bc6d8
   sha1sum: 4089cac12877ee1e09372953a281a46b8c8951e9
   sha256sum: ce33ff29b04175cb6fe6e6597a4b5e8ec9da0b8b5ae0745848902ac935d65823
</pre>
