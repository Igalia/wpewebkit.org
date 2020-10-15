---
layout: post
title: "Try WPE with Flatpak"
tags: [about]
data: { dateless: "true" }
permalink: /about/flatpak.html 
--- 

[Flatpak](https://flatpak.org) is generally advertised as the next-generation
technology for building and distributing applications on Linux. The WPE
maintainers leverage Flatpak to allow users to try two different WPE flavors.

## Stable WPE releases

Stable releases are packaged and available through Flatpak. Users and WPE
application developers can easily try the [Cog WPE
browser](https://github.com/igalia/cog) and even build new applications relying
on the WPE Sdk provided through Flatpak.

Besides a [working Flatpak setup](https://flatpak.org/setup/) you need to
register the Igalia Flatpak repository in your Linux environment:

```shell
$ flatpak --user remote-add wpe-releases --from \
  https://software.igalia.com/flatpak-refs/wpe-releases.flatpakrepo
```

This repository contains binary builds of WPE for the `x86_64` architecture and
provides packages for Cog as well.

The current Cog/WPE stack still imposes the Wayland-only limitation, with
Mesa-based graphics stacks most likely to work well. In future release, we plan
to add support for new platforms, graphics stacks and methods of integration.

### Cog

To install and run Cog, use the following commands:

```
$ flatpak --user install org.wpe.Cog
$ flatpak run org.wpe.Cog -P fdo <URL>
```

### Sdk for application developers

Application developers can package their WPE application with Flatpak and basing
the application upon the WPE Sdk runtime. The following `flatpak-builder`
manifest snippet can be used to target the WPE Sdk:

```yaml
runtime: org.wpe.Platform
runtime-version: stable
sdk: org.wpe.Sdk
```

More information is available on the [Flatpak
website](https://docs.flatpak.org/en/latest/first-build.html#add-a-manifest)
regarding applications packaging.

## Nightly WPE builds

To complement the [six months release cycle]({{'/release/schedule' | url}}),
users interested in testing the latest development version of WPE can download
it directly from the [build
bots](https://build.webkit.org/waterfall?category=WPE) using a Python script.

This is a convenient and easy way to test the bleeding edge version of WPE,
exposing features that will be shipped in the next stable release.

To download and test nightly WPE builds, download the
`webkit-flatpak-run-nightly` script and run it like this:

```shell
$ wget https://raw.githubusercontent.com/WebKit/webkit/master/Tools/Scripts/webkit-flatpak-run-nightly
$ chmod +x webkit-flatpak-run-nightly
$ ./webkit-flatpak-run-nightly --wpe MiniBrowser <browser options or URL>
```

This script locally installs the WebKit Flatpak-based developer SDK in
`~/.cache/wk-nightly` and then downloads a zip archive of the build artefacts
from the buildbot server. The downloaded zip file is unpacked in `/tmp` and kept
around in case you want to run this again without re-downloading the build
archive:

```shell
$ ./webkit-flatpak-run-nightly --wpe -p /tmp/wpewebkit-release-bXXXXX \
  MiniBrowser <browser options or URL>
```

Nightly builds are currently provided only for machines using the `x86_64` architecture.
