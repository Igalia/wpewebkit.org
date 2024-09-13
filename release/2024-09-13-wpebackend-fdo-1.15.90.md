---
layout: post
title: "WPEBackend-fdo 1.15.90 released"
tags: [release, unstable]
package: wpebackend-fdo
version: 1.15.90
permalink: /release/wpebackend-fdo-1.15.90.html
---

This is a development release leading towards the 1.16 series.

### What's new in WPEBackend-fdo 1.15.90?

- Changed minimum Meson version to 0.52.1
- Fix build issues in some configurations that require an explicit cast
  to `EGLNativeWindowType`.
- Fix WebKit no longer repainting after provisional navigation with
  PSON enabled.
- Fix graphics buffer leaks by always freeing them in buffer destroy
  listener callbacks.
- Fix a crash caused by a wrong assertion, which was typically triggered
  in debug builds when using the NVidia drivers.
- Fix memory leak when the view backend `wl_resource` is destroyed.
- Fix `wpe_dmabuf_pool` object leak.

#### Checksums

<pre>
wpebackend-fdo-1.15.90.tar.xz (43.4 KiB)
   md5sum: 15dd3a7f9be0db18aa237f4cd1bbbd18
   sha1sum: 3268a9b7d6ed8ebf5198fb92b7063c58627a84bd
   sha256sum: 4ac5be554560ed48b13a0745fc779d7f6663904f35f510a6c50e34cb96999083
</pre>
