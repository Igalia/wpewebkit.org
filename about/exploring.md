---
layout: post
title: "Exploring Embedded Browsers"
tags: [about]
data: { dateless: "true" }
permalink: /about/exploring.html 
--- 

Long ago, it might have been reasonable to imagine browsers only in the realm of desktop computers.  However, embedded browsers are in everything these days: cars, signs, tablets, gaming systems, televisions and appliances.  They're even in space!

The Web Platform is a frequently chosen foundational technology for _many reasons_, including:

* Because Web Platform technologies are built on standards, they have great longevity 
* Because these standards are open, embedded systems can incorporate them without licensing fees or other worries.  
* Open standards with great longevity allows lots more things to benefit from the same investments
* The number of people with the basic skills to build things with web technologies is massive 

The fact that over the past few years, _billions_ of new devices have come online, and the implications of this are still under-discussed.  We believe developers need to be able explore and understand this space, and that lessons learned here are potentially helpful to the larger web ecosystem as well. However, this can be challenging, because embedded browsers are a little different...

## Why embedded browsers are different
For many of us, a browser is an application like the one you're probably using now.  You click an icon on your graphical operating system (OS), navigate somewhere with a URL bar, search, and so on.  You have bookmarks and tabs that you can drag around, and lots of other features.

In contrast, an embedded browser is contained within another application or is built for a specific purpose and runs in an embedded system, and the application controlling the embedded browser does not provide all the typical features of browsers running in desktops.

Furthermore, for most embedded systems there isn't a common desktop <abbr title="Operating System">OS</abbr> for the browser to run on&nbsp;— in fact, the <abbr title="Operating System">OS</abbr> is built specifically for that type of device, and the embedded browser is built along with it.  Part of the reason for this is that, by and large, they are not general-purpose computing devices.  They have slightly different security concerns, and they also run on often radically different sorts of hardware than desktop, laptop or many mobile devices.

So, what really _is_ an embedded browser?

### Browsers, engines and ports

A "proper" _browser_ is, in all likelihood, the application in which you are reading this.  This browser is built on one of three open source projects: WebKit, Chromium or Gecko.  Each of these projects defines an _engine_&nbsp;— that is, they provide an architecture through which something else (e.g., a browser) can bind to the top layer of the engine in order to drive us from URL to URL, and use the engine’s bottom layer to do things like actually put content on the screen, render graphics, receive input from devices like keyboards, mice and pointing devices, and connect to things like the text-to-speech subsystem.

In terms of WebKit-based browsers, a "port" is the set of extra layers that provides facilities at those top and bottom layers of the engine.  The WebKit project has a few "official" ports that are available from [webkit.org/downloads/](https://webkit.org/downloads/).  Some, like Safari, are fully-featured desktop browsers.  WebKitGTK is a port for the GTK GUI toolkit, used among others by the desktop browser Epiphany.

WPE ("Web Platform for Embedded") is the official port for embedded systems, and it adds another layer to the architecture allowing for more easily swappable _backends_ (the graphics layers, windowing and so on) and simpler bindings for programmatic top-level control in Linux based systems.  Cog is another project that makes it easier to launch and drive WPE views.

In other words, WPE is designed to be _built_ and optimized for your embedded device in order to deliver the best performance.  What all of this means is that there isn't really a single "WPE" that’s as easy to provide as many browsers that you're probably familiar with.


### Easy ways to explore WPE
All of this said, we believe that enabling developers to explore the space is important for a whole lot of reasons.  Therefore, we've tried to make it easy for developers who aren't comfortable building entire embedded systems to get their hands on _something_ where they can begin exploring and learning useful things.

* __Install it from your GNU/Linux OS distribution__: These packages are not just a quick and simple way to test WPE but they also come with all the development files and documentation necessary to build and test software that uses this web engine.  WPE WebKit is available in several Linux distributions including:
  * [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=wpewebkit)
  * [Ubuntu](https://packages.ubuntu.com/search?keywords=wpewebkit&searchon=sourcenames&suite=all&section=all)
  * [Raspbian](https://archive.raspbian.org/raspbian/pool/main/w/wpewebkit/)
  * [Arch Linux](https://archlinux.org/packages/extra/x86_64/wpewebkit/)

* [Install with Flatpak]({{'/about/flatpak.html' | url}}): If you have support for Flatpak on your current hardware and operating system, and your graphics drivers are supported, there are various options to try WPE through Flatpak.  This can be a very easy way to let you explore WPE, check the features and specifications supported by WPE, or just want to experiment and learn more about what some of the differences with a full browser are.

* __Raspberry Pi OS images with WPE__: Probably the most straight-forward way to learn a lot without a lot of experience in embedded systems is to try out our image that runs on Raspberry Pi OS.  Just download and flash the image onto an SD card, plug it in and go.  Lots of developers have a Raspberry Pi sitting around somewhere, and if you don't, you can own one without a huge investment.  A Raspberry Pi 3b, as of the time of this writing, costs under $45, and can be connected to any display or keyboard.  The Raspberry Pi OS is a more or less full featured desktop OS based on Debian, so it's easy to configure things like a WiFi connection, install a local server, setup SSH and so on.  The browser we've packed up with this distribution is _not_ especially optimized for the hardware, so you can get a pretty good feel of what running on really limited 32-bit hardware _can_ be like&nbsp;— and which sorts of performance related things we just owe to particular optimizations.
  * Stable: [Raspberry Pi OS image, 32-bit, with WPE](https://wk-contrib.igalia.com/debian/images/wpe-raspbian.img.zip), works with RPi models 3B, 3B+ and 4
  * Nightly build: [Raspberry Pi OS image, 32-bit, with WPE](https://wk-contrib.igalia.com/debian/images/nightly/wpe-raspbian.img.zip), works with RPi models 3B, 3B+ and 4

* [Install with Balena]({{'/about/balena-wpe.html' | url}}): If there is support in [Balena](https://www.balena.io/) for your current hardware then it can be another easy way to let you explore WPE, and use the extra possibilities provided in the Balena ecosystem.

If you find any problem with the packages or images, or want to know more about optimizing WPE for your hardware or use cases, please [contact us]({{'/code' | url}}).
