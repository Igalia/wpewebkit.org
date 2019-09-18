---
layout: post
title: WPEBackend-fdo 1.4.0 released
tags: [release, stable]
version: 1.4.0
package: wpebackend-fdo
permalink: /release/wpebackend-fdo-1.4.0.html
---

This is the first stable release in the 1.4 series.

### Highlights of the WPEBackend-fdo 1.4.0 release

- New macros in the API to check the version at compilation time.
- New API for exported images which allows querying their dimension their backing `EGLImageKHR`.
- Support DMA-BUF resource exports through a new callback in the API.
- Added support for detaching and attaching new targets to a view backend.
- Improved management and cleanup of Wayland resources.
- Improved handling of Wayland events.
- Build system improvements.

#### Checksums

<pre>
wpebackend-fdo-1.4.0.tar.xz (29.5 KiB)
   md5sum: 63553c3f43593c2a8c587c32e88fdf3c
   sha1sum: a426d9a778ab52be2f4dd9cc7d324b43abac2f80
   sha256sum: a919ca4a5bc445f9419a5b7f3781cfc98e5abcf5d7259eb1869f5ab20fd18baf
</pre>
