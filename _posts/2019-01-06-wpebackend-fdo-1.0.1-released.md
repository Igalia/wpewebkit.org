---
layout: post
title: "WPEBackend-fdo 1.0.1 released!"
date: 2019-01-06
tags: release
permalink: /release/wpebackend-fdo-1.0.1.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.0.1.tar.xz
---

This is a bugfix release in the stable 1.0 series.

### What's new in the WPEBackend-fdo 1.0.1 release?

- Allow `wpe_fdo_initialize_for_egl_display()` to be called multiple times;
  it will emit a warning when trying to switch to a different EGL display,
  which is unsupported [#26](https://github.com/Igalia/WPEBackend-fdo/pull/26).

##### Checksums

<pre>
wpebackend-fdo-1.0.1.tar.xz (24.4KB)
   md5sum: 2ee81a4212c18110a06a0c51c12e0d2e
   sha1sum: cdc6ac95e302a2358204b766936a9bf8ef4f26f2
   sha256sum: 15b8b1febea5d9c271e95c35b3c1e13f870712a54bc5f689cfdbb96e2f070fc8
</pre>
