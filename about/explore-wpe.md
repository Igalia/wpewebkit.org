---
layout: page
title: "Get Started with WPEwebkit"
tags: [about]
data: { dateless: "true" }
permalink: /about/explore-wpe.html
---
<style>
header.page {
	width: 120%;
}
</style>

<header class="page">

# Get Started with WPEwebkit

</header>

## Grab the code

If you're an experienced embedded engineer, you'll most likely want to grab the [code](/code/) and build and tune WPE for your specific needs.
 

## Easy pre-builts

We've also tried to make it easy for developers who aren't comfortable building entire embedded systems to get their hands on _something_ where they can begin exploring and learning useful things. Our easy prebuilts do just that - they won't be well optimized in the way a final product usually is, but they're nonetheless very useful.

* __Install it from your GNU/Linux OS distribution__: These packages are not just a quick and simple way to test WPE but they also come with all the development files and documentation necessary to build and test software that uses this web engine.  WPE WebKit is available in several Linux distributions including:

  * [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=wpewebkit)
  * [Ubuntu](https://packages.ubuntu.com/search?keywords=wpewebkit&searchon=sourcenames&suite=all&section=all)
  * [Raspbian](https://archive.raspbian.org/raspbian/pool/main/w/wpewebkit/)
  * [Arch Linux](https://archlinux.org/packages/extra/x86_64/wpewebkit/)
  * [Fedora](https://copr.fedorainfracloud.org/coprs/philn/wpewebkit/)

* [Install with Flatpak]({{'/about/flatpak.html' | url}}): If you have support for Flatpak on your current hardware and operating system, and your graphics drivers are supported, there are various options to try WPE through Flatpak.  This can be a very easy way to let you explore WPE, check the features and specifications supported by WPE, or just want to experiment and learn more about what some of the differences with a full browser are.

* __Raspberry Pi OS images with WPE__: Probably the most straight-forward way to learn a lot without a lot of experience in embedded systems is to try out our image that runs on Raspberry Pi OS.  Just download and flash the image onto an SD card, plug it in and go.  Lots of developers have a Raspberry Pi sitting around somewhere, and if you don't, you can own one without a huge investment.  A Raspberry Pi 3b, as of the time of this writing, costs under $45, and can be connected to any display or keyboard.  The Raspberry Pi OS is a more or less full featured desktop OS based on Debian, so it's easy to configure things like a WiFi connection, install a local server, setup SSH and so on.  The browser we've packed up with this distribution is _not_ especially optimized for the hardware, so you can get a pretty good feel of what running on really limited 32-bit hardware _can_ be like&nbsp;— and which sorts of performance related things we just owe to particular optimizations.
  * Stable: [Raspberry Pi OS image, 32-bit, with WPE](https://wk-contrib.igalia.com/debian/images/wpe-raspbian.img.zip), works with RPi models 3B, 3B+ and 4
  * Nightly build: [Raspberry Pi OS image, 32-bit, with WPE](https://wk-contrib.igalia.com/debian/images/nightly/wpe-raspbian.img.zip), works with RPi models 3B, 3B+ and 4

* [Install with Balena]({{'/about/balena-wpe.html' | url}}): If there is support in [Balena](https://www.balena.io/) for your current hardware then it can be another easy way to let you explore WPE, and use the extra possibilities provided in the Balena ecosystem.

If you find any problem with the packages or images, or want to know more about optimizing WPE for your hardware or use cases, please [contact us]({{'/code' | url}}).

## Resources

* [Release Schedule]({{'/release/schedule/'|url}})
* [Release Notes]({{'/release/'|url}})
* [Security Advisories]({{'/security/'|url}})
* [Performance tips](https://github.com/Igalia/meta-webkit/wiki/PerformanceTips)
