---
layout: post
title: "WPEBackend-fdo 1.1.90 released!"
date: 2019-02-26
tags: [release, unstable]
version: 1.1.90
package: wpebackend-fdo
permalink: /release/wpebackend-fdo-1.1.90.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.1.90.tar.xz
---

This is a development release leading towards the 1.2 series.

### What's new in the WPEBackend-fdo 1.1.90 release?

- Function `wpe_fdo_initialize_for_egl_display()` now returns a boolean value
  which indicates whether initialization was successful ([#32](https://github.com/Igalia/WPEBackend-fdo/pull/32)).
- Some function parameters have been marked as `const` to explicitly indicate
  that they are not modified.
- Avoid leaking Wayland callback objects on each frame ([#31](https://github.com/Igalia/WPEBackend-fdo/pull/31)).

##### Checksums

<pre>
wpebackend-fdo-1.1.90.tar.xz (26.1KB)
   md5sum: f5db0d3137d37e886c932b470808a779
   sha1sum: 9d0ea689f2215652b4cc5a790d78306c0707e56b
   sha256sum: 31d9f1ae06968fe752055dde9d5cd7d5fd044c1aec92798bc0491d9a9cef84da
</pre>
