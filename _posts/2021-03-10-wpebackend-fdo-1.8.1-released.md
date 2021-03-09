---
layout: post
title: "WPEBackend-fdo 1.8.1 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.8.1
permalink: /release/wpebackend-fdo-1.8.1.html
---

This is the first bug fix release in the stable 1.8 series.

### What's new in WPEBackend-fdo 1.8.1?

- Fixed invalid usage of Wayland client connections in the nested compositor which caused sporadic crashes in certain conditions.
- Fixed a file descriptor leak on view backend initialization.
- Fixed a small memory leak when releasing exportable view backends.

#### Checksums

<pre>
wpebackend-fdo-1.8.1.tar.xz (41.7 KiB)
   md5sum: e7083e9fd325f289b23253b770d08d2e
   sha1sum: 08472f1bcff6100ba963bdbe7347487253006ca0
   sha256sum: 8adb4475be949ae4092370de6a37d7b9e1d3704cf4674867312e87de2ff0d880
</pre>
