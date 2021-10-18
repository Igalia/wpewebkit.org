---
layout: post
title: "WPEBackend-fdo 1.12.0 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.12.0
permalink: /release/wpebackend-fdo-1.12.0.html
---

This is the first stable release in the 1.12 series.

### Highlights of the 1.12.0 release

- Added API to obtain the `wl_resource` for SHM exported buffers.
- Added unstable DMA-BUF pool API for buffer management.
- Fixed UI process getting stuck when navigating across different security origins.
- Fixed invalid usage of Wayland client connections in the nested compositor which caused crashes in some situations.
- Made it easier to override where Meson looks for `wayland-scanner` during cross-compilation, using a native machine file.

#### Checksums

<pre>
wpebackend-fdo-1.12.0.tar.xz (42.1 KiB)
   md5sum: c43b34a4b4933bcd80068ae5776ee346
   sha1sum: e2576d564bd6d9a86737a4cd31dd5827ebc00fdf
   sha256sum: 6239c9c15523410798d66315de6b491712ab30009ba180f3e0dd076d9b0074ac
</pre>
