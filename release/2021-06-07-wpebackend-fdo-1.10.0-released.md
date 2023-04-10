---
layout: post
title: "WPEBackend-fdo 1.10.0 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.10.0
permalink: /release/wpebackend-fdo-1.10.0.html
---

This is the first stable release in the 1.10 series.

### Highlights of the WPEBackend-fdo 1.10.0 release

- Added API to query whether receiving rendered audio has been configured.
- Added API to obtain the `wl_resource` for SHM exported buffers.
- The CMake build system has been removed in favor of Meson.
- Made it easier to override where Meson looks for `wayland-scanner`
  during cross-compilation, using a native machine file.
- Fixed invalid usage of Wayland client connections in the nested compositor
  which caused sporadic crashes in certain conditions.
- Fixed file descriptor and memory leaks.

#### Checksums

<pre>
wpebackend-fdo-1.10.0.tar.xz (37.6 KiB)
   md5sum: 306adbb0c66dc753e1794c83b7a2682b
   sha1sum: bf71718a213c6511dea278ade5ce90967d181995
   sha256sum: b89dfd3500a4dec711132cd7bff72599e67d56a419d000730e14bb99547509cc
</pre>
