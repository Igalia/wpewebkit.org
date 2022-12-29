---
layout: page
title: "Get Started with WPEwebkit"
tags: [about]
data: { dateless: "true" }
permalink: /about/explore-wpe.html
resources: [
	{
		"title": "Package Releases",
		"url": "/release/",
		"text": "The most recent stable and development releases of WPE codebases."
	},
	{
		"title": "Release Schedule",
		"url": "/release/schedule/",
		"text": "How often does WEPWebKit release, and when?"
	},
	{
		"title": "Security Advisories",
		"url": "/security/",
		"text": "A complete archive of our security adviories, often with download links."
	},
	{
		"title": "Performance Tips",
		"url": "https://github.com/Igalia/meta-webkit/wiki/PerformanceTips",
		"text": "A few pointers on how to get better performance out of WPEwebkit. (Github Wiki)"
	}
]
---

<header class="page">

# Get Started with WPEwebkit

</header>

## Grab the code

If you're an experienced embedded engineer, you'll most likely want to grab the [code](https://github.com/Igalia/meta-webkit/wiki/WPE) and build and tune WPE for your specific needs.
 

## Easy pre-builts

We've also tried to make it easy for developers who aren't comfortable building entire embedded systems to get their hands on _something_ where they can begin exploring and learning useful things. Our easy prebuilts do just that - they won't be well optimized in the way a final product usually is, but they're nonetheless very useful.

* __Install it from your GNU/Linux OS distribution__: These packages are not just a quick and simple way to test WPE but they also come with all the development files and documentation necessary to build and test software that uses this web engine.  WPE WebKit is available in several Linux distributions including:

  * [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=wpewebkit)
  * [Ubuntu](https://packages.ubuntu.com/search?keywords=wpewebkit&searchon=sourcenames&suite=all&section=all)
  * [Raspbian](https://archive.raspbian.org/raspbian/pool/main/w/wpewebkit/)
  * [Arch Linux](https://archlinux.org/packages/extra/x86_64/wpewebkit/)
  * [Fedora](https://copr.fedorainfracloud.org/coprs/philn/wpewebkit/)

* [Install with Flatpak]({{'/about/flatpak.html' | url}}): If you have support for Flatpak on your current hardware and operating system, and your graphics drivers are supported, there are various options to try WPE through Flatpak.  This can be a very easy way to let you explore WPE, check the features and specifications supported by WPE, or just want to experiment and learn more about what some of the differences with a full browser are.

* [Yocto images on Raspberry Pi]({{'/about/yocto-wpe.html' | url}}): For these devices we provide images based on Yocto that can be used to boot-up the device and run WPE right away.

* [Install with Balena]({{'/about/balena-wpe.html' | url}}): If there is support in [Balena](https://www.balena.io/) for your current hardware then it can be another easy way to let you explore WPE, and use the extra possibilities provided in the Balena ecosystem.

If you find any problem with the packages or images, or want to know more about optimizing WPE for your hardware or use cases, please [contact us]({{'/code' | url}}).

{% include resources.html %}