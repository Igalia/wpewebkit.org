---
layout: post
title: "WPEBackend-fdo 1.9.1 released"
tags: [release, unstable]
package: wpebackend-fdo
version: 1.9.1
permalink: /release/wpebackend-fdo-1.9.1.html
---

This is the first development release leading towards the 1.10 series.

### What's new in WPEBackend-fdo 1.9.1?

- Added API to query whether receiving rendered audio has been configured.
- The CMake build system has been removed in favor of Meson.
- Fixed memory leak on the second (and subsequent) use of `wpe_fdo_initialize_shm()`.
- Fixed memory leak when releasing exportable view backends.

#### Checksums

<pre>
wpebackend-fdo-1.9.1.tar.xz (36.3 KiB)
   md5sum: 7a233969c0ba50ba4b8f58dbfb43ffa5
   sha1sum: 9f38ca2cca28d69678076fc3a06f314846a96166
   sha256sum: a1dc4e506413719a0d84757797b645fa76590e6c8db23d2403d990dc2e196a64
</pre>
