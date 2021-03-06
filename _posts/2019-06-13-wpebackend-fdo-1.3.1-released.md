---
layout: post
title: "WPEBackend-fdo 1.3.1 released!"
date: 2019-06-13
tags: [release, unstable]
version: 1.3.1
package: wpebackend-fdo
permalink: /release/wpebackend-fdo-1.3.1.html
download: https://wpewebkit.org/releases/wpebackend-fdo-1.3.1.tar.xz
---

This is a development release leading towards the 1.4 series.

### What's new in the WPEBackend-fdo 1.3.1 release?

- New macros in the API to check the version at compilation time ([#47](https://github.com/Igalia/WPEBackend-fdo/pull/47), [#48](https://github.com/Igalia/WPEBackend-fdo/pull/48)).
- Added support for detaching and attaching new ones for a view backend ([#40](https://github.com/Igalia/WPEBackend-fdo/pull/40)).
- Improved handling of Wayland events ([#41](https://github.com/Igalia/WPEBackend-fdo/pull/41), [#49](https://github.com/Igalia/WPEBackend-fdo/pull/49)).
- Improved how CMake searches for wayland-scanner, making it friendlier for cross-compilation ([#39](https://github.com/Igalia/WPEBackend-fdo/pull/39)).
- Fixed double-free of callback resources during destruction of view backends.

#### Checksums

<pre>
wpebackend-fdo-1.3.1.tar.xz (28.2KB)
   md5sum: 4bd9b0c9b8b624ca806024c8ddfeb564
   sha1sum: aa37f3c59db557c0c0026a492e6928dad50877c0
   sha256sum: b0d136aa9ce9f94b1d06b258ed68c4a7b588b2e692d448d9c6eedb72edf56739
</pre>
