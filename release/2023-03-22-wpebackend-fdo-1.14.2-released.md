---
layout: post
title: "WPEBackend-fdo 1.14.2 released"
tags: [release, stable]
package: wpebackend-fdo
version: 1.14.2
permalink: /release/wpebackend-fdo-1.14.2.html
---

This is a bug fix release in the stable 1.14 series.

### What's new in WPEBackend-fdo 1.14.2?

- Reverted a change introduced in 1.14.1 which introduced crashes both
  with WebKitGTK and WPE running under Wayland in some configurations.
- Fix a crash caused by wrong assertion, which was typically triggered in
  debug builds when using the NVidia drivers.

#### Checksums

<pre>
wpebackend-fdo-1.14.2.tar.xz (42.3 KiB)
   md5sum: dafd899646b2e31ef2d97938a638c48d
   sha1sum: f453f8d77e93f4ac6ac81c1874d4d6bdcb45c253
   sha256sum: 93c9766ae9864eeaeaee2b0a74f22cbca08df42c1a1bdb55b086f2528e380d38
</pre>
