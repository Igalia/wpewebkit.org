---
layout: post
title: "WPEBackend-fdo 1.9.90 released"
tags: [release, unstable]
package: wpebackend-fdo
version: 1.9.90
permalink: /release/wpebackend-fdo-1.9.90.html
---

This is a development release leading towards the 1.10 series.

### What's new in WPEBackend-fdo 1.9.90?

- Added API to obtain the `wl_resource` for SHM exported buffers.
- Fixed headers to include `<wpe/wpe.h>` from the top-level API headers, as
  their consumers expect the public libwpe API to be defined as well.
- Fixed UI process getting stuck when navigating across different security
  origins. This also fixed a small memory leak.
- Fixed invalid usage of Wayland client connections in the nested compositor
  which caused sporadic crashes in certain conditions.
- Fixed a file descriptor leak on view backend initialization.
- Fixed a small memory leak when releasing exportable view backends.

#### Checksums

<pre>
wpebackend-fdo-1.9.90.tar.xz (37.1 KiB)
   md5sum: da5f85b41a4a40d38f6ac9f1f0d062bc
   sha1sum: 62103b07c6f2eb3dab3ff2e4259538c870c9e7db
   sha256sum: 9d8330f54debb6273b432040dfde2b03e6eed8411dceda0093193a06276aba44
</pre>
